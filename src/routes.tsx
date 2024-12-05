import { createBrowserRouter } from 'react-router-dom';
import LoginPage from './pages/Login/LoginPage';
import HomePage from './pages/Home/HomePage';
import JobDetail from './components/JobDetail';
import MainLayout from './layouts/MainLayout';
export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <HomePage />,
            },
            {
                path: '/job/:id',
                element: <JobDetail />,
            },
        ],
    },
    {
        path: 'login',
        element: <LoginPage />,
    },
]);