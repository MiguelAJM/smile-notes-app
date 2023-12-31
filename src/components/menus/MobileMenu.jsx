import { Button, Link } from '@nextui-org/react'
import { bgPrimary } from '../../themes'
import { useMenu } from '../../context/MenuProvider'
import CategoryList from '../categories/CategoryList'

export default function MobileMenu() {
  const { toggleMenu } = useMenu()
  return (
    <aside
      onClick={() => toggleMenu()}
      className='absolute top-0 left-0 bottom-0 bg-black/75 w-full h-screen flex items-center z-50 overflow-hidden'
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className='relative max-w-[75%] lg:max-w-[50%] w-full h-full bg-[#181818] px-3 py-4 overflow-y-auto flex flex-col justify-between'
      >
        <CategoryList />
        <Button
          fullWidth
          showAnchorIcon
          as={Link}
          href='/'
          className={`${bgPrimary} text-xl`}
        >
          Inicio
        </Button>
      </div>
    </aside>
  )
}
