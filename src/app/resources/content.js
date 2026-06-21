import { InlineCode } from "@/once-ui/components";

const person = {
  firstName: "MD Shahadat Hossain",
  lastName: "Shahal",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Research Assistant · Machine Learning & Astrophysics · Blockchain Developer · AstroPhotographer",
  avatar: "/images/avatar.jpg",
  location: "Asia/Dhaka", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English", "Bangla"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: (
    <>
      I occasionally write about design, technology, and share thoughts on the intersection of
      creativity and engineering.
    </>
  ),
};

const social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/shahal-dev",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/shahadatw6//",
  },
  {
    name: "X",
    icon: "x",
    link: "",
  },
  {
    name: "Email",
    icon: "email",
    link: "mailto:shahadatw6@gmail.com",
  },
  {
    name: "Google Scholar",
    icon: "graduationCap", // 🎓 (use any from your icon set)
    link: "https://scholar.google.com/citations?hl=en&user=NewZCTsAAAAJ&view_op=list_works",
  },
  {
    name: "ORCID",
    icon: "idCard", // 🪪 (or any appropriate icon name)
    link: "https://orcid.org/my-orcid?orcid=0009-0001-5495-2619",
  },
];

const home = {
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: "Bridging machine learning and astrophysics",
  subline: (
    <>
      I'm Shahal, a Research Assistant at <InlineCode>Center for Astronomy, Space Science and Astrophysics (CASSA)</InlineCode>,
      <br /> where I build deep-learning pipelines to classify radio galaxies and map galaxy clusters from X-ray data.
      I'm also an astrophotographer and a Silver Award &amp; Award of Distinction winner at the International Blockchain Olympiad.
    </>
  ),
};

const about = {
  label: "About",
  title: "About me",
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        I'm Shahal, a Research Assistant at the Center for Astronomy, Space Science and
        Astrophysics (CASSA), working at the intersection of astronomy and machine learning.
        My research spans deep-learning classification of radio galaxies, X-ray analysis of
        galaxy clusters, and building instrument-control systems for telescopes.
        <br />
        <br />
        I hold a BSc in Computer Science &amp; Engineering with a minor in Astronomy and
        Astrophysics from Independent University, Bangladesh, where my thesis explored
        machine-learning approaches to radio-galaxy morphology classification. Alongside
        research, I build full-stack and blockchain applications — work that earned a Silver
        Award and an Award of Distinction at the International Blockchain Olympiad — and I'm an
        active astrophotographer and science-outreach volunteer.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "Center for Astronomy, Space Science and Astrophysics (CASSA)",
        timeframe: "Jan 2026 - Present",
        role: "PostBach Research Assistant",
        achievements: [
          <>
            Broadening the radio-galaxy classifier (RGC) to also classify sFRI and sFRII
            sources within a single deep-learning model.
          </>,
          <>
            Writing a pipeline to generate temperature maps from Chandra X-ray images of
            galaxy clusters.
          </>,
          <>
            Contributing to the center's upcoming instrument acquisition and setup decisions.
          </>,
        ],
        images: [],
      },
      {
        company: "Center for Astronomy, Space Science and Astrophysics (CASSA)",
        timeframe: "Sept 2025 - Dec 2025",
        role: "Undergraduate Research Assistant",
        achievements: [
          <>
            Developed machine-learning pipelines using e2cnn to classify Wide-Angle Tail (WAT)
            and Narrow-Angle Tail (NAT) radio galaxies from large-scale survey data.
          </>,
          <>
            Built a system to detect mini-haloes from X-ray galaxy-cluster images.
          </>,
          <>
            Prototyped a radio telescope using a GPS antenna.
          </>,
        ],
        images: [],
      },
      {
        company: "Block Lab",
        timeframe: "Jun 2022 - Present",
        role: "CEO & Lead Developer",
        achievements: [
          <>
            Developed a blockchain-based solution for document authentication.
          </>,
          <>
            Built transparent e-governance solutions on blockchain, and researched
            interoperability for a paperless society in Bangladesh.
          </>,
        ],
        images: [],
      },
      {
        company: "International Centre for Climate Change and Development (ICCCAD)",
        timeframe: "Jan 2025 - Aug 2025",
        role: "Research Assistant, COLOCAL Project",
        achievements: [
          <>
            Developed the web application for the COLOCAL project.
          </>,
          <>
            Gained extensive experience in field work and project management.
          </>,
        ],
        images: [],
      },
      {
        company: "International Centre for Climate Change and Development (ICCCAD)",
        timeframe: "Jun 2024 - Dec 2024",
        role: "Research Intern, CAP-RES Project",
        achievements: [
          <>
            Developed an ERP system for the organisation and a machine-learning methodology
            for river-erosion detection.
          </>,
          <>
            Gained hands-on experience in research methodology and documentation.
          </>,
        ],
        images: [],
      },
      {
        company: "দূরবিন - Durbin",
        timeframe: "Jun 2023 - Present",
        role: "National Volunteer & AstroPhotographer",
        achievements: [
          <>
            Astrophotography and astronomical image processing for outreach.
          </>,
          <>
            Outreach and event coordination for public astronomy programmes.
          </>,
        ],
        images: [],
      },
      {
        company: "CSC 211: Algorithms, CSE Dept, IUB",
        timeframe: "May 2023 - Jun 2024",
        role: "Student on Duty (SOD)",
        achievements: [
          <>
            Ran tutorial classes for enrolled students and organised study materials and
            course content.
          </>,
        ],
        images: [],
      },
      {
        company: "Automate Your Day with Python, IUB",
        timeframe: "Jun 2023 - Dec 2023",
        role: "Workshop SOD",
        achievements: [
          <>
            Helped run a workshop teaching non-engineering faculty to automate their workflows
            with programming.
          </>,
          <>
            Taught the basics of programming and Python to faculty members across non-engineering
            schools at IUB.
          </>,
        ],
        images: [],
      },
    ],
    
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Studies",
    institutions: [
      {
        name: "Independent University, Bangladesh (2022 – 2025)",
        description: (
          <>
            BSc in Computer Science &amp; Engineering, minor in Astronomy &amp; Astrophysics
            (GPA 3.66). Arrows Scholar (100% scholarship) and seven-time Vice Chancellor's
            List honoree. Thesis: <em>Machine Learning Approaches for Radio Galaxy Morphology
            Classification</em>.
          </>
        ),
      },
      {
        name: "Notre Dame College, Dhaka (2018 – 2020)",
        description: <>Higher Secondary School Certificate — GPA 5.00.</>,
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Machine Learning & AI",
        description: (
          <>
            Designing and fine-tuning deep neural networks for scientific image analysis —
            from data pipelines to trained, evaluated models.
          </>
        ),
        tags: [
          "Python",
          "PyTorch",
          "e2cnn (Equivariant CNNs)",
          "scikit-learn",
          "XGBoost",
          "OpenCV",
          "Model Fine-tuning",
        ],
        images: [],
      },
      {
        title: "Astronomy & Astrophysics",
        description: (
          <>
            Processing astronomical data from raw frames to science-ready maps, and building
            tooling to operate the instruments that capture it.
          </>
        ),
        tags: [
          "Astropy",
          "FITS Image Processing",
          "Radio Astronomy Data",
          "Chandra / CIAO X-ray",
          "Plate Solving",
          "Telescope Control",
          "Astrophotography",
        ],
        images: [],
      },
      {
        title: "Full-stack Web Development",
        description: (
          <>
            Building production web applications end to end, from typed databases to polished,
            responsive interfaces.
          </>
        ),
        tags: [
          "TypeScript",
          "React",
          "Next.js",
          "Node.js",
          "Vue",
          "PostgreSQL",
          "Drizzle ORM",
          "Tailwind CSS",
        ],
        images: [],
      },
      {
        title: "Blockchain & Decentralized Systems",
        description: (
          <>
            Award-winning blockchain solutions for document verification, ticketing, and
            transparent e-governance.
          </>
        ),
        tags: [
          "Solana",
          "Smart Contracts",
          "IPFS",
          "Decentralized Identity",
          "Document Verification",
        ],
        images: [],
      },
      {
        title: "Tooling & Foundations",
        description: (
          <>
            Core programming languages and the tools I rely on for day-to-day development and
            research.
          </>
        ),
        tags: ["C / C++", "JavaScript", "Git", "Linux", "Docker", "Bash"],
        images: [],
      },
    ],
  },
};

const blog = {
  label: "",
  title: "",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work = {
  label: "",
  title: "",
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery = {
  label: "Gallery",
  title: "My photo gallery",
  description: `A photo collection by ${person.name}`,
  // Images from https://pexels.com
  images: [
    {
      src: "/images/gallery/img-01.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-02.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-03.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-04.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-05.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-06.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-07.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-08.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-09.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-10.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-11.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-12.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-13.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-14.jpg",
      alt: "image",
      orientation: "horizontal",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
