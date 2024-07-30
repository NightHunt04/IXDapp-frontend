import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/home/Home.jsx'
import Signup from './components/signup/Signup.jsx'
import Login from './components/login/Login.jsx'
import Post from './components/home/post/Post.jsx'
import Scrollpage from './components/home/scrollpage/Scrollpage.jsx'
import Liked from './components/home/liked/Liked.jsx'
import Account from './components/home/account/Account.jsx'

const router = createBrowserRouter([
  {
    path: '',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
        children: [
          {
            path: '',
            element: <Scrollpage />
          },
          {
            path: 'post',
            element: <Post />
          },
          {
            path: 'liked',
            element: <Liked />
          },
          {
            path: 'account/:id',
            element: <Account />
          }
        ]
      }
    ]
  }, 
  {
    path: '/signup',
    element: <Signup />
  }, 
  {
    path: '/login',
    element: <Login />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>,
)
