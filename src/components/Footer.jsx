import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Container, Typography, Stack, Link, Divider } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        pt: 10,
        pb: 5,
        mt: 12,
        background: "linear-gradient(180deg, #06101f 0%, #04090f 100%)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        color: "rgba(255,255,255,0.78)"
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems="flex-start"
          justifyContent="space-between"
          spacing={6}
        >
          <Box sx={{ maxWidth: 360 }}>
            <Typography variant="h5" sx={{ fontWeight: 900, mb: 1.5, letterSpacing: "0.08em" }}>
              RecruitAI
            </Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.72)", lineHeight: 1.9, mb: 3 }}>
              AI-enabled recruitment software that helps hiring teams source, evaluate, and hire faster with more confidence.
            </Typography>
            <Box
              sx={{
                display: "inline-flex",
                gap: 1.5,
                flexWrap: "wrap",
                mt: 1
              }}
            >
              <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.55)" }}>
                Trusted by hiring teams worldwide.
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4, width: "100%", maxWidth: 520 }}>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                Platform
              </Typography>
              <Stack direction="column" spacing={1.25}>
                <Link component={RouterLink} to="/about" color="inherit" underline="hover" sx={{ fontSize: 14 }}>
                  About Us
                </Link>
                <Link component={RouterLink} to="/jobs" color="inherit" underline="hover" sx={{ fontSize: 14 }}>
                  Browse Jobs
                </Link>
                <Link component={RouterLink} to="/contact" color="inherit" underline="hover" sx={{ fontSize: 14 }}>
                  Contact Us
                </Link>
              </Stack>
            </Box>

            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                Policies
              </Typography>
              <Stack direction="column" spacing={1.25}>
                <Link component={RouterLink} to="/privacy-policy" color="inherit" underline="hover" sx={{ fontSize: 14 }}>
                  Privacy Policy
                </Link>
                <Link component={RouterLink} to="/terms" color="inherit" underline="hover" sx={{ fontSize: 14 }}>
                  Terms & Conditions
                </Link>
                <Link component={RouterLink} to="/cookie-policy" color="inherit" underline="hover" sx={{ fontSize: 14 }}>
                  Cookie Policy
                </Link>
                <Link component={RouterLink} to="/rules" color="inherit" underline="hover" sx={{ fontSize: 14 }}>
                  Rules & Regulations
                </Link>
              </Stack>
            </Box>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
              Contact
            </Typography>
            <Stack spacing={1}>
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.72)" }}>
                haseebmushtaq874@gmail.com
              </Typography>
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.72)" }}>
                +923092965427
              </Typography>
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.72)" }}>
                University of Central Punjab, Rahim Yar Khan, Pakistan
              </Typography>
            </Stack>
          </Box>
        </Stack>

        <Divider sx={{ my: 4, borderColor: "rgba(255,255,255,0.08)" }} />

        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)" }}>
            © {new Date().getFullYear()} RecruitAI. All rights reserved.
          </Typography>
          <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)" }}>
            Built for secure, compliant, and scalable hiring.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
