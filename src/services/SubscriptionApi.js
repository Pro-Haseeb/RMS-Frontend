import API from "./Api";

// Get company subscription
export const getCompanySubscription = () =>
  API.get("/subscription");

// Upgrade to premium
export const upgradeToPremium = () =>
  API.post("/subscription/upgrade-premium");

// Downgrade to free
export const downgradeToFree = () =>
  API.post("/subscription/downgrade-free");

// Get all subscriptions (admin only)
export const getAllSubscriptions = () =>
  API.get("/subscription/all");
