import API from "./Api";

// Create Stripe payment intent for premium subscription
export const createPaymentIntent = () =>
  API.post("/payment/create-payment-intent");

// Verify payment status after Stripe redirect
export const verifyPayment = (paymentIntentId) =>
  API.get(`/payment/verify/${paymentIntentId}`);
