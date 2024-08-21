import './App.css'
import { NotificationProvider } from './context/NotificationContext'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    document.title = "Admin Una mộc đơn"
  }, []);

  return (
    <NotificationProvider>
      <RouterProvider router={router} />
    </NotificationProvider>
  )
}

export default App
