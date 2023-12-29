import { NextUIProvider } from '@nextui-org/react'
import AuthProvider from './context/AuthProvider'
import CategoryProvider from './context/CategoryProvider'
import TaskProvider from './context/TaskProvider'
import ModalProvider from './context/ModalProvider'
import { useNavigate } from 'react-router-dom'
import MenuProvider from './context/MenuProvider'

export default function Providers({ children }) {
  const navigate = useNavigate()

  return (
    <AuthProvider>
      <CategoryProvider>
        <TaskProvider>
          <ModalProvider>
            <MenuProvider>
              <NextUIProvider navigate={navigate}>{children}</NextUIProvider>
            </MenuProvider>
          </ModalProvider>
        </TaskProvider>
      </CategoryProvider>
    </AuthProvider>
  )
}
