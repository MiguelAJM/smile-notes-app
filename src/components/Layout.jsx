import { useMenu } from '../context/MenuProvider'
import { bgColor } from '../themes'
import Aside from './Aside'
import MobileListCategories from './MobileListCategories'
import MobileMenu from './MobileMenu'

export default function Layout({ children }) {
  const { menu } = useMenu()
  return (
    <>
      {menu && <MobileListCategories />}
      <section className='relative w-full h-screen lg:p-8'>
        <div className='w-full h-full flex justify-center items-center flex-col gap-8 mx-auto'>
          <div className='relative flex gap-8 w-full h-full '>
            <MobileMenu />
            <Aside />
            <div
              className={`${bgColor} w-full lg:w-5/6 relative flex flex-col lg:rounded-2xl gap-4 px-2 md:px-8 lg:px-24 lg:py-4 overflow-hidden`}
            >
              {children}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
