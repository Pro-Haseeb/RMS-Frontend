import React, { useRef } from "react";

import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  Button,
  AppBar,
  Toolbar,
  Divider,
  Chip,
  Avatar,
} from "@mui/material";

import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";

import ShieldIcon from "@mui/icons-material/Shield";
import GavelIcon from "@mui/icons-material/Gavel";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import SecurityIcon from "@mui/icons-material/Security";
import DescriptionIcon from "@mui/icons-material/Description";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

const sections = [
  {
    title: "Introduction",
    icon: <DescriptionIcon />,
    content:
      "RecruitAI is an AI-powered Recruitment Management System designed to simplify hiring processes through automation, AI evaluation, candidate management, interview scheduling, and analytics.",
  },

  {
    title: "User Responsibilities",
    icon: <VerifiedUserIcon />,
    content:
      "Users must provide accurate recruitment information, maintain account security, and ensure ethical use of the platform without unauthorized access or misuse.",
  },

  {
    title: "AI Evaluation Disclaimer",
    icon: <AutoAwesomeIcon />,
    content:
      "AI-based recommendations are designed to assist recruiters but may occasionally produce inaccurate results. Final hiring decisions remain the responsibility of the organization.",
  },

  {
    title: "Privacy & Data Protection",
    icon: <PrivacyTipIcon />,
    content:
      "All candidate information and uploaded documents are protected using encrypted storage and secure access systems.",
  },

  {
    title: "Enterprise Security",
    icon: <SecurityIcon />,
    content:
      "RecruitAI uses JWT authentication, role-based access control, secure cloud infrastructure, and encrypted APIs for enterprise-level protection.",
  },

  {
    title: "Legal Compliance",
    icon: <GavelIcon />,
    content:
      "Organizations using RecruitAI must comply with applicable employment laws, recruitment regulations, and privacy standards.",
  },

  {
    title: "Platform Protection",
    icon: <ShieldIcon />,
    content:
      "Unauthorized activity, exploitation attempts, reverse engineering, or misuse of platform services is strictly prohibited.",
  },
];

export default function Terms() {
  const navigate = useNavigate();

  const termsRef = useRef(null);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg,#020617 0%, #0f172a 45%, #111827 100%)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* ================= PARTICLES ================= */}

      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -100, 0],
            x: [0, 40, 0],
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
          }}
          style={{
            position: "absolute",
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              width: i % 2 === 0 ? 8 : 12,
              height: i % 2 === 0 ? 8 : 12,
              borderRadius: "50%",
              background:
                i % 2 === 0
                  ? "rgba(66,165,245,0.5)"
                  : "rgba(139,92,246,0.45)",
              filter: "blur(2px)",
            }}
          />
        </motion.div>
      ))}

    

      {/* ================= HERO ================= */}

      <Container
        maxWidth="xl"
        sx={{
          position: "relative",
          zIndex: 2,
          pt: 14,
          pb: 12,
        }}
      >
        <Grid
          container
          spacing={8}
          alignItems="center"
        >
          {/* LEFT */}

          <Grid item xs={12} md={7}>
            <Chip
              label="AI RECRUITMENT GOVERNANCE"
              sx={{
                px: 2,
                py: 3,
                borderRadius: "18px",
                color: "#fff",
                fontWeight: 800,
                background:
                  "rgba(255,255,255,0.08)",
                border:
                  "1px solid rgba(255,255,255,0.12)",
                backdropFilter: "blur(20px)",
              }}
            />

            <Typography
              sx={{
                mt: 5,
                fontWeight: 900,
                lineHeight: 1,
                fontSize: {
                  xs: "3.5rem",
                  md: "6.5rem",
                },
                color: "#fff",
              }}
            >
              Terms
              <br />

              <Box
                component="span"
                sx={{
                  background:
                    "linear-gradient(135deg,#38bdf8,#8b5cf6,#ec4899)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor:
                    "transparent",
                }}
              >
                &
              </Box>

              <br />
              Conditions
            </Typography>

            <Typography
              sx={{
                mt: 4,
                maxWidth: 720,
                color: "#cbd5e1",
                lineHeight: 2,
                fontSize: "1.1rem",
              }}
            >
              These Terms & Conditions define
              the rules, responsibilities,
              privacy standards, and legal
              framework governing the use of
              RecruitAI Recruitment Management
              System.
            </Typography>

            <Stack
              direction="row"
              spacing={3}
              sx={{ mt: 5 }}
            >
              <Button
                variant="contained"
                onClick={() =>
                  termsRef.current?.scrollIntoView(
                    {
                      behavior: "smooth",
                    }
                  )
                }
                sx={{
                  px: 5,
                  py: 2,
                  borderRadius: "18px",
                  fontWeight: 800,
                  background:
                    "linear-gradient(135deg,#1976d2,#42a5f5)",
                }}
              >
                Read Document
              </Button>

              <Button
                sx={{
                  px: 5,
                  py: 2,
                  borderRadius: "18px",
                  color: "#fff",
                  background:
                    "rgba(255,255,255,0.06)",
                  border:
                    "1px solid rgba(255,255,255,0.12)",
                }}
              >
                Download PDF
              </Button>
            </Stack>
          </Grid>

          {/* RIGHT */}

          <Grid item xs={12} md={5}>
            <Card
              sx={{
                borderRadius: "35px",
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))",
                backdropFilter: "blur(30px)",
                border:
                  "1px solid rgba(255,255,255,0.1)",
                boxShadow:
                  "0 25px 60px rgba(0,0,0,0.4)",
              }}
            >
              <CardContent sx={{ p: 5 }}>
                <Typography
                  variant="h4"
                  sx={{
                    color: "#fff",
                    fontWeight: 900,
                    mb: 4,
                  }}
                >
                  Document Highlights
                </Typography>

                {[
                  "AI Governance Framework",
                  "Enterprise Data Security",
                  "Encrypted Candidate Storage",
                  "Fair AI Hiring Practices",
                  "Privacy & Compliance",
                  "Recruitment Protection Standards",
                ].map((item, i) => (
                  <Stack
                    key={i}
                    direction="row"
                    spacing={2}
                    sx={{ mb: 3 }}
                  >
                    <Avatar
                      sx={{
                        width: 40,
                        height: 40,
                        background:
                          "linear-gradient(135deg,#06b6d4,#8b5cf6)",
                      }}
                    >
                      <CheckCircleIcon />
                    </Avatar>

                    <Typography
                      sx={{
                        color: "#e2e8f0",
                        lineHeight: 2,
                      }}
                    >
                      {item}
                    </Typography>
                  </Stack>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* SCROLL ICON */}

        <motion.div
          animate={{
            y: [0, 20, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 90,
          }}
        >
          <KeyboardDoubleArrowDownIcon
            sx={{
              fontSize: 60,
              color: "#38bdf8",
            }}
          />
        </motion.div>
      </Container>

      {/* ================= MAIN TERMS DOCUMENT ================= */}

      <Container
        maxWidth="lg"
        ref={termsRef}
        sx={{
          position: "relative",
          zIndex: 2,
          pb: 12,
        }}
      >
        <Card
          sx={{
            borderRadius: "40px",
            overflow: "hidden",
            background:
              "linear-gradient(135deg, rgba(15,23,42,0.9), rgba(17,24,39,0.92))",
            border:
              "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(30px)",
            boxShadow:
              "0 30px 80px rgba(0,0,0,0.45)",
          }}
        >
          {/* TOP BAR */}

          <Box
            sx={{
              p: 4,
              borderBottom:
                "1px solid rgba(255,255,255,0.08)",
              background:
                "linear-gradient(135deg, rgba(66,165,245,0.12), rgba(139,92,246,0.12))",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                color: "#fff",
                fontWeight: 900,
              }}
            >
              RecruitAI Terms Document
            </Typography>

            <Typography
              sx={{
                mt: 2,
                color: "#94a3b8",
                lineHeight: 2,
              }}
            >
              Last Updated — May 2026
            </Typography>
          </Box>

          {/* DOCUMENT BODY */}

          <Box
            sx={{
              p: {
                xs: 4,
                md: 8,
              },
            }}
          >
            {sections.map((item, index) => (
              <Box
                key={index}
                sx={{
                  mb: 7,
                }}
              >
                <Stack
                  direction="row"
                  spacing={3}
                  alignItems="center"
                  sx={{ mb: 3 }}
                >
                  <Avatar
                    sx={{
                      width: 65,
                      height: 65,
                      background:
                        "linear-gradient(135deg,#06b6d4,#8b5cf6)",
                    }}
                  >
                    {item.icon}
                  </Avatar>

                  <Typography
                    variant="h4"
                    sx={{
                      color: "#fff",
                      fontWeight: 800,
                    }}
                  >
                    {item.title}
                  </Typography>
                </Stack>

                <Typography
                  sx={{
                    color: "#cbd5e1",
                    lineHeight: 2.2,
                    fontSize: "1.08rem",
                    pl: {
                      md: 11,
                    },
                  }}
                >
                  {item.content}
                </Typography>

                {index !== sections.length - 1 && (
                  <Divider
                    sx={{
                      mt: 5,
                      borderColor:
                        "rgba(255,255,255,0.08)",
                    }}
                  />
                )}
              </Box>
            ))}

            {/* FINAL AGREEMENT */}

            <Box
              sx={{
                mt: 10,
                p: 5,
                borderRadius: "30px",
                background:
                  "linear-gradient(135deg, rgba(6,182,212,0.15), rgba(139,92,246,0.15))",
                border:
                  "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  color: "#fff",
                  fontWeight: 900,
                  mb: 3,
                }}
              >
                Acceptance of Terms
              </Typography>

              <Typography
                sx={{
                  color: "#cbd5e1",
                  lineHeight: 2,
                  mb: 5,
                }}
              >
                By using RecruitAI, users
                acknowledge that they have
                read, understood, and agreed
                to comply with all terms,
                policies, and platform
                regulations described in this
                document.
              </Typography>

              <Button
                variant="contained"
                sx={{
                  px: 5,
                  py: 2,
                  borderRadius: "18px",
                  fontWeight: 800,
                  background:
                    "linear-gradient(135deg,#06b6d4,#8b5cf6)",
                }}
              >
                I Agree & Continue
              </Button>
            </Box>
          </Box>
        </Card>
      </Container>

      {/* ================= FOOTER ================= */}

      <Box
        sx={{
          py: 5,
          borderTop:
            "1px solid rgba(255,255,255,0.08)",
          textAlign: "center",
        }}
      >
        <Typography
          sx={{
            color: "#94a3b8",
          }}
        >
          © 2026 RecruitAI — AI Recruitment
          Management System
        </Typography>
      </Box>
    </Box>
  );
}