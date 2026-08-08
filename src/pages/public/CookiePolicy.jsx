import { useState } from "react";
import { motion } from "framer-motion";
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Snackbar,
  Alert,
  Chip
} from "@mui/material";

import CookieIcon from "@mui/icons-material/Cookie";
import ShieldIcon from "@mui/icons-material/Shield";
import StorageIcon from "@mui/icons-material/Storage";
import TuneIcon from "@mui/icons-material/Tune";

const MotionBox = motion(Box);

const bg = {
  minHeight: "100vh",
  py: 12,
  color: "#e2e8f0",
  background:
    "radial-gradient(circle at 20% 10%, rgba(34,211,238,0.12), transparent 40%), radial-gradient(circle at 80% 30%, rgba(139,92,246,0.12), transparent 45%), linear-gradient(180deg,#050816,#0a0f1f,#050816)"
};

const glass = {
  background: "rgba(255,255,255,0.05)",
  backdropFilter: "blur(28px)",
  border: "1px solid rgba(255,255,255,0.10)",
  borderRadius: "22px",
  boxShadow: "0 30px 90px rgba(0,0,0,0.45)",
  position: "relative",
  overflow: "hidden"
};

const lineGlow = {
  position: "absolute",
  left: 0,
  top: 0,
  bottom: 0,
  width: "3px",
  background: "linear-gradient(#22d3ee,#3b82f6,#8b5cf6)",
  filter: "blur(0.5px)"
};

export default function CookiePolicy() {
  const [toast, setToast] = useState({ open: false, msg: "", type: "success" });

  const showToast = (msg, type) => {
    setToast({ open: true, msg, type });
  };

  return (
    <Box sx={bg}>
      <Container maxWidth="md">

        {/* HERO */}
        <MotionBox
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          sx={{ textAlign: "center", mb: 8 }}
        >
          <Chip
            label="RMS Privacy Layer"
            sx={{
              mb: 2,
              color: "#22d3ee",
              border: "1px solid rgba(34,211,238,0.3)"
            }}
          />

          <Typography variant="h3" fontWeight={800}>
            Cookie Policy
          </Typography>

          <Typography sx={{ mt: 2, color: "#94a3b8" }}>
            We use cookies to power secure authentication, AI recruitment workflows,
            and performance optimization inside RMS.
          </Typography>

          {/* BUTTONS */}
          <Stack direction="row" spacing={2} justifyContent="center" mt={4}>
            <Button
              onClick={() => showToast("Cookies Accepted", "success")}
              sx={{
                px: 4,
                borderRadius: "999px",
                background: "linear-gradient(135deg,#22d3ee,#3b82f6)",
                color: "#000",
                fontWeight: 700
              }}
            >
              Accept
            </Button>

            <Button
              onClick={() => showToast("Cookies Rejected", "error")}
              sx={{
                px: 4,
                borderRadius: "999px",
                border: "1px solid rgba(255,255,255,0.25)",
                color: "#fff"
              }}
            >
              Reject
            </Button>

            <Button
              onClick={() => showToast("Preferences Saved", "info")}
              sx={{
                px: 4,
                borderRadius: "999px",
                border: "1px solid rgba(139,92,246,0.4)",
                color: "#fff"
              }}
            >
              Manage
            </Button>
          </Stack>
        </MotionBox>

        {/* TIMELINE STYLE SECTIONS */}
        <Stack spacing={4}>

          {/* SECTION 1 */}
          <MotionBox
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            sx={{ ...glass, p: 4 }}
          >
            <Box sx={lineGlow} />
            <Stack direction="row" spacing={2} alignItems="center">
              <CookieIcon sx={{ color: "#22d3ee" }} />
              <Typography variant="h5" fontWeight={700}>
                What Are Cookies
              </Typography>
            </Stack>

            <Typography sx={{ mt: 2, color: "#cbd5e1" }}>
              Cookies are small browser data files used to maintain login sessions,
              user preferences, and secure navigation across RMS dashboards.
            </Typography>
          </MotionBox>

          {/* SECTION 2 */}
          <MotionBox
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            sx={{ ...glass, p: 4 }}
          >
            <Box sx={lineGlow} />
            <Stack direction="row" spacing={2} alignItems="center">
              <ShieldIcon sx={{ color: "#8b5cf6" }} />
              <Typography variant="h5" fontWeight={700}>
                How We Use Cookies
              </Typography>
            </Stack>

            <Typography sx={{ mt: 2, color: "#cbd5e1" }}>
              • Authentication & secure sessions<br />
              • AI recruitment workflow support<br />
              • Analytics & performance optimization<br />
              • Security & fraud prevention
            </Typography>
          </MotionBox>

          {/* SECTION 3 */}
          <MotionBox sx={{ ...glass, p: 4 }}>
            <Box sx={lineGlow} />
            <Stack direction="row" spacing={2} alignItems="center">
              <StorageIcon sx={{ color: "#22d3ee" }} />
              <Typography variant="h5" fontWeight={700}>
                Types of Cookies
              </Typography>
            </Stack>

            <Typography sx={{ mt: 2, color: "#cbd5e1" }}>
              Essential cookies ensure system login and security.<br />
              Performance cookies improve speed and UX.<br />
              Functional cookies store preferences and settings.
            </Typography>
          </MotionBox>

          {/* SECTION 4 */}
          <MotionBox sx={{ ...glass, p: 4 }}>
            <Box sx={lineGlow} />
            <Typography variant="h5" fontWeight={700}>
              AI & Data Tracking
            </Typography>

            <Typography sx={{ mt: 2, color: "#cbd5e1" }}>
              AI systems only use job-related metadata. No sensitive personal data
              (passwords, identity info, private communications) is ever tracked or stored.
            </Typography>
          </MotionBox>

          {/* SECTION 5 */}
          <MotionBox sx={{ ...glass, p: 4 }}>
            <Box sx={lineGlow} />
            <Stack direction="row" spacing={2} alignItems="center">
              <TuneIcon sx={{ color: "#3b82f6" }} />
              <Typography variant="h5" fontWeight={700}>
                User Control
              </Typography>
            </Stack>

            <Typography sx={{ mt: 2, color: "#cbd5e1" }}>
              Users can disable cookies anytime in browser settings.
              Some features like login sessions and dashboards may be affected.
            </Typography>
          </MotionBox>

        </Stack>
      </Container>

      {/* TOAST */}
      <Snackbar
        open={toast.open}
        autoHideDuration={2500}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={toast.type} variant="filled">
          {toast.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
}