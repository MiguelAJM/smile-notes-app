import { bgColor } from '../themes'
import Aside from './Aside'

export default function Layout({ children }) {
  return (
    <section className='w-full h-screen p-8'>
      <div className='w-full h-full flex justify-center items-center flex-col gap-8 mx-auto'>
        <div className='flex gap-8 w-full h-full '>
          <Aside />
          <div
            className={`${bgColor} w-5/6 relative flex flex-col rounded-2xl gap-4 px-32 p-4 overflow-hidden`}
          >
            {children}
          </div>
        </div>
      </div>
    </section>
  )
}
