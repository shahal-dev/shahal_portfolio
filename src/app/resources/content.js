import { InlineCode } from "@/once-ui/components";

const person = {
  firstName: "MD Shahadat Hossain",
  lastName: "Shahal",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "AstroPhotographer, Blockchain dev, Machine learning enthusiast, Designer",
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
];

const home = {
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>AstroPhotographer, Blockchain dev, Machine learning enthusiast, Designer</>,
  subline: (
    <>
      I'm Shahal, a Reseasrch Assistant at <InlineCode>ICCCAD</InlineCode>, where I am currently working in 
      <br /> COLOCAL project. I am also an astrophotographer, currently persuing my BSc. with Computer science and Enginnering <br/>
      and Astronomy and astrophysics minor. I am a silver award and award of distinction winner in International Blockchain Olympiad. <br/>
      I am currentlu working with neural networks. I also have proficiency in Designing.
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
      I'm Shahal, a Reseasrch Assistant at <InlineCode>ICCCAD</InlineCode> where I am currently working in 
      <br /> COLOCAL project. I am also an astrophotographer, currently persuing my BSc. with Computer science and Enginnering <br/>
      and Astronomy and astrophysics minor. I am a silver award and award of distinction winner in International Blockchain Olympiad. <br/>
      I am currentlu working with nural networks. I also have proficiency in Designing.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "ICCCAD",
        timeframe: "2025-Present ",
        role: "Reasearch Assistant, COLOCAL Project",
        achievements: [

        ],
        images: [
          // optional: leave the array empty if you don't want to display images
          // {
          //   src: "/images/projects/project-01/cover-01.jpg",
          //   alt: "Once UI Project",
          //   width: 16,
          //   height: 9,
          // },
        ],
      },
      
      {
        company: "Center for Astronomy, Space Science and Astrophysics (CASSA)",
        timeframe: "2024 - Present",
        role: "Project: RGC",
        achievements: [
          <>
            Developed a design system that unified the brand across multiple platforms, improving
            design consistency by 40%.
          </>,
          <>
            Led a cross-functional team to launch a new product line, contributing to a 15% increase
            in overall company revenue.
          </>,
        ],
        images: [],
      },
      {
        company: "AUTOMATE YOUR DAY WITH PYTHON",
        timeframe: "2023 - Present",
        role: "Workshop SOD",
        achievements: [
          <>
An workshop for the faculties of non engineering schools , to automate their workflow with programming.
          </>,
          <>
Helped teaching basics of programming and Python Language to the faculty memebers of non Engineering faculties at IUB
          </>,
        ],
        images: [],
      },
      {
        company: "BlockLab",
        timeframe: "2023 - Present",
        role: "Solution architect",
        achievements: [
          <>
We have been designing blockchain based solution addressing various social, environmental and technological problems.
          </>
        ],
        images: [],
      },
      {
        company: "দূরবিন - Durbin",
        timeframe: "2023 - Present",
        role: "National Volunteer and AstroPhotographer",
        achievements: [
          <>
            Developed a design system that unified the brand across multiple platforms, improving
            design consistency by 40%.
          </>,
          <>
            Led a cross-functional team to launch a new product line, contributing to a 15% increase
            in overall company revenue.
          </>,
        ],
        images: [],
      },
      {
        company: "TransEnd",
        timeframe: "2023 - 2024",
        role: "Intern",
        achievements: [
          <>
Working aiming to help 1 million marginalized and underrepresented community being skilled in order to pursuing social and economical empowerment.
          </>,
        ],
        images: [],
      },
      {
        company: "Independent photography Club",
        timeframe: "2022 - 2023",
        role: "Executive of Creative and Media Publications",
        achievements: [
          <>
In a very short time, I have proven myself to be an executive member of the club.
</>,
        ],
        images: [],
      },
      {
        company: "ICCCAD",
        timeframe: "2024-2024",
        role: "Reasearch Intern",
        achievements: [
          <>
Worked closely with the CAP-RES team to learn how to implement cross domain knowledge into building resilience
          </>,
          <>
Working on a ERP For the organization
          </>,
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
          // {
          //   src: "/images/projects/project-01/cover-01.jpg",
          //   alt: "Once UI Project",
          //   width: 16,
          //   height: 9,
          // },
        ],
      },
    ],
    
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Studies",
    institutions: [
      {
        name: "Independent University, Bangladesh",
        description: <>Bachelor of Computer Science and Engineering With Astronomy and AstroPhysics minor</>,
      },
      {
        name: "Notre Dame College ",
        description: <>Higher Secondary School Certificate</>,
      },

    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Astro Image Processing",
        description: <>Able to process Astro Images with various tools and python.</>,
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/Astro/bodes.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
          {
            src: "/images/Astro/cigar.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "Next.js",
        description: <>Building next gen apps with Next.js</>,
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/projects/shProjects/Agro.png",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "Decentralized Application (DApp) Developer ",
        description: <>Building next gen web3 Apps</>,
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/projects/shProjects/bibaho.png",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "Deep Learning Practitioner",
        description: <>Designing neural netwrok for various problems and fine tune them </>,
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/projects/shProjects/nn1.png",
            alt: "Project image",
            width: 16,
            height: 9,
          },
          {
            src: "/images/projects/shProjects/nn2.png",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "Designing",
        description: <>Designing content, posters and other visuals</>,
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/projects/shProjects/de1.png",
            alt: "Project image",
            width: 16,
            height: 9,
          },
          {
            src: "/images/projects/shProjects/de2.png",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
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
    // {
    //   src: "/images/gallery/img-02.jpg",
    //   alt: "image",
    //   orientation: "horizontal",
    // },
    // {
    //   src: "/images/gallery/img-03.jpg",
    //   alt: "image",
    //   orientation: "vertical",
    // },
    // {
    //   src: "/images/gallery/img-04.jpg",
    //   alt: "image",
    //   orientation: "horizontal",
    // },
    // {
    //   src: "/images/gallery/img-05.jpg",
    //   alt: "image",
    //   orientation: "horizontal",
    // },
    // {
    //   src: "/images/gallery/img-06.jpg",
    //   alt: "image",
    //   orientation: "vertical",
    // },
    // {
    //   src: "/images/gallery/img-07.jpg",
    //   alt: "image",
    //   orientation: "horizontal",
    // },
    // {
    //   src: "/images/gallery/img-08.jpg",
    //   alt: "image",
    //   orientation: "vertical",
    // },
    // {
    //   src: "/images/gallery/img-09.jpg",
    //   alt: "image",
    //   orientation: "horizontal",
    // },
    // {
    //   src: "/images/gallery/img-10.jpg",
    //   alt: "image",
    //   orientation: "horizontal",
    // },
    // {
    //   src: "/images/gallery/img-11.jpg",
    //   alt: "image",
    //   orientation: "vertical",
    // },
    // {
    //   src: "/images/gallery/img-12.jpg",
    //   alt: "image",
    //   orientation: "horizontal",
    // },
    // {
    //   src: "/images/gallery/img-13.jpg",
    //   alt: "image",
    //   orientation: "horizontal",
    // },
    // {
    //   src: "/images/gallery/img-14.jpg",
    //   alt: "image",
    //   orientation: "horizontal",
    // },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
