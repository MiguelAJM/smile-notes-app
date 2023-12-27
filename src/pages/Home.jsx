import Layout from '../components/Layout'

export default function Home() {
  return (
    <Layout>
      <div className='grid grid-cols-3 gap-4'>
        <div className='aspect-square bg-black rounded-2xl'>
          Tarea completadas: 0
        </div>
        <div className='aspect-square bg-black rounded-2xl'>
        </div>
        <div className='aspect-square bg-black rounded-2xl'></div>
      </div>

    </Layout>
  )
}
