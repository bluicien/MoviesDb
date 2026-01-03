
import { createBrowserRouter, Navigate } from 'react-router'
import Root from './components/Root'
import Home from './pages/home/Home'
import About from './pages/about/About'
import Auth from './pages/auth/Auth'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import MoviesList from './pages/movies/MoviesList'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'
import Movie from './pages/movies/movie/Movie'

export const router = createBrowserRouter([
  {
    path: "/", 
    Component: Root,
    children: [
      { index: true, Component:  Home },
      { path: "about", Component: About },
      {
        path: "auth",
        Component: PublicRoute,
        children: [
          {
            Component: Auth,
            children: [
              { index: true, element: <Navigate to="login" replace /> },
              { path: "login", Component: Login },
              { path: "signup", Component: Signup }
            ]
          }
        ]
      },
      {
        Component: ProtectedRoute,
        path: "movies",
        children: [
          { index: true, Component: MoviesList },
          { path: ":id", Component: Movie }
        ]
      }
    ]
  },
]);
