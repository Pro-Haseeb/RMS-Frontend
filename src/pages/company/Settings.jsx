import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  getSettings,
  updateCompanySettings,
  updateNotificationPreferences,
  updateUIPreferences,
} from "../../services/SettingsApi";

function GlassCard({ children, sx = {} }) {
  return (
    <Box
      sx={{
        p: 3,
        borderRadius: "20px",
        background: "rgba(255, 255, 255, 0.02)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.05)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        ...sx
      }}
    >
      {children}
    </Box>
  );
}

export default function Settings() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [companyName, setCompanyName] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [companySize, setCompanySize] = useState("1-10");
  const [notificationEmail, setNotificationEmail] = useState("");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [applicationAlerts, setApplicationAlerts] = useState(true);
  const [interviewReminders, setInterviewReminders] = useState(true);
  const [jobAlerts, setJobAlerts] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const res = await getSettings();
      const data = res.data;
      setSettings(data);
      setCompanyName(data.companyName || "");
      setCompanyWebsite(data.companyWebsite || "");
      setCompanySize(data.companySize || "1-10");
      setNotificationEmail(data.notificationEmail || "");
      setEmailNotifications(data.emailNotifications ?? true);
      setApplicationAlerts(data.applicationAlerts ?? true);
      setInterviewReminders(data.interviewReminders ?? true);
      setJobAlerts(data.jobAlerts ?? true);
    } catch (error) {
      console.error("Failed to load settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCompanySettings = async () => {
    setSaving(true);
    try {
      await updateCompanySettings({
        companyName,
        companyWebsite,
        companySize,
        notificationEmail,
      });
      alert("Company settings saved successfully!");
    } catch (error) {
      console.error("Failed to save settings:", error);
      alert("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveNotificationPreferences = async () => {
    setSaving(true);
    try {
      await updateNotificationPreferences({
        emailNotifications,
        applicationAlerts,
        interviewReminders,
        jobAlerts,
      });
      alert("Notification preferences saved successfully!");
    } catch (error) {
      console.error("Failed to save preferences:", error);
      alert("Failed to save preferences");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ color: "white", maxWidth: 1200, mx: "auto", py: 4 }}>
        <Typography>Loading settings...</Typography>
      </Box>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Box sx={{ color: "white", maxWidth: 1200, mx: "auto" }}>
        <Typography variant="h4" fontWeight="800" sx={{ mb: 1, letterSpacing: "-0.5px" }}>
          Settings
        </Typography>
        <Typography sx={{ color: "#94a3b8", mb: 4 }}>
          Manage your company profile and preferences.
        </Typography>

        <Grid container spacing={3}>
          {/* Company Profile Settings */}
          <Grid item xs={12} md={6}>
            <GlassCard sx={{ py: 4, px: 3 }}>
              <Typography variant="h6" sx={{ color: "#e2e8f0", mb: 3, fontWeight: 700 }}>
                Company Profile
              </Typography>
              
              <TextField
                label="Company Name"
                fullWidth
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    color: "#fff",
                    "& fieldset": { borderColor: "rgba(255,255,255,0.15)" },
                    "&:hover fieldset": { borderColor: "#60a5fa" },
                    "&.Mui-focused fieldset": { borderColor: "#60a5fa" },
                  },
                  "& .MuiInputLabel-root": { color: "#94a3b8" },
                }}
              />

              <TextField
                label="Company Website"
                fullWidth
                value={companyWebsite}
                onChange={(e) => setCompanyWebsite(e.target.value)}
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    color: "#fff",
                    "& fieldset": { borderColor: "rgba(255,255,255,0.15)" },
                    "&:hover fieldset": { borderColor: "#60a5fa" },
                    "&.Mui-focused fieldset": { borderColor: "#60a5fa" },
                  },
                  "& .MuiInputLabel-root": { color: "#94a3b8" },
                }}
              />

              <TextField
                label="Company Size"
                fullWidth
                select
                value={companySize}
                onChange={(e) => setCompanySize(e.target.value)}
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    color: "#fff",
                    "& fieldset": { borderColor: "rgba(255,255,255,0.15)" },
                    "&:hover fieldset": { borderColor: "#60a5fa" },
                    "&.Mui-focused fieldset": { borderColor: "#60a5fa" },
                  },
                  "& .MuiInputLabel-root": { color: "#94a3b8" },
                }}
                SelectProps={{
                  native: true,
                }}
              >
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-500">201-500 employees</option>
                <option value="500+">500+ employees</option>
              </TextField>

              <TextField
                label="Notification Email"
                fullWidth
                value={notificationEmail}
                onChange={(e) => setNotificationEmail(e.target.value)}
                sx={{
                  mb: 3,
                  "& .MuiOutlinedInput-root": {
                    color: "#fff",
                    "& fieldset": { borderColor: "rgba(255,255,255,0.15)" },
                    "&:hover fieldset": { borderColor: "#60a5fa" },
                    "&.Mui-focused fieldset": { borderColor: "#60a5fa" },
                  },
                  "& .MuiInputLabel-root": { color: "#94a3b8" },
                }}
              />

              <Button
                variant="contained"
                onClick={handleSaveCompanySettings}
                disabled={saving}
                sx={{
                  background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                  color: "white",
                  fontWeight: 700,
                  textTransform: "none",
                  py: 1.5,
                  "&:hover": { background: "linear-gradient(135deg, #1d4ed8, #6d28d9)" },
                }}
              >
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </GlassCard>
          </Grid>

          {/* Notification Preferences */}
          <Grid item xs={12} md={6}>
            <GlassCard sx={{ py: 4, px: 3 }}>
              <Typography variant="h6" sx={{ color: "#e2e8f0", mb: 3, fontWeight: 700 }}>
                Notification Preferences
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={emailNotifications}
                      onChange={(e) => setEmailNotifications(e.target.checked)}
                      sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": { color: "#60a5fa" },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                          backgroundColor: "rgba(96,165,250,0.5)",
                        },
                      }}
                    />
                  }
                  label={<Typography sx={{ color: "#cbd5e1" }}>Email Notifications</Typography>}
                />

                <FormControlLabel
                  control={
                    <Switch
                      checked={applicationAlerts}
                      onChange={(e) => setApplicationAlerts(e.target.checked)}
                      sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": { color: "#60a5fa" },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                          backgroundColor: "rgba(96,165,250,0.5)",
                        },
                      }}
                    />
                  }
                  label={<Typography sx={{ color: "#cbd5e1" }}>Application Alerts</Typography>}
                />

                <FormControlLabel
                  control={
                    <Switch
                      checked={interviewReminders}
                      onChange={(e) => setInterviewReminders(e.target.checked)}
                      sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": { color: "#60a5fa" },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                          backgroundColor: "rgba(96,165,250,0.5)",
                        },
                      }}
                    />
                  }
                  label={<Typography sx={{ color: "#cbd5e1" }}>Interview Reminders</Typography>}
                />

                <FormControlLabel
                  control={
                    <Switch
                      checked={jobAlerts}
                      onChange={(e) => setJobAlerts(e.target.checked)}
                      sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": { color: "#60a5fa" },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                          backgroundColor: "rgba(96,165,250,0.5)",
                        },
                      }}
                    />
                  }
                  label={<Typography sx={{ color: "#cbd5e1" }}>Job Alerts</Typography>}
                />
              </Box>

              <Button
                variant="contained"
                onClick={handleSaveNotificationPreferences}
                disabled={saving}
                sx={{
                  mt: 3,
                  background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                  color: "white",
                  fontWeight: 700,
                  textTransform: "none",
                  py: 1.5,
                  "&:hover": { background: "linear-gradient(135deg, #1d4ed8, #6d28d9)" },
                }}
              >
                {saving ? "Saving..." : "Save Preferences"}
              </Button>
            </GlassCard>
          </Grid>
        </Grid>
      </Box>
    </motion.div>
  );
}
