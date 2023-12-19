import React from 'react'
import AuthProvider from './AuthProvider'
import TaskProvider from './TaskProvider'

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <TaskProvider>{children}</TaskProvider>
    </AuthProvider>
  )
}
