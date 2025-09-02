export interface ClubMember {
  id: string;
  name: string;
  position: string;
  department: string;
  year: string;
  image?: string;
  linkedin?: string;
  github?: string;
  email?: string;
}

export interface StaffMember {
  id: string;
  name: string;
  designation: string;
  department: string;
  qualification: string;
  specialization: string;
  image?: string;
  email?: string;
}

export interface ClubInfo {
  about: string;
  mission: string;
  vision: string;
  objectives: string[];
  achievements: string[];
  activities: string[];
}

export const clubMembers: ClubMember[] = [
  {
    id: '1',
    name: 'Arjun Krishnan',
    position: 'President',
    department: 'Computer Science',
    year: 'Final Year',
    email: 'arjun.president@csmit.edu',
    linkedin: 'https://linkedin.com/in/arjunkrishnan',
    github: 'https://github.com/arjunkrishnan'
  },
  {
    id: '2',
    name: 'Priya Sharma',
    position: 'Vice President',
    department: 'Information Technology',
    year: 'Third Year',
    email: 'priya.vp@csmit.edu',
    linkedin: 'https://linkedin.com/in/priyasharma',
    github: 'https://github.com/priyasharma'
  },
  {
    id: '3',
    name: 'Rahul Menon',
    position: 'Technical Lead',
    department: 'Computer Science',
    year: 'Final Year',
    email: 'rahul.tech@csmit.edu',
    linkedin: 'https://linkedin.com/in/rahulmenon',
    github: 'https://github.com/rahulmenon'
  },
  {
    id: '4',
    name: 'Sneha Nair',
    position: 'Event Coordinator',
    department: 'Information Technology',
    year: 'Third Year',
    email: 'sneha.events@csmit.edu',
    linkedin: 'https://linkedin.com/in/snehanair'
  },
  {
    id: '5',
    name: 'Karthik Raj',
    position: 'Treasurer',
    department: 'Computer Science',
    year: 'Second Year',
    email: 'karthik.treasurer@csmit.edu',
    linkedin: 'https://linkedin.com/in/karthikraj'
  },
  {
    id: '6',
    name: 'Ananya Pillai',
    position: 'Secretary',
    department: 'Information Technology',
    year: 'Second Year',
    email: 'ananya.secretary@csmit.edu',
    linkedin: 'https://linkedin.com/in/ananyapillai'
  }
];

export const staffMembers: StaffMember[] = [
  {
    id: '1',
    name: 'Dr. Rajesh Kumar',
    designation: 'Faculty Advisor',
    department: 'Computer Science & Engineering',
    qualification: 'Ph.D. in Computer Science',
    specialization: 'Machine Learning, Data Science',
    email: 'rajesh.kumar@mit.edu'
  },
  {
    id: '2',
    name: 'Prof. Meera Nair',
    designation: 'Co-Faculty Advisor',
    department: 'Information Technology',
    qualification: 'M.Tech in Information Technology',
    specialization: 'Web Technologies, Database Systems',
    email: 'meera.nair@mit.edu'
  },
  {
    id: '3',
    name: 'Dr. Suresh Pillai',
    designation: 'Technical Mentor',
    department: 'Computer Science & Engineering',
    qualification: 'Ph.D. in Software Engineering',
    specialization: 'Software Architecture, Cloud Computing',
    email: 'suresh.pillai@mit.edu'
  }
];

export const clubInfo: ClubInfo = {
  about: "The Computer Society of MIT (CSMIT) is a premier student organization dedicated to fostering excellence in computer science and technology. Established with the vision of creating a vibrant community of tech enthusiasts, we serve as a bridge between academic learning and industry requirements.",
  mission: "To empower students with cutting-edge technical knowledge, practical skills, and innovative thinking while building a strong network of future technology leaders.",
  vision: "To be the leading computer society that shapes the next generation of technology innovators and entrepreneurs.",
  objectives: [
    "Organize technical workshops and seminars on emerging technologies",
    "Conduct coding competitions and hackathons to enhance programming skills",
    "Facilitate industry interactions and internship opportunities",
    "Promote research and development activities among students",
    "Build a collaborative learning environment for knowledge sharing",
    "Develop leadership and project management skills through various initiatives"
  ],
  achievements: [
    "Winner of Inter-College Coding Championship 2024",
    "Successfully organized 15+ technical workshops in the past year",
    "100+ active members across different departments",
    "Partnerships with leading tech companies for internships",
    "Published 20+ research papers by student members",
    "Organized the largest hackathon in the region with 500+ participants"
  ],
  activities: [
    "Weekly coding sessions and algorithm discussions",
    "Monthly tech talks by industry experts",
    "Annual technical symposium and project exhibition",
    "Open source contribution drives",
    "Competitive programming training",
    "Career guidance and placement preparation sessions"
  ]
};