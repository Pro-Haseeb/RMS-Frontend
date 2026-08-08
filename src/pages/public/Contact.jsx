import { useState, useRef } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Button,
  TextField,
  Stack,
  Chip,
  InputAdornment,
  Divider,
  Container
} from "@mui/material";

import {
  EmailOutlined,
  PhoneIphoneOutlined,
  LocationOnOutlined,
  AccessTimeOutlined,
  MemoryOutlined,
  SupportAgentOutlined,
  SecurityOutlined,
  RocketLaunchOutlined,
  SendRounded,
  BusinessOutlined,
  SubjectOutlined,
  PersonOutlineOutlined
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";



const contactDetails = [
  {
    title: "Email Support",
    value: "support@rms.ai",
    icon: EmailOutlined,
    accent: "#00E5FF"
  },
  {
    title: "Phone Number",
    value: "+1 (212) 555-0189",
    icon: PhoneIphoneOutlined,
    accent: "#083e54"
  },
  {
    title: "Office Location",
    value: "55 Future Street, New York, NY",
    icon: LocationOnOutlined,
    accent: "#00B8D4"
  },
  {
    title: "Working Hours",
    value: "Mon - Fri · 9:00am - 6:00pm",
    icon: AccessTimeOutlined,
    accent: "#0758a9"
  }
];

const supportFeatures = [
  {
    title: "AI Recruitment Assistance",
    description:
      "Automated candidate sourcing, screening, and interview orchestration.",
    icon: MemoryOutlined,
    accent: "#00E5FF"
  },
  {
    title: "Smart Hiring Consultation",
    description:
      "Tailored talent strategies with predictive hiring insights.",
    icon: SupportAgentOutlined,
    accent: "#7C4DFF"
  },
  {
    title: "24/7 Support",
    description:
      "Always-on enterprise support for critical hiring cycles.",
    icon: RocketLaunchOutlined,
    accent: "#2979FF"
  },
  {
    title: "Secure Communication",
    description:
      "Encrypted conversations, privacy, and compliance built in.",
    icon: SecurityOutlined,
    accent: "#00B8D4"
  }
];

const initialForm = {
  name: "",
  email: "",
  company: "",
  subject: "",
  message: ""
};

const validateForm = (values) => {
  const errors = {};

  // NAME
  if (!values.name.trim()) {
    errors.name = "Name is required";
  } else if (values.name.length < 3) {
    errors.name = "Name must be at least 3 characters";
  } else if (values.name.length > 20) {
    errors.name = "Name must be under 20 characters";
  }

  // EMAIL
  if (!values.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = "Enter a valid email (example: name@gmail.com)";
  }

  // COMPANY
  if (!values.company.trim()) {
    errors.company = "Company name is required";
  } else if (values.company.length < 2) {
    errors.company = "Company name is too short";
  }

  // SUBJECT
  if (!values.subject.trim()) {
    errors.subject = "Subject is required";
  } else if (values.subject.length < 5) {
    errors.subject = "Subject should be at least 5 characters";
  }

  // MESSAGE
  if (!values.message.trim()) {
    errors.message = "Message is required";
  } else if (values.message.length < 15) {
    errors.message = "Message should be at least 15 characters";
  }

  return errors;
};


const inputStyles = {
  borderRadius: "20px",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  backdropFilter: "blur(12px)",

  // 🔥 INPUT TEXT COLOR (IMPORTANT)
  "& .MuiInputBase-input": {
    color: "#fff",
    fontWeight: 500
  },

  "& .MuiInputLabel-root": {
    color: "rgba(255,255,255,0.6)"
  },

  "& .MuiFilledInput-root": {
    backgroundColor: "transparent"
  },

  "&:before": { borderBottom: "none" },
  "&:after": { borderBottom: "none" },

  "&:hover:not(.Mui-disabled):before": {
    borderBottom: "none"
  },

  "&.Mui-focused": {
    border: "1px solid #00E5FF",
    boxShadow: "0 0 25px rgba(0,229,255,0.25)"
  },

  // 🔥 ERROR STATE BORDER
  "&.Mui-error": {
    border: "1px solid #ff4d4f",
    boxShadow: "0 0 18px rgba(255,77,79,0.25)"
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.7
    }
  })
};

export default function Contact() {
  const navigate = useNavigate();
  const formRef = useRef(null);

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState("");

  const [pointer, setPointer] = useState({
    x: 50,
    y: 50
  });

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  };

 const handleChange = (key) => (event) => {
  const value = event.target.value;

  setForm((prev) => ({
    ...prev,
    [key]: value
  }));

  // LIVE VALIDATION (suggestion while typing)
  setErrors((prev) => {
    const updated = validateForm({ ...form, [key]: value });
    return updated;
  });
};

  const handleSubmit = (e) => {
  e.preventDefault();

  const result = validateForm(form);

  setErrors(result);
  setSubmitted(true);

  // ❌ ALL EMPTY CHECK (extra UX)
  const allEmpty =
    !form.name.trim() &&
    !form.email.trim() &&
    !form.company.trim() &&
    !form.subject.trim() &&
    !form.message.trim();

  if (allEmpty) {
    setErrors({
      name: "Please fill all fields",
      email: "Please fill all fields",
      company: "Please fill all fields",
      subject: "Please fill all fields",
      message: "Please fill all fields"
    });
    return;
  }

  // SUCCESS
  if (Object.keys(result).length === 0) {
    setStatus("Message sent successfully!");
    setForm(initialForm);

    setTimeout(() => setStatus(""), 4000);
  }
};
const errorBoxStyle = (field) => ({
  ...(errors[field] && {
    border: "1px solid #ff4d4f",
    boxShadow: "0 0 18px rgba(255,77,79,0.35)"
  })
});

  const handlePointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();

    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    setPointer({ x, y });
  };

  return (

    <Box
      onMouseMove={handlePointerMove}
      sx={{
        minHeight: "100vh",
        overflow: "hidden",
        position: "relative",
        color: "#fff",
        background: `
          radial-gradient(circle at ${pointer.x}% ${pointer.y}%, rgba(0,229,255,0.18), transparent 18%),
          radial-gradient(circle at 10% 10%, rgba(124,77,255,0.15), transparent 20%),
          linear-gradient(180deg, #020617 0%, #071120 45%, #020617 100%)
        `,
        px: { xs: 2, md: 6 },
        py: { xs: 6, md: 10 }
      }}
    >
      {/* GRID BACKGROUND */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          opacity: 0.05,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px"
        }}
      />

      {/* BLUR EFFECTS */}
      <Box
        sx={{
          position: "absolute",
          top: -120,
          left: -100,
          width: 350,
          height: 350,
          borderRadius: "50%",
          background: "#00E5FF",
          filter: "blur(140px)",
          opacity: 0.15
        }}
      />

      <Box
        sx={{
          position: "absolute",
          bottom: -120,
          right: -100,
          width: 350,
          height: 350,
          borderRadius: "50%",
          background: "#7C4DFF",
          filter: "blur(140px)",
          opacity: 0.18
        }}
      />

      <Box
        sx={{
          maxWidth: 1400,
          mx: "auto",
          position: "relative",
          zIndex: 2
        }}
      >
             <style>
  {`
    @keyframes blink {
      0% { opacity: 1; }
      50% { opacity: 0; }
      100% { opacity: 1; }
    }

    @keyframes floatIcon {
      0% {
        transform: translateY(0px);
      }

      50% {
        transform: translateY(-10px);
      }

      100% {
        transform: translateY(0px);
      }
    }
  `}
</style>
  
        <Box sx={{ mt: 8 }}></Box>
        {/* HERO */}
        <Grid container spacing={8} alignItems="center">
          <Grid item xs={12} md={6}>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              <Box
                sx={{
                  display: "inline-flex",
                  px: 3,
                  py: 1,
                  borderRadius: "999px",
                  mb: 4,
                  color: "#00E5FF",
                  border: "1px solid rgba(0,229,255,0.25)",
                  background: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(20px)"
                }}
              >
                AI Powered Recruitment Platform
              </Box>

              <Typography
                variant="h2"
                sx={{
                  fontWeight: 900,
                  lineHeight: 1.05,
                  mb: 3,
                  fontSize: { xs: "3rem", md: "5rem" },
                  background:
                    "linear-gradient(120deg,#fff,#00E5FF,#7C4DFF)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
              >
                Smart Future Hiring Experience
              </Typography>

              <Typography
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  lineHeight: 1.9,
                  fontSize: "1.05rem",
                  maxWidth: 560,
                  mb: 5
                }}
              >
                Transform recruitment workflows using advanced AI automation,
                predictive analytics, smart candidate screening, and seamless
                hiring management systems.
              </Typography>

              <Button
                onClick={scrollToForm}
                component={motion.button}
                whileHover={{
                  scale: 1.04,
                  y: -3
                }}
                whileTap={{
                  scale: 0.96
                }}
                sx={{
                  px: 5,
                  py: 1.8,
                  borderRadius: "999px",
                  fontWeight: 700,
                  textTransform: "none",
                  fontSize: "1rem",
                  color: "#fff",
                  background:
                    "linear-gradient(135deg,#00E5FF,#7C4DFF)",
                  boxShadow: "0 25px 60px rgba(0,229,255,0.25)"
                }}
              >
                Contact Our Team
              </Button>
            </motion.div>
          </Grid>

          {/* FEATURE SECTION */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
            >
              <Box
                sx={{
                  p: 4,
                  borderRadius: "34px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(25px)",
                  boxShadow: "0 40px 90px rgba(0,0,0,0.4)"
                }}
              >
 <Typography
  variant="h3"
  sx={{
    fontWeight: 900,
    textAlign: "center",
    mb: 1,
    background:
      "linear-gradient(90deg,#fff,#00E5FF,#7C4DFF)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent"
  }}
>
  Why Choose RMS AI
</Typography>

<Typography
  sx={{
    textAlign: "center",
    color: "rgba(255,255,255,0.65)",
    mb: 5,
    maxWidth: "600px",
    mx: "auto",
    lineHeight: 1.8
  }}
>
  Advanced AI-powered recruitment solutions designed
  to simplify hiring, automate workflows, and improve
  candidate experiences.
</Typography>

<Grid container spacing={3}>
  {supportFeatures.map((item, index) => {
    const Icon = item.icon;

    return (
      <Grid item xs={12} key={index}>
        <motion.div
          initial={{
            opacity: 0,
            x: 40
          }}
          whileInView={{
            opacity: 1,
            x: 0
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: index * 0.15
          }}
          whileHover={{
            x: 8
          }}
        >
          <Box
            sx={{
              position: "relative",
              overflow: "hidden",

              p: 3,

              borderRadius: "28px",

              display: "flex",
              alignItems: "center",

              gap: 3,

              background:
                "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))",

              border:
                "1px solid rgba(255,255,255,0.08)",

              backdropFilter: "blur(18px)",

              transition: "0.4s ease",

              "&:hover": {
                border: `1px solid ${item.accent}`,
                boxShadow: `
                  0 20px 60px ${item.accent}30
                `
              }
            }}
          >
            {/* Glow */}
            <Box
              sx={{
                position: "absolute",
                top: -50,
                right: -50,

                width: 180,
                height: 180,

                borderRadius: "50%",

                background: `${item.accent}20`,

                filter: "blur(70px)"
              }}
            />

            {/* Number */}
            <Typography
              sx={{
                position: "absolute",
                right: 20,
                top: 10,

                fontSize: "3.5rem",
                fontWeight: 900,

                color: "rgba(255,255,255,0.05)"
              }}
            >
              0{index + 1}
            </Typography>

            {/* Icon */}
            <Box
              sx={{
                minWidth: 80,
                width: 80,
                height: 80,

                borderRadius: "24px",

                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                background: `
                  linear-gradient(
                    135deg,
                    ${item.accent},
                    rgba(255,255,255,0.08)
                  )
                `,

                boxShadow: `
                  0 15px 40px ${item.accent}55
                `
              }}
            >
              <Icon
                sx={{
                  color: "#fff",
                  fontSize: 36
                }}
              />
            </Box>

            {/* Content */}
            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: "1.15rem",
                  mb: 1
                }}
              >
                {item.title}
              </Typography>

              <Typography
                sx={{
                  color: "rgba(255,255,255,0.72)",
                  lineHeight: 1.9,
                  mb: 2
                }}
              >
                {item.description}
              </Typography>

              <Box
                sx={{
                  width: 70,
                  height: 4,

                  borderRadius: "999px",

                  background: `
                    linear-gradient(
                      90deg,
                      ${item.accent},
                      transparent
                    )
                  `
                }}
              />
            </Box>

            {/* Arrow */}
            <Box
              sx={{
                width: 50,
                height: 50,

                borderRadius: "16px",

                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                background:
                  "rgba(255,255,255,0.05)",

                border:
                  "1px solid rgba(255,255,255,0.08)"
              }}
            >
              <Typography
                sx={{
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "1.2rem"
                }}
              >
                →
              </Typography>
            </Box>
          </Box>
        </motion.div>
      </Grid>
    );
  })}
</Grid>
              </Box>
            </motion.div>
          </Grid>
        </Grid>

        {/* CONTACT + FORM */}
<Grid
  container
  spacing={6}
  sx={{
    mt: 7,
    alignItems: "flex-start"
  }}
>
  {/* CONTACT INFO */}
 <Grid
  item
  xs={12}
  md={4}
  sx={{
    display: "flex",
    justifyContent: "flex-start"
  }}
>
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <Box
        sx={{
          height: "100%",
          width: "420px",
          position: "relative",
          overflow: "hidden",
          borderRadius: "38px",
          background:
            "linear-gradient(145deg, rgba(15,23,42,0.92), rgba(2,6,23,0.96))",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(30px)",
          boxShadow:
            "0 25px 80px rgba(0,0,0,0.45)",
          p: {
            xs: 0.5,
            md: 1
          },

          "&::before": {
            content: '""',
            position: "absolute",
            top: -120,
            right: -120,
            width: 260,
            height: 260,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(59,130,246,0.35), transparent 70%)",
            filter: "blur(20px)"
          },

          "&::after": {
            content: '""',
            position: "absolute",
            bottom: -140,
            left: -140,
            width: 260,
            height: 260,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(168,85,247,0.28), transparent 70%)",
            filter: "blur(30px)"
          }
        }}
      >
        {/* TOP BADGE */}
        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            display: "inline-flex",
            alignItems: "center",
            gap: 1.2,
            px: 2.5,
            py: 1,
            borderRadius: "999px",
            background: "rgba(255,255,255,0.06)",
            border:
              "1px solid rgba(255,255,255,0.08)",
            mb: 2
          }}
        >
          <Box
            sx={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#22c55e",
              boxShadow:
                "0 0 15px rgba(34,197,94,0.8)"
            }}
          />

          <Typography
            sx={{
              color: "#fff",
              fontWeight: 700,
              fontSize: "10px",
              letterSpacing: "1px"
            }}
          >
            CONTACT SUPPORT 24/7
          </Typography>
        </Box>

        {/* TITLE */}
        <Typography
          variant="h3"
          sx={{
            position: "relative",
            zIndex: 2,
            fontWeight: 900,
            lineHeight: 1.1,
            mb: 1,
            color: "#fff"
          }}
        >
          Let’s Build
          <br />

          <Box
            component="span"
            sx={{
              background:
                "linear-gradient(135deg,#38bdf8,#8b5cf6,#ec4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            Smart Hiring
          </Box>
        </Typography>

        {/* DESCRIPTION */}
        <Typography
          sx={{
            position: "relative",
            zIndex: 2,
            color: "rgba(255,255,255,0.68)",
            lineHeight: 2,
            mb: 2,
            maxWidth: "90%"
          }}
        >
          Connect with our AI recruitment experts for
          enterprise solutions, support, onboarding,
          and intelligent hiring automation.
        </Typography>

        {/* QUICK STATS */}
        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            mb: 2
          }}
        >
          {[
            ["24/7", "Support"],
            ["99.9%", "Uptime"],
            ["500+", "Clients"]
          ].map((item, i) => (
            <Box
              key={i}
              sx={{
                flex: 1,
                minWidth: "110px",
                p: 2,
                borderRadius: "22px",
                background:
                  "rgba(255,255,255,0.05)",
                border:
                  "1px solid rgba(255,255,255,0.06)",
                textAlign: "center",
                transition: "0.4s ease",

                "&:hover": {
                  transform: "translateY(-5px)",
                  background:
                    "rgba(255,255,255,0.08)"
                }
              }}
            >
              <Typography
                sx={{
                  color: "#38bdf8",
                  fontWeight: 900,
                  fontSize: "24px"
                }}
              >
                {item[0]}
              </Typography>

              <Typography
                sx={{
                  color: "#94a3b8",
                  fontSize: "13px"
                }}
              >
                {item[1]}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* CONTACT CARDS */}
        <Stack
          spacing={2}
          sx={{
            position: "relative",
            zIndex: 2
          }}
        >
          {contactDetails.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                whileHover={{
                  y: -6,
                  scale: 1.02
                }}
                transition={{
                  duration: 0.3
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    gap: 2.5,
                    p: 2,
                    borderRadius: "28px",
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.07), rgba(255,255,255,0.03))",
                    border:
                      "1px solid rgba(255,255,255,0.08)",
                    backdropFilter: "blur(18px)",
                    transition: "0.4s ease",

                    "&:hover": {
                      border:
                        "1px solid rgba(56,189,248,0.35)",
                      boxShadow:
                        "0 15px 45px rgba(56,189,248,0.15)"
                    },

                    "&::before": {
                      content: '""',
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(120deg, transparent, rgba(255,255,255,0.08), transparent)",
                      transform: "translateX(-100%)",
                      transition: "0.8s"
                    },

                    "&:hover::before": {
                      transform: "translateX(100%)"
                    }
                  }}
                >
                  {/* ICON */}
                  <Box
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: "24px",
                      display: "grid",
                      placeItems: "center",
                      background: `
                        linear-gradient(
                          135deg,
                          ${item.accent},
                          rgba(255,255,255,0.08)
                        )
                      `,
                      boxShadow: `0 12px 35px ${item.accent}55`,
                      position: "relative",

                      "&::after": {
                        content: '""',
                        position: "absolute",
                        inset: 0,
                        borderRadius: "24px",
                        border:
                          "1px solid rgba(255,255,255,0.12)"
                      }
                    }}
                  >
                    <Icon
                      sx={{
                        color: "#fff",
                        fontSize: 30
                      }}
                    />
                  </Box>

                  {/* TEXT */}
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      sx={{
                        color: "#fff",
                        fontWeight: 800,
                        fontSize: "15px",
                        mb: 0.6
                      }}
                    >
                      {item.title}
                    </Typography>

                    <Typography
                      sx={{
                        color:
                          "rgba(255,255,255,0.65)",
                        lineHeight: 1.8,
                        fontSize: "15px"
                      }}
                    >
                      {item.value}
                    </Typography>
                  </Box>

                  {/* SIDE GLOW */}
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: item.accent,
                      boxShadow: `0 0 18px ${item.accent}`
                    }}
                  />
                </Box>
              </motion.div>
            );
          })}
        </Stack>

        {/* BOTTOM CTA */}
        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            mt: 2,
            p: 4,
            borderRadius: "24px",
            background:
              "linear-gradient(135deg, rgba(56,189,248,0.12), rgba(139,92,246,0.12))",
            border:
              "1px solid rgba(255,255,255,0.08)",
            textAlign: "center"
          }}
        >
          <Typography
            sx={{
              color: "#fff",
              fontWeight: 800,
              mb: 1
            }}
          >
            Need Enterprise Assistance?
          </Typography>

          <Typography
            sx={{
              color: "#94a3b8",
              lineHeight: 1.8,
              fontSize: "14px"
            }}
          >
            Our AI recruitment specialists are available
            for onboarding, support, and advanced hiring
            consultation.
          </Typography>
        </Box>
      </Box>
    </motion.div>
  </Grid>

         {/* FORM */}
<Grid
  item
  xs={12}
  md={7}
  sx={{
    display: "flex",
    justifyContent: "flex-end"
  }}
>
  <motion.div
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
  >
    <Box
      ref={formRef}
      component="form"
      onSubmit={handleSubmit}
      sx={{
         width: "100%",
        maxWidth: "500px",
        position: "relative",
        overflow: "hidden",

        p: {
          xs: 4,
          md: 5
        },

        borderRadius: "38px",

        background: `
          linear-gradient(
            145deg,
            rgba(15,23,42,0.96),
            rgba(30,41,59,0.9)
          )
        `,

        border:
          "1px solid rgba(255,255,255,0.08)",

        backdropFilter: "blur(35px)",

        boxShadow:
          "0 35px 80px rgba(0,0,0,0.45)",

        "&::before": {
          content: '""',
          position: "absolute",
          top: -120,
          right: -120,
          width: 280,
          height: 280,
          borderRadius: "50%",
          background:
            "rgba(0,229,255,0.16)",
          filter: "blur(100px)"
        },

        "&::after": {
          content: '""',
          position: "absolute",
          bottom: -120,
          left: -120,
          width: 280,
          height: 280,
          borderRadius: "50%",
          background:
            "rgba(124,77,255,0.16)",
          filter: "blur(100px)"
        }
      }}
    >
      {/* GRID OVERLAY */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,

          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,

          backgroundSize: "45px 45px",
          opacity: 0.2,
          zIndex: 0
        }}
      />

      {/* CONTENT */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2
        }}
      >
        {/* TOP HEADER */}
        <Stack
          direction={{
            xs: "column",
            sm: "row"
          }}
          spacing={3}
          alignItems={{
            xs: "flex-start",
            sm: "center"
          }}
          justifyContent="space-between"
          sx={{ mb: 4 }}
        >
          <Box>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                lineHeight: 1.1,

                background:
                  "linear-gradient(135deg,#fff,#cbd5e1)",

                WebkitBackgroundClip: "text",
                WebkitTextFillColor:
                  "transparent"
              }}
            >
              Send Us a Message
            </Typography>

            <Typography
              sx={{
                color:
                  "rgba(255,255,255,0.65)",

                mt: 2,
                maxWidth: "520px",
                lineHeight: 1.8
              }}
            >
              Connect with our AI recruitment
              experts for enterprise hiring
              solutions, support, and platform
              guidance.
            </Typography>
          </Box>

          {/* FLOATING ICON */}
          <Box
            sx={{
              minWidth: 90,
              width: 90,
              height: 90,

              borderRadius: "28px",

              display: "grid",
              placeItems: "center",

              background:
                "linear-gradient(135deg,#00E5FF,#7C4DFF)",

              boxShadow:
                "0 20px 50px rgba(0,229,255,0.35)",

              animation:
                "floatIcon 4s ease-in-out infinite"
            }}
          >
            <SendRounded
              sx={{
                color: "#fff",
                fontSize: 42
              }}
            />
          </Box>
        </Stack>

        {/* LIVE INFO */}
        <Box
          sx={{
            mb: 5,

            p: 2.5,

            borderRadius: "24px",

            background:
              "rgba(255,255,255,0.04)",

            border:
              "1px solid rgba(255,255,255,0.08)",

            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",

            flexWrap: "wrap",
            gap: 2
          }}
        >
          <Box>
            <Typography
              sx={{
                color: "#fff",
                fontWeight: 700
              }}
            >
              AI Support Center
            </Typography>

            <Typography
              sx={{
                color:
                  "rgba(255,255,255,0.6)",
                fontSize: "14px"
              }}
            >
              Enterprise support available 24/7
            </Typography>
          </Box>

          <Chip
            label="Response Time • Under 24h"
            sx={{
              height: 42,
              borderRadius: "999px",

              color: "#fff",

              fontWeight: 700,

              background:
                "linear-gradient(135deg,#00E5FF,#7C4DFF)",

              boxShadow:
                "0 10px 30px rgba(0,229,255,0.25)"
            }}
          />
        </Box>

        <Divider
          sx={{
            borderColor:
              "rgba(255,255,255,0.08)",

            mb: 4
          }}
        />

        {/* FORM FIELDS */}
        <Stack spacing={3.5}>
          {/* NAME */}
          <TextField
            sx={{
              ...inputStyles,
              ...errorBoxStyle("name")
            }}
            fullWidth
            variant="filled"
            label="Full Name"
            value={form.name}
            onChange={handleChange("name")}
            error={Boolean(errors.name)}
            helperText={errors.name}
            FormHelperTextProps={{
              sx: {
                textAlign: "right",
                color: "#ff4d4f",
                fontWeight: 500,
                mt: 0.5
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlineOutlined
                    sx={{
                      color: "#00E5FF"
                    }}
                  />
                </InputAdornment>
              ),

              sx: {
                ...inputStyles,

                borderRadius: "22px",

                transition: "0.4s ease",

                "&:hover": {
                  transform:
                    "translateY(-2px)"
                },

                "&.Mui-focused": {
                  boxShadow:
                    "0 0 0 2px rgba(0,229,255,0.25)"
                }
              }
            }}
          />

          {/* EMAIL */}
          <TextField
            sx={{
              ...inputStyles,
              ...errorBoxStyle("email")
            }}
            fullWidth
            variant="filled"
            label="Email Address"
            value={form.email}
            onChange={handleChange("email")}
            error={Boolean(errors.email)}
            helperText={errors.email}
            FormHelperTextProps={{
              sx: {
                textAlign: "right",
                color: "#ff6b6b"
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlined
                    sx={{
                      color: "#00E5FF"
                    }}
                  />
                </InputAdornment>
              ),

              sx: {
                ...inputStyles,
                borderRadius: "22px",

                "&.Mui-focused": {
                  boxShadow:
                    "0 0 0 2px rgba(0,229,255,0.25)"
                }
              }
            }}
          />

          {/* ROW
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                sx={{
                  ...inputStyles,
                  ...errorBoxStyle("company")
                }}
                fullWidth
                variant="filled"
                label="Company Name"
                value={form.company}
                onChange={handleChange("company")}
                error={Boolean(errors.company)}
                helperText={errors.company}
                FormHelperTextProps={{
                  sx: {
                    textAlign: "right",
                    color: "#ff6b6b"
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BusinessOutlined
                        sx={{
                          color: "#00E5FF"
                        }}
                      />
                    </InputAdornment>
                  ),

                  sx: {
                    ...inputStyles,
                    borderRadius: "22px"
                  }
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                sx={{
                  ...inputStyles,
                  ...errorBoxStyle("subject")
                }}
                fullWidth
                variant="filled"
                label="Subject"
                value={form.subject}
                onChange={handleChange("subject")}
                error={Boolean(errors.subject)}
                helperText={errors.subject}
                FormHelperTextProps={{
                  sx: {
                    textAlign: "right",
                    color: "#ff6b6b"
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SubjectOutlined
                        sx={{
                          color: "#00E5FF"
                        }}
                      />
                    </InputAdornment>
                  ),

                  sx: {
                    ...inputStyles,
                    borderRadius: "22px"
                  }
                }}
              />
            </Grid>
          </Grid> */}
          {/* COMPANY */}
<TextField
  sx={{
    ...inputStyles,
    ...errorBoxStyle("company")
  }}
  fullWidth
  variant="filled"
  label="Company Name"
  value={form.company}
  onChange={handleChange("company")}
  error={Boolean(errors.company)}
  helperText={errors.company}
  FormHelperTextProps={{
    sx: {
      textAlign: "right",
      color: "#ff6b6b"
    }
  }}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <BusinessOutlined
          sx={{
            color: "#00E5FF"
          }}
        />
      </InputAdornment>
    ),

    sx: {
      ...inputStyles,
      borderRadius: "22px"
    }
  }}
/>

{/* SUBJECT */}
<TextField
  sx={{
    ...inputStyles,
    ...errorBoxStyle("subject")
  }}
  fullWidth
  variant="filled"
  label="Subject"
  value={form.subject}
  onChange={handleChange("subject")}
  error={Boolean(errors.subject)}
  helperText={errors.subject}
  FormHelperTextProps={{
    sx: {
      textAlign: "right",
      color: "#ff6b6b"
    }
  }}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <SubjectOutlined
          sx={{
            color: "#00E5FF"
          }}
        />
      </InputAdornment>
    ),

    sx: {
      ...inputStyles,
      borderRadius: "22px"
    }
  }}
/>

          {/* MESSAGE */}
          <TextField
            sx={{
              ...inputStyles,
              ...errorBoxStyle("message")
            }}
            fullWidth
            multiline
            minRows={6}
            variant="filled"
            label="Message"
            value={form.message}
            onChange={handleChange("message")}
            error={Boolean(errors.message)}
            helperText={errors.message}
            FormHelperTextProps={{
              sx: {
                textAlign: "right",
                color: "#ff6b6b"
              }
            }}
            InputProps={{
              sx: {
                ...inputStyles,

                borderRadius: "28px",

                "&.Mui-focused": {
                  boxShadow:
                    "0 0 0 2px rgba(124,77,255,0.25)"
                }
              }
            }}
          />

         {/* BUTTON */}
<motion.div
  whileHover={{
    scale: 1.02,
    y: -3
  }}
  whileTap={{
    scale: 0.97
  }}
>
  <Button
    type="submit"
    endIcon={<SendRounded />}
    fullWidth
    sx={{
      position: "relative",
      overflow: "hidden",

      py: 2,
      width: "100%",

      borderRadius: "999px",

      fontWeight: 800,
      textTransform: "none",
      fontSize: "1rem",

      color: "#fff",

      background:
        "linear-gradient(135deg,#00E5FF,#7C4DFF)",

      boxShadow:
        "0 25px 60px rgba(0,229,255,0.25)",

      backdropFilter: "blur(14px)",

      transition: "0.4s ease",

      "&:hover": {
        boxShadow:
          "0 30px 80px rgba(0,229,255,0.35)",

        background:
          "linear-gradient(135deg,#00cfff,#651fff)"
      },

      "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: "-100%",
        width: "100%",
        height: "100%",

        background: `
          linear-gradient(
            120deg,
            transparent,
            rgba(255,255,255,0.3),
            transparent
          )
        `,

        transition: "0.8s"
      },

      "&:hover::before": {
        left: "100%"
      }
    }}
  >
    Send Request
  </Button>
</motion.div>

          {/* STATUS */}
          {status && (
            <motion.div
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
            >
              <Box
                sx={{
                  p: 3,

                  borderRadius: "24px",

                  background: `
                    linear-gradient(
                      135deg,
                      rgba(0,229,255,0.12),
                      rgba(124,77,255,0.1)
                    )
                  `,

                  border:
                    "1px solid rgba(0,229,255,0.2)",

                  backdropFilter:
                    "blur(20px)"
                }}
              >
                <Typography
                  sx={{
                    color: "#fff",
                    fontWeight: 600
                  }}
                >
                  {status}
                </Typography>
              </Box>
            </motion.div>
          )}
        </Stack>
      </Box>
    </Box>
  </motion.div>
</Grid>
        </Grid>

        {/* GOOGLE MAP */}
        <Box sx={{ mt: 7 }}>
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Box
              sx={{
                p: 4,
                borderRadius: "34px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(25px)"
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  mb: 3
                }}
              >
                Our Office Location
              </Typography>

              <Box
                sx={{
                  overflow: "hidden",
                  borderRadius: "26px",
                  height: { xs: 300, md: 500 },
                  border:
                    "1px solid rgba(255,255,255,0.08)"
                }}
              >
                <iframe
                  title="Google Map"
                  src="https://maps.google.com/maps?q=New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{
                    border: 0
                  }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </Box>
            </Box>
          </motion.div>
        </Box>

        {/* CTA */}
        <Box sx={{ mt: 8 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <Box
              sx={{
                p: { xs: 5, md: 8 },
                textAlign: "center",
                borderRadius: "40px",
                background:
                  "linear-gradient(135deg, rgba(0,229,255,0.1), rgba(124,77,255,0.1))",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(25px)",
                overflow: "hidden",
                position: "relative"
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 900,
                  mb: 3
                }}
              >
                Ready To Transform Recruitment?
              </Typography>

              <Typography
                sx={{
                  color: "rgba(255,255,255,0.72)",
                  maxWidth: 700,
                  mx: "auto",
                  lineHeight: 1.9,
                  mb: 4
                }}
              >
                Build smarter hiring pipelines using AI-powered recruitment
                automation and intelligent workforce management solutions.
              </Typography>

              <Button
                component={motion.button}
                whileHover={{
                  scale: 1.04
                }}
                sx={{
                  px: 7,
                  py: 1.9,
                  borderRadius: "999px",
                  textTransform: "none",
                  fontWeight: 700,
                  color: "#fff",
                  background:
                    "linear-gradient(135deg,#7C4DFF,#00E5FF)",
                  boxShadow:
                    "0 25px 60px rgba(124,77,255,0.25)"
                }}
              >
                Request Demo
              </Button>
            </Box>
          </motion.div>
        </Box>
      </Box>

      <style>{`
        .MuiInputLabel-root {
          color: rgba(255,255,255,0.65) !important;
        }

        .MuiFilledInput-root {
          overflow: hidden;
        }

        .MuiFormHelperText-root {
          font-weight: 600 !important;
          margin-right: 6px !important;
        }

        iframe {
          filter: grayscale(1) invert(0.92) contrast(1.1);
        }

        * {
          scroll-behavior: smooth;
        }
      `}</style>
         
 
    </Box>
  );
}