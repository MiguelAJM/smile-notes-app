import { BrowserRouter } from 'react-router-dom'
import { NextUIProvider } from '@nextui-org/react'
import AuthProvider from './context/AuthProvider'
import NoteProvider from './context/NoteProvider'
import TaskProvider from './context/TaskProvider'

export default function Providers({ children }) {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NoteProvider>
          <TaskProvider>
            <NextUIProvider>{children}</NextUIProvider>
          </TaskProvider>
        </NoteProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
