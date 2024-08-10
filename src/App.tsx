import './App.css'
import { NotificationProvider } from './context/NotificationContext'
import { RouterProvider } from 'react-router-dom'
import router from './router'

function App() {

  return (
    <NotificationProvider>
      <RouterProvider router={router} />
    </NotificationProvider>
  )
}

export default App
