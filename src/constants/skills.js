

export const skillCategories = {
  "Software Development": [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Vue.js",
    "Angular",
    "Node.js",
    "Express.js",
    "NestJS",
    "MongoDB",
    "MySQL",
    "PostgreSQL",
    "SQL",
    "Firebase",
    "REST API",
    "GraphQL",
    "Git",
    "GitHub",
    "Docker",
    "Kubernetes",
    "AWS",
    "Azure",
    "Google Cloud",
    "Linux",
    "CI/CD",
    "Jest",
    "Cypress",
    "Python",
    "Java",
    "C#",
    "C++",
    "PHP",
    "Laravel",
    "Django",
    "Spring Boot",
    "Redis",
    "Microservices"
  ],

  "Artificial Intelligence & Data Science": [
    "Python",
    "Machine Learning",
    "Deep Learning",
    "TensorFlow",
    "PyTorch",
    "Scikit-learn",
    "Pandas",
    "NumPy",
    "Data Analysis",
    "Data Visualization",
    "NLP",
    "Computer Vision",
    "SQL",
    "Power BI",
    "Tableau",
    "Statistics"
  ],

  "Cyber Security": [
    "Network Security",
    "Penetration Testing",
    "Ethical Hacking",
    "Kali Linux",
    "Burp Suite",
    "Metasploit",
    "OWASP",
    "SIEM",
    "Firewalls",
    "Incident Response",
    "Digital Forensics"
  ],

  "Medical": [
    "Patient Care",
    "Clinical Diagnosis",
    "Emergency Medicine",
    "General Surgery",
    "Nursing",
    "Pharmacy",
    "Radiology",
    "Medical Coding",
    "Medical Billing",
    "Electronic Medical Records",
    "Laboratory Testing",
    "Phlebotomy",
    "ICU Care",
    "Operation Theater",
    "Vital Signs Monitoring"
  ],

  "Civil Engineering": [
    "AutoCAD",
    "Civil 3D",
    "ETABS",
    "STAAD Pro",
    "Quantity Surveying",
    "Structural Design",
    "Construction Management",
    "Site Supervision",
    "Project Planning",
    "Surveying"
  ],

  "Mechanical Engineering": [
    "SolidWorks",
    "AutoCAD",
    "CATIA",
    "ANSYS",
    "HVAC",
    "Mechanical Design",
    "Manufacturing",
    "CNC Programming",
    "Quality Control"
  ],

  "Electrical Engineering": [
    "PLC",
    "SCADA",
    "MATLAB",
    "Power Systems",
    "Electrical Design",
    "Circuit Design",
    "Instrumentation",
    "Industrial Automation"
  ],

  "Architecture": [
    "AutoCAD",
    "Revit",
    "SketchUp",
    "3ds Max",
    "Lumion",
    "Interior Design",
    "Building Design"
  ],

  "Accounting & Finance": [
    "Bookkeeping",
    "Financial Analysis",
    "Budgeting",
    "Auditing",
    "Taxation",
    "Payroll",
    "QuickBooks",
    "SAP",
    "Microsoft Excel",
    "Financial Reporting"
  ],

  "Banking": [
    "Retail Banking",
    "Credit Analysis",
    "Risk Management",
    "Cash Handling",
    "Customer Service",
    "Compliance"
  ],

  "Human Resources": [
    "Recruitment",
    "Talent Acquisition",
    "Payroll",
    "Performance Management",
    "Employee Relations",
    "HRIS",
    "Training & Development"
  ],

  "Marketing": [
    "Digital Marketing",
    "SEO",
    "SEM",
    "Google Ads",
    "Facebook Ads",
    "Social Media Marketing",
    "Content Marketing",
    "Email Marketing",
    "Brand Management",
    "Market Research"
  ],

  "Sales": [
    "Lead Generation",
    "CRM",
    "Sales Forecasting",
    "Cold Calling",
    "Negotiation",
    "Customer Relationship Management",
    "B2B Sales",
    "B2C Sales"
  ],

  "Graphic Design": [
    "Adobe Photoshop",
    "Adobe Illustrator",
    "Adobe InDesign",
    "Figma",
    "Canva",
    "UI Design",
    "UX Design",
    "Logo Design",
    "Brand Identity"
  ],

  "Video Editing": [
    "Adobe Premiere Pro",
    "After Effects",
    "DaVinci Resolve",
    "Final Cut Pro",
    "Motion Graphics",
    "Color Grading"
  ],

  "Education": [
    "Teaching",
    "Lesson Planning",
    "Curriculum Development",
    "Classroom Management",
    "Assessment",
    "Student Counseling"
  ],

  "Legal": [
    "Legal Research",
    "Contract Drafting",
    "Corporate Law",
    "Civil Law",
    "Criminal Law",
    "Litigation"
  ],

  "Customer Support": [
    "Customer Service",
    "CRM",
    "Problem Solving",
    "Communication",
    "Live Chat Support",
    "Email Support",
    "Call Center"
  ],

  "Administration": [
    "Microsoft Office",
    "Microsoft Excel",
    "Microsoft Word",
    "Office Management",
    "Documentation",
    "Scheduling",
    "Data Entry"
  ],

  "Supply Chain & Logistics": [
    "Inventory Management",
    "Warehouse Management",
    "Procurement",
    "Transportation",
    "SAP",
    "Logistics Planning"
  ],

  "Hospitality": [
    "Hotel Management",
    "Front Desk",
    "Food Safety",
    "Customer Service",
    "Housekeeping",
    "Restaurant Management"
  ],

  "Aviation": [
    "Flight Operations",
    "Aircraft Maintenance",
    "Air Traffic Control",
    "Cabin Crew",
    "Ground Handling"
  ],

  "Agriculture": [
    "Crop Management",
    "Soil Analysis",
    "Irrigation",
    "Livestock Management",
    "Agricultural Machinery"
  ]
};

export const allSkills = [
  ...new Set(Object.values(skillCategories).flat())
].sort();

