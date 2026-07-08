// import { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   Chip,
//   IconButton,
//   CircularProgress,
//   Snackbar,
//   Alert,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Tooltip,
// } from "@mui/material";
// import {
//   VideoCall as VideoCallIcon,
//   Schedule as ScheduleIcon,
//   Person as PersonIcon,
//   Work as WorkIcon,
//   CalendarMonth as CalendarIcon,
//   AccessTime as TimeIcon,
//   ContentCopy as CopyIcon,
//   OpenInNew as OpenIcon,
//   Refresh as RefreshIcon,
//   Edit as EditIcon,
//   ArrowForward as ArrowForwardIcon,
// } from "@mui/icons-material";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { getInterview, updateInterview } from "../../services/CompanyApi";
// import InterviewFeedbackModal from "../../components/modals/InterviewFeedbackModal";
// import {
//   STATUS_CONFIG,
//   getInterviewStatus,
//   isScheduledOrUpcoming,
//   formatInterviewDate,
//   formatInterviewTime,
//   copyToClipboard,
// } from "../../utils/interviewUtils";

// function GlassCard({ children, sx = {} }) {
//   return (
//     <Box
//       sx={{
//         p: 3,
//         borderRadius: "20px",
//         background: "rgba(255,255,255,0.02)",
//         backdropFilter: "blur(20px)",
//         border: "1px solid rgba(255,255,255,0.05)",
//         boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
//         ...sx,
//       }}
//     >
//       {children}
//     </Box>
//   );
// }

// function StatusBadge({ interview }) {
//   const status = getInterviewStatus(interview);
//   const config = STATUS_CONFIG[status] || STATUS_CONFIG.scheduled;

//   return (
//     <Chip
//       label={config.label}
//       size="small"
//       sx={{
//         fontWeight: 700,
//         fontSize: "11px",
//         color: config.color,
//         bgcolor: config.bg,
//         border: `1px solid ${config.border}`,
//       }}
//     />
//   );
// }

// const FILTER_TABS = [
//   { key: "upcoming", label: "Upcoming" },
//   { key: "pending", label: "All Pending" },
//   { key: "results", label: "Results" },
// ];

// export default function Interviews() {
//   const navigate = useNavigate();
//   const [interviews, setInterviews] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [filter, setFilter] = useState("upcoming");
//   const [selected, setSelected] = useState(null);
//   const [showFeedbackModal, setShowFeedbackModal] = useState(false);
//   const [toast, setToast] = useState({ open: false, message: "", severity: "success" });

//   useEffect(() => {
//     fetchInterviews();
//   }, []);

//   const fetchInterviews = async () => {
//     setLoading(true);
//     try {
//       const response = await getInterview();
//       if (response.data?.success) {
//         setInterviews(response.data.data || []);
//       } else {
//         throw new Error(response.data?.message || "Failed to fetch interviews");
//       }
//     } catch (error) {
//       setToast({
//         open: true,
//         message: error.response?.data?.message || "Failed to load interviews",
//         severity: "error",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filtered = interviews.filter((iv) => {
//     if (filter === "upcoming") return isScheduledOrUpcoming(iv);
//     if (filter === "pending") return iv.result === "pending";
//     return iv.result === "selected" || iv.result === "rejected";
//   });

//   const upcomingCount = interviews.filter(isScheduledOrUpcoming).length;

//   const handleCopyLink = async (link) => {
//     try {
//       await copyToClipboard(link);
//       setToast({ open: true, message: "Meeting link copied!", severity: "success" });
//     } catch {
//       setToast({ open: true, message: "Failed to copy link", severity: "error" });
//     }
//   };

//   const handleQuickResult = async (id, result) => {
//     try {
//       const response = await updateInterview(id, null, result);
//       if (response.data?.success) {
//         setToast({ open: true, message: `Marked as ${result}`, severity: "success" });
//         fetchInterviews();
//         setSelected(null);
//       }
//     } catch (error) {
//       setToast({
//         open: true,
//         message: error.response?.data?.message || "Failed to update interview",
//         severity: "error",
//       });
//     }
//   };

//   return (
//     <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//       <Box sx={{ color: "white", maxWidth: 1100, mx: "auto" }}>
//         {/* Header */}
//         <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 2 }}>
//           <Box>
//             <Typography variant="h4" fontWeight={800} sx={{ letterSpacing: "-0.5px", mb: 0.5 }}>
//               Scheduled Interviews
//             </Typography>
//             <Typography sx={{ color: "#94a3b8" }}>
//               {upcomingCount} upcoming interview{upcomingCount !== 1 ? "s" : ""} · Manage meeting links and outcomes
//             </Typography>
//           </Box>
//           <Button
//             variant="contained"
//             endIcon={<ArrowForwardIcon />}
//             onClick={() => navigate("/company/applications")}
//             sx={{
//               background: "linear-gradient(135deg, #2563eb, #7c3aed)",
//               borderRadius: "12px",
//               textTransform: "none",
//               fontWeight: 700,
//               px: 3,
//               "&:hover": { background: "linear-gradient(135deg, #1d4ed8, #6d28d9)" },
//             }}
//           >
//             Schedule from Applications
//           </Button>
//         </Box>

//         {/* Filter tabs */}
//         <Box sx={{ mb: 3, display: "flex", gap: 1, flexWrap: "wrap", alignItems: "center" }}>
//           {FILTER_TABS.map((tab) => (
//             <Chip
//               key={tab.key}
//               label={tab.label}
//               onClick={() => setFilter(tab.key)}
//               sx={{
//                 fontWeight: 700,
//                 fontSize: "12px",
//                 cursor: "pointer",
//                 ...(filter === tab.key
//                   ? {
//                       background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
//                       color: "#fff",
//                       border: "none",
//                     }
//                   : {
//                       background: "rgba(255,255,255,0.03)",
//                       color: "#94a3b8",
//                       border: "1px solid rgba(255,255,255,0.08)",
//                     }),
//               }}
//             />
//           ))}
//           <Box sx={{ flex: 1 }} />
//           <IconButton
//             onClick={fetchInterviews}
//             disabled={loading}
//             sx={{ color: "#60a5fa", border: "1px solid rgba(96,165,250,0.2)", borderRadius: "10px" }}
//           >
//             <RefreshIcon sx={{ fontSize: 18 }} />
//           </IconButton>
//         </Box>

//         {/* Interview list */}
//         {loading ? (
//           <Box display="flex" justifyContent="center" py={12}>
//             <CircularProgress sx={{ color: "#60a5fa" }} />
//           </Box>
//         ) : filtered.length === 0 ? (
//           <GlassCard sx={{ textAlign: "center", py: 10 }}>
//             <ScheduleIcon sx={{ fontSize: 52, color: "#1e3a5f", mb: 2 }} />
//             <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
//               No Interviews Found
//             </Typography>
//             <Typography sx={{ color: "#64748b", mb: 3, fontSize: "14px" }}>
//               {filter === "upcoming"
//                 ? "No upcoming interviews. Schedule one from the Applications page."
//                 : "No interviews match this filter."}
//             </Typography>
//             <Button
//               variant="outlined"
//               onClick={() => navigate("/company/applications")}
//               sx={{ textTransform: "none", color: "#60a5fa", borderColor: "rgba(96,165,250,0.3)" }}
//             >
//               Go to Applications
//             </Button>
//           </GlassCard>
//         ) : (
//           <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//             {filtered.map((iv, idx) => (
//               <motion.div key={iv._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }}>
//                 <GlassCard sx={{ p: 2.5 }}>
//                   <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 2 }}>
//                     {/* Left: candidate + job info */}
//                     <Box sx={{ flex: 1, minWidth: 220 }}>
//                       <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
//                         <Box
//                           sx={{
//                             width: 36,
//                             height: 36,
//                             borderRadius: "10px",
//                             background: "rgba(167,139,250,0.12)",
//                             border: "1px solid rgba(167,139,250,0.2)",
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "center",
//                             color: "#a78bfa",
//                             fontWeight: 800,
//                             fontSize: "14px",
//                           }}
//                         >
//                           {(iv.candidate?.name?.[0] || "?").toUpperCase()}
//                         </Box>
//                         <Box>
//                           <Typography sx={{ fontWeight: 700, fontSize: "15px", color: "#fff" }}>
//                             {iv.candidate?.name || "Unknown Candidate"}
//                           </Typography>
//                           <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
//                             <WorkIcon sx={{ fontSize: 12, color: "#475569" }} />
//                             <Typography sx={{ color: "#94a3b8", fontSize: "13px" }}>
//                               {iv.job?.title || "N/A"}
//                             </Typography>
//                           </Box>
//                         </Box>
//                       </Box>

//                       <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, pl: 0.5 }}>
//                         <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
//                           <PersonIcon sx={{ fontSize: 13, color: "#475569" }} />
//                           <Typography sx={{ color: "#64748b", fontSize: "12px" }}>
//                             {iv.interviewer?.name || "—"}
//                           </Typography>
//                         </Box>
//                         <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
//                           <CalendarIcon sx={{ fontSize: 13, color: "#475569" }} />
//                           <Typography sx={{ color: "#64748b", fontSize: "12px" }}>
//                             {formatInterviewDate(iv.interviewDate)}
//                           </Typography>
//                         </Box>
//                         <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
//                           <TimeIcon sx={{ fontSize: 13, color: "#475569" }} />
//                           <Typography sx={{ color: "#64748b", fontSize: "12px" }}>
//                             {formatInterviewTime(iv.interviewDate)}
//                           </Typography>
//                         </Box>
//                         <Chip
//                           label={iv.interviewType === "onsite" ? "Onsite" : "Online"}
//                           size="small"
//                           sx={{
//                             height: 20,
//                             fontSize: "10px",
//                             fontWeight: 700,
//                             color: iv.interviewType === "onsite" ? "#34d399" : "#60a5fa",
//                             bgcolor: iv.interviewType === "onsite" ? "rgba(52,211,153,0.08)" : "rgba(96,165,250,0.08)",
//                             border: `1px solid ${iv.interviewType === "onsite" ? "rgba(52,211,153,0.2)" : "rgba(96,165,250,0.2)"}`,
//                           }}
//                         />
//                       </Box>
//                     </Box>

//                     {/* Right: status + actions */}
//                     <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 1.5 }}>
//                       <StatusBadge interview={iv} />

//                       <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", justifyContent: "flex-end" }}>
//                         {iv.meetingLink && iv.interviewType === "online" && (
//                           <>
//                             <Button
//                               variant="contained"
//                               size="small"
//                               startIcon={<VideoCallIcon />}
//                               href={iv.meetingLink}
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               sx={{
//                                 background: "linear-gradient(135deg, #2563eb, #7c3aed)",
//                                 textTransform: "none",
//                                 fontWeight: 700,
//                                 borderRadius: "8px",
//                                 fontSize: "12px",
//                                 "&:hover": { background: "linear-gradient(135deg, #1d4ed8, #6d28d9)" },
//                               }}
//                             >
//                               Join Meeting
//                             </Button>
//                             <Tooltip title="Copy link">
//                               <IconButton
//                                 size="small"
//                                 onClick={() => handleCopyLink(iv.meetingLink)}
//                                 sx={{ color: "#94a3b8", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px" }}
//                               >
//                                 <CopyIcon sx={{ fontSize: 16 }} />
//                               </IconButton>
//                             </Tooltip>
//                             <Tooltip title="Open link">
//                               <IconButton
//                                 size="small"
//                                 href={iv.meetingLink}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 component="a"
//                                 sx={{ color: "#94a3b8", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px" }}
//                               >
//                                 <OpenIcon sx={{ fontSize: 16 }} />
//                               </IconButton>
//                             </Tooltip>
//                           </>
//                         )}
//                         <Button
//                           size="small"
//                           variant="outlined"
//                           onClick={() => setSelected(iv)}
//                           sx={{
//                             textTransform: "none",
//                             fontWeight: 600,
//                             fontSize: "12px",
//                             borderRadius: "8px",
//                             color: "#94a3b8",
//                             borderColor: "rgba(255,255,255,0.12)",
//                           }}
//                         >
//                           View Details
//                         </Button>
//                       </Box>
//                     </Box>
//                   </Box>
//                 </GlassCard>
//               </motion.div>
//             ))}
//           </Box>
//         )}

//         {/* Detail dialog */}
//         <Dialog
//           open={Boolean(selected)}
//           onClose={() => setSelected(null)}
//           maxWidth="sm"
//           fullWidth
//           PaperProps={{
//             sx: {
//               borderRadius: "16px",
//               background: "rgba(6, 15, 37, 0.98)",
//               border: "1px solid rgba(255,255,255,0.08)",
//               color: "#fff",
              
//             },
//           }}
//         >
//           {selected && (
//             <>
//               <DialogTitle sx={{ fontWeight: 800, color: "#60a5fa" }}>
//                 Interview Details
//               </DialogTitle>
//               <DialogContent>
//                 <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1, color: "#60a5fa" }}>
//                   {[
//                     { label: "Candidate", value: selected.candidate?.name },
//                     { label: "Job", value: selected.job?.title },
//                     { label: "Interviewer", value: selected.interviewer?.name },
//                     { label: "Date", value: formatInterviewDate(selected.interviewDate) },
//                     { label: "Time", value: formatInterviewTime(selected.interviewDate) },
//                     { label: "Type", value: selected.interviewType },
//                   ].map(({ label, value }) => (
//                     <Box key={label}>
//                       <Typography sx={{ color: "#60a5fa", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", mb: 0.3 }}>
//                         {label}
//                       </Typography>
//                       <Typography sx={{ color: "#e2e8f0", fontSize: "14px", textTransform: label === "Type" ? "capitalize" : "none" }}>
//                         {value || "—"}
//                       </Typography>
//                     </Box>
//                   ))}

//                   {selected.meetingLink && (
//                     <Box sx={{ p: 1.5, borderRadius: "10px", bgcolor: "rgba(52,211,153,0.06)", border: "1px solid rgba(52,211,153,0.15)" }}>
//                       <Typography sx={{ color: "#64748b", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", mb: 0.5 }}>
//                         Meeting Link
//                       </Typography>
//                       <Typography sx={{ color: "#34d399", fontSize: "13px", wordBreak: "break-all" }}>
//                         {selected.meetingLink}
//                       </Typography>
//                     </Box>
//                   )}

//                   {selected.feedback && (
//                     <Box>
//                       <Typography sx={{ color: "#64748b", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", mb: 0.3 }}>
//                         Feedback
//                       </Typography>
//                       <Typography sx={{ color: "#cbd5e1", fontSize: "14px" }}>{selected.feedback}</Typography>
//                     </Box>
//                   )}

//                   <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                     <Typography sx={{ color: "#64748b", fontSize: "12px" }}>Status:</Typography>
//                     <StatusBadge interview={selected} />
//                   </Box>
//                 </Box>
//               </DialogContent>
//               <DialogActions sx={{ p: 2, gap: 1, flexWrap: "wrap" }}>
//                 {selected.result === "pending" && (
//                   <>
//                     <Button
//                       startIcon={<EditIcon />}
//                       onClick={() => setShowFeedbackModal(true)}
//                       sx={{ textTransform: "none", color: "#60a5fa" }}
//                     >
//                       Add Feedback
//                     </Button>
//                     <Button
//                       onClick={() => handleQuickResult(selected._id, "selected")}
//                       sx={{ textTransform: "none", color: "#34d399" }}
//                     >
//                       Mark Selected
//                     </Button>
//                     <Button
//                       onClick={() => handleQuickResult(selected._id, "rejected")}
//                       sx={{ textTransform: "none", color: "#f87171" }}
//                     >
//                       Mark Rejected
//                     </Button>
//                   </>
//                 )}
//                 <Button onClick={() => setSelected(null)} sx={{ textTransform: "none", color: "#64748b" }}>
//                   Close
//                 </Button>
//               </DialogActions>
//             </>
//           )}
//         </Dialog>

//         <InterviewFeedbackModal
//           open={showFeedbackModal}
//           onClose={() => setShowFeedbackModal(false)}
//           interview={selected}
//           onSuccess={() => {
//             setShowFeedbackModal(false);
//             setSelected(null);
//             fetchInterviews();
//             setToast({ open: true, message: "Feedback saved!", severity: "success" });
//           }}
//         />

//         <Snackbar
//           open={toast.open}
//           autoHideDuration={4000}
//           onClose={() => setToast((p) => ({ ...p, open: false }))}
//           anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//         >
//           <Alert
//             severity={toast.severity}
//             onClose={() => setToast((p) => ({ ...p, open: false }))}
//             sx={{
//               borderRadius: "12px",
//               background: "rgba(15,23,42,0.95)",
//               color: "#fff",
//             }}
//           >
//             {toast.message}
//           </Alert>
//         </Snackbar>
//       </Box>
//     </motion.div>
//   );
// }

import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Chip,
  IconButton,
  CircularProgress,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
} from "@mui/material";
import {
  VideoCall as VideoCallIcon,
  Schedule as ScheduleIcon,
  Person as PersonIcon,
  Work as WorkIcon,
  ContentCopy as CopyIcon,
  OpenInNew as OpenIcon,
  Refresh as RefreshIcon,
  Edit as EditIcon,
  ArrowForward as ArrowForwardIcon,
  PlaceOutlined as PlaceIcon,
  CheckCircleOutlined as CheckIcon,
  HighlightOff as RejectIcon,
  HourglassEmpty as PendingIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getInterview, updateInterview } from "../../services/CompanyApi";
import InterviewFeedbackModal from "../../components/modals/InterviewFeedbackModal";
import {
  STATUS_CONFIG,
  getInterviewStatus,
  isScheduledOrUpcoming,
  formatInterviewDate,
  formatInterviewTime,
  copyToClipboard,
} from "../../utils/interviewUtils";

/* 
   Design tokens — dark glassmorphism surface with a blue accent family
*/
const TOKENS = {
  ink: "#f1f5f9",
  inkMuted: "#94a3b8",
  inkFaint: "#64748b",
  surface: "rgba(255,255,255,0.03)",
  surfaceSolid: "rgba(15,23,42,0.98)",
  hairline: "rgba(255,255,255,0.08)",
  blue: "#60a5fa",
  blueSoft: "rgba(96,165,250,0.12)",
  blueBorder: "rgba(96,165,250,0.3)",
  violet: "#8b5cf6",
  violetSoft: "rgba(139,92,246,0.12)",
  sage: "#34d399",
  sageSoft: "rgba(52,211,153,0.12)",
  rust: "#f87171",
  rustSoft: "rgba(248,113,113,0.12)",
};

/* Inject the two display/body fonts once. Falls back gracefully if the
   network request is blocked — system fonts still read fine. */
function useDesignFonts() {
  useEffect(() => {
    if (document.getElementById("iv-font-link")) return;
    const link = document.createElement("link");
    link.id = "iv-font-link";
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap";
    document.head.appendChild(link);
  }, []);
}

const displayFont = '"Fraunces", Georgia, serif';
const bodyFont = '"Inter", system-ui, sans-serif';

function StatusBadge({ interview }) {
  const status = getInterviewStatus(interview);
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.scheduled;

  return (
    <Chip
      label={config.label}
      size="small"
      sx={{
        fontFamily: bodyFont,
        fontWeight: 700,
        fontSize: "10.5px",
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        height: 22,
        color: config.color,
        bgcolor: config.bg,
        border: `1px solid ${config.border}`,
      }}
    />
  );
}

const FILTER_TABS = [
  { key: "upcoming", label: "Upcoming" },
  { key: "pending", label: "All pending" },
  { key: "results", label: "Results" },
];

/* Groups a flat list by calendar day for the timeline rail. */
function groupByDay(list) {
  const groups = [];
  const map = new Map();
  list.forEach((iv) => {
    const d = iv.interviewDate ? new Date(iv.interviewDate) : null;
    const key = d ? d.toDateString() : "Unscheduled";
    if (!map.has(key)) {
      const entry = { key, date: d, items: [] };
      map.set(key, entry);
      groups.push(entry);
    }
    map.get(key).items.push(iv);
  });
  return groups;
}

function StatTile({ icon: Icon, label, value, color }) {
  return (
    <Box
      sx={{
        flex: "1 1 0",
        minWidth: 140,
        p: 2,
        borderRadius: "14px",
        bgcolor: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: `1px solid ${TOKENS.hairline}`,
        boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        transition: "border-color 0.2s, transform 0.2s",
        "&:hover": { borderColor: `${color}55`, transform: "translateY(-2px)" },
      }}
    >
      <Box
        sx={{
          width: 38,
          height: 38,
          flexShrink: 0,
          borderRadius: "10px",
          bgcolor: `${color}1f`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color,
        }}
      >
        <Icon sx={{ fontSize: 19 }} />
      </Box>
      <Box sx={{ minWidth: 0 }}>
        <Typography sx={{ fontFamily: displayFont, fontSize: "21px", fontWeight: 600, lineHeight: 1.1, color: TOKENS.ink }}>
          {value}
        </Typography>
        <Typography
          sx={{
            fontFamily: bodyFont,
            fontSize: "10.5px",
            fontWeight: 700,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            color: TOKENS.inkFaint,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {label}
        </Typography>
      </Box>
    </Box>
  );
}

function DateMarker({ date }) {
  if (!date) {
    return (
      <Box sx={{ width: 64, textAlign: "center" }}>
        <Typography sx={{ fontFamily: bodyFont, fontSize: "11px", color: TOKENS.inkFaint }}>
          TBD
        </Typography>
      </Box>
    );
  }
  const day = date.getDate();
  const month = date.toLocaleDateString(undefined, { month: "short" });
  return (
    <Box sx={{ width: 64, textAlign: "center" }}>
      <Typography
        sx={{
          fontFamily: displayFont,
          fontSize: "26px",
          fontWeight: 600,
          color: TOKENS.blue,
          lineHeight: 1,
        }}
      >
        {day}
      </Typography>
      <Typography
        sx={{
          fontFamily: bodyFont,
          fontSize: "10px",
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: TOKENS.inkFaint,
          mt: 0.4,
        }}
      >
        {month}
      </Typography>
      <Box
        sx={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          bgcolor: TOKENS.blue,
          boxShadow: `0 0 0 4px ${TOKENS.blueSoft}`,
          mx: "auto",
          mt: 1,
        }}
      />
    </Box>
  );
}

export default function Interviews() {
  useDesignFonts();
  const navigate = useNavigate();
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("upcoming");
  const [selected, setSelected] = useState(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    setLoading(true);
    try {
      const response = await getInterview();
      if (response.data?.success) {
        setInterviews(response.data.data || []);
      } else {
        throw new Error(response.data?.message || "Failed to fetch interviews");
      }
    } catch (error) {
      setToast({
        open: true,
        message: error.response?.data?.message || "Failed to load interviews",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const filtered = interviews.filter((iv) => {
    if (filter === "upcoming") return isScheduledOrUpcoming(iv);
    if (filter === "pending") return iv.result === "pending";
    return iv.result === "selected" || iv.result === "rejected";
  });

  const grouped = groupByDay(filtered);
  const upcomingCount = interviews.filter(isScheduledOrUpcoming).length;
  const pendingCount = interviews.filter((iv) => iv.result === "pending").length;
  const selectedCount = interviews.filter((iv) => iv.result === "selected").length;
  const rejectedCount = interviews.filter((iv) => iv.result === "rejected").length;

  const handleCopyLink = async (link) => {
    try {
      await copyToClipboard(link);
      setToast({ open: true, message: "Meeting link copied!", severity: "success" });
    } catch {
      setToast({ open: true, message: "Failed to copy link", severity: "error" });
    }
  };

  const handleQuickResult = async (id, result) => {
    try {
      const response = await updateInterview(id, null, result);
      if (response.data?.success) {
        setToast({ open: true, message: `Marked as ${result}`, severity: "success" });
        fetchInterviews();
        setSelected(null);
      }
    } catch (error) {
      setToast({
        open: true,
        message: error.response?.data?.message || "Failed to update interview",
        severity: "error",
      });
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
      <Box sx={{ color: TOKENS.ink, maxWidth: 1040, mx: "auto", fontFamily: bodyFont }}>
        {/* ---------------- Header ---------------- */}
        <Box
          sx={{
            mb: 4,
            pb: 3,
            borderBottom: `1px solid ${TOKENS.hairline}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box>
            <Typography
              sx={{
                fontFamily: bodyFont,
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: TOKENS.blue,
                mb: 0.8,
              }}
            >
              The Schedule
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: "12px",
                  background: `linear-gradient(135deg, ${TOKENS.blueSoft}, ${TOKENS.violetSoft})`,
                  border: `1px solid ${TOKENS.hairline}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: TOKENS.blue,
                }}
              >
                <ScheduleIcon sx={{ fontSize: 22 }} />
              </Box>
              <Typography
                sx={{
                  fontFamily: displayFont,
                  fontSize: "34px",
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  lineHeight: 1.1,
                }}
              >
                Interviews
              </Typography>
            </Box>
            <Typography sx={{ color: TOKENS.inkMuted, fontSize: "13.5px", mt: 0.8 }}>
              {upcomingCount} upcoming interview{upcomingCount !== 1 ? "s" : ""} on the books
            </Typography>
          </Box>
          <Button
            variant="contained"
            endIcon={<ArrowForwardIcon sx={{ fontSize: 16 }} />}
            onClick={() => navigate("/company/applications")}
            sx={{
              background: `linear-gradient(135deg, ${TOKENS.blue}, ${TOKENS.violet})`,
              color: "#fff",
              borderRadius: "10px",
              textTransform: "none",
              fontFamily: bodyFont,
              fontWeight: 700,
              fontSize: "13px",
              px: 2.5,
              py: 1,
              boxShadow: "none",
              "&:hover": { background: `linear-gradient(135deg, #4f8eea, #7c4fe0)`, boxShadow: "none" },
            }}
          >
            Schedule from applications
          </Button>
        </Box>

        {/* ---------------- Stats summary ---------------- */}
        <Box sx={{ mb: 4, display: "flex", gap: 1.5, flexWrap: "wrap" }}>
          <StatTile icon={ScheduleIcon} label="Upcoming" value={upcomingCount} color={TOKENS.blue} />
          <StatTile icon={PendingIcon} label="Pending review" value={pendingCount} color={TOKENS.violet} />
          <StatTile icon={CheckIcon} label="Selected" value={selectedCount} color={TOKENS.sage} />
          <StatTile icon={RejectIcon} label="Rejected" value={rejectedCount} color={TOKENS.rust} />
        </Box>

        {/* ---------------- Filter row ---------------- */}
        <Box
          sx={{
            mb: 4,
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            p: 0.5,
            borderRadius: "12px",
            bgcolor: "rgba(255,255,255,0.02)",
            border: `1px solid ${TOKENS.hairline}`,
          }}
        >
          {FILTER_TABS.map((tab) => {
            const active = filter === tab.key;
            return (
              <Box
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                sx={{
                  cursor: "pointer",
                  position: "relative",
                  px: 2,
                  py: 0.9,
                  borderRadius: "9px",
                  fontFamily: bodyFont,
                  fontSize: "13px",
                  fontWeight: 600,
                  color: active ? "#fff" : TOKENS.inkFaint,
                  background: active ? `linear-gradient(135deg, ${TOKENS.blue}, ${TOKENS.violet})` : "transparent",
                  transition: "color 0.2s, background 0.2s",
                  "&:hover": { color: active ? "#fff" : TOKENS.ink },
                }}
              >
                {tab.label}
              </Box>
            );
          })}
          <Box sx={{ flex: 1 }} />
          <IconButton
            onClick={fetchInterviews}
            disabled={loading}
            sx={{ color: TOKENS.inkMuted, mr: 0.5, "&:hover": { color: TOKENS.blue } }}
          >
            <RefreshIcon sx={{ fontSize: 17 }} />
          </IconButton>
        </Box>

        {/* ---------------- Body ---------------- */}
        {loading ? (
          <Box display="flex" justifyContent="center" py={12}>
            <CircularProgress sx={{ color: TOKENS.blue }} size={28} thickness={4} />
          </Box>
        ) : filtered.length === 0 ? (
          <Box
            sx={{
              textAlign: "center",
              py: 9,
              border: `1px dashed ${TOKENS.hairline}`,
              borderRadius: "16px",
            }}
          >
            <ScheduleIcon sx={{ fontSize: 40, color: TOKENS.inkFaint, mb: 1.5 }} />
            <Typography sx={{ fontFamily: displayFont, fontSize: "19px", mb: 0.8 }}>
              Nothing on the calendar
            </Typography>
            <Typography sx={{ color: TOKENS.inkMuted, mb: 3, fontSize: "13.5px" }}>
              {filter === "upcoming"
                ? "No upcoming interviews. Schedule one from the Applications page."
                : "No interviews match this filter."}
            </Typography>
            <Button
              variant="outlined"
              onClick={() => navigate("/company/applications")}
              sx={{
                textTransform: "none",
                fontFamily: bodyFont,
                fontWeight: 600,
                color: TOKENS.blue,
                borderColor: TOKENS.blueBorder,
                borderRadius: "10px",
                "&:hover": { borderColor: TOKENS.blue, bgcolor: TOKENS.blueSoft },
              }}
            >
              Go to applications
            </Button>
          </Box>
        ) : (
          <Box sx={{ position: "relative" }}>
            {/* timeline rail */}
            <Box
              sx={{
                position: "absolute",
                left: 31,
                top: 8,
                bottom: 8,
                width: "1px",
                background: `linear-gradient(${TOKENS.hairline}, ${TOKENS.hairline})`,
                display: { xs: "none", sm: "block" },
              }}
            />
            <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {grouped.map((group, gIdx) => (
                <Box key={group.key} sx={{ display: "flex", gap: { xs: 1.5, sm: 3 } }}>
                  <Box sx={{ position: "relative", zIndex: 1, display: { xs: "none", sm: "block" } }}>
                    <DateMarker date={group.date} />
                  </Box>

                  <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1.5, minWidth: 0 }}>
                    {group.items.map((iv, idx) => (
                      <motion.div
                        key={iv._id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: gIdx * 0.05 + idx * 0.03 }}
                      >
                        <Box
                          sx={{
                            p: 2.25,
                            borderRadius: "14px",
                            bgcolor: TOKENS.surface,
                            backdropFilter: "blur(20px)",
                            WebkitBackdropFilter: "blur(20px)",
                            border: `1px solid ${TOKENS.hairline}`,
                            borderLeft: `3px solid ${iv.interviewType === "onsite" ? TOKENS.sage : TOKENS.blue}`,
                            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                            transition: "border-color 0.2s, background-color 0.2s, transform 0.2s",
                            "&:hover": {
                              borderColor: TOKENS.blueBorder,
                              borderLeftColor: iv.interviewType === "onsite" ? TOKENS.sage : TOKENS.blue,
                              bgcolor: "rgba(255,255,255,0.05)",
                              transform: "translateY(-2px)",
                            },
                          }}
                        >                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "flex-start",
                              flexWrap: "wrap",
                              gap: 2,
                            }}
                          >
                            {/* candidate + meta */}
                            <Box sx={{ flex: 1, minWidth: 200 }}>
                              <Box sx={{ display: "flex", alignItems: "baseline", gap: 1, flexWrap: "wrap", mb: 0.6 }}>
                                <Typography
                                  sx={{ fontFamily: displayFont, fontSize: "17px", fontWeight: 600, color: TOKENS.ink }}
                                >
                                  {iv.candidate?.name || "Unknown candidate"}
                                </Typography>
                                <Chip
                                  size="small"
                                  icon={
                                    iv.interviewType === "onsite" ? (
                                      <PlaceIcon sx={{ fontSize: "13px !important" }} />
                                    ) : (
                                      <VideoCallIcon sx={{ fontSize: "13px !important" }} />
                                    )
                                  }
                                  label={iv.interviewType === "onsite" ? "Onsite" : "Online"}
                                  sx={{
                                    height: 20,
                                    fontFamily: bodyFont,
                                    fontSize: "10px",
                                    fontWeight: 700,
                                    color: iv.interviewType === "onsite" ? TOKENS.sage : TOKENS.violet,
                                    bgcolor: iv.interviewType === "onsite" ? TOKENS.sageSoft : TOKENS.violetSoft,
                                    border: "none",
                                    "& .MuiChip-icon": {
                                      color: iv.interviewType === "onsite" ? TOKENS.sage : TOKENS.violet,
                                      ml: "6px",
                                    },
                                  }}
                                />
                              </Box>

                              <Box sx={{ display: "flex", alignItems: "center", gap: 0.6, mb: 0.8 }}>
                                <WorkIcon sx={{ fontSize: 12, color: TOKENS.inkFaint }} />
                                <Typography sx={{ color: TOKENS.inkMuted, fontSize: "12.5px" }}>
                                  {iv.job?.title || "N/A"}
                                </Typography>
                              </Box>

                              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                  <PersonIcon sx={{ fontSize: 12, color: TOKENS.inkFaint }} />
                                  <Typography sx={{ color: TOKENS.inkFaint, fontSize: "12px" }}>
                                    {iv.interviewer?.name || "—"}
                                  </Typography>
                                </Box>
                                <Typography sx={{ color: TOKENS.inkFaint, fontSize: "12px" }}>
                                  {formatInterviewTime(iv.interviewDate)}
                                </Typography>
                                <Box sx={{ display: { sm: "none" } }}>
                                  <Typography sx={{ color: TOKENS.inkFaint, fontSize: "12px" }}>
                                    · {formatInterviewDate(iv.interviewDate)}
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>

                            {/* status + actions */}
                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 1.2 }}>
                              <StatusBadge interview={iv} />
                              <Box sx={{ display: "flex", gap: 0.75, flexWrap: "wrap", justifyContent: "flex-end" }}>
                                {iv.meetingLink && iv.interviewType === "online" && (
                                  <>
                                    <Button
                                      size="small"
                                      startIcon={<VideoCallIcon sx={{ fontSize: 15 }} />}
                                      href={iv.meetingLink}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      sx={{
                                        background: `linear-gradient(135deg, ${TOKENS.blue}, ${TOKENS.violet})`,
                                        color: "#fff",
                                        textTransform: "none",
                                        fontFamily: bodyFont,
                                        fontWeight: 700,
                                        borderRadius: "8px",
                                        fontSize: "11.5px",
                                        px: 1.5,
                                        boxShadow: "none",
                                        "&:hover": { background: `linear-gradient(135deg, #4f8eea, #7c4fe0)`, boxShadow: "none" },
                                      }}
                                    >
                                      Join
                                    </Button>
                                    <Tooltip title="Copy link">
                                      <IconButton
                                        size="small"
                                        onClick={() => handleCopyLink(iv.meetingLink)}
                                        sx={{
                                          color: TOKENS.inkMuted,
                                          border: `1px solid ${TOKENS.hairline}`,
                                          borderRadius: "8px",
                                          "&:hover": { color: TOKENS.blue, borderColor: TOKENS.blueBorder },
                                        }}
                                      >
                                        <CopyIcon sx={{ fontSize: 14 }} />
                                      </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Open link">
                                      <IconButton
                                        size="small"
                                        href={iv.meetingLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        component="a"
                                        sx={{
                                          color: TOKENS.inkMuted,
                                          border: `1px solid ${TOKENS.hairline}`,
                                          borderRadius: "8px",
                                          "&:hover": { color: TOKENS.blue, borderColor: TOKENS.blueBorder },
                                        }}
                                      >
                                        <OpenIcon sx={{ fontSize: 14 }} />
                                      </IconButton>
                                    </Tooltip>
                                  </>
                                )}
                                <Button
                                  size="small"
                                  onClick={() => setSelected(iv)}
                                  sx={{
                                    textTransform: "none",
                                    fontFamily: bodyFont,
                                    fontWeight: 600,
                                    fontSize: "11.5px",
                                    borderRadius: "8px",
                                    color: TOKENS.inkMuted,
                                    border: `1px solid ${TOKENS.hairline}`,
                                    px: 1.5,
                                    "&:hover": { color: TOKENS.ink, borderColor: TOKENS.hairline, bgcolor: "rgba(255,255,255,0.03)" },
                                  }}
                                >
                                  Details
                                </Button>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </motion.div>
                    ))}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {/* ---------------- Detail dialog ---------------- */}
        {/* Only this dialog's background handling changed: every section
            (Paper root, Title, Content, Actions) now forces the dark
            surface color with !important, since the plain `bgcolor`
            prop was losing to a more specific/later global style and
            rendering as white. Nothing else — layout, logic, text,
            spacing — was touched. */}
        <Dialog
          open={Boolean(selected)}
          onClose={() => setSelected(null)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: "18px",
              bgcolor: `${TOKENS.surfaceSolid} !important`,
              backgroundColor: `${TOKENS.surfaceSolid} !important`,
              backgroundImage: "none !important",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: `1px solid ${TOKENS.hairline}`,
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
              color: `${TOKENS.ink} !important`,
            },
          }}
          slotProps={{
            backdrop: {
              sx: {
                bgcolor: "rgba(2,6,15,0.72) !important",
                backdropFilter: "blur(4px)",
              },
            },
          }}
        >
          {selected && (
            <>
              <DialogTitle
                sx={{
                  pb: 1.5,
                  pt: 2.5,
                  bgcolor: `${TOKENS.surfaceSolid} !important`,
                  backgroundColor: `${TOKENS.surfaceSolid} !important`,
                  backgroundImage: "none !important",
                  color: `${TOKENS.ink} !important`,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Box
                    sx={{
                      width: 46,
                      height: 46,
                      flexShrink: 0,
                      borderRadius: "12px",
                      background: `linear-gradient(135deg, ${TOKENS.blueSoft}, ${TOKENS.violetSoft})`,
                      border: `1px solid ${TOKENS.hairline}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: TOKENS.blue,
                      fontFamily: displayFont,
                      fontSize: "19px",
                      fontWeight: 600,
                    }}
                  >
                    {(selected.candidate?.name?.[0] || "?").toUpperCase()}
                  </Box>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography sx={{ fontFamily: displayFont, fontWeight: 600, fontSize: "19px", lineHeight: 1.2, color: `${TOKENS.ink} !important` }}>
                      {selected.candidate?.name || "Unknown candidate"}
                    </Typography>
                    <Typography sx={{ color: `${TOKENS.inkMuted} !important`, fontSize: "12.5px", mt: 0.2 }}>
                      {selected.job?.title || "N/A"}
                    </Typography>
                  </Box>
                </Box>
              </DialogTitle>
              <DialogContent
                sx={{
                  bgcolor: `${TOKENS.surfaceSolid} !important`,
                  backgroundColor: `${TOKENS.surfaceSolid} !important`,
                  backgroundImage: "none !important",
                  color: `${TOKENS.ink} !important`,
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 0.5 }}>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                      gap: 1.75,
                      p: 2,
                      borderRadius: "12px",
                      bgcolor: "rgba(255,255,255,0.02)",
                      border: `1px solid ${TOKENS.hairline}`,
                    }}
                  >
                    {[
                      { label: "Interviewer", value: selected.interviewer?.name },
                      { label: "Type", value: selected.interviewType },
                      { label: "Date", value: formatInterviewDate(selected.interviewDate) },
                      { label: "Time", value: formatInterviewTime(selected.interviewDate) },
                    ].map(({ label, value }) => (
                      <Box key={label}>
                        <Typography
                          sx={{
                            fontFamily: bodyFont,
                            color: `${TOKENS.inkFaint} !important`,
                            fontSize: "10.5px",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            mb: 0.3,
                          }}
                        >
                          {label}
                        </Typography>
                        <Typography
                          sx={{
                            color: `${TOKENS.ink} !important`,
                            fontSize: "14px",
                            fontWeight: 500,
                            textTransform: label === "Type" ? "capitalize" : "none",
                          }}
                        >
                          {value || "—"}
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                  {selected.meetingLink && (
                    <Box sx={{ p: 1.5, borderRadius: "10px", bgcolor: TOKENS.sageSoft, border: `1px solid rgba(52,211,153,0.25)` }}>
                      <Typography
                        sx={{
                          color: `${TOKENS.inkFaint} !important`,
                          fontSize: "11px",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          mb: 0.5,
                        }}
                      >
                        Meeting link
                      </Typography>
                      <Typography sx={{ color: `${TOKENS.sage} !important`, fontSize: "13px", wordBreak: "break-all" }}>
                        {selected.meetingLink}
                      </Typography>
                    </Box>
                  )}

                  {selected.feedback && (
                    <Box sx={{ p: 1.5, borderRadius: "10px", bgcolor: "rgba(255,255,255,0.02)", border: `1px solid ${TOKENS.hairline}` }}>
                      <Typography
                        sx={{
                          color: `${TOKENS.inkFaint} !important`,
                          fontSize: "11px",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          mb: 0.5,
                        }}
                      >
                        Feedback
                      </Typography>
                      <Typography sx={{ color: `${TOKENS.ink} !important`, fontSize: "14px", opacity: 0.85 }}>
                        {selected.feedback}
                      </Typography>
                    </Box>
                  )}

                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, pt: 0.5 }}>
                    <Typography sx={{ color: `${TOKENS.inkFaint} !important`, fontSize: "12px" }}>Status</Typography>
                    <StatusBadge interview={selected} />
                  </Box>
                </Box>
              </DialogContent>
              <DialogActions
                sx={{
                  p: 2.5,
                  pt: 1,
                  gap: 1,
                  flexWrap: "wrap",
                  bgcolor: `${TOKENS.surfaceSolid} !important`,
                  backgroundColor: `${TOKENS.surfaceSolid} !important`,
                  backgroundImage: "none !important",
                }}
              >
                {selected.result === "pending" && (
                  <>
                    <Button
                      startIcon={<EditIcon sx={{ fontSize: 16 }} />}
                      onClick={() => setShowFeedbackModal(true)}
                      sx={{ textTransform: "none", fontFamily: bodyFont, fontWeight: 600, color: `${TOKENS.violet} !important` }}
                    >
                      Add feedback
                    </Button>
                    <Button
                      onClick={() => handleQuickResult(selected._id, "selected")}
                      sx={{ textTransform: "none", fontFamily: bodyFont, fontWeight: 600, color: `${TOKENS.sage} !important` }}
                    >
                      Mark selected
                    </Button>
                    <Button
                      onClick={() => handleQuickResult(selected._id, "rejected")}
                      sx={{ textTransform: "none", fontFamily: bodyFont, fontWeight: 600, color: `${TOKENS.rust} !important` }}
                    >
                      Mark rejected
                    </Button>
                  </>
                )}
                <Button
                  onClick={() => setSelected(null)}
                  sx={{ textTransform: "none", fontFamily: bodyFont, fontWeight: 600, color: `${TOKENS.inkFaint} !important` }}
                >
                  Close
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>

        <InterviewFeedbackModal
          open={showFeedbackModal}
          onClose={() => setShowFeedbackModal(false)}
          interview={selected}
          onSuccess={() => {
            setShowFeedbackModal(false);
            setSelected(null);
            fetchInterviews();
            setToast({ open: true, message: "Feedback saved!", severity: "success" });
          }}
        />

        <Snackbar
          open={toast.open}
          autoHideDuration={4000}
          onClose={() => setToast((p) => ({ ...p, open: false }))}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            severity={toast.severity}
            onClose={() => setToast((p) => ({ ...p, open: false }))}
            sx={{
              borderRadius: "12px",
              bgcolor: `${TOKENS.surfaceSolid} !important`,
              backgroundColor: `${TOKENS.surfaceSolid} !important`,
              backgroundImage: "none !important",
              color: `${TOKENS.ink} !important`,
              fontFamily: bodyFont,
            }}
          >
            {toast.message}
          </Alert>
        </Snackbar>
      </Box>
    </motion.div>
  );
}