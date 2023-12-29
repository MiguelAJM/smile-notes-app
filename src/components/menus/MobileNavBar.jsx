import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from '@nextui-org/react'
import {
  IconHome,
  IconLogout,
  IconMenu,
  IconPlus,
  IconX
} from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthProvider'
import { useModal } from '../../context/ModalProvider'
import { useMenu } from '../../context/MenuProvider'

export default function MobileNavBar() {
  const { toggleModalCategory } = useModal()
  const { photoURL, handleSignOut } = useAuth()
  const { menu, toggleMenu } = useMenu()

  const navigate = useNavigate()

  return (
    <header className='absolute top-0 left-0 flex justify-between items-center lg:hidden w-full z-50 bg-[#181818] py-4 px-3'>
      <div className='flex gap-2 items-center'>
        <Button
          onClick={toggleMenu}
          isIconOnly
          radius='full'
          className='bg-transparent'
        >
          {menu ? <IconX /> : <IconMenu />}
        </Button>
        <h2 className='font-bold'>SlimeNotes</h2>
      </div>
      <nav className='flex gap-2 items-center'>
        <Button onClick={toggleModalCategory} isIconOnly radius='full'>
          <IconPlus />
        </Button>
        <Dropdown>
          <DropdownTrigger>
            <article className='flex items-center gap-3'>
              <Avatar src={photoURL} showFallback />
            </article>
          </DropdownTrigger>

          <DropdownMenu aria-label='Options'>
            <DropdownItem
              startContent={<IconHome />}
              key='home'
              onPress={() => navigate('/')}
              className='text-white'
            >
              Inicio
            </DropdownItem>
            <DropdownItem
              startContent={<IconLogout />}
              key='signout'
              onPress={handleSignOut}
              className='text-danger'
              color='danger'
            >
              Cerrar sesión
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </nav>
    </header>
  )
}
