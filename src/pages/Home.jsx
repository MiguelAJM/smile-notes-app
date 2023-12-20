import { Button, Spinner } from '@nextui-org/react'
import { useAuth } from '../context/AuthProvider'
import { useNote } from '../context/NoteProvider'
import Tasks from '../components/Tasks'
import Notes from '../components/Notes'
import { useTask } from '../context/TaskProvider'

export default function Home() {
  const { status } = useNote()
  const { tab, setTab } = useTask()
  const { user, handleSignOut } = useAuth()

  const displayName = user?.displayName

  if (status === 'pending' || status === 'idle') {
    return (
      <div>
        <Spinner size='lg' />
        <h2>Cargando...</h2>
      </div>
    )
  }

  return (
    <div>
      <button onClick={handleSignOut} className='text-5xl underline mb-8'>
        Cerrar sesion
      </button>

      <h2 className='text-2xl underline mb-8'>Hola {displayName}</h2>

      <div className='flex gap-4'>
        <Button
          onPress={() => setTab('notes')}
          color={tab === 'notes' ? 'primary' : 'default'}
          className='mb-8'
        >
          Notas
        </Button>
        <Button
          onPress={() => setTab('tasks')}
          color={tab === 'tasks' ? 'primary' : 'default'}
          className='mb-8'
        >
          Tareas
        </Button>
      </div>
      {tab === 'notes' ? <Notes /> : <Tasks />}
    </div>
  )
}
