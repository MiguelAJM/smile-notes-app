import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from '@nextui-org/react'
import { IconHome, IconLogout, IconPlus } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { useModal } from '../context/ModalProvider'
import { useAuth } from '../context/AuthProvider'
import { bgPrimary } from '../themes'
import CategoryList from './categories/CategoryList'

export default function Aside() {
  const { toggleModalCategory } = useModal()
  const { displayName, email, photoURL, handleSignOut } = useAuth()

  const navigate = useNavigate()

  return (
    <aside className='hidden lg:min-w-[240px] lg:flex rounded-lg flex-col z-10'>
      <header className='relative h-full flex flex-col gap-5'>
        <Button
          onPress={() => toggleModalCategory()}
          size='lg'
          radius='full'
          startContent={<IconPlus />}
          className={`${bgPrimary} absolute top-0 left-0 right-0`}
        >
          Nueva categoria
        </Button>

        <CategoryList />

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
        </div>
      </header>
    </aside>
  )
}
