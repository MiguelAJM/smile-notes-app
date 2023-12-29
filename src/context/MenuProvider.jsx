import { createContext, useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const MenuContext = createContext()

export function useMenu() {
  const CONTEXT = useContext(MenuContext)
  if (!CONTEXT) {
    throw new Error('You need to wrap the application in the provider')
  }
  return CONTEXT
}

export default function MenuProvider({ children }) {
  const location = useLocation()

  const [menu, setMenu] = useState(false)
  const toggleMenu = () => setMenu(!menu)

  useEffect(() => {
    setMenu(false)
  }, [location.pathname])

  return (
    <MenuContext.Provider value={{ menu, toggleMenu }}>
      {children}
    </MenuContext.Provider>
  )
}
