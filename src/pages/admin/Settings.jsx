import {
  Box,
  Typography,
  TextField,
  Button,
  Paper
} from "@mui/material";
import { useState, useEffect } from "react";
import {
  getSettings,
  updateSystemSettings,
} from "../../services/SettingsApi";

export default function Settings() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [platformName, setPlatformName] = useState("RecruitAI");
  const [supportEmail, setSupportEmail] = useState("support@recruitai.com");

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const res = await getSettings();
      const data = res.data;
      setSettings(data);
      setPlatformName(data.platformName || "RecruitAI");
      setSupportEmail(data.supportEmail || "support@recruitai.com");
    } catch (error) {
      console.error("Failed to load settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSystemSettings = async () => {
    setSaving(true);
    try {
      await updateSystemSettings({
        platformName,
        supportEmail,
      });
      alert("System settings saved successfully!");
    } catch (error) {
      console.error("Failed to save settings:", error);
      alert("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ color: "white", p: 4 }}>
        <Typography>Loading settings...</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 3, md: 4 },
        minHeight: "100%",

        // 🔥 RECRUITAI PREMIUM THEME
        background: `
          linear-gradient(
            135deg,
            #020617 0%,
            #0f172a 30%,
            #111827 65%,
            #1e3a8a 100%
          )
        `,

        overflowY: "auto",

        // 🔥 GLOW EFFECTS
        "&::before": {
          content: '""',
          position: "absolute",
          width: "320px",
          height: "320px",
          borderRadius: "50%",
          background: "rgba(66,165,245,0.18)",
          filter: "blur(120px)",
          top: "-100px",
          left: "-100px",
          zIndex: 0
        },

        "&::after": {
          content: '""',
          position: "absolute",
          width: "280px",
          height: "280px",
          borderRadius: "50%",
          background: "rgba(25,118,210,0.15)",
          filter: "blur(120px)",
          bottom: "-100px",
          right: "-100px",
          zIndex: 0
        }
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={3}
        sx={{
          color: "#fff",
          position: "relative",
          zIndex: 2
        }}
      >
        Settings
      </Typography>

      {/* GENERAL SETTINGS */}
      <Paper
        elevation={5}
        sx={{
          p: 4,
          mb: 4,
          borderRadius: "24px",

          background: "rgba(15,23,42,0.75)",
          backdropFilter: "blur(18px)",

          border: "1px solid rgba(255,255,255,0.08)",

          position: "relative",
          zIndex: 2,

          transition: "0.3s ease",

          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow:
              "0 20px 45px rgba(66,165,245,0.18)"
          }
        }}
      >
        <Typography
          fontWeight="bold"
          mb={3}
          sx={{
            color: "#42a5f5",
            fontSize: "20px"
          }}
        >
          General Settings
        </Typography>

        <TextField
          label="Platform Name"
          fullWidth
          value={platformName}
          onChange={(e) => setPlatformName(e.target.value)}
          sx={{
            mb: 3,

            "& .MuiOutlinedInput-root": {
              color: "#fff",
              borderRadius: "14px",

              "& fieldset": {
                borderColor: "rgba(255,255,255,0.15)"
              },

              "&:hover fieldset": {
                borderColor: "#42a5f5"
              },

              "&.Mui-focused fieldset": {
                borderColor: "#42a5f5"
              }
            },

            "& .MuiInputLabel-root": {
              color: "#94a3b8"
            }
          }}
        />

        <TextField
          label="Support Email"
          fullWidth
          value={supportEmail}
          onChange={(e) => setSupportEmail(e.target.value)}
          sx={{
            mb: 3,

            "& .MuiOutlinedInput-root": {
              color: "#fff",
              borderRadius: "14px",

              "& fieldset": {
                borderColor: "rgba(255,255,255,0.15)"
              },

              "&:hover fieldset": {
                borderColor: "#42a5f5"
              },

              "&.Mui-focused fieldset": {
                borderColor: "#42a5f5"
              }
            },

            "& .MuiInputLabel-root": {
              color: "#94a3b8"
            }
          }}
        />

        <Button
          variant="contained"
          onClick={handleSaveSystemSettings}
          disabled={saving}
          sx={{
            borderRadius: "14px",
            px: 4,
            py: 1.2,
            textTransform: "none",
            fontWeight: "bold",

            background:
              "linear-gradient(135deg,#1976d2,#42a5f5)",

            transition: "0.3s ease",

            "&:hover": {
              background:
                "linear-gradient(135deg,#1565c0,#1e88e5)",
              transform: "translateY(-3px)",
              boxShadow:
                "0 12px 30px rgba(66,165,245,0.35)"
            }
          }}
        >
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </Paper>

      {/* ADMIN MANAGEMENT */}
      <Paper
        elevation={5}
        sx={{
          p: 4,
          borderRadius: "24px",

          background: "rgba(15,23,42,0.75)",
          backdropFilter: "blur(18px)",

          border: "1px solid rgba(255,255,255,0.08)",

          position: "relative",
          zIndex: 2,

          transition: "0.3s ease",

          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow:
              "0 20px 45px rgba(66,165,245,0.18)"
          }
        }}
      >
        <Typography
          fontWeight="bold"
          mb={3}
          sx={{
            color: "#42a5f5",
            fontSize: "20px"
          }}
        >
          Admin Management
        </Typography>

        <TextField
          label="New Admin Email"
          fullWidth
          sx={{
            mb: 3,

            "& .MuiOutlinedInput-root": {
              color: "#fff",
              borderRadius: "14px",

              "& fieldset": {
                borderColor: "rgba(255,255,255,0.15)"
              },

              "&:hover fieldset": {
                borderColor: "#42a5f5"
              },

              "&.Mui-focused fieldset": {
                borderColor: "#42a5f5"
              }
            },

            "& .MuiInputLabel-root": {
              color: "#94a3b8"
            }
          }}
        />

        <Button
          variant="contained"
          sx={{
            borderRadius: "14px",
            px: 4,
            py: 1.2,
            textTransform: "none",
            fontWeight: "bold",

            background:
              "linear-gradient(135deg,#1976d2,#42a5f5)",

            transition: "0.3s ease",

            "&:hover": {
              background:
                "linear-gradient(135deg,#1565c0,#1e88e5)",
              transform: "translateY(-3px)",
              boxShadow:
                "0 12px 30px rgba(66,165,245,0.35)"
            }
          }}
        >
          Add Admin
        </Button>
      </Paper>
    </Box>
  );
} 