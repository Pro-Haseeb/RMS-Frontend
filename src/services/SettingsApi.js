import API from "./Api";

// Get user settings
export const getSettings = () =>
  API.get("/settings");

// Update user settings
export const updateSettings = (data) =>
  API.put("/settings", data);

// Update system-wide settings (system owner only)
export const updateSystemSettings = (data) =>
  API.put("/settings/system", data);

// Update company settings (company admin only)
export const updateCompanySettings = (data) =>
  API.put("/settings/company", data);

// Update notification preferences
export const updateNotificationPreferences = (data) =>
  API.put("/settings/notifications", data);

// Update UI preferences
export const updateUIPreferences = (data) =>
  API.put("/settings/ui", data);
