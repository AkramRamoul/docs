export const templates = [
  {
    id: "blank",
    label: "Blank Document",
    imageUrl: "/blank-document.svg",
    initialContent: ``,
  },
  {
    id: "business-letter",
    label: "Business Letter",
    imageUrl: "/business-letter.svg",
    initialContent: `
      <h1 style="text-align: center;">[Your Company Name]</h1>
      <p>[Street Address]</p>
      <p>[City, State, ZIP Code]</p>
      <p>[Date]</p>
      <p>[Recipient Name]</p>
      <p>[Recipient Title]</p>
      <p>[Company Name]</p>
      <p>[Address]</p>
      <p>[City, State, ZIP Code]</p>
      <p>Dear [Recipient Name],</p>
      <p>[Body of the letter]</p>
      <p>Sincerely,</p>
      <p>[Your Name]</p>
      <p>[Your Title]</p>
    `,
  },
  {
    id: "software-proposal",
    label: "Software Development Proposal",
    imageUrl: "/software-proposal.svg",
    initialContent: `
      <h1>Software Development Proposal</h1>
      <h2>Project Overview</h2>
      <p>[Provide an overview of the project goals and scope]</p>
      <h2>Timeline</h2>
      <p>[Outline the timeline for project delivery]</p>
      <h2>Budget</h2>
      <p>[Detail the budget breakdown]</p>
      <h2>Team</h2>
      <p>[List the team members and their roles]</p>
      <h2>Contact</h2>
      <p>[Provide contact information]</p>
    `,
  },
  {
    id: "resume",
    label: "Resume",
    imageUrl: "/resume.svg",
    initialContent: `
      <h1>[Your Name]</h1>
      <p><strong>Email:</strong> [your.email@example.com]</p>
      <p><strong>Phone:</strong> [123-456-7890]</p>
      <h2>Professional Experience</h2>
      <p><strong>[Job Title]</strong> at [Company Name]</p>
      <p>[Describe your responsibilities and achievements]</p>
      <h2>Education</h2>
      <p><strong>[Degree]</strong> from [Institution]</p>
      <h2>Skills</h2>
      <ul>
        <li>[Skill 1]</li>
        <li>[Skill 2]</li>
        <li>[Skill 3]</li>
      </ul>
    `,
  },
  {
    id: "cover-letter",
    label: "Cover Letter",
    imageUrl: "/cover-letter.svg",
    initialContent: `
      <h1>Cover Letter</h1>
      <p>Dear [Hiring Manager's Name],</p>
      <p>I am writing to express my interest in the [Job Title] position at [Company Name].</p>
      <p>[Body of the letter detailing your skills and enthusiasm for the role]</p>
      <p>Thank you for considering my application. I look forward to the opportunity to discuss how I can contribute to your team.</p>
      <p>Sincerely,</p>
      <p>[Your Name]</p>
    `,
  },
  {
    id: "letter",
    label: "Letter",
    imageUrl: "/letter.svg",
    initialContent: `
      <p>[Sender's Address]</p>
      <p>[Recipient's Address]</p>
      <p>[Date]</p>
      <p>Dear [Recipient Name],</p>
      <p>[Body of the letter]</p>
      <p>Best regards,</p>
      <p>[Your Name]</p>
    `,
  },
  {
    id: "proposal",
    label: "Project Proposal",
    imageUrl: "/project-proposal.svg",
    initialContent: `
      <h1>Project Proposal</h1>
      <h2>Executive Summary</h2>
      <p>[Brief summary of the proposal]</p>
      <h2>Objectives</h2>
      <p>[List the objectives]</p>
      <h2>Deliverables</h2>
      <p>[Describe the expected deliverables]</p>
      <h2>Timeline</h2>
      <p>[Provide a timeline]</p>
      <h2>Budget</h2>
      <p>[Detail the budget]</p>
    `,
  },
];
