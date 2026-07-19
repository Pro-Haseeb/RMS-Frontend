// import { useState, useEffect } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Button,
//   Box,
//   Typography,
//   MenuItem,
//   CircularProgress,
//   Alert,
//   Grid,
// } from "@mui/material";
// import {
//   Close as CloseIcon,
//   VideoCall as VideoCallIcon,
//   Schedule as ScheduleIcon,
// } from "@mui/icons-material";
// import { scheduleInterview, getInterviewers } from "../../services/CompanyApi";

// export default function ScheduleInterviewModal({ open, onClose, application, onSuccess }) {
//   const [formData, setFormData] = useState({
//     interviewer: "",
//     interviewDate: "",
//     interviewType: "online",
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [interviewers, setInterviewers] = useState([]);
//   const [loadingInterviewers, setLoadingInterviewers] = useState(false);

//   useEffect(() => {
//     if (!open) return;

//     const fetchInterviewers = async () => {
//       setLoadingInterviewers(true);
//       try {
//         const response = await getInterviewers();
//         if (response.data?.success) {
//           setInterviewers(response.data.data || []);
//         }
//       } catch (err) {
//         setError(err.response?.data?.message || "Failed to load interviewers");
//       } finally {
//         setLoadingInterviewers(false);
//       }
//     };

//     fetchInterviewers();
//   }, [open]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     setError("");
//   };

//   const handleSubmit = async () => {
//     // Validate
//     if (!formData.interviewer || !formData.interviewDate) {
//       setError("Please fill in all required fields");
//       return;
//     }

//     if (!application?._id) {
//       setError("Invalid application");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await scheduleInterview(
//         application._id,
//         formData.interviewer,
//         formData.interviewDate,
//         formData.interviewType
//       );

//       if (response.data?.success) {
//         onSuccess?.();
//         handleClose();
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to schedule interview");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClose = () => {
//     setFormData({ interviewer: "", interviewDate: "", interviewType: "online" });
//     setError("");
//     onClose();
//   };

//   if (!application) return null;

//   // Get min datetime (today at 8 AM)
//   const now = new Date();
//   now.setHours(8, 0);
//   const minDateTime = now.toISOString().slice(0, 16);

//   return (
//     <Dialog
//       open={open}
//       onClose={handleClose}
//       maxWidth="sm"
//       fullWidth
//       sx={{
//     '& .MuiDialog-paper': {
//       borderRadius: '20px',
//       backgroundColor: '#0f172a',
//       color: '#fff',
//       backdropFilter: 'blur(20px)',
//       border: '1px solid rgba(255,255,255,0.08)',
//       boxShadow: '0 25px 80px rgba(0,0,0,0.5)',
//       overflowY: 'auto',
//       maxHeight: '90vh',
//     }
//       }}
//     >
//       <DialogTitle
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           background: "rgba(96,165,250,0.05)",
//           borderBottom: "1px solid rgba(255,255,255,0.08)",
//           pb: 2,
//         }}
//       >
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
//           <ScheduleIcon sx={{ color: "#60a5fa", fontSize: 24 }} />
//           <Typography variant="h6" fontWeight={700} sx={{ color: "#fff" }}>
//             Schedule Interview
//           </Typography>
//         </Box>
//       </DialogTitle>

//       <DialogContent sx={{ pt: 3 }}>
//         {/* Candidate Info */}
//         <Box
//           sx={{
//             p: 2,
//             mb: 3,
//             borderRadius: "12px",
//             background: "rgba(96,165,250,0.05)",
//             border: "1px solid rgba(96,165,250,0.15)",
//           }}
//         >
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6}>
//               <Typography sx={{ color: "#64748b", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", mb: 0.5 }}>
//                 Candidate
//               </Typography>
//               <Typography sx={{ color: "#fff", fontWeight: 700 }}>
//                 {application.candidate?.name || application.candidateName}
//               </Typography>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Typography sx={{ color: "#64748b", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", mb: 0.5 }}>
//                 Applied For
//               </Typography>
//               <Typography sx={{ color: "#fff", fontWeight: 700 }}>
//                 {application.job?.title}
//               </Typography>
//             </Grid>
//             <Grid item xs={12}>
//               <Typography sx={{ color: "#64748b", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", mb: 0.5 }}>
//                 Score
//               </Typography>
//               <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                 <Box
//                   sx={{
//                     width: "100%",
//                     height: 8,
//                     borderRadius: 2,
//                     background: "rgba(255,255,255,0.08)",
//                     overflow: "hidden",
//                   }}
//                 >
//                   <Box
//                     sx={{
//                       width: `${Math.min(application.score || 0, 100)}%`,
//                       height: "100%",
//                       background: "linear-gradient(90deg, #60a5fa, #34d399)",
//                       transition: "width 0.3s ease",
//                     }}
//                   />
//                 </Box>
//                 <Typography sx={{ color: "#60a5fa", fontWeight: 700, minWidth: 35 }}>
//                   {Math.round(application.score || 0)}%
//                 </Typography>
//               </Box>
//             </Grid>
//           </Grid>
//         </Box>

//         {error && (
//           <Alert
//             severity="error"
//             sx={{
//               mb: 2,
//               borderRadius: "10px",
//               background: "rgba(239,68,68,0.1)",
//               border: "1px solid rgba(239,68,68,0.2)",
//               color: "#fca5a5",
//               "& .MuiAlert-icon": { color: "#f87171" },
//             }}
//           >
//             {error}
//           </Alert>
//         )}

//         {/* Form Fields */}
//         <Grid container spacing={2.5}>
//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               select
//               label="Interviewer *"
//               name="interviewer"
//               value={formData.interviewer}
//               onChange={handleChange}
//               disabled={loadingInterviewers}
//               sx={{
//                 "& .MuiOutlinedInput-root": {
//                   color: "#fff",
//                   background: "rgba(255,255,255,0.03)",
//                   borderRadius: "12px",
//                   "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
//                   "&:hover fieldset": { borderColor: "rgba(255,255,255,0.2)" },
//                   "&.Mui-focused fieldset": { borderColor: "#60a5fa" },
//                 },
//                 "& .MuiInputLabel-root": { color: "#94a3b8" },
//                 "& .MuiInputLabel-root.Mui-focused": { color: "#60a5fa" },
//                 "& .MuiSelect-icon": { color: "#64748b" },
//               }}
//               SelectProps={{
//                 MenuProps: {
//                   PaperProps: {
//                     sx: {
//                       background: "#0f172a",
//                       border: "1px solid rgba(255,255,255,0.08)",
//                     },
//                   },
//                 },
//               }}
//             >
//               {interviewers.length === 0 ? (
//                 <MenuItem disabled value="">
//                   {loadingInterviewers ? "Loading interviewers..." : "No team members available"}
//                 </MenuItem>
//               ) : (
//                 interviewers.map((member) => (
//                   <MenuItem key={member._id} value={member._id} sx={{ color: "#fff" }}>
//                     {member.name} ({member.role === "company_admin" ? "Admin" : "HR"})
//                   </MenuItem>
//                 ))
//               )}
//             </TextField>
//           </Grid>

//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               label="Date & Time *"
//               name="interviewDate"
//               type="datetime-local"
//               value={formData.interviewDate}
//               onChange={handleChange}
//               inputProps={{ min: minDateTime }}
//               InputLabelProps={{ shrink: true }}
//               sx={{
//                 "& .MuiOutlinedInput-root": {
//                   color: "#fff",
//                   background: "rgba(255,255,255,0.03)",
//                   borderRadius: "12px",
//                   "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
//                   "&:hover fieldset": { borderColor: "rgba(255,255,255,0.2)" },
//                   "&.Mui-focused fieldset": { borderColor: "#60a5fa" },
//                 },
//                 "& .MuiInputLabel-root": { color: "#94a3b8" },
//                 "& .MuiInputLabel-root.Mui-focused": { color: "#60a5fa" },
//               }}
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               select
//               label="Interview Type *"
//               name="interviewType"
//               value={formData.interviewType}
//               onChange={handleChange}
//               sx={{
//                 "& .MuiOutlinedInput-root": {
//                   color: "#fff",
//                   background: "rgba(255,255,255,0.03)",
//                   borderRadius: "12px",
//                   "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
//                   "&:hover fieldset": { borderColor: "rgba(255,255,255,0.2)" },
//                   "&.Mui-focused fieldset": { borderColor: "#60a5fa" },
//                 },
//                 "& .MuiInputLabel-root": { color: "#94a3b8" },
//                 "& .MuiInputLabel-root.Mui-focused": { color: "#60a5fa" },
//                 "& .MuiSelect-icon": { color: "#64748b" },
//               }}
//               SelectProps={{
//                 MenuProps: {
//                   PaperProps: {
//                     sx: {
//                       background: "#0f172a",
//                       border: "1px solid rgba(255,255,255,0.08)",
//                     },
//                   },
//                 },
//               }}
//             >
//               <MenuItem value="online" sx={{ color: "#60a5fa" }}>
//                 Online
//               </MenuItem>
//               <MenuItem value="onsite" sx={{ color: "#34d399" }}>
//                 Onsite
//               </MenuItem>
//             </TextField>
//           </Grid>
//         </Grid>

//         <Typography sx={{ color: "#64748b", fontSize: "12px", mt: 2 }}>
//           A meeting link will be automatically generated and shared with the candidate.
//         </Typography>
//       </DialogContent>

//       <DialogActions
//         sx={{
//           p: 2,
//           borderTop: "1px solid rgba(255,255,255,0.06)",
//         }}
//       >
//         <Button
//           onClick={handleClose}
//           disabled={loading}
//           sx={{ 
//             textTransform: "none", 
//             color: "#64748b", 
//             fontWeight: 600,
//             "&:hover": {
//               background: "rgba(255,255,255,0.03)",
//             },
//           }}
//         >
//           Cancel
//         </Button>
//         <Button
//           onClick={handleSubmit}
//           disabled={loading}
//           variant="contained"
//           startIcon={loading ? <CircularProgress size={18} /> : <VideoCallIcon />}
//           sx={{
//             background: "linear-gradient(135deg, #2563eb, #7c3aed)",
//             textTransform: "none",
//             fontWeight: 700,
//             borderRadius: "10px",
//             "&:hover": { background: "linear-gradient(135deg, #1d4ed8, #6d28d9)" },
//             "&.Mui-disabled": { background: "rgba(59,130,246,0.3)", color: "rgba(255,255,255,0.5)" },
//           }}
//         >
//           {loading ? "Scheduling..." : "Schedule Interview"}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// }

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  MenuItem,
  CircularProgress,
  Alert,
  Grid,
  IconButton,
} from "@mui/material";
import {
  Close as CloseIcon,
  VideoCall as VideoCallIcon,
  Schedule as ScheduleIcon,
  Person,
  Work,
  CalendarMonth,
  AutoGraph,
} from "@mui/icons-material";

import { scheduleInterview, getInterviewers } from "../../services/CompanyApi";

/* ---------------------------------------------------------------------
   Dark palette used everywhere below. Centralizing it here is what
   makes the fix reliable — every color a TextField/Menu/Input needs
   (text, label, border, placeholder, icon) is set explicitly instead
   of being left to inherit from MUI's default light theme.
--------------------------------------------------------------------- */
const C = {
  ink: "#f1f5f9",
  inkMuted: "#94a3b8",
  inkFaint: "#64748b",
  panel: "#0b1120",
  panel2: "#0e1526",
  hairline: "rgba(255,255,255,0.10)",
  hairlineHover: "rgba(255,255,255,0.22)",
  blue: "#60a5fa",
  blueSoft: "rgba(96,165,250,0.12)",
  violet: "#8b5cf6",
  rust: "#f87171",
};

const glass = {
  background: "rgba(255,255,255,0.03) !important",
  backgroundColor: "rgba(255,255,255,0.03) !important",
  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(18px)",
  border: `1px solid ${C.hairline}`,
};

/* Every color a text field needs, spelled out. This is the actual
   fix: without these, MUI falls back to its light-theme defaults —
   near-black input text and a light gray outline — which is what
   was reading as "white" against the dark modal. !important is used
   throughout because this app has a parent theme/global stylesheet
   that otherwise wins the background-color cascade. */
const fieldSx = {
  ...glass,
  borderRadius: "12px",
  "& .MuiOutlinedInput-root": {
    color: `${C.ink} !important`,
    backgroundColor: "transparent !important",
    "& fieldset": { borderColor: C.hairline, transition: "border-color 0.18s ease" },
    "&:hover fieldset": { borderColor: `${C.blue} !important` },
    "&.Mui-focused fieldset": { borderColor: `${C.blue} !important`, borderWidth: "1.5px" },
    "&.Mui-disabled": { color: `${C.inkFaint} !important` },
  },
  "& .MuiInputBase-input": { color: `${C.ink} !important`, WebkitTextFillColor: `${C.ink} !important` },
  "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: `${C.inkFaint} !important` },
  "& .MuiSelect-select": {
    color: `${C.ink} !important`,
    WebkitTextFillColor: `${C.ink} !important`,
  },
  "& .MuiSelect-select.Mui-disabled": {
    color: `${C.inkFaint} !important`,
    WebkitTextFillColor: `${C.inkFaint} !important`,
  },
  "& .MuiInputLabel-root": { color: `${C.inkMuted} !important` },
  "& .MuiInputLabel-root.Mui-focused": { color: `${C.blue} !important` },
  "& .MuiSelect-icon": { color: `${C.inkFaint} !important` },
  // Native datetime-local picker: fixes both the inline text and the
  // calendar-popup icon, which otherwise render in browser/OS chrome
  // colors regardless of any MUI styling.
  "& input[type='datetime-local']": {
    colorScheme: "dark",
    "&::-webkit-calendar-picker-indicator": {
      filter: "invert(70%) sepia(60%) saturate(900%) hue-rotate(190deg) brightness(105%)",
      cursor: "pointer",
      borderRadius: "6px",
      padding: "3px",
    },
  },
};

const menuPropsSx = {
  PaperProps: {
    sx: {
      bgcolor: `${C.panel2} !important`,
      backgroundColor: `${C.panel2} !important`,
      backgroundImage: "none !important",
      color: `${C.ink} !important`,
      border: `1px solid ${C.hairline}`,
      borderRadius: "12px",
      mt: 0.5,
      "& .MuiMenuItem-root": {
        color: `${C.ink} !important`,
        "&:hover": { bgcolor: "rgba(255,255,255,0.06) !important" },
        "&.Mui-selected": { bgcolor: `${C.blueSoft} !important`, "&:hover": { bgcolor: `${C.blueSoft} !important` } },
      },
    },
  },
};

/* Circular match-score gauge — pure CSS conic-gradient ring, no chart
   library needed for a single number. */
function ScoreRing({ value }) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <Box
      sx={{
        position: "relative",
        width: 58,
        height: 58,
        flexShrink: 0,
        borderRadius: "50%",
        background: `conic-gradient(${C.blue} ${pct * 3.6}deg, rgba(255,255,255,0.08) ${pct * 3.6}deg) !important`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: 46,
          height: 46,
          borderRadius: "50%",
          bgcolor: `${C.panel2} !important`,
          border: `1px solid ${C.hairline}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography sx={{ fontWeight: 700, fontSize: "14px", color: C.ink, lineHeight: 1 }}>{pct}%</Typography>
      </Box>
    </Box>
  );
}

export default function ScheduleInterviewModal({
  open,
  onClose,
  application,
  onSuccess,
}) {
  const [formData, setFormData] = useState({
    interviewer: "",
    interviewDate: "",
    interviewType: "online",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [interviewers, setInterviewers] = useState([]);
  const [loadingInterviewers, setLoadingInterviewers] = useState(false);

  useEffect(() => {
    if (!open) return;

    const fetchInterviewers = async () => {
      setLoadingInterviewers(true);
      try {
        const response = await getInterviewers();
        if (response.data?.success) {
          setInterviewers(response.data.data || []);
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load interviewers");
      } finally {
        setLoadingInterviewers(false);
      }
    };

    fetchInterviewers();
  }, [open]);

  const handleChange = (e) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleClose = () => {
    setFormData({
      interviewer: "",
      interviewDate: "",
      interviewType: "online",
    });
    setError("");
    onClose();
  };

  const handleSubmit = async () => {
    if (!formData.interviewer || !formData.interviewDate) {
      setError("Please fill all required fields");
      return;
    }

    if (!application?._id) {
      setError("Invalid application");
      return;
    }

    setLoading(true);
    try {
      const res = await scheduleInterview(
        application._id,
        formData.interviewer,
        formData.interviewDate,
        formData.interviewType
      );

      if (res.data?.success) {
        onSuccess?.();
        handleClose();
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to schedule interview");
    } finally {
      setLoading(false);
    }
  };

  if (!application) return null;

  // FIX: toISOString() converts to UTC, but the datetime-local input
  // expects a LOCAL time string. Building the string manually from
  // local getters keeps "8:00 AM" meaning 8:00 AM in the user's own
  // timezone instead of silently shifting by the UTC offset.
  const now = new Date();
  now.setHours(8, 0, 0, 0);
  const pad = (n) => String(n).padStart(2, "0");
  const minDateTime = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(
    now.getHours()
  )}:${pad(now.getMinutes())}`;

  const candidateName = application.candidate?.name || "N/A";
  const scorePct = Math.max(0, Math.min(Math.round(application.score || 0), 100));

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "22px",
          background: `linear-gradient(135deg, ${C.panel2}, ${C.panel}) !important`,
          backgroundColor: `${C.panel} !important`,
          backgroundImage: `linear-gradient(135deg, ${C.panel2}, ${C.panel}) !important`,
          backdropFilter: "blur(25px)",
          WebkitBackdropFilter: "blur(25px)",
          border: "1px solid rgba(59,130,246,0.15)",
          color: `${C.ink} !important`,
          boxShadow: "0 40px 120px rgba(0,0,0,0.6)",
        },
      }}
      slotProps={{
        backdrop: {
          sx: {
            bgcolor: "rgba(2,6,15,0.72) !important",
            backgroundColor: "rgba(2,6,15,0.72) !important",
            backdropFilter: "blur(4px)",
          },
        },
      }}
    >
      {/* HEADER */}
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 3,
          py: 2,
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          background:
            "linear-gradient(90deg, rgba(59,130,246,0.14), rgba(139,92,246,0.14)) !important",
          backgroundColor: `${C.panel2} !important`,
          color: `${C.ink} !important`,
        }}
      >
        <Box display="flex" alignItems="center" gap={1.5}>
          <ScheduleIcon sx={{ color: C.blue }} />
          <Typography fontWeight={800} sx={{ color: C.ink }}>
            Schedule Interview
          </Typography>
        </Box>

        <IconButton onClick={handleClose} sx={{ color: C.inkMuted, "&:hover": { color: C.ink } }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* CONTENT */}
      <DialogContent sx={{ p: 3, backgroundColor: `${C.panel} !important`, backgroundImage: "none !important" }}>
        {/* Candidate Card — dark glass "boarding pass" */}
        <Box
          sx={{
            ...glass,
            display: "flex",
            alignItems: "stretch",
            borderRadius: "16px",
            mb: 3,
            overflow: "hidden",
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
            transition: "border-color 0.2s ease",
            "&:hover": { borderColor: C.hairlineHover },
          }}
        >
          <Box sx={{ flex: 1, minWidth: 0, p: 2.25, display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={{
                width: 44,
                height: 44,
                flexShrink: 0,
                borderRadius: "12px",
                background: "linear-gradient(135deg, rgba(96,165,250,0.16), rgba(139,92,246,0.16))",
                border: `1px solid ${C.hairline}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: C.blue,
                fontWeight: 700,
                fontSize: "18px",
              }}
            >
              {(candidateName?.[0] || "?").toUpperCase()}
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Box display="flex" alignItems="center" gap={0.6} mb={0.2}>
                <Person sx={{ fontSize: 13, color: C.inkFaint }} />
                <Typography sx={{ fontSize: 10.5, color: C.inkMuted, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  Candidate
                </Typography>
              </Box>
              <Typography
                fontWeight={700}
                sx={{ color: C.ink, fontSize: "16px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
              >
                {candidateName}
              </Typography>
              <Box display="flex" alignItems="center" gap={0.6} mt={0.3}>
                <Work sx={{ fontSize: 12, color: C.inkFaint }} />
                <Typography
                  sx={{ fontSize: 12, color: C.inkMuted, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
                >
                  {application.job?.title || "N/A"}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Perforated divider */}
          <Box sx={{ position: "relative", width: 0 }}>
            <Box sx={{ position: "absolute", top: -9, left: -9, width: 18, height: 18, borderRadius: "50%", bgcolor: C.panel }} />
            <Box sx={{ position: "absolute", bottom: -9, left: -9, width: 18, height: 18, borderRadius: "50%", bgcolor: C.panel }} />
            <Box sx={{ position: "absolute", top: 9, bottom: 9, left: -1, borderLeft: `1.5px dashed ${C.hairlineHover}` }} />
          </Box>

          <Box sx={{ flexShrink: 0, width: 100, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 0.5 }}>
            <ScoreRing value={scorePct} />
            <Box display="flex" alignItems="center" gap={0.4}>
              <AutoGraph sx={{ fontSize: 11, color: C.inkFaint }} />
              <Typography sx={{ fontSize: 9.5, color: C.inkFaint, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Match
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* ERROR */}
        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 2,
              bgcolor: "rgba(239,68,68,0.08)",
              border: "1px solid rgba(248,113,113,0.25)",
              color: "#fca5a5",
              "& .MuiAlert-icon": { color: C.rust },
            }}
          >
            {error}
          </Alert>
        )}

        {/* FORM */}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              select
              fullWidth
              label="Interviewer *"
              name="interviewer"
              value={formData.interviewer}
              onChange={handleChange}
              disabled={loadingInterviewers}
              sx={fieldSx}
              SelectProps={{ MenuProps: menuPropsSx }}
              InputProps={{ startAdornment: <Person sx={{ fontSize: 18, color: C.inkFaint, mr: 1 }} /> }}
            >
              {interviewers.length === 0 ? (
                <MenuItem disabled value="">
                  {loadingInterviewers ? "Loading interviewers..." : "No team members available"}
                </MenuItem>
              ) : (
                interviewers.map((i) => (
                  <MenuItem key={i._id} value={i._id}>
                    {i.name}
                  </MenuItem>
                ))
              )}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              type="datetime-local"
              fullWidth
              label="Date & Time *"
              name="interviewDate"
              value={formData.interviewDate}
              onChange={handleChange}
              inputProps={{ min: minDateTime }}
              InputLabelProps={{ shrink: true }}
              sx={{
                ...fieldSx,
                // Force label to sit as a solid "chip" ON the border line, like a
                // real notched-outline label — this is what actually prevents
                // overlap with the native mm/dd/yyyy placeholder, since that
                // placeholder lives *inside* the input and isn't moved by the
                // label's transform.
                "& .MuiInputLabel-root": {
                  color: `${C.inkMuted} !important`,
                  transform: "translate(14px, -9px) scale(0.75) !important",
                  transformOrigin: "top left",
                  background: `${C.panel2}`,
                  padding: "0 6px",
                  borderRadius: "4px",
                  pointerEvents: "none",
                },
                "& .MuiInputLabel-root.Mui-focused": { color: `${C.blue} !important` },
                // Push input text/placeholder down so it never sits at label height.
                "& .MuiOutlinedInput-input": {
                  paddingTop: "16.5px",
                  paddingBottom: "16.5px",
                },
              }}
              InputProps={{
                startAdornment: <CalendarMonth sx={{ fontSize: 18, color: C.inkFaint, mr: 1 }} />,
                sx: {
                  "& input[type='datetime-local']": {
                    color: formData.interviewDate ? `${C.ink} !important` : "transparent !important",
                  },
                  "&.Mui-focused input[type='datetime-local']": {
                    color: `${C.ink} !important`,
                  },
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              select
              fullWidth
              label="Interview Type *"
              name="interviewType"
              value={formData.interviewType}
              onChange={handleChange}
              sx={fieldSx}
              SelectProps={{ MenuProps: menuPropsSx }}
            >
              <MenuItem value="online">Online</MenuItem>
              <MenuItem value="onsite">Onsite</MenuItem>
            </TextField>
          </Grid>
        </Grid>

        <Typography sx={{ mt: 2, fontSize: 12, color: C.inkFaint, lineHeight: 1.6 }}>
          AI-generated meeting link will be shared automatically after scheduling.
        </Typography>
      </DialogContent>

      {/* ACTIONS */}
      <DialogActions
        sx={{
          p: 3,
          borderTop: "1px solid rgba(255,255,255,0.06)",
          backgroundColor: `${C.panel} !important`,
          backgroundImage: "none !important",
        }}
      >
        <Button onClick={handleClose} sx={{ color: C.inkMuted, fontWeight: 600, "&:hover": { color: C.ink } }}>
          Cancel
        </Button>

        <Button
          onClick={handleSubmit}
          disabled={loading}
          variant="contained"
          startIcon={loading ? <CircularProgress size={18} sx={{ color: "#fff" }} /> : <VideoCallIcon />}
          sx={{
            borderRadius: "999px",
            px: 3,
            fontWeight: 800,
            color: "#fff",
            background: "linear-gradient(135deg, #22d3ee, #3b82f6, #8b5cf6)",
            transition: "transform 0.15s ease",
            "&:hover": { transform: "scale(1.03)" },
            "&.Mui-disabled": { background: "rgba(96,165,250,0.25)", color: "rgba(255,255,255,0.5)" },
          }}
        >
          {loading ? "Scheduling..." : "Schedule"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}