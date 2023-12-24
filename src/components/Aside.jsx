import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from '@nextui-org/react'
import { useCategory } from '../context/CategoryProvider'
import { useModal } from '../context/ModalProvider'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'
import { IconHome, IconLogout } from '@tabler/icons-react'
import ListCategories from './ListCategories'

export default function Aside() {
  const { handleClear } = useCategory()
  const { activeCategoryModal } = useModal()
  const { displayName, email, photoURL, handleSignOut } = useAuth()

  const naigate = useNavigate()

  return (
    <aside className='w-1/6 rounded-lg flex flex-col z-10'>
      <header className='relative h-full flex flex-col gap-5'>
        <Button
          onPress={() => {
            handleClear()
            activeCategoryModal()
          }}
          size='lg'
          radius='full'
          className='absolute top-0 left-0 right-0 bg-purple-600'
        >
          + Nueva categoria
        </Button>

        <ListCategories />

        <div className='w-full bg-background absolute bottom-0 left-0'>
          <Dropdown>
            <DropdownTrigger>
              <article className='flex items-center gap-3'>
                <Avatar src={photoURL} showFallback />
                <h2 className='text-sm font-bold line-clamp-1'>
                  {displayName || email}
                </h2>
              </article>
            </DropdownTrigger>

            <DropdownMenu aria-label='Options'>
              <DropdownItem
                startContent={<IconHome />}
                key='home'
                onPress={() => naigate('/')}
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
        </div>
      </header>
    </aside>
  )
}
