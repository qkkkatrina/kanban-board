import { v4 as uuidv4 } from 'uuid'; // Для генерации уникальных ID

export const mockData = [
  {
    title: 'backlog',
    issues: [
      { id: uuidv4(), name: 'Login page – performance issues', description: 'Fix performance problems on the user login page to ensure faster loading times and a smoother user experience.' },
      { id: uuidv4(), name: 'Sprint bugfix', description: 'Address and resolve all identified bugs within the current sprint cycle.' }
    ]
  },
  {
    title: 'ready',
    issues: [
      { id: uuidv4(), name: 'User profile page', description: 'Develop and implement the user profile section, allowing users to view and edit their personal information.' }
    ]
  },
  {
    title: 'in progress',
    issues: [
      { id: uuidv4(), name: 'Homepage redesign', description: 'Redesign the main homepage layout to improve aesthetics and user navigation.' }
    ]
  },
  {
    title: 'finished',
    issues: [
      { id: uuidv4(), name: 'Landing page SEO', description: 'Optimize the landing page for search engines to improve organic search rankings.' },
      { id: uuidv4(), name: 'Payment gateway integration', description: 'Integrate a new payment gateway to support multiple payment options.' }
    ]
  }
];