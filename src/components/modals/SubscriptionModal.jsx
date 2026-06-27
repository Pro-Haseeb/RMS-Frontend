import { useState } from "react";
import {
  Dialog,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  IconButton,
} from "@mui/material";
import {
  CheckCircle as CheckCircleIcon,
  Close as CloseIcon,
  Star as StarIcon,
  FlashOn as FlashOnIcon,
  WorkspacePremium as WorkspacePremiumIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import StripePaymentModal from "./StripePaymentModal";

const MotionCard = motion(Card);

export default function SubscriptionModal({
  open,
  onClose,
  currentPlan = "free",
  onUpgrade,
  loading = false,
}) {
  const [selectedPlan, setSelectedPlan] = useState(currentPlan);
  const [showStripePayment, setShowStripePayment] = useState(false);

  const plans = {
    free: {
      name: "Free Plan",
      price: "$0",
      description: "Perfect for small companies or trial users",
      icon: <CheckCircleIcon sx={{ fontSize: 40, color: "#60a5fa" }} />,
      features: [
        { text: "Maximum Company Admin: 1", included: true },
        { text: "Maximum HR Users: 0", included: true },
        { text: "Monthly Job Posts Limit: 3", included: true },
        { text: "AI Candidate Scoring", included: false },
        { text: "Interview Scheduling", included: false },
      ],
      restrictions: [
        "Company Admin can access the dashboard",
        "HR creation is not allowed",
        "Only three jobs can be posted within one month",
        "Candidate AI scoring cannot be used",
        "Interview module access is blocked",
      ],
      cta: "Current Plan",
      color: "#60a5fa",
      bg: "rgba(96,165,250,0.05)",
      border: "1px solid rgba(96,165,250,0.2)",
    },
    premium: {
      name: "Premium Plan",
      price: "$99",
      description: "Complete RMS functionality for growing companies",
      icon: <WorkspacePremiumIcon sx={{ fontSize: 40, color: "#a855f7" }} />,
      period: "/month",
      features: [
        { text: "Maximum Company Admin: 1", included: true },
        { text: "Maximum HR Users: 5", included: true },
        { text: "Monthly Job Posts Limit: Unlimited", included: true },
        { text: "AI Candidate Scoring: Enabled", included: true },
        { text: "Interview Scheduling: Enabled", included: true },
      ],
      capabilities: [
        "Company Admin can create HR users",
        "Up to five HR users can be managed",
        "Unlimited jobs can be created",
        "AI-based resume scoring and ranking available",
        "Interview scheduling module available",
      ],
      cta: currentPlan === "premium" ? "Current Plan" : "Upgrade Now",
      color: "#a855f7",
      bg: "rgba(168,85,247,0.08)",
      border: "2px solid rgba(168,85,247,0.4)",
    },
  };

  const currentPlanData = plans[selectedPlan];

  const handleUpgradeClick = (plan) => {
    if (plan === "premium" && currentPlan !== "premium") {
      setShowStripePayment(true);
    }
  };

  const handlePaymentSuccess = (paymentMethod) => {
    setShowStripePayment(false);
    if (onUpgrade) {
      onUpgrade("premium");
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "24px",
            background: "linear-gradient(145deg, rgba(15,23,42,0.98) 0%, rgba(10,15,30,0.98) 100%)",
            backdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 25px 100px rgba(0,0,0,0.6)",
          },
        }}
      >
      {/* Close Button */}
      <IconButton
        onClick={onClose}
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
          <Typography
            variant="h4"
            fontWeight="900"
            sx={{
              background: "linear-gradient(135deg, #a855f7, #f59e0b)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 1,
              fontSize: { xs: "1.75rem", md: "2.5rem" },
            }}
          >
            Choose Your Plan
          </Typography>
          <Typography sx={{ color: "#94a3b8", fontSize: "16px" }}>
            Unlock advanced recruitment features to scale your hiring process
          </Typography>
        </Box>

        {/* Plans Grid */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {Object.entries(plans).map(([key, plan]) => (
            <Grid item xs={12} md={6} key={key}>
              <MotionCard
                onClick={() => setSelectedPlan(key)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: key === "free" ? 0 : 0.1 }}
                sx={{
                  cursor: "pointer",
                  height: "100%",
                  background: plan.bg,
                  border: plan.border,
                  transition: "all 0.3s ease",
                  position: "relative",
                  overflow: "hidden",
                  transform: selectedPlan === key ? "scale(1.02)" : "scale(1)",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    background: `linear-gradient(135deg, ${plan.color}20 0%, transparent 100%)`,
                    opacity: selectedPlan === key ? 1 : 0,
                    transition: "opacity 0.3s ease",
                  },
                }}
              >
                <CardContent sx={{ p: 3, position: "relative", zIndex: 1 }}>
                  {/* Plan Icon & Name */}
                  <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 2 }}>
                    {plan.icon}
                    <Box>
                      <Typography
                        sx={{
                          fontSize: "16px",
                          fontWeight: 700,
                          color: plan.color,
                        }}
                      >
                        {plan.name}
                      </Typography>
                      <Typography sx={{ fontSize: "12px", color: "#64748b" }}>
                        {plan.description}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Price */}
                  <Box sx={{ mb: 3 }}>
                    <Typography
                      sx={{
                        fontSize: "36px",
                        fontWeight: 900,
                        color: plan.color,
                      }}
                    >
                      {plan.price}
                      {plan.period && (
                        <Typography
                          component="span"
                          sx={{
                            fontSize: "14px",
                            fontWeight: 600,
                            color: "#94a3b8",
                            ml: 1,
                          }}
                        >
                          {plan.period}
                        </Typography>
                      )}
                    </Typography>
                  </Box>

                  {/* Features List */}
                  <List sx={{ mb: 2 }}>
                    {plan.features.map((feature, idx) => (
                      <ListItem
                        key={idx}
                        sx={{
                          p: 0.5,
                          opacity: feature.included ? 1 : 0.5,
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <CheckCircleIcon
                            sx={{
                              fontSize: 18,
                              color: feature.included ? plan.color : "#475569",
                            }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={feature.text}
                          primaryTypographyProps={{
                            sx: {
                              fontSize: "13px",
                              color: "#cbd5e1",
                              fontWeight: feature.included ? 600 : 400,
                            },
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>

                  {/* Restrictions/Capabilities */}
                  {(plan.restrictions || plan.capabilities) && (
                    <Box
                      sx={{
                        p: 2,
                        bgcolor: "rgba(255,255,255,0.03)",
                        borderRadius: "8px",
                        mb: 3,
                        border: "1px solid rgba(255,255,255,0.05)",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "12px",
                          fontWeight: 700,
                          color: plan.color,
                          mb: 1,
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                        }}
                      >
                        {key === "free" ? "Restrictions" : "Capabilities"}
                      </Typography>
                      {(plan.restrictions || plan.capabilities).map((item, idx) => (
                        <Typography
                          key={idx}
                          sx={{
                            fontSize: "12px",
                            color: "#cbd5e1",
                            mb: 0.5,
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <Box
                            sx={{
                              width: 4,
                              height: 4,
                              borderRadius: "50%",
                              bgcolor: plan.color,
                            }}
                          />
                          {item}
                        </Typography>
                      ))}
                    </Box>
                  )}

                  {/* CTA Button */}
                  <Button
                    fullWidth
                    variant={selectedPlan === key ? "contained" : "outlined"}
                    onClick={() => handleUpgradeClick(key)}
                    disabled={
                      loading || selectedPlan === currentPlan || selectedPlan === "free"
                    }
                    sx={{
                      py: 1.5,
                      fontSize: "14px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      background:
                        selectedPlan === key
                          ? `linear-gradient(135deg, ${plan.color}, ${plan.color}dd)`
                          : "transparent",
                      color:
                        selectedPlan === key ? "white" : plan.color,
                      border: `2px solid ${plan.color}`,
                      "&:hover": {
                        background:
                          selectedPlan === key
                            ? `linear-gradient(135deg, ${plan.color}, ${plan.color}99)`
                            : `rgba(${plan.color}, 0.1)`,
                      },
                      "&:disabled": {
                        opacity: 0.6,
                        cursor: selectedPlan === currentPlan ? "default" : "not-allowed",
                      },
                    }}
                  >
                    {loading ? (
                      <CircularProgress size={20} sx={{ color: "inherit" }} />
                    ) : (
                      plan.cta
                    )}
                  </Button>
                </CardContent>
              </MotionCard>
            </Grid>
          ))}
        </Grid>

        {/* Info Message */}
        <Box
          sx={{
            p: 2,
            bgcolor: "rgba(168,85,247,0.05)",
            border: "1px solid rgba(168,85,247,0.2)",
            borderRadius: "12px",
            textAlign: "center",
          }}
        >
          <Typography sx={{ color: "#cbd5e1", fontSize: "13px" }}>
            💡 Need more details? Contact our sales team at{" "}
            <Typography
              component="span"
              sx={{
                color: "#a855f7",
                fontWeight: 700,
              }}
            >
              sales@rms.com
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Dialog>

      {/* Stripe Payment Modal */}
      <StripePaymentModal
        open={showStripePayment}
        onClose={() => setShowStripePayment(false)}
        onSuccess={handlePaymentSuccess}
        amount={99}
      />
    </>
  );
}
