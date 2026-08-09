import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Grid,
  Card,
  CardContent
} from "@mui/material";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";

export default function Home() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [rect, setRect] = useState(null);
  const [tutorialStep, setTutorialStep] = useState(0);
  const [tutorialRect, setTutorialRect] = useState(null);
  const showStep = (id, step) => {
    const el = document.getElementById(id);

    if (el) {
      const rect = el.getBoundingClientRect();
      setTutorialRect(rect);
      setTutorialStep(step);
    }
  };
  const images = [
    "https://images.unsplash.com/photo-1497366216548-37526070297c",
    "https://images.unsplash.com/photo-1556761175-b413da4baf72",
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      text: "RecruitAI reduced our hiring time by 60%",
      name: "Sarah Mitchell",
      role: "HR Manager",
      initials: "SM"
    },
    {
      text: "Best AI recruitment platform we ever used",
      name: "Ali Khan",
      role: "Talent Lead",
      initials: "AK"
    },
    {
      text: "Smart automation made hiring so much easier",
      name: "James Chen",
      role: "Recruiter",
      initials: "JC"
    }
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);



  useEffect(() => {
    setTimeout(() => {
      showStep("jobs-btn", 1);
    }, 500);
  }, []);

  return (
    <>
      {/* GLOBAL DARK BG */}
      <Box
        sx={{
          background: "#020617",
          color: "white",
          minHeight: "100vh"
        }}
      >
        {/* ADVANCED WEBSITE TUTORIAL */}

        {tutorialStep !== 0 && (
          <>
            {/* DARK OVERLAY */}
            <Box
              sx={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.75)",
                backdropFilter: "blur(4px)",
                zIndex: 9998,
                animation: "fadeIn 0.4s ease"
              }}
            />

            {/* STEP 1 */}
            {tutorialStep === 1 && (
              <>
                {/* HIGHLIGHT */}
                <Box
                  sx={{
                    position: "fixed",
                    top: tutorialRect?.top - 5,
                    left: tutorialRect?.left - 5,
                    width: tutorialRect?.width + 10,
                    height: tutorialRect?.height + 10,
                    // width: 90,
                    // height: 45,
                    borderRadius: "12px",
                    border: "2px solid #42a5f5",
                    boxShadow: "0 0 25px #42a5f5",
                    zIndex: 9999,
                    animation: "pulse 1.5s infinite"
                  }}
                />

                {/* TOOLTIP */}
                <Box
                  sx={{
                    position: "fixed",
                    top: tutorialRect?.bottom + 20,
                    left: tutorialRect?.left - 80,
                    width: 340,
                    background:
                      "linear-gradient(135deg, rgba(15,23,42,0.96), rgba(30,41,59,0.96))",
                    backdropFilter: "blur(16px)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "20px",
                    p: 3,
                    color: "white",
                    zIndex: 10000,
                    boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
                    animation: "slideUp 0.4s ease"
                  }}
                >
                  <Typography variant="h6" fontWeight="bold" mb={1}>
                    Browse Jobs
                  </Typography>

                  <Typography sx={{ opacity: 0.9, lineHeight: 1.7 }}>
                    Users can browse the latest AI-powered jobs in this section and apply directly.
                  </Typography>

                  <Box
                    sx={{
                      mt: 3,
                      display: "flex",
                      justifyContent: "space-between"
                    }}
                  >
                    <Button
                      onClick={() => setTutorialStep(0)}
                      sx={{ color: "#fff" }}
                    >
                      Skip
                    </Button>

                    <Button
                      variant="contained"
                      onClick={() => setTutorialStep(2)}
                      sx={{
                        borderRadius: "10px",
                        background:
                          "linear-gradient(135deg,#1976d2,#42a5f5)"
                      }}
                    >
                      Next
                    </Button>
                  </Box>
                </Box>
              </>
            )}

            {/* STEP 2 */}
            {tutorialStep === 2 && (
              <>
                {/* HIGHLIGHT */}
                <Box
                  sx={{
                    position: "fixed",
                    top: 10,
                    right: 45,
                    width: 170,
                    height: 45,
                    borderRadius: "12px",
                    border: "2px solid #42a5f5",
                    boxShadow: "0 0 25px #42a5f5",
                    zIndex: 9999,
                    animation: "pulse 1.5s infinite"
                  }}
                />

                {/* TOOLTIP */}
                <Box
                  sx={{
                    position: "fixed",
                    top: 90,
                    right: 20,
                    width: 340,
                    background: "rgba(255,255,255,0.12)",
                    backdropFilter: "blur(16px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "20px",
                    p: 3,
                    color: "white",
                    zIndex: 10000,
                    boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
                    animation: "slideUp 0.4s ease"
                  }}
                >
                  <Typography variant="h6" fontWeight="bold" mb={1}>
                    Request a Demo
                  </Typography>

                  <Typography sx={{ opacity: 0.9, lineHeight: 1.7 }}>
                    “Companies can submit live platform demo requests from here and explore AI-powered recruitment features.”
                  </Typography>

                  <Box
                    sx={{
                      mt: 3,
                      display: "flex",
                      justifyContent: "space-between"
                    }}
                  >
                    <Button
                      onClick={() => setTutorialStep(1)}
                      sx={{ color: "#fff" }}
                    >
                      Back
                    </Button>

                    <Button
                      variant="contained"
                      onClick={() => setTutorialStep(0)}
                      sx={{
                        borderRadius: "10px",
                        background:
                          "linear-gradient(135deg,#1976d2,#42a5f5)"
                      }}
                    >
                      Finish
                    </Button>
                  </Box>
                </Box>
              </>
            )}

            {/* ANIMATIONS */}
            <style>
              {`
  @keyframes pulse {
    0% {
      transform: scale(1);
      box-shadow: 0 0 15px #42a5f5;
    }
    50% {
      transform: scale(1.05);
      box-shadow: 0 0 35px #42a5f5;
    }
    100% {
      transform: scale(1);
      box-shadow: 0 0 15px #42a5f5;
    }
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(40px);
    }
    to {
      opacity: 1;
      transform: translateY(0px);
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
   
`}
            </style>
          </>
        )}
       {/* Hero Section */}
     <Box
          sx={{
            minHeight: "90vh",
            position: "relative",
            display: "flex",
            alignItems: "center",
            backgroundImage: `url(${images[index]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            overflow: "hidden"
          }}
        >
          {/* DARK OVERLAY */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to right, rgba(2,6,23,0.96), rgba(15,23,42,0.85))"
            }}
          />

          {/* DOT GRID PATTERN */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
              backgroundSize: "26px 26px",
              maskImage:
                "radial-gradient(ellipse at center, black 0%, transparent 75%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at center, black 0%, transparent 75%)",
              zIndex: 1
            }}
          />

          {/* DECORATIVE GLOW - TOP LEFT */}
          <Box
            sx={{
              position: "absolute",
              top: "-12%",
              left: "8%",
              width: "420px",
              height: "420px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(66,165,245,0.22) 0%, transparent 70%)",
              filter: "blur(50px)",
              zIndex: 1,
              animation: "floatA 8s ease-in-out infinite",
              "@keyframes floatA": {
                "0%, 100%": { transform: "translate(0,0)" },
                "50%": { transform: "translate(30px,20px)" }
              }
            }}
          />

          {/* DECORATIVE GLOW - BOTTOM RIGHT */}
          <Box
            sx={{
              position: "absolute",
              bottom: "-18%",
              right: "8%",
              width: "480px",
              height: "480px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(30,136,229,0.18) 0%, transparent 70%)",
              filter: "blur(60px)",
              zIndex: 1,
              animation: "floatB 10s ease-in-out infinite",
              "@keyframes floatB": {
                "0%, 100%": { transform: "translate(0,0)" },
                "50%": { transform: "translate(-25px,-25px)" }
              }
            }}
          />

          {/* SMALL CENTER GLOW BEHIND CONTENT */}
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              width: "600px",
              height: "300px",
              background:
                "radial-gradient(ellipse, rgba(66,165,245,0.08) 0%, transparent 70%)",
              filter: "blur(40px)",
              zIndex: 1
            }}
          />

          <Container sx={{ position: "relative", zIndex: 2 }}>
            <Grid container spacing={5} alignItems="center" justifyContent="center">

              {/* LEFT / MAIN CONTENT */}
              <Grid
                item
                xs={12}
                md={9}
                lg={7}
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center"
                }}
              >

                {/* BADGE */}
                <Typography
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 1.2,
                    px: 2.5,
                    py: 1,
                    borderRadius: "30px",
                    background:
                      "linear-gradient(135deg, rgba(66,165,245,0.14), rgba(30,136,229,0.06))",
                    color: "#90caf9",
                    border: "1px solid rgba(144,202,249,0.3)",
                    backdropFilter: "blur(10px)",
                    mb: 3.5,
                    mt: 3,
                    fontWeight: "600",
                    fontSize: "13px",
                    letterSpacing: "1.2px",
                    textTransform: "uppercase",
                    textAlign: "center",
                    boxShadow: "0 4px 24px rgba(66,165,245,0.2)"
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      position: "relative",
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "#42a5f5",
                      display: "inline-block",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        inset: 0,
                        borderRadius: "50%",
                        background: "#42a5f5",
                        animation: "pulseRing 1.8s ease-out infinite"
                      },
                      "@keyframes pulseRing": {
                        "0%": { transform: "scale(1)", opacity: 0.8 },
                        "100%": { transform: "scale(3)", opacity: 0 }
                      }
                    }}
                  />
                  AI Recruitment Platform
                </Typography>

                {/* HEADING */}
                <Typography
                  variant="h2"
                  fontWeight="900"
                  sx={{
                    lineHeight: 1.12,
                    mb: 3,
                    width: "100%",
                    fontSize: {
                      xs: "2.5rem",
                      sm: "3.4rem",
                      md: "4.5rem"
                    },
                    letterSpacing: "-1.5px",
                    backgroundImage:
                      "linear-gradient(100deg,#ffffff 20%,#bfe0ff 45%,#42a5f5 65%,#ffffff 90%)",
                    backgroundSize: "200% auto",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textAlign: "center",
                    animation: "shine 6s linear infinite",
                    "@keyframes shine": {
                      "0%": { backgroundPosition: "0% center" },
                      "100%": { backgroundPosition: "200% center" }
                    }
                  }}
                >
                  Hire Smarter <br />
                  With AI Automation
                </Typography>

                {/* SUBTEXT */}
                <Typography
                  sx={{
                    color: "#a8b8cc",
                    lineHeight: 1.9,
                    maxWidth: "600px",
                    width: "100%",
                    mb: 5,
                    fontSize: { xs: "15px", md: "17.5px" },
                    fontWeight: 400,
                    textAlign: "center",
                    mx: "auto"
                  }}
                >
                  Smart recruitment system that helps companies
                  screen candidates, automate interviews,
                  and hire top talent faster.
                </Typography>

                {/* HERO BUTTONS */}
                <Box
                  sx={{
                    mb: 6,
                    width: "100%",
                    display: "flex",
                    gap: 2.5,
                    flexWrap: "wrap",
                    justifyContent: "center"
                  }}
                >

                  {/* REQUEST DEMO BUTTON */}
                  <Button
                    id="demo-btn-hero"
                    variant="contained"
                    sx={{
                      px: 5,
                      py: 1.7,
                      borderRadius: "14px",
                      background:
                        "linear-gradient(135deg,#1976d2,#42a5f5)",
                      color: "#fff",
                      fontWeight: "bold",
                      fontSize: "15px",
                      letterSpacing: "0.4px",
                      textTransform: "none",
                      transition: "all 0.35s ease",
                      position: "relative",
                      overflow: "hidden",
                      boxShadow:
                        "0 10px 35px rgba(66,165,245,0.4)",

                      "&:hover": {
                        transform: "translateY(-4px) scale(1.04)",
                        boxShadow:
                          "0 18px 40px rgba(66,165,245,0.55)",
                        background:
                          "linear-gradient(135deg,#1565c0,#1e88e5)"
                      },

                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: "-100%",
                        width: "100%",
                        height: "100%",
                        background:
                          "linear-gradient(120deg, transparent, rgba(255,255,255,0.3), transparent)",
                        transition: "0.6s"
                      },

                      "&:hover::before": {
                        left: "100%"
                      }
                    }}
                    onClick={() => navigate("/request-demo")}
                  >
                    Request a Demo
                  </Button>

                  {/* BROWSE JOBS BUTTON */}
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{
                      px: 5,
                      py: 1.7,
                      borderRadius: "14px",
                      color: "#e2e8f0",
                      border: "1px solid rgba(255,255,255,0.25)",
                      background: "rgba(255,255,255,0.04)",
                      backdropFilter: "blur(12px)",
                      fontWeight: "bold",
                      fontSize: "15px",
                      letterSpacing: "0.5px",
                      textTransform: "none",
                      transition: "all 0.35s ease",

                      "&:hover": {
                        background:
                          "rgba(66,165,245,0.14)",
                        borderColor: "#42a5f5",
                        color: "#90caf9",
                        transform: "translateY(-4px) scale(1.04)",
                        boxShadow:
                          "0 14px 32px rgba(66,165,245,0.2)"
                      },

                      "&:active": {
                        transform: "scale(0.96)"
                      }
                    }}
                    onClick={() => navigate("/jobs")}
                  >
                    Browse Jobs
                  </Button>
                </Box>

                {/* SCROLL / DIVIDER ACCENT */}
                <Box
                  sx={{
                    width: "60px",
                    height: "4px",
                    borderRadius: "10px",
                    background:
                      "linear-gradient(90deg, transparent, #42a5f5, transparent)",
                    opacity: 0.7
                  }}
                />

              </Grid>             
            </Grid>
          </Container>
        </Box>

        {/*  FEATURES */}
        <Container sx={{ py: 8 }}>
          <Box textAlign="center" mb={6}>

            <Typography
              sx={{
                border: "1px solid #1976d2",
                display: "inline-block",
                px: 2,
                py: 0.5,
                borderRadius: "20px",
                color: "#1976d2",
                mb: 3   // ⭐ gap increased (tag → heading)
              }}
            >
              Platform Features
            </Typography>

            <Typography variant="h4" fontWeight="bold" mb={3}>
              Everything you need to hire{" "}
              <span style={{ color: "#1976d2" }}>smarter</span>
            </Typography>

            <Typography mt={4} color="text.secondary" sx={{ lineHeight: 2 }}>
              From AI-powered screening to automated scheduling, RecruitAI handles
              the entire recruitment lifecycle.
            </Typography>

          </Box>

          {/* FLEXBOX 3 COLUMNS FIX */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",   // ⭐ equal alignment center
              gap: 8,                     // ⭐ equal spacing between all cards
            }}
          >
            {[
              {
                title: <b>AI Resume Screening</b>,
                desc: "Automatically rank and filter candidates using advanced AI matching algorithms."
              },
              {
                title: <b>Smart Scheduling</b>,
                desc: "Automate interview scheduling with calendar sync and candidate availability."
              },
              {
                title: <b>Candidate Pipeline</b>,
                desc: "Visualize and manage your entire hiring funnel from application to offer."
              },
              {
                title: <b>Analytics Dashboard</b>,
                desc: "Real-time insights on time-to-hire, source quality, and team performance."
              },
              {
                title: <b>Team Collaboration</b>,
                desc: "Share feedback, scorecards, and decisions across your hiring team."
              },
              {
                title: <b>ATS Integration</b>,
                desc: "Seamlessly connect with your existing HR tools and applicant tracking systems."
              }
            ].map((item, i) => (
              <Box
                key={i}
                sx={{
                  flex: "1 1 300px",
                  maxWidth: "350px",
                  minWidth: "300px",
                  display: "flex"
                }}
              >
                <Card

                  sx={{
                    p: 3,
                    borderRadius: "20px",
                    height: "100%",
                    transition: "0.4s",
                    cursor: "pointer",
                    position: "relative",
                    overflow: "hidden",
                    color: "#fff",

                    backgroundImage: `url(${[
                      "https://media.istockphoto.com/id/2258807282/photo/ai-recruiting-and-automated-screening-cv-parsing-and-talent-analytics-platform.jpg?b=1&s=612x612&w=0&k=20&c=-Cium7w_bsAXvM6tRz-toiet8N2QldxNa2d7ctbXQfE=", // AI Resume
                      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f", // Scheduling
                      "https://images.pexels.com/photos/8730284/pexels-photo-8730284.jpeg", // Pipeline
                      "https://images.pexels.com/photos/7887816/pexels-photo-7887816.jpeg", // Analytics
                      "https://images.pexels.com/photos/7652039/pexels-photo-7652039.jpeg", // Team
                      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40"  // ATS
                    ][i]
                      })`,

                    backgroundSize: "cover",
                    backgroundPosition: "center",

                    boxShadow: "0 10px 30px rgba(0,0,0,0.12)",

                    "&::before": {
                      content: '""',
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(15,23,42,0.92), rgba(15,23,42,0.45))"
                    },

                    "&:hover": {
                      transform: "translateY(-10px) scale(1.02)",
                      boxShadow: "0 20px 50px rgba(0,0,0,0.25)"
                    }
                  }}
                >
                  <CardContent
                    sx={{
                      position: "relative",
                      zIndex: 2
                    }}>
                    <Typography variant="h6" fontWeight="bold" mb={1}>
                      {item.title}
                    </Typography>
                    {/* <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}> */}
                    <Typography
                      sx={{
                        lineHeight: 1.7,
                        color: "rgba(255,255,255,0.85)"
                      }}
                    >
                      {item.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </Container>
        {/* HOW IT WORKS - PREMIUM INTERACTIVE DESIGN */}
        <Box
          sx={{
            py: 12,
            background: "#020617",
            position: "relative",
            overflow: "hidden"
          }}
        >

          {/* LIGHT GLOW */}
          <Box
            sx={{
              position: "absolute",
              width: 400,
              height: 400,
              borderRadius: "50%",
              background: "rgba(66,165,245,0.10)",
              filter: "blur(130px)",
              top: "-150px",
              right: "-120px"
            }}
          />

          <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>

            {/* HEADER */}
            <Box textAlign="center" mb={10}>
              <Typography
                sx={{
                  display: "inline-block",
                  px: 2,
                  py: 0.7,
                  borderRadius: "30px",
                  background: "rgba(66,165,245,0.08)",
                  border: "1px solid rgba(66,165,245,0.18)",
                  color: "#42a5f5",
                  fontSize: "12px",
                  letterSpacing: "2px",
                  fontWeight: "bold",
                  mb: 3
                }}
              >
                HOW IT WORKS
              </Typography>

              <Typography
                variant="h3"
                fontWeight="900"
                sx={{
                  color: "#fff",
                  mb: 2,
                  fontSize: {
                    xs: "2.1rem",
                    md: "3.2rem"
                  }
                }}
              >
                Smarter Hiring Workflow
              </Typography>

              <Typography
                sx={{
                  color: "#94a3b8",
                  maxWidth: "650px",
                  mx: "auto",
                  lineHeight: 2
                }}
              >
                Modern AI-powered recruitment process designed for fast and intelligent hiring.
              </Typography>
            </Box>

            {/* INTERACTIVE STEPS */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: 4,
                position: "relative"
              }}
            >

              {[
                {
                  num: "01",
                  title: "Create Job",
                  desc: "Generate optimized job posts instantly."
                },
                {
                  num: "02",
                  title: "AI Screening",
                  desc: "Automatically analyze candidate profiles."
                },
                {
                  num: "03",
                  title: "Hire Faster",
                  desc: "Select top talent with smart insights."
                }
              ].map((item, i) => (
                <Box
                  key={i}
                  sx={{
                    width: {
                      xs: "100%",
                      sm: "280px"
                    },
                    position: "relative"
                  }}
                >

                  {/* CONNECTOR LINE */}
                  {i !== 2 && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 40,
                        right: "-40px",
                        width: "40px",
                        height: "2px",
                        background:
                          "linear-gradient(to right, rgba(66,165,245,0.6), transparent)",
                        display: {
                          xs: "none",
                          md: "block"
                        }
                      }}
                    />
                  )}

                  {/* CARD */}
                  <Box
                    sx={{
                      p: 3.5,
                      borderRadius: "22px",
                      background:
                        "linear-gradient(145deg, rgba(15,23,42,0.95), rgba(30,41,59,0.85))",
                      border: "1px solid rgba(255,255,255,0.06)",
                      backdropFilter: "blur(14px)",
                      transition: "all 0.4s ease",
                      cursor: "pointer",
                      position: "relative",
                      overflow: "hidden",

                      "&:hover": {
                        transform: "translateY(-8px)",
                        borderColor: "rgba(66,165,245,0.35)",
                        boxShadow:
                          "0 20px 40px rgba(66,165,245,0.16)"
                      },

                      "&::before": {
                        content: '""',
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(135deg, rgba(255,255,255,0.04), transparent)",
                        pointerEvents: "none"
                      }
                    }}
                  >

                    {/* TOP */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 3
                      }}
                    >

                      {/* STEP */}
                      <Box
                        sx={{
                          width: 52,
                          height: 52,
                          borderRadius: "16px",
                          background:
                            "linear-gradient(135deg,#1976d2,#42a5f5)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#fff",
                          fontWeight: "bold",
                          fontSize: "18px",
                          boxShadow:
                            "0 10px 25px rgba(66,165,245,0.3)"
                        }}
                      >
                        {item.num}
                      </Box>

                      {/* MINI DOT */}
                      <Box
                        sx={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          background: "#42a5f5",
                          boxShadow:
                            "0 0 18px rgba(66,165,245,0.8)"
                        }}
                      />
                    </Box>

                    {/* TITLE */}
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{
                        color: "#fff",
                        mb: 1.5
                      }}
                    >
                      {item.title}
                    </Typography>

                    {/* DESC */}
                    <Typography
                      sx={{
                        color: "#94a3b8",
                        lineHeight: 1.9,
                        fontSize: "14px"
                      }}
                    >
                      {item.desc}
                    </Typography>

                  </Box>
                </Box>
              ))}
            </Box>
          </Container>
        </Box>
        {/* TESTIMONIAL */}
        <Box
          sx={{
            py: 12,
            background:
              "linear-gradient(180deg,#020617,#0f172a)"
          }}
        >
          <Container maxWidth="md">

            <Typography
              variant="h3"
              fontWeight="bold"
              textAlign="center"
              mb={6}
            >
              What Clients Say
            </Typography>

            <Box
              key={current}
            >
              <Card
                sx={{
                  p: 5,
                  borderRadius: "30px",
                  background:
                    "rgba(15,23,42,0.9)",
                  border:
                    "1px solid rgba(255,255,255,0.06)",
                  color: "white",
                  textAlign: "center"
                }}
              >
                <Typography
                  fontSize="22px"
                  sx={{
                    lineHeight: 2,
                    mb: 4,
                    color: "#e2e8f0"
                  }}
                >
                  "{testimonials[current].text}"
                </Typography>

                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  gap={2}
                >
                  <Box
                    sx={{
                      width: 55,
                      height: 55,
                      borderRadius: "50%",
                      background:
                        "linear-gradient(135deg,#1976d2,#42a5f5)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold"
                    }}
                  >
                    {testimonials[current].initials}
                  </Box>

                  <Box textAlign="left">
                    <Typography fontWeight="bold">
                      {testimonials[current].name}
                    </Typography>

                    <Typography color="#94a3b8">
                      {testimonials[current].role}
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </Box>
          </Container>
        </Box>

        {/* 🔥 CTA SECTION */}
        <Box
          sx={{
            minHeight: "78vh", // ⭐ HEIGHT INCREASED
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",

            backgroundImage:
              "url(https://images.unsplash.com/photo-1497215842964-222b430dc094?q=80&w=1920&auto=format&fit=crop)",

            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            overflow: "hidden"
          }}
        >
          {/* 🔵 OVERLAY */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to right, rgba(2,6,23,0.92), rgba(15,23,42,0.80))"
            }}
          />

          {/* 🔥 BLUE GLOW */}
          <Box
            sx={{
              position: "absolute",
              width: "420px",
              height: "420px",
              borderRadius: "50%",
              background: "rgba(66,165,245,0.16)",
              filter: "blur(140px)",
              top: "-120px",
              right: "-120px"
            }}
          />

          {/* 🔥 CONTENT */}
          <Container
            sx={{
              position: "relative",
              zIndex: 2
            }}
          >
            {/* TOP TAG */}
            <Typography
              sx={{
                display: "inline-block",
                px: 2.5,
                py: 1,
                borderRadius: "30px",

                background: "rgba(66,165,245,0.12)",
                color: "#90caf9",

                border:
                  "1px solid rgba(144,202,249,0.18)",

                backdropFilter: "blur(8px)",

                mb: 4,

                fontWeight: "600",
                letterSpacing: "0.5px"
              }}
            >
              AI Recruitment Platform
            </Typography>

            {/* HEADING */}
            <Typography
              variant="h3"
              fontWeight="900"
              sx={{
                mb: 3,
                lineHeight: 1.2,

                fontSize: {
                  xs: "2.4rem",
                  md: "3.8rem"
                },

                background:
                  "linear-gradient(135deg,#ffffff,#cbd5e1)",

                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
            >
              Ready To Transform Hiring?
            </Typography>

            {/* TEXT */}
            <Typography
              sx={{
                color: "#cbd5e1",
                lineHeight: 2,
                maxWidth: "760px",
                mx: "auto",
                mb: 6,
                fontSize: "16px"
              }}
            >
              Join 500+ companies using RecruitAI to hire smarter,
              automate recruitment workflows, and find top talent
              faster using AI-powered automation.
            </Typography>

            {/* 🔥 BUTTONS */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 3, // ⭐ SPACE FIXED
                flexWrap: "wrap",
                mb: 5
              }}
            >
              {/* REQUEST DEMO */}
              <Button
                variant="contained"
                size="large"
                sx={{
                  px: 5,
                  py: 1.5,

                  borderRadius: "14px",

                  background:
                    "linear-gradient(135deg,#1976d2,#42a5f5)",

                  color: "#fff",

                  fontWeight: "bold",
                  letterSpacing: "0.5px",

                  transition: "all 0.35s ease",

                  position: "relative",
                  overflow: "hidden",

                  boxShadow:
                    "0 10px 30px rgba(66,165,245,0.28)",

                  "&:hover": {
                    transform:
                      "translateY(-4px) scale(1.04)",

                    boxShadow:
                      "0 16px 38px rgba(66,165,245,0.45)",

                    background:
                      "linear-gradient(135deg,#1565c0,#1e88e5)"
                  },

                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: "-100%",
                    width: "100%",
                    height: "100%",

                    background:
                      "linear-gradient(120deg, transparent, rgba(255,255,255,0.25), transparent)",

                    transition: "0.6s"
                  },

                  "&:hover::before": {
                    left: "100%"
                  }
                }}
                onClick={() => navigate("/request-demo")}
              >
                Request a Demo
              </Button>

              {/* SIGN UP */}
              <Button
                variant="outlined"
                size="large"
                sx={{
                  px: 5,
                  py: 1.5,

                  borderRadius: "14px",

                  color: "#e2e8f0",

                  border:
                    "1px solid rgba(255,255,255,0.18)",

                  background:
                    "rgba(255,255,255,0.03)",

                  backdropFilter: "blur(10px)",

                  fontWeight: "bold",
                  letterSpacing: "0.5px",

                  transition: "all 0.35s ease",

                  "&:hover": {
                    background:
                      "rgba(66,165,245,0.12)",

                    borderColor: "#42a5f5",

                    color: "#90caf9",

                    transform:
                      "translateY(-4px) scale(1.04)",

                    boxShadow:
                      "0 12px 30px rgba(66,165,245,0.18)"
                  }
                }}
                onClick={() => navigate("/auth")}
              >
                Sign Up Free
              </Button>
            </Box>

            {/* 🔹 BOTTOM TEXTS */}
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap={4}
              flexWrap="wrap"
            >
              <Typography
                sx={{
                  color: "#cbd5e1",
                  fontSize: "14px"
                }}
              >
                ✔ No credit card required
              </Typography>

              <Typography
                sx={{
                  color: "#cbd5e1",
                  fontSize: "14px"
                }}
              >
                ✔ Free 14-day trial
              </Typography>

              <Typography
                sx={{
                  color: "#cbd5e1",
                  fontSize: "14px"
                }}
              >
                ✔ Cancel anytime
              </Typography>
            </Box>
          </Container>
        </Box>

             <Footer />
             </Box>
    </>
  );
}