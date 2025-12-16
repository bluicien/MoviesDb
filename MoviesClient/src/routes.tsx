
import { createBrowserRouter } from 'react-router'
import Root from './components/Root'
import Home from './pages/home/Home'
import About from './pages/about/About'
import Auth from './pages/auth/Auth'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'

export const router = createBrowserRouter([
  {
    path: "/", 
    Component: Root,
    children: [
      { index: true, Component:  Home },
      { path: "about", Component: About },
      {
        path: "auth",
        Component: Auth,
        children: [
          { path: "login", Component: Login },
          { path: "signup", Component: Signup }
        ]
      },
      {
        path: "movies",
        children: [
        ]
      }
    ]
  },
])