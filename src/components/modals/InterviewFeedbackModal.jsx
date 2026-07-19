// import { useState } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Button,
//   Box,
//   Typography,
//   Alert,
//   Grid,
//   CircularProgress,
// } from "@mui/material";
// import {
//   Note as NoteIcon,
//   CheckCircle as CheckCircleIcon,
//   Cancel as CancelIcon,
// } from "@mui/icons-material";
// import { updateInterview } from "../../services/CompanyApi";

// export default function InterviewFeedbackModal({ open, onClose, interview, onSuccess }) {
//   const [formData, setFormData] = useState({
//     feedback: interview?.feedback || "",
//     result: interview?.result || "pending",
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     setError("");
//   };

//   const handleSubmit = async () => {
//     if (!formData.result || formData.result === "pending") {
//       setError("Please select Selected or Rejected");
//       return;
//     }

//     if (!interview?._id) {
//       setError("Invalid interview");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await updateInterview(
//         interview._id,
//         formData.feedback,
//         formData.result
//       );

//       if (response.data?.success) {
//         onSuccess?.();
//         handleClose();
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to update interview");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClose = () => {
//     setFormData({ feedback: interview?.feedback || "", result: interview?.result || "pending" });
//     setError("");
//     onClose();
//   };

//   if (!interview) return null;

//   const RESULT_OPTIONS = [
//     { value: "selected", label: "Selected", color: "#34d399", bg: "rgba(52,211,153,0.1)" },
//     { value: "rejected", label: "Rejected", color: "#f87171", bg: "rgba(239,68,68,0.1)" },
//   ];

//   const selectedResult = RESULT_OPTIONS.find((r) => r.value === formData.result);

//   return (
//     <Dialog
//       open={open}
//       onClose={handleClose}
//       maxWidth="sm"
//       fullWidth
//       PaperProps={{
//         sx: {
//           borderRadius: "16px",
//           background: "rgba(15,23,42,0.95)",
//           backdropFilter: "blur(20px)",
//           border: "1px solid rgba(255,255,255,0.08)",
//           boxShadow: "0 25px 80px rgba(0,0,0,0.5)",
//         },
//       }}
//     >
//       <DialogTitle
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           background: "linear-gradient(90deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))",
//           borderBottom: "1px solid rgba(255,255,255,0.06)",
//           pb: 2,
//         }}
//       >
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
//           <NoteIcon sx={{ color: "#a78bfa", fontSize: 24 }} />
//           <Typography variant="h6" fontWeight={700}>
//             Interview Feedback
//           </Typography>
//         </Box>
//       </DialogTitle>

//       <DialogContent sx={{ pt: 3 }}>
//         {/* Interview Info */}
//         <Box
//           sx={{
//             p: 2,
//             mb: 3,
//             borderRadius: "12px",
//             background: "rgba(59,130,246,0.05)",
//             border: "1px solid rgba(59,130,246,0.15)",
//           }}
//         >
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6}>
//               <Typography sx={{ color: "#64748b", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", mb: 0.5 }}>
//                 Candidate
//               </Typography>
//               <Typography sx={{ color: "#fff", fontWeight: 600 }}>
//                 {interview.candidate?.name}
//               </Typography>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Typography sx={{ color: "#64748b", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", mb: 0.5 }}>
//                 Position
//               </Typography>
//               <Typography sx={{ color: "#fff", fontWeight: 600 }}>
//                 {interview.job?.title}
//               </Typography>
//             </Grid>
//             <Grid item xs={12}>
//               <Typography sx={{ color: "#64748b", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", mb: 0.5 }}>
//                 Interview Type
//               </Typography>
//               <Typography sx={{ color: "#cbd5e1", fontWeight: 500 }}>
//                 {interview.interviewType?.charAt(0).toUpperCase() + interview.interviewType?.slice(1)}
//               </Typography>
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

//         {/* Result Selection */}
//         <Box sx={{ mb: 3 }}>
//           <Typography sx={{ color: "#94a3b8", fontSize: "13px", fontWeight: 600, mb: 1.5 }}>
//             Interview Result *
//           </Typography>
//           <Grid container spacing={1.5}>
//             {RESULT_OPTIONS.map((option) => (
//               <Grid item xs={6} key={option.value}>
//                 <Button
//                   fullWidth
//                   onClick={() => setFormData((prev) => ({ ...prev, result: option.value }))}
//                   sx={{
//                     p: 1.5,
//                     borderRadius: "12px",
//                     border: formData.result === option.value ? `2px solid ${option.color}` : "1px solid rgba(255,255,255,0.1)",
//                     background: formData.result === option.value ? option.bg : "rgba(255,255,255,0.02)",
//                     color: option.color,
//                     fontWeight: 700,
//                     fontSize: "13px",
//                     transition: "all 0.2s",
//                     "&:hover": { background: option.bg },
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     gap: 1,
//                   }}
//                   startIcon={
//                     option.value === "selected" ? (
//                       <CheckCircleIcon />
//                     ) : (
//                       <CancelIcon />
//                     )
//                   }
//                 >
//                   {option.label}
//                 </Button>
//               </Grid>
//             ))}
//           </Grid>
//         </Box>

//         {/* Feedback Textarea */}
//         <TextField
//           fullWidth
//           multiline
//           rows={5}
//           label="Interview Feedback & Notes"
//           name="feedback"
//           value={formData.feedback}
//           onChange={handleChange}
//           placeholder="Write your detailed feedback about the candidate's performance, technical skills, communication, etc."
//           sx={{
//             "& .MuiOutlinedInput-root": {
//               color: "#fff",
//               background: "rgba(255,255,255,0.03)",
//               borderRadius: "12px",
//               "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
//               "&:hover fieldset": { borderColor: "rgba(255,255,255,0.2)" },
//               "&.Mui-focused fieldset": { borderColor: "#60a5fa" },
//             },
//             "& .MuiInputLabel-root": { color: "#94a3b8" },
//             "& .MuiInputLabel-root.Mui-focused": { color: "#60a5fa" },
//           }}
//         />
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
//           sx={{ textTransform: "none", color: "#64748b", fontWeight: 600 }}
//         >
//           Cancel
//         </Button>
//         <Button
//           onClick={handleSubmit}
//           disabled={loading || formData.result === "pending"}
//           variant="contained"
//           startIcon={loading ? <CircularProgress size={18} /> : <CheckCircleIcon />}
//           sx={{
//             background: "linear-gradient(135deg, #2563eb, #7c3aed)",
//             textTransform: "none",
//             fontWeight: 700,
//             borderRadius: "10px",
//             "&:hover": { background: "linear-gradient(135deg, #1d4ed8, #6d28d9)" },
//             "&.Mui-disabled": { background: "rgba(59,130,246,0.3)", color: "rgba(255,255,255,0.5)" },
//           }}
//         >
//           {loading ? "Saving..." : "Save Feedback & Result"}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// }
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  CircularProgress,
  IconButton,
} from "@mui/material";
import {
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Close as CloseIcon,
  FormatQuote,
} from "@mui/icons-material";
import { updateInterview } from "../../services/CompanyApi";

/* Same dark palette as the rest of the interview modals. */
const C = {
  ink: "#f1f5f9",
  inkMuted: "#94a3b8",
  inkFaint: "#64748b",
  panel: "#0b1120",
  panel2: "#0e1526",
  hairline: "rgba(255,255,255,0.10)",
  hairlineHover: "rgba(255,255,255,0.22)",
  blue: "#60a5fa",
  violet: "#8b5cf6",
  rust: "#f87171",
  green: "#34d399",
};

/* Numbered rail marker used for each section of the form. */
function StepMarker({ n, done }) {
  return (
    <Box
      sx={{
        width: 26,
        height: 26,
        borderRadius: "8px",
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "12px",
        fontWeight: 800,
        color: done ? C.panel : C.inkMuted,
        bgcolor: done ? C.blue : "rgba(255,255,255,0.05)",
        border: `1px solid ${done ? C.blue : C.hairline}`,
        transition: "all 0.2s ease",
      }}
    >
      {n}
    </Box>
  );
}

export default function InterviewFeedbackModal({ open, onClose, interview, onSuccess }) {
  const [formData, setFormData] = useState({
    feedback: interview?.feedback || "",
    result: interview?.result || "pending",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // FIX: useState's initial value only runs on first mount. If this
  // modal stays mounted and is reopened for a *different* interview,
  // formData was staying stuck on whatever the first interview had.
  // Syncing here whenever `open` or `interview` changes keeps the
  // form in step with whichever interview is actually being edited.
  useEffect(() => {
    if (!open) return;
    setFormData({
      feedback: interview?.feedback || "",
      result: interview?.result || "pending",
    });
    setError("");
  }, [open, interview]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async () => {
    if (!formData.result || formData.result === "pending") {
      setError("Please select Selected or Rejected");
      return;
    }
    if (!interview?._id) {
      setError("Invalid interview");
      return;
    }
    setLoading(true);
    try {
      const response = await updateInterview(interview._id, formData.feedback, formData.result);
      if (response.data?.success) {
        onSuccess?.();
        handleClose();
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update interview");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({ feedback: interview?.feedback || "", result: interview?.result || "pending" });
    setError("");
    onClose();
  };

  if (!interview) return null;

  const candidateName = interview.candidate?.name || "N/A";
  const resultChosen = formData.result === "selected" || formData.result === "rejected";
  const isSelected = formData.result === "selected";
  const isRejected = formData.result === "rejected";

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "20px",
          overflow: "hidden",
          background: `${C.panel} !important`,
          backgroundColor: `${C.panel} !important`,
          backgroundImage: "none !important",
          border: `1px solid ${C.hairline}`,
          color: `${C.ink} !important`,
          boxShadow: "0 40px 120px rgba(0,0,0,0.6)",
        },
      }}
      slotProps={{
        backdrop: {
          sx: {
            bgcolor: "rgba(2,6,15,0.75) !important",
            backdropFilter: "blur(4px)",
          },
        },
      }}
    >
      {/* HEADER — compact, kicker-style instead of icon-badge header */}
      <Box
        sx={{
          px: 3,
          pt: 2.5,
          pb: 2,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          borderBottom: `1px solid ${C.hairline}`,
          bgcolor: `${C.panel2} !important`,
          backgroundColor: `${C.panel2} !important`,
          backgroundImage: "none !important",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: "10.5px",
              fontWeight: 800,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: C.blue,
              mb: 0.5,
            }}
          >
            Interview Outcome
          </Typography>
          <Typography sx={{ fontSize: "20px", fontWeight: 800, color: C.ink, lineHeight: 1.2 }}>
            {candidateName}
          </Typography>
          <Typography sx={{ fontSize: "13px", color: C.inkMuted, mt: 0.25 }}>
            {interview.job?.title || "N/A"}
            {interview.interviewType
              ? ` · ${interview.interviewType.charAt(0).toUpperCase()}${interview.interviewType.slice(1)}`
              : ""}
          </Typography>
        </Box>
        <IconButton
          onClick={handleClose}
          size="small"
          sx={{ color: C.inkMuted, mt: 0.5, "&:hover": { color: C.ink } }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* CONTENT — vertical numbered rail with a connecting line */}
      <DialogContent sx={{ p: 0, bgcolor: `${C.panel} !important` }}>
        {error && (
          <Box sx={{ px: 3, pt: 2.5 }}>
            <Alert
              severity="error"
              sx={{
                borderRadius: "10px",
                bgcolor: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(248,113,113,0.25)",
                color: "#fca5a5",
                "& .MuiAlert-icon": { color: C.rust },
              }}
            >
              {error}
            </Alert>
          </Box>
        )}

        {/* Section 1 — Result, as a segmented slider control */}
        <Box sx={{ display: "flex", gap: 2, px: 3, py: 2.5 }}>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <StepMarker n={1} done={resultChosen} />
            <Box sx={{ width: "1px", flex: 1, bgcolor: C.hairline, my: 1 }} />
          </Box>
          <Box sx={{ flex: 1, minWidth: 0, pb: 1 }}>
            <Typography sx={{ fontSize: "13px", fontWeight: 700, color: C.ink, mb: 1.25 }}>
              Mark the outcome
            </Typography>

            {/* Segmented control: one pill track, sliding thumb behind the active label */}
            <Box
              sx={{
                position: "relative",
                display: "flex",
                borderRadius: "999px",
                border: `1px solid ${C.hairline}`,
                bgcolor: "rgba(255,255,255,0.03)",
                p: "4px",
                height: 46,
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 4,
                  bottom: 4,
                  left: isRejected ? "50%" : "4px",
                  width: "calc(50% - 4px)",
                  borderRadius: "999px",
                  transition: "left 0.22s cubic-bezier(.4,0,.2,1), background 0.22s ease",
                  background: !resultChosen
                    ? "transparent"
                    : isSelected
                    ? "linear-gradient(135deg, rgba(52,211,153,0.22), rgba(52,211,153,0.1))"
                    : "linear-gradient(135deg, rgba(248,113,113,0.22), rgba(248,113,113,0.1))",
                  border: resultChosen ? `1px solid ${isSelected ? C.green : C.rust}` : "none",
                }}
              />
              {[
                { value: "selected", label: "Selected", color: C.green, Icon: CheckCircleIcon },
                { value: "rejected", label: "Rejected", color: C.rust, Icon: CancelIcon },
              ].map(({ value, label, color, Icon }) => {
                const active = formData.result === value;
                return (
                  <Box
                    key={value}
                    onClick={() => setFormData((p) => ({ ...p, result: value }))}
                    sx={{
                      position: "relative",
                      zIndex: 1,
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 0.75,
                      cursor: "pointer",
                      borderRadius: "999px",
                      color: active ? color : C.inkMuted,
                      fontWeight: 700,
                      fontSize: "13px",
                      userSelect: "none",
                      transition: "color 0.18s ease",
                      "&:hover": { color: active ? color : C.ink },
                    }}
                  >
                    <Icon sx={{ fontSize: 17 }} />
                    {label}
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>

        {/* Section 2 — Feedback notes */}
        <Box sx={{ display: "flex", gap: 2, px: 3, pb: 3 }}>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <StepMarker n={2} done={formData.feedback?.trim().length > 0} />
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography sx={{ fontSize: "13px", fontWeight: 700, color: C.ink, mb: 1.25 }}>
              Add your notes
            </Typography>

            <Box
              sx={{
                position: "relative",
                borderRadius: "14px",
                border: `1px solid ${C.hairline}`,
                bgcolor: "rgba(255,255,255,0.02)",
                p: 2,
                transition: "border-color 0.18s ease",
                "&:focus-within": { borderColor: C.blue },
              }}
            >
              <FormatQuote
                sx={{
                  position: "absolute",
                  top: 10,
                  right: 12,
                  fontSize: 22,
                  color: "rgba(255,255,255,0.06)",
                }}
              />
              <TextField
                fullWidth
                multiline
                rows={5}
                variant="standard"
                name="feedback"
                value={formData.feedback}
                onChange={handleChange}
                placeholder="Performance, technical skills, communication, culture fit…"
                InputProps={{ disableUnderline: true }}
                sx={{
                  "& .MuiInputBase-input": {
                    color: `${C.ink} !important`,
                    WebkitTextFillColor: `${C.ink} !important`,
                    fontSize: "14px",
                    lineHeight: 1.6,
                  },
                  "& .MuiInputBase-input::placeholder": { color: `${C.inkFaint} !important`, opacity: 1 },
                }}
              />
            </Box>
          </Box>
        </Box>
      </DialogContent>

      {/* FOOTER */}
      <DialogActions
        sx={{
          px: 3,
          py: 2.25,
          borderTop: `1px solid ${C.hairline}`,
          bgcolor: `${C.panel2} !important`,
          justifyContent: "space-between",
        }}
      >
        <Button
          onClick={handleClose}
          disabled={loading}
          sx={{ textTransform: "none", color: C.inkMuted, fontWeight: 600, "&:hover": { color: C.ink } }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={loading || formData.result === "pending"}
          variant="contained"
          disableElevation
          startIcon={loading ? <CircularProgress size={16} sx={{ color: "#fff" }} /> : null}
          sx={{
            borderRadius: "10px",
            px: 2.75,
            py: 1,
            fontWeight: 700,
            fontSize: "13.5px",
            textTransform: "none",
            color: "#fff",
            bgcolor: `${C.blue} !important`,
            "&:hover": { bgcolor: "#3b82f6 !important" },
            "&.Mui-disabled": { bgcolor: "rgba(96,165,250,0.2) !important", color: "rgba(255,255,255,0.4) !important" },
          }}
        >
          {loading ? "Saving…" : "Save Feedback"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}