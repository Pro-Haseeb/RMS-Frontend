import { useState, useEffect, useRef } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
  IconButton
} from "@mui/material";
import { motion, useScroll, useTransform } from "framer-motion";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ScheduleIcon from "@mui/icons-material/Schedule";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import BusinessCenterRoundedIcon from "@mui/icons-material/BusinessCenterRounded";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";
import FlashOnRoundedIcon from "@mui/icons-material/FlashOnRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { useNavigate, useParams } from "react-router-dom";
import { getSingleJob } from "../../services/CandidateApi";
import { applyJob } from "../../services/ApplicationApi";



export default function JobDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const fileInputRef = useRef(null);

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [resumeFile, setResumeFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Alert/Toast states
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const candidateId = user._id || user.email || "guest";
  const storageKey = `appliedJobs_${candidateId}`;
  const [alreadyApplied, setAlreadyApplied] = useState(false);

  useEffect(() => {
    const appliedList = JSON.parse(localStorage.getItem(storageKey) || "[]");
    // Support both old format (array of ID strings) and new format (array of objects)
    const isApplied = appliedList.some(item =>
      typeof item === "string" ? item === id : item.id === id
    );
    if (isApplied) {
      setAlreadyApplied(true);
    }
  }, [id, storageKey]);

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        setLoading(true);
       
        

        // Otherwise, fetch from live backend API
        const res = await getSingleJob(id);
        if (res.data) {
          const liveJob = res.data;
          // Format dynamic backend fields into standard UI fields
          setJob({
            id: liveJob._id,
            title: liveJob.title || "Job Position",
            company: liveJob.company?.name || liveJob.company || "Company",
            location: liveJob.location || "Remote",
            salary: liveJob.salary || "Negotiable",
            experience: liveJob.experienceLevel || `${liveJob.experience || 0} Years`,
            level: liveJob.experienceLevel || "Mid Level",
            type: [liveJob.type || "Full Time"],
            deadline: liveJob.deadline ? `Apply by ${new Date(liveJob.deadline).toLocaleDateString()}` : "Apply ASAP",
            badge: "AI Match 90%",
            description: liveJob.description || "No description provided.",
            responsibilities: liveJob.responsibilities || [
              "Own UI systems and frontend deployment pipelines.",
              "Collaborate with development teams to structure SaaS products."
            ],
            requirements: liveJob.requirements || [
              "Strong programming and system design experience.",
              "Familiarity with cloud architectures and frameworks."
            ],
            skills: liveJob.skills || ["React.js", "Node.js", "Express", "MongoDB"],
            benefits: liveJob.benefits || [
              "Competitive salary package & bonus plan.",
              "Flexible remote work structure."
            ],
            overview: liveJob.company?.description || "A leading innovation studio building next generation platforms.",
            bgImage: "https://plus.unsplash.com/premium_photo-1663023612721-e588768ef403?w=600&auto=format&fit=crop&q=60"
          });
        } else {
          // Fallback if not found
          setJob(mockJobDetails[0]);
        }
      } catch (err) {
        console.error("Failed to load job details:", err);
        // Graceful fallback to mock job so page never crashes
        setJob(mockJobDetails[0]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobData();
  }, [id]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
      setToast({ open: true, message: `Resume "${e.target.files[0].name}" loaded. Ready to apply!`, severity: "info" });
    }
  };

  const triggerFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRemoveFile = (e) => {
    e.stopPropagation();
    setResumeFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleApply = async () => {
    if (!resumeFile) {
      setToast({ open: true, message: "Please upload your CV/Resume first!", severity: "warning" });
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      // Use standard jobId parameter matching backend controller (req.body.jobId)
      formData.append("jobId", id);
      formData.append("resume", resumeFile);

      const res = await applyJob(formData);
      setToast({
        open: true,
        message: res.data?.message || "Applied Successfully! Good luck!",
        severity: "success"
      });
      
      // Save applied job in localStorage
      const appliedList = JSON.parse(localStorage.getItem(storageKey) || "[]");
      if (!appliedList.includes(id)) {
        appliedList.push(id);
        localStorage.setItem(storageKey, JSON.stringify(appliedList));
      }
      setAlreadyApplied(true);
      
      // Clear loaded file after success
      setResumeFile(null);
    } catch (err) {
      console.error("Failed to apply for job:", err);
      const errMsg = err.response?.data?.message || "Failed to submit application. Please try again.";
      setToast({ open: true, message: errMsg, severity: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleCloseToast = () => {
    setToast(prev => ({ ...prev, open: false }));
  };

  const { scrollYProgress } = useScroll();
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  if (loading) {
    return (
      <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#020617", color: "#fff" }}>
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress color="primary" sx={{ mb: 2 }} />
          <Typography variant="h6" sx={{ color: "#64748b" }}>Loading position specs...</Typography>
        </Box>
      </Box>
    );
  }

  if (!job) return null;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#020617 0%, #081120 30%, #0f172a 70%, #111827 100%)",
        overflow: "hidden",
        position: "relative",
        color: "#fff"
      }}
    >
      {/* PREMIUM BACKGROUND EFFECTS */}
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          background: `
            radial-gradient(circle at top left, rgba(37,99,235,0.25), transparent 25%),
            radial-gradient(circle at top right, rgba(96,165,250,0.18), transparent 25%),
            radial-gradient(circle at bottom right, rgba(59,130,246,0.22), transparent 30%)
          `,
          zIndex: 0
        }}
      />

      {/* GRID OVERLAY */}
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "45px 45px",
          opacity: 0.18,
          zIndex: 0
        }}
      />

      {/* FLOATING BLUR CIRCLES */}
      <Box
        sx={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "rgba(37,99,235,0.22)",
          filter: "blur(130px)",
          top: -180,
          left: -160,
          zIndex: 0
        }}
      />

      <Box
        sx={{
          position: "absolute",
          width: 420,
          height: 420,
          borderRadius: "50%",
          background: "rgba(59,130,246,0.18)",
          filter: "blur(120px)",
          bottom: -120,
          right: -120,
          zIndex: 0
        }}
      />

      {/* HERO HERO CONTAINER */}
      <Box sx={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", pt: 6 }}>
        {/* HERO BACKGROUND */}
        <motion.div style={{ scale: imageScale, position: "absolute", inset: 0 }}>
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(rgba(2,6,23,0.78), rgba(2,6,23,0.92)), url(${job.bgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          />
        </motion.div>

        {/* EXTRA OVERLAY */}
        <Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(2,6,23,0.7), rgba(15,23,42,0.85))" }} />

        <Container sx={{ position: "relative", zIndex: 5, py: 6 }}>
          {/* BACK BUTTON */}
          <Button
            startIcon={<ArrowBackIosNewIcon sx={{ fontSize: "14px !important" }} />}
            onClick={() => navigate(-1)}
            sx={{
              mb: 5,
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.15)",
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(20px)",
              borderRadius: "14px",
              px: 3,
              py: 1,
              textTransform: "none",
              fontWeight: 600,
              "&:hover": { background: "rgba(66,165,245,0.12)" }
            }}
          >
            Back to Jobs
          </Button>

          <Grid container spacing={7} alignItems="center">
            {/* LEFT SIDE */}
            <Grid item xs={12} md={7}>
              <motion.div initial={{ opacity: 0, y: 80 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                {/* BADGES */}
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 4 }}>
                  <Chip
                    icon={<FlashOnRoundedIcon style={{ color: "#fff" }} />}
                    label={job.badge}
                    sx={{
                      background: "linear-gradient(135deg,#1976d2,#42a5f5)",
                      color: "#fff",
                      fontWeight: 700,
                      px: 1,
                      boxShadow: "0 10px 25px rgba(66,165,245,0.3)"
                    }}
                  />
                  <Chip
                    icon={<WorkspacePremiumRoundedIcon style={{ color: "#fbbf24" }} />}
                    label="Premium Opportunity"
                    sx={{
                      background: "rgba(255,255,255,0.08)",
                      color: "#fff",
                      border: "1px solid rgba(255,255,255,0.12)",
                      backdropFilter: "blur(12px)"
                    }}
                  />
                </Box>

                {/* TITLE */}
                <Typography
                  sx={{
                    fontWeight: 900,
                    lineHeight: 1.1,
                    mb: 3,
                    fontSize: { xs: "2.5rem", md: "4rem" },
                    background: "linear-gradient(135deg,#ffffff,#90caf9,#42a5f5)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textShadow: "0 10px 40px rgba(66,165,245,0.2)"
                  }}
                >
                  {job.title}
                </Typography>

                {/* COMPANY */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
                  <Avatar sx={{ width: 65, height: 65, background: "linear-gradient(135deg,#1976d2,#42a5f5)", fontWeight: 800, fontSize: "1.5rem", boxShadow: "0 12px 35px rgba(66,165,245,0.35)" }}>
                    {job.company[0].toUpperCase()}
                  </Avatar>
                  <Box>
                    <Typography sx={{ fontWeight: 800, fontSize: "1.3rem", color: "#fff" }}>
                      {job.company}
                    </Typography>
                    <Typography sx={{ color: "#94a3b8" }}>
                      Verified Enterprise Partner
                    </Typography>
                  </Box>
                </Box>

                {/* DESCRIPTION */}
                <Typography sx={{ color: "#cbd5e1", fontSize: "1.08rem", lineHeight: 2, maxWidth: "700px", mb: 5 }}>
                  {job.description}
                </Typography>

                {/* INFO BOXES */}
                <Grid container spacing={2} sx={{ mb: 5 }}>
                  {[
                    { icon: <LocationOnIcon />, value: job.location },
                    { icon: <BusinessCenterRoundedIcon />, value: job.type.join(" • ") },
                    { icon: <TrendingUpRoundedIcon />, value: job.salary }
                  ].map((item, i) => (
                    <Grid item xs={12} sm={4} key={i}>
                      <Box
                        sx={{
                          p: 2.5,
                          borderRadius: "24px",
                          background: "rgba(255,255,255,0.07)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          backdropFilter: "blur(20px)",
                          display: "flex",
                          alignItems: "center",
                          gap: 1.5,
                          transition: "0.35s",
                          "&:hover": {
                            transform: "translateY(-6px)",
                            background: "rgba(66,165,245,0.1)",
                            boxShadow: "0 18px 40px rgba(0,0,0,0.35)"
                          }
                        }}
                      >
                        <Box sx={{ color: "#42a5f5", display: "flex", alignItems: "center" }}>{item.icon}</Box>
                        <Typography sx={{ fontWeight: 600, color: "#fff", fontSize: "0.95rem" }}>
                          {item.value}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>

                {/* FILE INPUT UPLOADER */}
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />

                {/* BUTTONS */}
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", alignItems: "center" }}>
                  <Button
                    variant="contained"
                    size="large"
                    disabled={submitting || alreadyApplied}
                    onClick={handleApply}
                    sx={{
                      px: 5,
                      py: 1.8,
                      borderRadius: "18px",
                      textTransform: "none",
                      fontWeight: 700,
                      fontSize: "1rem",
                      background: alreadyApplied 
                        ? "linear-gradient(135deg,#10b981,#059669)" 
                        : "linear-gradient(135deg,#1976d2,#42a5f5)",
                      boxShadow: alreadyApplied 
                        ? "0 20px 50px rgba(16,185,129,0.35)" 
                        : "0 20px 50px rgba(66,165,245,0.35)",
                      transition: "0.4s",
                      "&:hover": {
                        transform: alreadyApplied ? "none" : "translateY(-6px) scale(1.03)",
                        boxShadow: alreadyApplied 
                          ? "0 20px 50px rgba(16,185,129,0.35)" 
                          : "0 25px 60px rgba(66,165,245,0.45)"
                      },
                      "&.Mui-disabled": alreadyApplied ? {
                        background: "linear-gradient(135deg,#10b981,#059669) !important",
                        color: "#fff !important",
                        opacity: 0.9
                      } : { opacity: 0.5, color: "#94a3b8" }
                    }}
                  >
                    {submitting ? (
                      <CircularProgress size={22} color="inherit" />
                    ) : alreadyApplied ? (
                      "Applied"
                    ) : (
                      "Apply Now"
                    )}
                  </Button>

                  <Button
                    variant="outlined"
                    startIcon={resumeFile ? <CheckCircleOutlineRoundedIcon sx={{ color: "#4ade80" }} /> : <UploadFileIcon />}
                    onClick={triggerFileUpload}
                    sx={{
                      px: 4,
                      py: 1.8,
                      borderRadius: "18px",
                      color: "#fff",
                      borderColor: resumeFile ? "#4ade80" : "rgba(255,255,255,0.18)",
                      backdropFilter: "blur(20px)",
                      textTransform: "none",
                      fontWeight: 600,
                      "&:hover": {
                        borderColor: resumeFile ? "#22c55e" : "#42a5f5",
                        background: "rgba(66,165,245,0.08)"
                      }
                    }}
                  >
                    {resumeFile ? `${resumeFile.name.slice(0, 15)}...` : "Upload CV"}
                    {resumeFile && (
                      <IconButton size="small" onClick={handleRemoveFile} sx={{ ml: 1, color: "#ef4444" }}>
                        <DeleteIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    )}
                  </Button>
                </Box>
              </motion.div>
            </Grid>

            {/* RIGHT SIDE CARD */}
            <Grid item xs={12} md={5}>
              <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 6, repeat: Infinity }}>
                <Card
                  sx={{
                    borderRadius: "36px",
                    overflow: "hidden",
                    background: "linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))",
                    border: "1px solid rgba(255,255,255,0.1)",
                    backdropFilter: "blur(30px)",
                    boxShadow: "0 40px 120px rgba(0,0,0,0.55)"
                  }}
                >
                  {/* PREMIUM TOP DESIGN */}
                  <Box
                    sx={{
                      height: 220,
                      position: "relative",
                      overflow: "hidden",
                      background: "linear-gradient(135deg,#0f172a 0%, #091023 45%, #283f6f 100%)"
                    }}
                  >
                    {/* GLOW EFFECT */}
                    <Box sx={{ position: "absolute", width: 260, height: 260, borderRadius: "50%", background: "rgba(255,255,255,0.12)", filter: "blur(40px)", top: -80, right: -60 }} />
                    <Box sx={{ position: "absolute", width: 180, height: 180, borderRadius: "50%", background: "rgba(96,165,250,0.25)", filter: "blur(30px)", bottom: -60, left: -40 }} />

                    {/* COMPANY ICON */}
                    <Box sx={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", zIndex: 2 }}>
                      <Avatar sx={{ width: 90, height: 90, mb: 2, fontSize: "2rem", fontWeight: 900, background: "linear-gradient(135deg,#fff,#bfdbfe)", color: "#0f172a", boxShadow: "0 20px 60px rgba(255,255,255,0.25)" }}>
                        {job.company[0].toUpperCase()}
                      </Avatar>
                      <Typography sx={{ fontWeight: 800, fontSize: "1.3rem", color: "#fff" }}>
                        {job.company}
                      </Typography>
                    </Box>
                  </Box>

                  <CardContent sx={{ p: 5 }}>
                    <Typography variant="h5" sx={{ fontWeight: 800, mb: 1, color: "#fff" }}>
                      About {job.company}
                    </Typography>

                    <Typography sx={{ color: "#94a3b8", lineHeight: 1.9, mb: 4, fontSize: "14px" }}>
                      {job.overview}
                    </Typography>

                    <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", mb: 4 }} />

                    <Grid container spacing={2}>
                      {[
                        ["Experience", job.experience],
                        ["Level", job.level],
                        ["Deadline", job.deadline],
                        ["Salary", job.salary]
                      ].map(([label, value]) => (
                        <Grid item xs={6} key={label}>
                          <Box sx={{ p: 2, borderRadius: "20px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                            <Typography sx={{ color: "#94a3b8", fontSize: "0.8rem", mb: 0.5 }}>
                              {label}
                            </Typography>
                            <Typography sx={{ color: "#fff", fontWeight: 700, fontSize: "13px" }}>
                              {value}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

  

      {/* SNACKBAR ALERTS */}
      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseToast}
          severity={toast.severity}
          variant="filled"
          sx={{
            borderRadius: "16px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
            fontWeight: 600,
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.1)"
          }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
