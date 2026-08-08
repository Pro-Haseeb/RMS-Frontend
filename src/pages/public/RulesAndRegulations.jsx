import { useEffect, useRef } from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  IconButton
} from "@mui/material";
import {
//   Transparency,
  Shield,
  Gavel,
  Security,
  Lock,
  DoneAll,
  AccountCircle,
  FileUpload,
  Balance,
  Rule,
  DataObject,
  WarningAmber,
  BarChart,
  Insights,
  Psychology,
  Public,
  Bolt,
  VerifiedUser,
  AutoAwesome
} from "@mui/icons-material";

const glassCard = {
  backdropFilter: "blur(18px)",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.1)",
  boxShadow: "0 24px 70px rgba(0,0,0,0.35)",
  borderRadius: "28px",
  color: "#f8fafc",
  position: "relative",
  overflow: "hidden"
};

const accentGradient = "linear-gradient(135deg, #22D3EE 0%, #3B82F6 45%, #8B5CF6 100%)";

const corePrinciples = [
  {
    title: "Transparency",
    icon: Public,
    bullets: [
      "AI decisions include explanations",
      "Candidates can view application status"
    ]
  },
  {
    title: "Fair Evaluation",
    icon: Balance,
    bullets: [
      "No gender, age, religion, or marital status used",
      "Fair scoring across all applicants"
    ]
  },
  {
    title: "Accountability",
    icon: Gavel,
    bullets: [
      "HR actions logged with timestamps",
      "Override tracking enabled"
    ]
  },
  {
    title: "Data Integrity",
    icon: DataObject,
    bullets: [
      "Duplicate prevention enforced",
      "Secure record management"
    ]
  }
];

const candidateRules = [
  {
    title: "One Application per Job",
    description: "Submissions must be unique to each job opening.",
    icon: Rule
  },
  {
    title: "Valid CV Formats",
    description: "Only PDF and DOCX formats are accepted.",
    icon: FileUpload
  },
  {
    title: "Accurate Profile Data",
    description: "Provide truthful personal and professional information.",
    icon: AccountCircle
  },
  {
    title: "No Duplicate Accounts",
    description: "Each candidate may register only one profile.",
    icon: WarningAmber
  },
  {
    title: "Respect Platform Policies",
    description: "Follow community and data usage guidelines.",
    icon: Shield
  },
  {
    title: "Status is Read-Only",
    description: "Application outcomes cannot be edited by candidates.",
    icon: Lock
  }
];

const hrRules = [
  {
    title: "No Self-Registration",
    description: "HR team members cannot self-enroll into the platform. Accounts must be provisioned by Admin."
  },
  {
    title: "Admin Creates HR Accounts",
    description: "Only approved administrators may create and assign HR access."
  },
  {
    title: "AI Scores are Advisory",
    description: "AI recommendations support decisions but may not be manipulated."
  },
  {
    title: "Document Shortlisting Decisions",
    description: "All candidate selection actions must be recorded with rationale."
  },
  {
    title: "Maintain Candidate Privacy",
    description: "Sensitive candidate data must remain confidential and role-protected."
  },
  {
    title: "Export for Shortlisted Candidates",
    description: "Only approved candidate exports are permitted for candidates under review."
  }
];

const securityFeatures = [
  { title: "JWT Authentication", icon: Lock, description: "Secure session tokens protect every login." },
  { title: "Password Hashing", icon: Security, description: "bcrypt / Argon2 hashing for stored credentials." },
  { title: "Role-Based Access", icon: VerifiedUser, description: "Access limited by HR, admin, and hiring roles." },
  { title: "HTTPS Encryption", icon: Shield, description: "Transport-level encryption for every request." },
  { title: "Secure Storage", icon: DataObject, description: "Candidate records and CVs are stored securely." },
  { title: "Audit Logging", icon: BarChart, description: "Monitoring captures all platform activity." }
];

const ethicsCards = [
  "Explainable AI",
  "Bias-Aware Screening",
  "Human Decision Authority",
  "Transparent Candidate Ranking",
  "Ethical Evaluation",
  "Fair Opportunity"
];

const dataPolicyRules = [
  "CVs stored securely",
  "Sensitive data encrypted",
  "Candidate data privacy maintained",
  "Access restricted by role",
  "Secure deletion supported",
  "Export history maintained"
];

const prohibitedItems = [
  "Duplicate applications",
  "Fake information",
  "Unauthorized access attempts",
  "Data manipulation",
  "Multiple account creation",
  "Export misuse"
];

const auditMetrics = [
  { label: "Login Tracking", value: "24/7" },
  { label: "Candidate Actions", value: "Real-time" },
  { label: "HR Activity Logs", value: "Immutable" },
  { label: "Export Records", value: "Audited" },
  { label: "AI Evaluation History", value: "Traceable" },
  { label: "System Events", value: "Monitored" }
];
const auditDescriptions = {
  "Login Tracking":
    "Records every login attempt with timestamp, IP address, and device details for security verification.",

  "Candidate Actions":
    "Tracks all candidate activities such as application submission, updates, and profile changes in real time.",

  "HR Activity Logs":
    "Maintains a permanent record of all HR actions including shortlisting, rejection, and approvals.",

  "Export Records":
    "Logs every data export action to prevent misuse of candidate information.",

  "AI Evaluation History":
    "Stores complete history of AI-based scoring and ranking decisions for transparency.",

  "System Events":
    "Monitors backend system errors, updates, and performance changes."
};

const SectionHeading = ({ label, title, description }) => (
  <Box sx={{ textAlign: "center", mb: 6, maxWidth: 760, mx: "auto" }}>
    <Typography
      variant="overline"
      sx={{
        color: "#22d3ee",
        letterSpacing: "0.28em",
        mb: 2,
        display: "block"
      }}
    >
      {label}
    </Typography>
    <Typography
      variant="h3"
      sx={{
        fontWeight: 800,
        color: "#fff",
        mb: 2,
        lineHeight: 1.05
      }}
    >
      {title}
    </Typography>
    <Typography sx={{ color: "#cbd5e1", fontSize: "1.05rem" }}>{description}</Typography>
  </Box>
);

export default function RulesAndRegulations() {
  const pageRef = useRef(null);
  const sectionRefs = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    sectionRefs.current.forEach((section) => {
      if (!section) return;
      gsap.fromTo(
        section,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    });

    const cards = gsap.utils.toArray(".rule-card");
    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 40, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          delay: index * 0.08,
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none none"
          }
        }
      );
    });
  }, []);

  return (
    <Box
      ref={pageRef}
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9 }}
      sx={{
        background: "radial-gradient(circle at top left, rgba(34,211,238,0.14), transparent 20%), radial-gradient(circle at bottom right, rgba(139,92,246,0.16), transparent 18%), linear-gradient(180deg, #050816 0%, #0b1120 40%, #111827 100%)",
        color: "#f8fafc",
        overflowX: "hidden",
        position: "relative"
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundSize: "200px 200px",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          opacity: 0.1,
          pointerEvents: "none"
        }}
      />

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 2, pb: { xs: 8, md: 12 } }}>
        <Box sx={{ position: "relative", pt: { xs: 10, md: 14 }, pb: { xs: 8, md: 14 } }}>
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            sx={{
              position: "absolute",
              top: -80,
              left: -80,
              width: 260,
              height: 260,
              borderRadius: "50%",
              background: "rgba(34,211,238,0.16)",
              filter: "blur(90px)",
              zIndex: 0
            }}
          />
          <Box
            component={motion.div}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 0.55, scale: 1 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            sx={{
              position: "absolute",
              right: -100,
              top: 120,
              width: 260,
              height: 260,
              borderRadius: "50%",
              background: "rgba(139,92,246,0.14)",
              filter: "blur(100px)",
              zIndex: 0
            }}
          />

          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Box sx={{ maxWidth: 700, position: "relative", zIndex: 2 }}>
                <Typography
                  sx={{
                    display: "inline-flex",
                    px: 2.5,
                    py: 1,
                    borderRadius: "999px",
                    background: "rgba(34,211,238,0.12)",
                    color: "#22d3ee",
                    fontWeight: 700,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    fontSize: "0.8rem",
                    mb: 4
                  }}
                >
                  Recruitment Management System
                </Typography>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: "3rem", md: "4.8rem" },
                    lineHeight: 1.02,
                    letterSpacing: "-0.05em",
                    fontWeight: 900,
                    mb: 4,
                    color: "#fff",
                    textShadow: "0 0 40px rgba(34,211,238,0.18)"
                  }}
                >
                  Rules & Regulations
                </Typography>
                <Typography
                  sx={{
                    color: "#cbd5e1",
                    fontSize: "1.05rem",
                    lineHeight: 1.9,
                    maxWidth: 620,
                    mb: 6
                  }}
                >
                  Ensuring fairness, transparency, security, and accountability throughout the recruitment lifecycle. Our rules protect candidates, empower HR, and preserve trust in every AI-assisted hiring decision.
                </Typography>

                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <Button
                    href="#core-principles"
                    variant="contained"
                    sx={{
                      px: 5,
                      py: 1.8,
                      borderRadius: "999px",
                      background: accentGradient,
                      boxShadow: "0 18px 50px rgba(34,211,238,0.28)",
                      textTransform: "none",
                      fontWeight: 700,
                      transition: "transform 0.25s ease",
                      '&:hover': { transform: "translateY(-2px)" }
                    }}
                  >
                    View Policies
                  </Button>
                  <Button
                    href="mailto:admin@rms.ai"
                    variant="outlined"
                    sx={{
                      px: 5,
                      py: 1.8,
                      borderRadius: "999px",
                      borderColor: "rgba(255,255,255,0.2)",
                      color: "#fff",
                      textTransform: "none",
                      transition: "transform 0.25s ease",
                      '&:hover': { transform: "translateY(-2px)", borderColor: "#22d3ee" }
                    }}
                  >
                    Contact Administration
                  </Button>
                </Stack>
              </Box>
            </Grid>

            <Grid item xs={12} md={5}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, delay: 0.1 }}
              >
                <Tilt glareEnable glareMaxOpacity={0.15} tiltMaxAngleX={8} tiltMaxAngleY={8}>
                  <Box sx={{ ...glassCard, minHeight: 520, p: 4 }}>
                    <Box
                      sx={{
                        width: "100%",
                        height: 420,
                        borderRadius: "34px",
                        background: "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
                        border: "1px solid rgba(255,255,255,0.12)",
                        overflow: "hidden",
                        position: "relative"
                      }}
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          inset: 0,
                          backgroundImage: "radial-gradient(circle at 30% 20%, rgba(34,211,238,0.18), transparent 18%), radial-gradient(circle at 75% 40%, rgba(139,92,246,0.16), transparent 20%)"
                        }}
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          top: 24,
                          left: 24,
                          width: 64,
                          height: 64,
                          borderRadius: "18px",
                          background: "rgba(255,255,255,0.1)",
                          border: "1px solid rgba(255,255,255,0.18)",
                          display: "grid",
                          placeItems: "center"
                        }}
                      >
                        <AutoAwesome sx={{ color: "#22d3ee", fontSize: 32 }} />
                      </Box>
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: 32,
                          right: 28,
                          width: 140,
                          height: 140,
                          borderRadius: "50%",
                          background: "rgba(255,255,255,0.08)",
                          filter: "blur(44px)"
                        }}
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          top: 100,
                          right: 34,
                          width: 70,
                          height: 70,
                          borderRadius: "50%",
                          background: "rgba(34,211,238,0.18)"
                        }}
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          left: 48,
                          top: 110,
                          width: 120,
                          height: 120,
                          borderRadius: "50%",
                          background: "rgba(139,92,246,0.16)"
                        }}
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          inset: 0,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          px: 4,
                          textAlign: "center"
                        }}
                      >
                        <Typography sx={{ color: "#fff", fontWeight: 800, fontSize: "1.3rem", mb: 2 }}>
                          Rules & Regulations Snapshot
                        </Typography>
                        <Typography sx={{ color: "#cbd5e1", lineHeight: 1.8 }}>
                          A cinematic overview of policies that keep AI recruitment secure, fair, and compliant.
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Tilt>
              </motion.div>
            </Grid>
          </Grid>
        </Box>

        <Box ref={(el) => (sectionRefs.current[0] = el)} id="core-principles" sx={{ mb: { xs: 10, md: 14 } }}>
          <SectionHeading
            label="Core Principles"
            title="Foundational rules for every recruitment workflow"
            description="A premium set of governance principles that reinforce fair, transparent, and secure candidate management."
          />
          <Grid
                container
                spacing={3}
                justifyContent="center"
                sx={{
                    maxWidth: "1200px",
                    mx: "auto"
                }}
                >
            {corePrinciples.map((item, index) => {
              const Icon = item.icon;
              return (
                <Grid item xs={12} sm={6} md={6} key={item.title}>
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, delay: index * 0.08 }}
                  >
                    <Tilt tiltMaxAngleX={6} tiltMaxAngleY={6} glareEnable glareMaxOpacity={0.1}>
                      <Card
                        sx={{
                          ...glassCard,
                          border: "1px solid rgba(34,211,238,0.16)",
                          '&:hover': { borderColor: "rgba(139,92,246,0.3)" }
                        }}
                      >
                        <CardContent sx={{ p: 2.5 }}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                            <Box
                              sx={{
                                width: 52,
                                height: 52,
                                borderRadius: "18px",
                                display: "grid",
                                placeItems: "center",
                                background: "rgba(255,255,255,0.08)",
                                border: "1px solid rgba(255,255,255,0.14)"
                              }}
                            >
                              <Icon sx={{ color: "#22d3ee", fontSize: 22 }} />
                            </Box>
                            <Typography variant="h6" sx={{ fontWeight: 800,  fontSize: "1rem" }}>
                              {item.title}
                            </Typography>
                          </Box>
                          <Stack spacing={1}>
                            {item.bullets.map((bullet) => (
                              <Box key={bullet} sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                                <Box sx={{ width: 8, height: 8, borderRadius: "50%", mt: 0.75, background: "#22d3ee" }} />
                                <Typography sx={{ color: "#cbd5e1" }}>{bullet}</Typography>
                              </Box>
                            ))}
                          </Stack>
                        </CardContent>
                      </Card>
                    </Tilt>
                  </motion.div>
                </Grid>
              );
            })}
          </Grid>
        </Box>

<Box
  ref={(el) => (sectionRefs.current[1] = el)}
  sx={{
    mb: { xs: 10, md: 14 },
    display: "flex",
    justifyContent: "center"
  }}
>
  <Box sx={{ width: "100%", maxWidth: 1200 }}>
    <SectionHeading
      label="Candidate Rules"
      title="Transparent rules for every applicant"
      description="Clear expectations for candidates to ensure fairness, valid submissions, and policy compliance."
    />

    {/* WRAPPER */}
    <Grid
      container
      sx={{
        mt: 5,
        flexWrap: "nowrap",   // 👈 IMPORTANT (single row force)
        overflowX: "auto",    // 👈 prevents overlap
      }}
    >
      {candidateRules.map((item, index) => {
        const Icon = item.icon;

        return (
          <Grid
            item
            key={item.title}
            sx={{
              flex: "1 0 16.6%",   // 👈 equal 6 columns
              minWidth: 160,      // 👈 prevents shrink overlap
              display: "flex"
            }}
          >
            <motion.div style={{ width: "100%" }}>
              <Box
                sx={{
                  px: 2,
                  py: 3,
                  height: "100%",
                  textAlign: "center",
                  borderRight:
                    index !== candidateRules.length - 1
                      ? "1px solid rgba(255,255,255,0.12)"
                      : "none"
                }}
              >
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    mx: "auto",
                    mb: 2,
                    borderRadius: "14px",
                    display: "grid",
                    placeItems: "center",
                    background: "rgba(34,211,238,0.12)"
                  }}
                >
                  <Icon sx={{ color: "#22d3ee", fontSize: 26 }} />
                </Box>

                <Typography sx={{ fontWeight: 700, color: "#fff", fontSize: "0.85rem" }}>
                  {item.title}
                </Typography>

                <Typography sx={{ color: "#cbd5e1", fontSize: "0.75rem", mt: 1 }}>
                  {item.description}
                </Typography>
              </Box>
            </motion.div>
          </Grid>
        );
      })}
    </Grid>
  </Box>
</Box>

    <Box
  ref={(el) => (sectionRefs.current[2] = el)}
  sx={{
    mb: { xs: 10, md: 14 },
    display: "flex",
    justifyContent: "center"
  }}
>
  <Box sx={{ width: "100%", maxWidth: 1000 }}>
    <SectionHeading
      label="HR Rules & Responsibilities"
      title="Enforced governance for hiring teams"
      description="HR workflows are structured with checks, role controls, and documentation requirements."
    />

    {/* TIMELINE WRAPPER */}
    <Box sx={{ position: "relative", mt: 6, pl: 4 }}>
      
      {/* VERTICAL LINE */}
      <Box
        sx={{
          position: "absolute",
          left: 10,
          top: 0,
          bottom: 0,
          width: "2px",
          background: "rgba(34,211,238,0.25)"
        }}
      />

      {hrRules.map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: index * 0.08 }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              mb: 4,
              position: "relative"
            }}
          >
            {/* DOT */}
            <Box
              sx={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                background: "#22d3ee",
                position: "absolute",
                left: 2,
                top: 8,
                boxShadow: "0 0 15px rgba(34,211,238,0.6)"
              }}
            />

            {/* CONTENT CARD */}
            <Box
              sx={{
                ml: 5,
                width: "100%",
                p: 3,
                borderRadius: "18px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.12)",
                backdropFilter: "blur(14px)",
                transition: "0.3s ease",
                "&:hover": {
                  transform: "translateX(6px)",
                  borderColor: "rgba(34,211,238,0.35)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
                }
              }}
            >
              {/* HEADER */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 800,
                    color: "#fff",
                    fontSize: "1rem"
                  }}
                >
                  {item.title}
                </Typography>

                <Typography
                  sx={{
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    color: "#22d3ee",
                    background: "rgba(34,211,238,0.1)",
                    px: 1.5,
                    py: 0.4,
                    borderRadius: "999px"
                  }}
                >
                  HR POLICY
                </Typography>
              </Box>

              {/* DESCRIPTION */}
              <Typography
                sx={{
                  color: "#cbd5e1",
                  fontSize: "0.9rem",
                  lineHeight: 1.7
                }}
              >
                {item.description}
              </Typography>
            </Box>
          </Box>
        </motion.div>
      ))}
    </Box>
  </Box>
</Box>
        <Box
  ref={(el) => (sectionRefs.current[3] = el)}
  sx={{
    mb: { xs: 10, md: 14 },
    display: "flex",
    justifyContent: "center"
  }}
>
  <Box sx={{ width: "100%", maxWidth: 1100 }}>
    
    <SectionHeading
      label="Security & Compliance"
      title="Rigorous protections for candidate and system data"
      description="A premium security showcase built for enterprise-grade recruitment operations."
    />

    {/* MAIN WRAPPER */}
    <Grid container spacing={3} sx={{ mt: 5 }}>

      {/* LEFT BIG FEATURE CARD */}
      <Grid item xs={12} md={5}>
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <Box
            sx={{
              height: "100%",
              p: 4,
              borderRadius: "22px",
              background:
                "linear-gradient(135deg, rgba(34,211,238,0.12), rgba(139,92,246,0.12))",
              border: "1px solid rgba(255,255,255,0.12)",
              backdropFilter: "blur(14px)",
              position: "relative",
              overflow: "hidden"
            }}
          >
            {/* GLOW EFFECT */}
            <Box
              sx={{
                position: "absolute",
                top: -60,
                right: -60,
                width: 180,
                height: 180,
                borderRadius: "50%",
                background: "rgba(34,211,238,0.25)",
                filter: "blur(60px)"
              }}
            />

            <Typography
              sx={{
                fontSize: "1.6rem",
                fontWeight: 900,
                color: "#fff",
                mb: 2
              }}
            >
              Security Core Layer
            </Typography>

            <Typography
              sx={{
                color: "#cbd5e1",
                lineHeight: 1.8,
                mb: 3
              }}
            >
              Enterprise-grade security architecture ensures encrypted data flow,
              role-based access, and continuous system monitoring for all recruitment activities.
            </Typography>

            <Box
              sx={{
                mt: 2,
                p: 2,
                borderRadius: "14px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)"
              }}
            >
              <Typography sx={{ color: "#22d3ee", fontWeight: 700 }}>
                LIVE PROTECTION ACTIVE
              </Typography>
            </Box>
          </Box>
        </motion.div>
      </Grid>

      {/* RIGHT GRID CARDS */}
      <Grid item xs={12} md={7}>
        <Grid container spacing={2}>
          {securityFeatures.map((item, index) => {
            const Icon = item.icon;

            return (
              <Grid item xs={12} sm={6} key={item.title}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <Box
                    sx={{
                      p: 3,
                      height: "100%",
                      borderRadius: "18px",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      backdropFilter: "blur(12px)",
                      transition: "0.3s ease",
                      "&:hover": {
                        borderColor: "rgba(34,211,238,0.4)",
                        boxShadow: "0 12px 40px rgba(0,0,0,0.3)"
                      }
                    }}
                  >
                    {/* ICON */}
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: "14px",
                        display: "grid",
                        placeItems: "center",
                        background:
                          "linear-gradient(135deg, rgba(34,211,238,0.18), rgba(139,92,246,0.18))",
                        mb: 2
                      }}
                    >
                      <Icon sx={{ color: "#22d3ee", fontSize: 26 }} />
                    </Box>

                    {/* TITLE */}
                    <Typography
                      sx={{
                        fontWeight: 800,
                        color: "#fff",
                        fontSize: "0.95rem",
                        mb: 1
                      }}
                    >
                      {item.title}
                    </Typography>

                    {/* DESCRIPTION */}
                    <Typography
                      sx={{
                        color: "#cbd5e1",
                        fontSize: "0.85rem",
                        lineHeight: 1.7
                      }}
                    >
                      {item.description}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  </Box>
</Box>

<Box ref={(el) => (sectionRefs.current[4] = el)} sx={{ mb: { xs: 10, md: 14 } }}>
  <SectionHeading
    label="AI Ethics & Fair Hiring"
    title="Human-centered AI governance for equitable hiring"
    description="Structured ethical principles ensuring fairness, transparency, and responsible AI decisions."
  />

  <Box
    sx={{
      maxWidth: 1100,
      mx: "auto",
      borderRadius: "18px",
      overflow: "hidden",
      border: "1px solid rgba(255,255,255,0.08)",
      background: "rgba(255,255,255,0.02)"
    }}
  >

    {ethicsCards.map((label, index) => {

      const descriptions = {
        "Explainable AI":
          "AI decisions are explained with clear reasoning visible to HR and candidates.",

        "Bias-Aware Screening":
          "Removes bias by ignoring sensitive attributes like gender, age, religion.",

        "Human Decision Authority":
          "Final hiring decision is always made by humans.",

        "Transparent Candidate Ranking":
          "Ranking criteria are clearly defined and understandable.",

        "Ethical Evaluation":
          "All recommendations follow strict ethical AI guidelines.",

        "Fair Opportunity":
          "Every candidate is evaluated equally without discrimination."
      };

      return (
        <Box
          key={label}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 3,
            px: 3,
            py: 2.5,
            borderBottom:
              index !== ethicsCards.length - 1
                ? "1px solid rgba(255,255,255,0.06)"
                : "none",
            transition: "0.25s ease",
            "&:hover": {
              background: "rgba(34,211,238,0.04)"
            }
          }}
        >
          {/* LEFT BADGE */}
          <Box
            sx={{
              minWidth: 220
            }}
          >
            <Typography
              sx={{
                fontWeight: 800,
                color: "#22d3ee",
                fontSize: "0.95rem"
              }}
            >
              {label}
            </Typography>
          </Box>

          {/* RIGHT DESCRIPTION */}
          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{
                color: "#cbd5e1",
                fontSize: "0.95rem",
                lineHeight: 1.7
              }}
            >
              {descriptions[label]}
            </Typography>
          </Box>
        </Box>
      );
    })}

  </Box>
</Box>

        <Box ref={(el) => (sectionRefs.current[5] = el)} sx={{ mb: { xs: 10, md: 14 } }}>
          <SectionHeading
            label="Data Protection Policy"
            title="Secure storage, privacy, and controlled access"
            description="A premium split layout that highlights policy rules and shielded protection."
          />

          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.9 }}
              >
                <Card sx={{ ...glassCard, p: 4, minHeight: 420, border: "1px solid rgba(34,211,238,0.16)" }}>
                  <Box sx={{ display: "grid", placeItems: "center", height: 420, position: "relative" }}>
                    <Box
                      sx={{
                        width: 220,
                        height: 220,
                        borderRadius: "50%",
                        background: "rgba(34,211,238,0.14)",
                        position: "absolute",
                        top: 80,
                        left: 40,
                        filter: "blur(40px)"
                      }}
                    />
                    <Box
                      sx={{
                        width: 180,
                        height: 180,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.08)",
                        border: "1px solid rgba(255,255,255,0.16)",
                        boxShadow: "0 0 60px rgba(34,211,238,0.18)",
                        position: "relative",
                        zIndex: 2,
                        display: "grid",
                        placeItems: "center"
                      }}
                    >
                      <Shield sx={{ color: "#22d3ee", fontSize: 72 }} />
                    </Box>
                  </Box>
                </Card>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.9 }}
              >
                <Box sx={{ position: "relative" }}>
                  <Box
                    sx={{
                      position: "absolute",
                      left: 0,
                      top: 24,
                      bottom: 24,
                      width: 4,
                      borderRadius: 2,
                      background: accentGradient,
                      opacity: 0.7
                    }}
                  />
                  <Card sx={{ ...glassCard, p: 4, pl: 8, border: "1px solid rgba(255,255,255,0.12)" }}>
                    <Stack spacing={3}>
                      {dataPolicyRules.map((rule) => (
                        <Box key={rule}>
                          <Typography sx={{ color: "#22d3ee", fontWeight: 700, mb: 1 }}>{rule}</Typography>
                          <Typography sx={{ color: "#cbd5e1", lineHeight: 1.75 }}>
                            Policy rule enforcement for recruitment data privacy and secure lifecycle management.
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  </Card>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Box>

      <Box ref={(el) => (sectionRefs.current[6] = el)} sx={{ mb: { xs: 10, md: 14 } }}>
  <SectionHeading
    label="Prohibited Activities"
    title="Strictly forbidden actions"
    description="These actions are not allowed on the platform and may result in account suspension or permanent restriction."
  />

  <Box
    sx={{
      maxWidth: 1100,
      mx: "auto",
      borderRadius: "18px",
      overflow: "hidden",
      border: "1px solid rgba(244,63,94,0.25)",
      background: "rgba(255,255,255,0.02)"
    }}
  >
    {prohibitedItems.map((item, index) => (
      <Box
        key={item}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 3,
          px: 3,
          py: 2.5,
          borderBottom:
            index !== prohibitedItems.length - 1
              ? "1px solid rgba(255,255,255,0.06)"
              : "none",
          transition: "0.25s ease",
          "&:hover": {
            background: "rgba(244,63,94,0.06)"
          }
        }}
      >
        {/* ICON BOX */}
        <Box
          sx={{
            width: 46,
            height: 46,
            borderRadius: "12px",
            display: "grid",
            placeItems: "center",
            background: "rgba(244,63,94,0.12)",
            border: "1px solid rgba(244,63,94,0.25)"
          }}
        >
          <WarningAmber sx={{ color: "#f97316", fontSize: 26 }} />
        </Box>

        {/* TEXT */}
        <Box sx={{ flex: 1 }}>
          <Typography
            sx={{
              fontWeight: 800,
              color: "#fff",
              fontSize: "0.95rem",
              mb: 0.5
            }}
          >
            {item}
          </Typography>

          <Typography
            sx={{
              color: "#cbd5e1",
              fontSize: "0.9rem",
              lineHeight: 1.6
            }}
          >
            This action violates platform policy and is strictly prohibited for maintaining system integrity and fairness.
          </Typography>
        </Box>

        {/* TAG */}
        <Box
          sx={{
            px: 2,
            py: 0.8,
            borderRadius: "999px",
            fontSize: "0.75rem",
            fontWeight: 700,
            color: "#f87171",
            background: "rgba(244,63,94,0.12)",
            border: "1px solid rgba(244,63,94,0.25)"
          }}
        >
          Forbidden
        </Box>
      </Box>
    ))}
  </Box>
</Box>

  <Box ref={(el) => (sectionRefs.current[7] = el)} sx={{ mb: { xs: 10, md: 14 } }}>
  <SectionHeading
    label="Audit & Monitoring"
    title="Enterprise-grade visibility across every workflow"
    description="Every system event is tracked in real-time to ensure transparency, security, and compliance."
  />

  <Box
    sx={{
      maxWidth: 900,
      mx: "auto",
      position: "relative",
      borderLeft: "2px solid rgba(34,211,238,0.25)",
      pl: 4
    }}
  >
    {auditMetrics.map((item, index) => (
      <Box key={item.label} sx={{ mb: 4, position: "relative" }}>
        
        {/* DOT */}
        <Box
          sx={{
            position: "absolute",
            left: -11,
            top: 8,
            width: 16,
            height: 16,
            borderRadius: "50%",
            background: "#22d3ee",
            boxShadow: "0 0 12px rgba(34,211,238,0.6)"
          }}
        />

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: index * 0.05 }}
        >
          <Box
            sx={{
              p: 3,
              borderRadius: "16px",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              transition: "0.3s",
              "&:hover": {
                borderColor: "#22d3ee",
                transform: "translateX(6px)",
                background: "rgba(34,211,238,0.04)"
              }
            }}
          >
            {/* HEADER */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1
              }}
            >
              <Typography sx={{ fontWeight: 800, color: "#fff" }}>
                {item.label}
              </Typography>

              <Lock sx={{ color: "#22d3ee", fontSize: 18 }} />
            </Box>

            {/* VALUE */}
            <Typography
              sx={{
                fontSize: "1.6rem",
                fontWeight: 900,
                color: "#22d3ee",
                mb: 1
              }}
            >
              {item.value}
            </Typography>

            {/* DESCRIPTION (NOW DYNAMIC ✔) */}
            <Typography
              sx={{
                color: "#cbd5e1",
                fontSize: "0.9rem",
                lineHeight: 1.6
              }}
            >
              {auditDescriptions[item.label]}
            </Typography>
          </Box>
        </motion.div>
      </Box>
    ))}
  </Box>
</Box>

  <Box
  component="section"
  sx={{
    py: { xs: 10, md: 16 },
    display: "flex",
    justifyContent: "center",
    position: "relative"
  }}
>
  {/* Soft background wash */}
  <Box
    sx={{
      position: "absolute",
      inset: 0,
      background:
        "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(34,211,238,0.04), rgba(0,0,0,0))",
      zIndex: 0
    }}
  />

  <Card
    sx={{
      ...glassCard,
      maxWidth: 850,
      width: "100%",
      p: { xs: 4, md: 6 },
      textAlign: "center",
      border: "1px solid rgba(255,255,255,0.10)",
      background: "rgba(255,255,255,0.03)",
      position: "relative",
      zIndex: 2
    }}
  >
    {/* Small badge */}
    <Typography
      sx={{
        display: "inline-block",
        px: 2,
        py: 0.6,
        mb: 3,
        borderRadius: "999px",
        fontSize: "0.75rem",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        color: "#22d3ee",
        background: "rgba(34,211,238,0.08)"
      }}
    >
      Recruitment Platform
    </Typography>

    {/* Title */}
    <Typography
      variant="h4"
      sx={{
        fontWeight: 900,
        color: "#fff",
        mb: 2,
        lineHeight: 1.2
      }}
    >
      Build Transparent Hiring Systems
    </Typography>

    {/* Subtitle */}
    <Typography
      sx={{
        color: "#cbd5e1",
        fontSize: "1rem",
        lineHeight: 1.8,
        maxWidth: 650,
        mx: "auto",
        mb: 5
      }}
    >
      A modern recruitment system with AI-assisted evaluation, secure workflows,
      and fully transparent decision tracking for candidates and HR teams.
    </Typography>

    {/* Buttons */}
    <Box
  sx={{
    display: "flex",
    justifyContent: "center",
    gap: 2,
    flexWrap: "wrap"
  }}
>
  {/* PRIMARY BUTTON */}
  <Button
    href="/"
    variant="contained"
    sx={{
      px: 5.5,
      py: 1.6,
      borderRadius: "999px",
      textTransform: "none",
      fontWeight: 800,
      color: "#0b1120",
      background: "linear-gradient(135deg, #22d3ee, #3b82f6)",
      boxShadow: "0 10px 30px rgba(34,211,238,0.25)",
      position: "relative",
      overflow: "hidden",
      transition: "all 0.35s ease",

      "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: "-100%",
        width: "100%",
        height: "100%",
        background:
          "linear-gradient(120deg, transparent, rgba(255,255,255,0.35), transparent)",
        transition: "0.6s"
      },

      "&:hover": {
        transform: "translateY(-3px)",
        boxShadow: "0 18px 45px rgba(34,211,238,0.35)"
      },

      "&:hover::before": {
        left: "100%"
      }
    }}
  >
    Get Started
  </Button>

  {/* SECONDARY BUTTON */}
  <Button
    href="mailto:support@rms.ai"
    variant="outlined"
    sx={{
      px: 5.5,
      py: 1.6,
      borderRadius: "999px",
      textTransform: "none",
      fontWeight: 700,
      color: "#fff",
      border: "1px solid rgba(255,255,255,0.18)",
      background: "rgba(255,255,255,0.03)",
      backdropFilter: "blur(10px)",
      transition: "all 0.3s ease",

      "&:hover": {
        borderColor: "#22d3ee",
        color: "#22d3ee",
        transform: "translateY(-3px)",
        background: "rgba(34,211,238,0.06)"
      }
    }}
  >
    Contact Support
  </Button>
</Box>
  </Card>
</Box>
      </Container>
    </Box>
  );
}
