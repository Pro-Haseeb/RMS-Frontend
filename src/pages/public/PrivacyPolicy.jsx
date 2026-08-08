import { useMemo } from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import {
  Box,
  AppBar,
  Toolbar,
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  IconButton,
  Link
} from "@mui/material";

import {
  CloudUpload,
  Description,
  Psychology,
  Insights,
  HistoryEdu,
  Lock,
  VerifiedUser,
  Article,
  Schedule,
  Block,
  MonitorHeart,
  ShieldMoon,
  ExpandMore,
  Security,
  Key,
  Language,
  CloudQueue,
  Analytics,
  FolderShared,
  TableChart,
  KeyboardArrowDown,
  AutoAwesome,
  Public,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";

const glassStyle = {
  backdropFilter: "blur(22px)",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.08)",
  boxShadow: "0 8px 60px rgba(0,0,0,0.45)",
  borderRadius: "28px",
  color: "#e5e7eb",
  overflow: "hidden",
  position: "relative"
};

const accentGradient =
  "linear-gradient(135deg,#00c6ff,#0072ff,#8e2de2)";

const policyItems = [
  {
    title: "Information We Collect",
    icon: Description,
    description:
      "We collect candidate profiles, resumes, interview feedback and recruitment workflow data."
  },
  {
    title: "Candidate CV Uploads",
    icon: CloudUpload,
    description:
      "All uploaded CVs are encrypted and securely stored with malware validation."
  },
  {
    title: "AI-Based Candidate Evaluation",
    icon: Psychology,
    description:
      "AI evaluates candidates using secure explainable scoring systems."
  },
  {
    title: "Explainable AI Scoring",
    icon: Insights,
    description:
      "Every candidate score includes transparency and explainability."
  },
  {
    title: "HR Override Logging",
    icon: HistoryEdu,
    description:
      "Manual HR score changes are logged for accountability."
  },
  {
    title: "Authentication & JWT Security",
    icon: Lock,
    description:
      "JWT authentication secures all recruitment workflows."
  },
  {
    title: "Role-Based Access Control",
    icon: VerifiedUser,
    description:
      "Access permissions protect candidate privacy and HR workflows."
  },
  {
    title: "Google Sheets Export",
    icon: Article,
    description:
      "Secure exports to Google Sheets with protected integrations."
  },
  {
    title: "Data Retention Policy",
    icon: Schedule,
    description:
      "Candidate data is retained only for approved time periods."
  },
  {
    title: "Duplicate Prevention",
    icon: Block,
    description:
      "Duplicate CV uploads are automatically detected and prevented."
  },
  {
    title: "Audit Logs & Monitoring",
    icon: MonitorHeart,
    description:
      "All recruitment actions are securely monitored and logged."
  },
  {
    title: "Candidate Rights & Privacy",
    icon: ShieldMoon,
    description:
      "Candidates can request deletion or export of their personal data."
  }
];

const securityItems = [
  {
    title: "JWT Authentication",
    icon: Security,
    description:
      "Secure token-based authentication with protected sessions."
  },
  {
    title: "Password Hashing",
    icon: Key,
    description:
      "Passwords are securely hashed using bcrypt or argon2."
  },
  {
    title: "HTTPS/TLS Encryption",
    icon: Language,
    description:
      "All communication is encrypted using HTTPS/TLS."
  },
  {
    title: "Secure CV Storage",
    icon: CloudQueue,
    description:
      "Uploaded files are stored inside encrypted cloud buckets."
  },
  {
    title: "Duplicate Detection",
    icon: Block,
    description:
      "AI prevents repeated submissions and duplicate entries."
  },
  {
    title: "Malware File Validation",
    icon: FolderShared,
    description:
      "Files are scanned before entering recruitment workflows."
  },
  {
    title: "Secure API Communication",
    icon: TableChart,
    description:
      "All APIs use encrypted secure communication channels."
  },
  {
    title: "Role-Based Access",
    icon: VerifiedUser,
    description:
      "Only authorized HR users can access sensitive information."
  }
];

const timelineItems = [
  "Candidate uploads CV",
  "CV Parsing",
  "AI Evaluation",
  "Score Generation",
  "HR Review",
  "Status Update",
  "Secure Database Storage",
  "Google Sheets Export"
];

const faqItems = [
  {
    question: "How is my CV stored securely?",
    answer:
      "CVs are encrypted and stored securely with restricted access."
  },
  {
    question: "Can HR modify AI scores?",
    answer:
      "Yes, HR can override AI recommendations with audit logs."
  },
  {
    question: "Is my data shared externally?",
    answer:
      "Data is only shared through approved integrations."
  },
  {
    question: "How long is data retained?",
    answer:
      "Data retention follows configurable enterprise policies."
  },
  {
    question: "Can candidates delete their data?",
    answer:
      "Candidates can request deletion or export of their data."
  },
  {
    question: "Is AI making final hiring decisions?",
    answer:
      "No, final hiring decisions remain under human control."
  }
];

export default function PrivacyPolicy() {
  const policyCards = useMemo(() => policyItems, []);
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#020617 0%,#0f172a 45%,#111827 100%)",
        overflow: "hidden",
        position: "relative",
        py: { xs: 4, md: 8 }
      }}
    >
      {/* BACKGROUND BLOBS */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          overflow: "hidden"
        }}
      >
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -40, 0],
              x: [0, 20, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: 8 + i
            }}
            style={{
              position: "absolute",
              width: 300,
              height: 300,
              borderRadius: "50%",
              filter: "blur(90px)",
              opacity: 0.25,
              background:
                i % 2 === 0
                  ? "rgba(0,198,255,0.3)"
                  : "rgba(142,45,226,0.25)",
              top: `${i * 18}%`,
              left: `${i * 16}%`
            }}
          />
        ))}
      </Box>

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 2 }}>

           <Box sx={{ pt: "80px" }}></Box>
        {/* HERO */}
        <Grid
          container
          spacing={6}
          alignItems="center"
          sx={{ minHeight: "100vh", mb: 14 }}
        >
          <Grid item xs={12} lg={6}>
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "3.5rem", md: "6rem" },
                  fontWeight: 900,
                  lineHeight: 1,
                  color: "#fff",
                  mb: 3,
                  textShadow:
                    "0 0 40px rgba(0,198,255,0.35)"
                }}
              >
                Privacy
                <br />
                Policy
              </Typography>

              <Typography
                sx={{
                  color: "#cbd5e1",
                  fontSize: "1.1rem",
                  lineHeight: 1.9,
                  maxWidth: 600,
                  mb: 4
                }}
              >
                Secure. Transparent. Ethical Recruitment Experience.
                AI-powered recruitment with secure candidate privacy.
              </Typography>

              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Button
  variant="contained"
  onClick={() => {
    document
      .getElementById("faq-section")
      ?.scrollIntoView({
        behavior: "smooth"
      });
  }}
  sx={{
    px: 5,
    py: 1.6,
    borderRadius: "999px",
    background: accentGradient,
    fontWeight: 700,
    textTransform: "none",
    boxShadow:
      "0 10px 40px rgba(0,198,255,0.4)"
  }}
>
  Learn More
</Button>

               <Button
  variant="outlined"
  onClick={() => {
    document
      .getElementById("security-section")
      ?.scrollIntoView({
        behavior: "smooth"
      });
  }}
  sx={{
    borderColor: "rgba(255,255,255,0.2)",
    color: "#fff",
    px: 5,
    py: 1.6,
    borderRadius: "999px",
    textTransform: "none"
  }}
>
  Explore Security
</Button>
              </Box>

              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 2
                }}
              >
                <Box
                  sx={{
                    mt: 8,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    color: "#94a3b8"
                  }}
                >
                  <KeyboardArrowDown />
                  <Typography>Scroll Down</Typography>
                </Box>
              </motion.div>
            </motion.div>
          </Grid>

          {/* RIGHT SIDE */}
          <Grid item xs={12} lg={6}>
            <Tilt glareEnable glareMaxOpacity={0.3}>
              <Box
                sx={{
                  ...glassStyle,
                  minHeight: 520,
                  p: 4
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 5
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        color: "#7dd3fc",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase"
                      }}
                    >
                      AI Dashboard
                    </Typography>

                    <Typography
                      variant="h5"
                      sx={{
                        color: "#fff",
                        fontWeight: 700,
                        mt: 1
                      }}
                    >
                      Recruitment Intelligence
                    </Typography>
                  </Box>

                  <AutoAwesome
                    sx={{
                      color: "#7dd3fc",
                      fontSize: 42
                    }}
                  />
                </Box>

                <Box sx={{ display: "grid", gap: 3 }}>
                  {[
                    "AI Candidate Ranking",
                    "Secure CV Uploads",
                    "Bias-Aware Evaluation",
                    "Human Approval"
                  ].map((item) => (
                    <motion.div
                      whileHover={{
                        scale: 1.03
                      }}
                      key={item}
                    >
                      <Box
                        sx={{
                          p: 3,
                          borderRadius: "22px",
                          background:
                            "rgba(255,255,255,0.05)",
                          border:
                            "1px solid rgba(255,255,255,0.08)"
                        }}
                      >
                        <Typography
                          sx={{
                            color: "#fff",
                            fontWeight: 600
                          }}
                        >
                          {item}
                        </Typography>
                      </Box>
                    </motion.div>
                  ))}
                </Box>
              </Box>
            </Tilt>
          </Grid>
        </Grid>

        {/* POLICY GRID */}
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            color: "#fff",
            fontWeight: 800,
            mb: 8
          }}
        >
          Privacy Framework
        </Typography>

      <Grid
  container
  spacing={4}
  justifyContent="center"
  alignItems="stretch"
  sx={{ mb: 14 }}
>
  {policyCards.map((item, index) => {
    const Icon = item.icon;

    return (
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        key={item.title}
        sx={{
          display: "flex",
          justifyContent: "center"
        }}
      >
        <motion.div style={{ width: "100%", display: "flex" }}>
          <Tilt
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            style={{
              width: "100%",
              display: "flex"
            }}
          >
            <Card
              sx={{
                ...glassStyle,

                // 🔥 FORCE SAME SIZE
                width: "100%",
                maxWidth: 300,
                height: 220,

                p: 3,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                gap: 1.2
              }}
            >
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: "14px",
                  display: "grid",
                  placeItems: "center",
                  background: accentGradient
                }}
              >
                <Icon sx={{ color: "#fff", fontSize: 22 }} />
              </Box>

              <Typography variant="h6" sx={{ color: "#fff", fontWeight: 700 }}>
                {item.title}
              </Typography>

              <Typography sx={{ color: "#cbd5e1", fontSize: "0.9rem" }}>
                {item.description}
              </Typography>
            </Card>
          </Tilt>
        </motion.div>
      </Grid>
    );
  })}
</Grid>
        {/* SECURITY */}
        <Typography
  id="security-section"
  variant="h3"
  sx={{
    textAlign: "center",
    color: "#fff",
    fontWeight: 800,
    mb: 8
  }}
>
  Security Highlights
</Typography>

      <Grid container spacing={4} justifyContent="center"sx={{ mb: 14 }}>
  {securityItems.map((item, index) => {
    const Icon = item.icon;

    return (
      <Grid
        item
        xs={12}
        sm={6}
        md={3}
        key={item.title}
        sx={{
          display: "flex"
        }}
      >
        <motion.div
          whileHover={{ y: -5, scale: 1.02 }}
          style={{
            width: "100%",
            display: "flex"
          }}
        >
          <Card
            sx={{
              ...glassStyle,
              width: "100%",

              // 🔥 FIXED HEIGHT FOR PERFECT ALIGNMENT
              height: 220,
              maxWidth: 300,

              p: 3,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              gap: 1.2
            }}
          >
            <Box
              sx={{
                width: 50,
                height: 50,
                borderRadius: "14px",
                display: "grid",
                placeItems: "center",
                background: accentGradient
              }}
            >
              <Icon sx={{ color: "#fff", fontSize: 20 }} />
            </Box>

            <Typography sx={{ color: "#fff", fontWeight: 700 }}>
              {item.title}
            </Typography>

            <Typography sx={{ color: "#cbd5e1", fontSize: "0.85rem" }}>
              {item.description}
            </Typography>
          </Card>
        </motion.div>
      </Grid>
    );
  })}
</Grid>
        {/* TIMELINE */}
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            color: "#fff",
            fontWeight: 800,
            mb: 8
          }}
        >
          Data Flow Timeline
        </Typography>

        <Box sx={{ mb: 14 }}>
          {timelineItems.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: 3,
                  alignItems: "center",
                  mb: 4
                }}
              >
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: "#00c6ff",
                    boxShadow:
                      "0 0 20px rgba(0,198,255,0.7)"
                  }}
                />

                <Card
                  sx={{
                    ...glassStyle,
                    p: 3,
                    width: "100%"
                  }}
                >
                  <Typography
                    sx={{
                      color: "#fff",
                      fontWeight: 600
                    }}
                  >
                    Step {index + 1} — {item}
                  </Typography>
                </Card>
              </Box>
            </motion.div>
          ))}
        </Box>

        {/* FAQ */}
       <Typography
  id="faq-section"
  variant="h3"
  sx={{
    textAlign: "center",
    color: "#fff",
    fontWeight: 800,
    mb: 8
  }}
>
  FAQs
</Typography>

      <Box
  sx={{
    display: "grid",
    gridTemplateColumns: {
      xs: "1fr",
      md: "1fr 1fr"
    },
    gap: 4,
    mb: 14,
    alignItems: "stretch"
  }}
>
  {faqItems.map((item) => (
    <Accordion
      key={item.question}
      sx={{
        ...glassStyle,
        width: "100%",
        height: "100%",   // ⭐ add this

        display: "flex",
        flexDirection: "column",
        '&:before': {
          display: "none"
        }
      }}
    >
      <AccordionSummary
        expandIcon={
          <ExpandMore sx={{ color: "#7dd3fc" }} />
        }
        sx={{
          minHeight: "88px !important",
           height: "88px",   // ⭐ add this

            display: "flex",
            alignItems: "center",
          '& .MuiAccordionSummary-content': {
            my: 0,
            alignItems: "center"
          }
        }}
      >
        <Typography
          sx={{
            color: "#fff",
            fontWeight: 700
          }}
        >
          {item.question}
        </Typography>
      </AccordionSummary>

      <AccordionDetails>
        <Typography
          sx={{
            color: "#cbd5e1",
            lineHeight: 1.9
          }}
        >
          {item.answer}
        </Typography>
      </AccordionDetails>
    </Accordion>
  ))}
</Box>


      </Container>
    </Box>
  );
}