import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  AppBar,
  Toolbar,
  InputAdornment,
  Select,
  MenuItem,
  Grid
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { requestDemo } from "../services/AdminApi";
import Footer from "../components/Footer";

export default function RequestDemo() {
  const navigate = useNavigate();

  // FORM STATE
  const [form, setForm] = useState({
    company: "",
    website: "",
    size: "",
    email: "",
    phone: "",
    countryCode: "+92"
  });

  const countryCodes = [
    { code: "+92", label: "Pakistan" },
    { code: "+91", label: "India" },
    { code: "+1", label: "USA" },
    { code: "+44", label: "UK" },
    { code: "+971", label: "UAE" }
  ];

  // ✅ SUGGESTIONS STATE
  const [suggestions, setSuggestions] = useState({});

  // ✅ SUBMIT HANDLER (top-level so button's onClick can access it)
  const handleReqeustDemo = async () => {
    try {
      // Map form field names to what the backend expects
      const payload = {
        companyName: form.company,
        website: form.website,
        companySize: form.size,
        officialEmail: form.email,
        contactNumber: form.countryCode + form.phone
      };

      const res = await requestDemo(payload);
      console.log(res.data);
      alert("Demo requested successfully!")
      navigate("/demo");
    } catch (error) {
      console.log(error);

        if (
      error.response?.status === 400 
    ) {
      alert(error.response.message);
    } else {
      alert("Something went wrong. Please try again.");
    }
    }
  };

  // ✅ LIVE CHECK FUNCTION
  const handleLiveCheck = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });

    let msg = "";

    if (name === "company") {
      if (value.length > 0 && value.length < 3)
        msg = "Company name too short";
    }

    if (name === "website") {
      if (value && !value.includes(".") && !value.includes("www"))
        msg = "Invalid website format (example.com)";
    }

    if (name === "email") {
      if (value && !/\S+@\S+\.\S+/.test(value))
        msg = "Invalid email format";
    }

    if (name === "phone") {
      if (value && !/^\d*$/.test(value))
        msg = "Only numbers allowed";
    }

    setSuggestions({ ...suggestions, [name]: msg });
  };

  return (
    <>
      {/* MAIN BG */}
      <Box
        sx={{
          background: "#020617",
          minHeight: "100vh",
          color: "white"
        }}
      >

        <Box
          sx={{
            py: 14,
            textAlign: "center",
            color: "white",
            position: "relative",
            overflow: "hidden",
            backgroundImage:
              "url(https://images.unsplash.com/photo-1504384308090-c894fdcc538d)",
            backgroundSize: "cover",
            backgroundPosition: "center",

            "@keyframes fadeUp": {
              from: { opacity: 0, transform: "translateY(40px)" },
              to: { opacity: 1, transform: "translateY(0)" }
            }
          }}
        >
          {/* OVERLAY */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to right, rgba(2,6,23,0.96), rgba(15,23,42,0.88))"
            }}
          />

          {/* BLOBS */}
          <Box
            sx={{
              position: "absolute",
              width: 250,
              height: 250,
              background: "#42a5f5",
              borderRadius: "50%",
              filter: "blur(120px)",
              top: 50,
              left: -80,
              opacity: 0.5
            }}
          />

          <Box
            sx={{
              position: "absolute",
              width: 250,
              height: 250,
              background: "#1976d2",
              borderRadius: "50%",
              filter: "blur(120px)",
              bottom: 50,
              right: -80,
              opacity: 0.5
            }}
          />

          {/* CONTENT */}
          <Box
            sx={{
              position: "relative",
              maxWidth: 700,
              mx: "auto",
              animation: "fadeUp 1s ease"
            }}
          >
            <Typography
              sx={{
                background: "rgba(66,165,245,0.12)",
                border: "1px solid rgba(255,255,255,0.08)",
                px: 3,
                py: 1,
                borderRadius: "20px",
                display: "inline-block",
                mb: 3,
                color: "#90caf9"
              }}
            >
              AI-Powered Platform
            </Typography>

            <Typography variant="h3" fontWeight="bold" sx={{ fontSize: { xs: '2rem', md: '3rem' } }}>
              Request a Demo
            </Typography>

            <Typography mt={2} fontSize="18px" color="#cbd5e1">
              See how RecruitAI can transform your hiring process.
            </Typography>

            {/* BUTTONS */}
            <Box
              mt={4}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "20px"
              }}
            >

              {/* GET DEMO */}
              <Button
                variant="contained"
                size="large"
                sx={{
                  minWidth: "180px",
                  px: 4,
                  py: 1.2,
                  borderRadius: "14px",
                  background:
                    "linear-gradient(135deg,#1976d2,#42a5f5)",
                  color: "#fff",
                  fontWeight: "bold",
                  transition: "all 0.3s ease",

                  "&:hover": {
                    background:
                      "linear-gradient(135deg,#1565c0,#1e88e5)",
                    transform: "translateY(-3px) scale(1.05)",
                    boxShadow:
                      "0 10px 25px rgba(66,165,245,0.4)"
                  }
                }}
              >
                Get Demo
              </Button>

             </Box>
          </Box>
        </Box>

        {/* WHAT YOU GET */}
        <Box
          sx={{
            textAlign: "center",
            mt: 8,
            mb: 2,
            animation: "fadeUp 1s ease"
          }}
        >
          <Typography variant="h5" fontWeight="bold" color="white">
            What you'll get in the demo
          </Typography>

          <Typography color="#94a3b8" mt={1}>
            Our product specialists will walk you through a live demo tailored to your company.
          </Typography>
        </Box>

        {/* GREEN CARD */}
        <Container sx={{ mt: 4, mb: 6 }}>
          <Box
            sx={{
              p: 4,
              borderRadius: "25px",
              background:
                "linear-gradient(135deg,#0f172a,#111827)",
              border: "1px solid rgba(255,255,255,0.06)",
              color: "white",
              boxShadow:
                "0 10px 30px rgba(0,0,0,0.25)",
              textAlign: "center",
              transition: "0.3s",

              "&:hover": {
                transform: "translateY(-6px)",
                boxShadow:
                  "0 20px 40px rgba(66,165,245,0.18)"
              }
            }}
          >
            <Typography
              fontWeight="bold"
              fontSize="18px"
              color="#42a5f5"
            >
              Trusted by 500+ companies
            </Typography>

            <Typography variant="body2" mt={1} color="#cbd5e1">
              From startups to Fortune 500 enterprises, RecruitAI helps teams hire 3x faster.
            </Typography>
          </Box>
        </Container>

        {/* MAIN SECTION */}
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            py: 10,
            background:
              "linear-gradient(180deg,#020617,#0f172a)"
          }}
        >

          {/* FORM */}
          <Container maxWidth="md">
            <Paper
              sx={{
                p: 5,
                borderRadius: "28px",
                background:
                  "rgba(15,23,42,0.9)",
                backdropFilter: "blur(18px)",
                border:
                  "1px solid rgba(255,255,255,0.08)",
                boxShadow:
                  "0 25px 60px rgba(0,0,0,0.45)"
              }}
            >

              <Typography
                variant="h5"
                fontWeight="bold"
                textAlign="center"
                sx={{
                  mb: 5,
                  fontSize: { xs: '1.5rem', md: '2rem' },
                  color: "#fff",
                  letterSpacing: "1px",
                  textShadow: "0 0 12px rgba(255,255,255,0.25)"
                }}
              >
                Company Details
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>

                {/* COMPANY */}
                <TextField
                  label="Company Name"
                  name="company"
                  value={form.company}
                  onChange={handleLiveCheck}
                  error={!!suggestions.company}
                  helperText={suggestions.company}
                  fullWidth
                  InputLabelProps={{
                    style: { color: "#4472b2" }
                  }}
                  sx={{
                    "& .MuiInputLabel-root": {
                  color: "#94a3b8"
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                  color: "#42a5f5"
                    },
                    "& .MuiInputLabel-root.MuiFormLabel-filled": {
                  color: "#42a5f5"
                    },
                    "& .MuiOutlinedInput-root": {
                      color: "white",
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
                    }
                  }}
                />

                {/* WEBSITE */}
                <TextField
                  label="Website"
                  name="website"
                  value={form.website}
                  onChange={handleLiveCheck}
                  error={!!suggestions.website}
                  helperText={suggestions.website}
                  fullWidth
                  InputLabelProps={{
                    style: { color: "#94a3b8" }
                  }}
                  sx={{
                    "& .MuiInputLabel-root": {
                  color: "#94a3b8"
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                  color: "#42a5f5"
                    },
                    "& .MuiInputLabel-root.MuiFormLabel-filled": {
                  color: "#42a5f5"
                    },
                    "& .MuiOutlinedInput-root": {
                      color: "white",
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
                    }
                  }}
                />

                {/* SIZE */}
                <TextField
                  label="Company Size"
                  name="size"
                  value={form.size}
                  onChange={handleLiveCheck}
                  error={!!suggestions.size}
                  helperText={suggestions.size}
                  fullWidth
                  InputLabelProps={{
                    style: { color: "#94a3b8" }
                  }}
                  sx={{
                    "& .MuiInputLabel-root": {
                  color: "#94a3b8"
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                  color: "#42a5f5"
                    },
                    "& .MuiInputLabel-root.MuiFormLabel-filled": {
                  color: "#42a5f5"
                    },
                    "& .MuiOutlinedInput-root": {
                      color: "white",
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
                    }
                  }}
                />

                {/* EMAIL */}
                <TextField
                  label="Work Email"
                  name="email"
                  value={form.email}
                  onChange={handleLiveCheck}
                  error={!!suggestions.email}
                  helperText={suggestions.email}
                  fullWidth
                  InputLabelProps={{
                    style: { color: "#94a3b8" }
                  }}
                  sx={{
                    "& .MuiInputLabel-root": {
                  color: "#94a3b8"
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                  color: "#42a5f5"
                    },
                    "& .MuiInputLabel-root.MuiFormLabel-filled": {
                  color: "#42a5f5"
                    },
                    "& .MuiOutlinedInput-root": {
                      color: "white",
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
                    }
                  }}
                />

                {/* PHONE */}
                <Box sx={{ display: "flex", gap: 1.5 }}>
                
                  {/* COUNTRY CODE */}
                  <TextField
                    select
                    value={form.countryCode}
                    onChange={(e) =>
                      setForm({ ...form, countryCode: e.target.value })
                    }
                    label="Code"
                    sx={{
                      minWidth: "110px",
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
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#42a5f5"
                      }
                    }}
                  >
                    {countryCodes.map((item, i) => (
                      <MenuItem key={i} value={item.code}>
                        {item.code}
                      </MenuItem>
                    ))}
                  </TextField>
                
                  {/* PHONE NUMBER */}
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    value={form.phone}
                    onChange={handleLiveCheck}
                    sx={{
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
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#42a5f5"
                      }
                    }}
                  />
                </Box>

                {/* ERROR MESSAGE */}
                {suggestions.phone && (
                  <Typography
                    sx={{
                      color: "#ef4444",
                      fontSize: "12px",
                      mt: 0.5,
                      ml: 1
                    }}
                  >
                    {suggestions.phone}
                  </Typography>
                )}
              </Box>

              <Button
                variant="contained"
                onClick={handleReqeustDemo}
                fullWidth
                sx={{
                  mt: 4,
                  py: 1.6,
                  borderRadius: "14px",
                  fontWeight: "bold",
                  fontSize: "16px",
                  background:
                    "linear-gradient(135deg,#1976d2,#42a5f5)",

                  "&:hover": {
                    background:
                      "linear-gradient(135deg,#1565c0,#1e88e5)",
                    transform: "translateY(-2px)",
                    boxShadow:
                      "0 10px 25px rgba(66,165,245,0.35)"
                  }
                }}
              >
                Submit Request
              </Button>
            </Paper>
          </Container>
        </Box>
        {/* 🔵 PREMIUM FOOTER */}
        <Footer/>
      </Box>
    </>
  );
}