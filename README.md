# Github Jobs Portal

A modern job search application built with React, TypeScript, and Vite that allows users to search and filter job listings from Github Jobs.

## Features

- **User Authentication**: Secure login system
- **Job Search**: 
  - Search by job description
  - Filter by location
  - Filter for full-time positions
- **Job Listings**:
  - Paginated display with "Load More" functionality
  - Detailed job information
  - Company details and application instructions
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **State Management**: Redux Toolkit
- **UI Library**: Ant Design
- **Styling**: CSS-in-JS
- **Authentication**: Auth0

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd dans_fe
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your environment variables:
```env
VITE_AUTH0_DOMAIN=your-auth0-domain
VITE_AUTH0_CLIENT_ID=your-auth0-client-id
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/          # React components
│   ├── JobCard.tsx     # Individual job listing card
│   ├── JobDetail.tsx   # Detailed job view
│   ├── JobFilter.tsx   # Search and filter component
│   ├── JobList.tsx     # List of job listings
│   └── NavbarComponent.tsx
├── stores/             # Redux store configuration
│   ├── authSlice.ts    # Authentication state management
│   ├── jobSlice.ts     # Job listings state management
│   └── store.ts        # Redux store configuration
├── services/           # API services
│   └── jobApi.ts       # Job-related API calls
├── App.tsx             # Main application component
└── main.tsx           # Application entry point
```

## Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run lint`: Run ESLint
- `npm run preview`: Preview production build locally

## Features in Detail

### Authentication
- Implemented using Auth0
- Secure login/logout functionality
- Protected routes for authenticated users

### Job Search
- Real-time search functionality
- Multiple filter options:
  - Search by job title or description
  - Filter by location
  - Filter by job type (Full-time, Part-time, etc.)
  - Company name filter
- Pagination with "Load More" functionality

### Job Details
- Two-column layout:
  - Left: Detailed job description
  - Right: Company information and application instructions
- Company details including:
  - Company name
  - Company logo
  - Website link
- Application instructions

### API Integration
- RESTful API integration
- Efficient data fetching with axios
- Error handling and loading states
- Data caching for improved performance

### User Interface
- Clean and modern design with Ant Design
- Responsive layout for all devices
- Intuitive navigation
- Loading skeletons for better UX
- Error boundaries for graceful error handling

### Performance Optimization
- Code splitting and lazy loading
- Optimized bundle size
- Caching strategies
- Debounced search inputs

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details

## Contact

Your Name - your.email@example.com
Project Link: [https://github.com/yourusername/dans_fe](https://github.com/yourusername/dans_fe)

## Acknowledgments

* Dans Multi Pro for the project opportunity
* React TypeScript community
* Ant Design team for the amazing UI components
