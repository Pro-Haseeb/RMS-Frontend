import React, { useState } from "react";
import {
  Box, TextField, Button, Typography, MenuItem,
  Checkbox,
  ListItemText,
  Select,
  FormControl,
  InputLabel,
  OutlinedInput
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { createJob } from "../../services/CompanyApi.js";
import { allSkills, skillCategories } from "../../constants/skills.js";

const glassInputStyle = {
  "& .MuiOutlinedInput-root": {
    color: "white",
    background: "rgba(255,255,255,0.03)",
    borderRadius: "12px",
    "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
    "&:hover fieldset": { borderColor: "rgba(255,255,255,0.2)" },
    "&.Mui-focused fieldset": { borderColor: "#60a5fa" }
  },
  "& .MuiInputLabel-root": { color: "#94a3b8" },
  "& .MuiInputLabel-root.Mui-focused": { color: "#60a5fa" },
  mb: 3
};

// const skills = [
//   "React",
//   "Node.js",
//   "MongoDB",
//   "Express.js",
//   "JavaScript",
//   "TypeScript",
//   "HTML",
//   "CSS",
//   "Python",
//   "Java",
//   "C++",
// ];

const initialForm = {
  title: "",
  description: "",
  skills: [],
  degree: "",
  category: "",
  experienceLevel: "",
  location: "",
  salary: "",
  deadline: "",
};

export default function CreateJob() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    console.log("Name:", name);
    console.log("Value:", value);
    console.log("Is Array:", Array.isArray(value));

    setFormData((prev) => ({
      ...prev,
      [name]: name === "skills" ? value : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic client-side validation & sanitization
    const forbidden = /[<>${}]/;
    if (!formData.title.trim() || !formData.description.trim()) {
      alert("Job title and description are required.");
      return;
    }
    if (forbidden.test(formData.title) || forbidden.test(formData.description)) {
      alert("Invalid characters in title/description.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        skills: formData.skills.join(","),
        category: formData.category,
        experienceLevel: formData.experienceLevel
          ? `${formData.experienceLevel} years`
          : undefined,
        location: formData.location.trim() || undefined,
        salary: formData.salary.trim() || undefined,
        deadline: formData.deadline || undefined,
      };

      await createJob(payload);
      alert("Job posted successfully!");
      setFormData(initialForm);
      navigate("/company/jobs");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create job");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 800, mx: "auto", color: "white" }}>
        <Typography variant="h4" fontWeight="800" sx={{ mb: 1, letterSpacing: "-0.5px" }}>
          Post a New Job
        </Typography>
        <Typography sx={{ color: "#94a3b8", mb: 5 }}>
          Create a new job listing to attract top talent.
        </Typography>

        <Box
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: "24px",
            background: "rgba(255, 255, 255, 0.02)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
          }}
        >
          <TextField
            fullWidth
            required
            name="title"
            label="Job Title"
            value={formData.title}
            onChange={handleChange}
            sx={glassInputStyle}
            placeholder="e.g. Senior Software Engineer"
          />

          <TextField
            fullWidth
            required
            name="description"
            label="Job Description"
            value={formData.description}
            onChange={handleChange}
            sx={glassInputStyle}
            multiline
            rows={5}
            placeholder="Describe the responsibilities and requirements..."
          />

          <TextField
            select
            fullWidth
            name="category"
            label="Job Category"
            value={formData.category}
            sx={glassInputStyle}
            onChange={handleChange}
          >
            {Object.keys(skillCategories).map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>

          <FormControl fullWidth sx={glassInputStyle}>
            <InputLabel>Required Skills</InputLabel>

            <Select
              multiple
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              
              input={<OutlinedInput label="Required Skills" />}
              sx={glassInputStyle}
              renderValue={(selected) => selected.join(", ")}
            >
              {(skillCategories[formData.category] || []).map((skill) => (
                <MenuItem key={skill} value={skill}>
                  <Checkbox checked={formData.skills.includes(skill)} />
                  <ListItemText primary={skill} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            name="degree"
            label="Qualifications"
            value={formData.degree}
            onChange={handleChange}
            sx={glassInputStyle}
            placeholder="Qualifications"
          />

          <TextField
            fullWidth
            name="experienceLevel"
            label="Experience Required (Years)"
            value={formData.experienceLevel}
            onChange={handleChange}
            sx={glassInputStyle}
            type="number"
            inputProps={{ min: 0 }}
            placeholder="e.g. 3"
          />

          <TextField
            fullWidth
            name="location"
            label="Location"
            value={formData.location}
            onChange={handleChange}
            sx={glassInputStyle}
            placeholder="e.g. Remote, Lahore"
          />

          <TextField
            fullWidth
            name="salary"
            label="Salary"
            value={formData.salary}
            onChange={handleChange}
            sx={glassInputStyle}
            placeholder="e.g. 80,000 - 120,000 PKR"
          />

         <Box>
  <Typography
    sx={{
      color: "rgba(255,255,255,0.7)",
      fontSize: "14px",
      mb: 1,
      ml: 0.5,
    }}
  >
    Application Deadline
  </Typography>

  <TextField
    fullWidth
    name="deadline"
    type="date"
    value={formData.deadline}
    onChange={handleChange}
    sx={{
      ...glassInputStyle,

      "& .MuiInputBase-input": {
        color: "#fff",
      },

      "& input[type='date']::-webkit-calendar-picker-indicator": {
        filter: "invert(1)",
        cursor: "pointer",
      },
    }}
  />
</Box>
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={submitting}
            sx={{
              mt: 2,
              background: "linear-gradient(135deg, #2563eb, #3b82f6)",
              color: "white",
              fontWeight: "600",
              fontSize: "1rem",
              py: 1.5,
              px: 4,
              borderRadius: "12px",
              textTransform: "none",
              boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)",
              "&:hover": {
                background: "linear-gradient(135deg, #1d4ed8, #2563eb)",
                boxShadow: "0 15px 30px -5px rgba(59, 130, 246, 0.6)"
              }
            }}
          >
            {submitting ? "Posting…" : "Post Job Now"}
          </Button>
        </Box>
      </Box>
    </motion.div>
  );
}
