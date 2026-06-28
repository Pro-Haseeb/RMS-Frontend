import { useState } from "react";
import {
  Dialog,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CircularProgress,
  IconButton,
  Alert,
  Divider,
} from "@mui/material";
import {
  Close as CloseIcon,
  Lock as LockIcon,
  CreditCard as CreditCardIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { createPaymentIntent } from "../../services/PaymentApi";

const MotionCard = motion(Card);

// Stripe publishable key from environment
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "pk_test_your_stripe_publishable_key");

function CheckoutForm({ onSuccess, onCancel, amount = 99 }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    setError(null);

    if (!stripe || !elements) {
      setProcessing(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      // Create payment intent on backend
      const { data: paymentData } = await createPaymentIntent();
      
      if (!paymentData.success || !paymentData.clientSecret) {
        setError("Failed to initialize payment. Please try again.");
        setProcessing(false);
        return;
      }

      // Confirm payment with Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        paymentData.clientSecret,
        {
          payment_method: {
            card: cardElement,
          },
        }
      );

      if (error) {
        setError(error.message);
        setProcessing(false);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        onSuccess({ paymentIntentId: paymentIntent.id });
      } else {
        setError("Payment processing failed. Please try again.");
        setProcessing(false);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Payment failed. Please try again.");
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h6"
          fontWeight="700"
          sx={{ color: "#fff", mb: 2, display: "flex", alignItems: "center", gap: 1 }}
        >
          <CreditCardIcon sx={{ color: "#60a5fa" }} />
          Payment Details
        </Typography>
        
        <Box
          sx={{
            p: 3,
            borderRadius: "12px",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            mb: 2,
          }}
        >
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#ffffff",
                  "::placeholder": {
                    color: "#64748b",
                  },
                },
                invalid: {
                  color: "#f87171",
                },
              },
            }}
          />
        </Box>

        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 2,
              borderRadius: "10px",
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.2)",
              color: "#fca5a5",
              "& .MuiAlert-icon": { color: "#f87171" },
            }}
          >
            {error}
          </Alert>
        )}
      </Box>

      <Box
        sx={{
          p: 3,
          borderRadius: "12px",
          background: "rgba(96,165,250,0.05)",
          border: "1px solid rgba(96,165,250,0.15)",
          mb: 3,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography sx={{ color: "#94a3b8", fontSize: "14px" }}>Premium Plan</Typography>
          <Typography sx={{ color: "#fff", fontWeight: 600, fontSize: "14px" }}>${amount}/month</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography sx={{ color: "#94a3b8", fontSize: "14px" }}>Total</Typography>
          <Typography sx={{ color: "#60a5fa", fontWeight: 700, fontSize: "18px" }}>${amount}</Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3, color: "#64748b", fontSize: "12px" }}>
        <LockIcon sx={{ fontSize: 14 }} />
        <Typography>Secured by Stripe. Your payment information is encrypted.</Typography>
      </Box>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          onClick={onCancel}
          disabled={processing}
          sx={{
            py: 1.5,
            borderRadius: "10px",
            borderColor: "rgba(255,255,255,0.1)",
            color: "#64748b",
            fontWeight: 600,
            textTransform: "none",
            "&:hover": {
              borderColor: "rgba(255,255,255,0.2)",
              background: "rgba(255,255,255,0.03)",
            },
          }}
        >
          Cancel
        </Button>
        <Button
          fullWidth
          variant="contained"
          type="submit"
          disabled={!stripe || processing}
          startIcon={processing ? <CircularProgress size={20} color="inherit" /> : <CheckCircleIcon />}
          sx={{
            py: 1.5,
            borderRadius: "10px",
            background: "linear-gradient(135deg, #2563eb, #7c3aed)",
            fontWeight: 700,
            textTransform: "none",
            "&:hover": { background: "linear-gradient(135deg, #1d4ed8, #6d28d9)" },
            "&.Mui-disabled": { background: "rgba(59,130,246,0.3)", color: "rgba(255,255,255,0.5)" },
          }}
        >
          {processing ? "Processing..." : `Pay $${amount}`}
        </Button>
      </Box>
    </form>
  );
}

export default function StripePaymentModal({ open, onClose, onSuccess, amount = 99 }) {
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePaymentSuccess = (paymentMethod) => {
    setPaymentSuccess(true);
    setTimeout(() => {
      onSuccess(paymentMethod);
      handleClose();
    }, 2000);
  };

  const handleClose = () => {
    setPaymentSuccess(false);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "20px",
          background: "rgba(15,23,42,0.95)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 25px 80px rgba(0,0,0,0.5)",
        },
      }}
    >
      {/* Close Button */}
      <IconButton
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 16,
          top: 16,
          color: "#94a3b8",
          zIndex: 10,
          "&:hover": {
            color: "white",
            bgcolor: "rgba(255,255,255,0.1)",
          },
        }}
      >
        <CloseIcon />
      </IconButton>

      <Box sx={{ p: { xs: 3, md: 4 } }}>
        {/* Header */}
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <MotionCard
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            sx={{
              width: 80,
              height: 80,
              borderRadius: "20px",
              background: paymentSuccess 
                ? "rgba(52,211,153,0.1)"
                : "rgba(96,165,250,0.1)",
              border: paymentSuccess 
                ? "1px solid rgba(52,211,153,0.2)"
                : "1px solid rgba(96,165,250,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 2,
            }}
          >
            {paymentSuccess ? (
              <CheckCircleIcon sx={{ fontSize: 48, color: "#34d399" }} />
            ) : (
              <CreditCardIcon sx={{ fontSize: 48, color: "#60a5fa" }} />
            )}
          </MotionCard>
          
          <Typography
            variant="h5"
            fontWeight="700"
            sx={{
              color: "#fff",
              mb: 1,
              fontSize: { xs: "1.5rem", md: "1.75rem" },
            }}
          >
            {paymentSuccess ? "Payment Successful!" : "Complete Payment"}
          </Typography>
          <Typography sx={{ color: "#94a3b8", fontSize: "14px" }}>
            {paymentSuccess 
              ? "Your premium subscription is now active"
              : "Upgrade to Premium Plan to unlock all features"
            }
          </Typography>
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.08)", mb: 3 }} />

        {paymentSuccess ? (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <MotionCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              sx={{
                p: 3,
                borderRadius: "12px",
                background: "rgba(52,211,153,0.05)",
                border: "1px solid rgba(52,211,153,0.15)",
                mb: 3,
              }}
            >
              <Typography sx={{ color: "#34d399", fontWeight: 700, mb: 1 }}>
                🎉 Welcome to Premium!
              </Typography>
              <Typography sx={{ color: "#cbd5e1", fontSize: "13px" }}>
                You now have access to unlimited job posts, AI candidate scoring, and interview scheduling.
              </Typography>
            </MotionCard>
            
            <Button
              fullWidth
              variant="contained"
              onClick={handleClose}
              sx={{
                py: 1.5,
                borderRadius: "10px",
                background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                fontWeight: 700,
                textTransform: "none",
                "&:hover": { background: "linear-gradient(135deg, #1d4ed8, #6d28d9)" },
              }}
            >
              Get Started
            </Button>
          </Box>
        ) : (
          <Elements stripe={stripePromise}>
            <CheckoutForm 
              onSuccess={handlePaymentSuccess} 
              onCancel={handleClose}
              amount={amount}
            />
          </Elements>
        )}
      </Box>
    </Dialog>
  );
}
