import API from "./Api";

// Create payment intent for premium subscription
export const createPaymentIntent = () =>
  API.post("/payment/create-intent");

// Verify payment status
export const verifyPayment = (paymentIntentId) =>
  API.get(`/payment/verify/${paymentIntentId}`);
