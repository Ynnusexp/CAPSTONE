import { createBrowserRouter } from 'react-router-dom';
import LoginFormModal from '../components/LoginFormModal';
import SignupFormModal from '../components/SignupFormModal';
import Layout from './Layout';
import HomePage from '../components/HomePage/HomePage';
import Post from '../components/Post/Post';
// import CommentSection from '../components/CommentSection/CommentSection';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginFormModal />,
      },
      {
        path: "signup",
        element: <SignupFormModal />,
      },
      {
        path: "posts/:postId",
        element: <Post />,
      },
      // {
      //   path: "/tester",
      //   element: <CommentSection />,
      // },
    ],
  },
]);
