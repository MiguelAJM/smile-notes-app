import Aside from '../components/Aside'

export default function Home() {
  return (
    <section className='w-full h-screen p-6'>
      <div className='w-full h-full flex justify-center items-center flex-col gap-8 mx-auto'>
        <div className='flex gap-8 w-full h-full '>
          <Aside />
          <div className='bg-gradient-to-br to-purple-800 from-purple-600 w-3/4 rounded-2xl'></div>
        </div>
      </div>
    </section>
  )
}
