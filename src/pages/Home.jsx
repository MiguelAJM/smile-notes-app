import { signOut } from 'firebase/auth'
import { useTask } from '../context/TaskProvider'
import { formattedDate } from '../helpers/formattedDate'
import { auth } from '../firebase/firebaseConfig'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const {
    tasks,
    editTask,
    task,
    displayName,
    status,
    handleChange,
    deleteTask,
    handleSubmit,
    setEditTask
  } = useTask()

  const navigate = useNavigate()

  async function handleSignOut() {
    try {
      await signOut(auth)
      toast.success('Sesión cerrada exitosamente. !Vuelva pronto!')
      navigate('/login')
    } catch (error) {
      toast.error('Ha ocurrido un error inesperado, inténtalo más tarde.')
    }
  }

  if (status === 'pending' || status === 'idle') {
    return (
      <div>
        <h2>Cargando...</h2>
      </div>
    )
  }

  return (
    <div>
      <button onClick={handleSignOut} className='text-5xl underline mb-8'>
        Cerrar sesion
      </button>
      <h1 className='text-3xl underline'>Tareas</h1>
      <h2 className='my-8 text-4xl'>{displayName}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={task.title}
          onChange={handleChange}
          name='title'
        />
        <input
          type='text'
          value={task.description}
          onChange={handleChange}
          name='description'
        />
        <button>{Object.keys(editTask).length > 0 ? 'Editar' : 'Crear'}</button>
      </form>

      <ul>
        {tasks.map((tasks) => {
          return (
            <li className='my-8' key={tasks.id}>
              <p>Titulo: {tasks.title}</p>
              <p>Desc: {tasks.description}</p>
              <p>ID: {tasks.id}</p>
              <p>Fecha: {formattedDate(tasks.date_created)}</p>
              <button
                onClick={() => deleteTask(tasks.id)}
                className='text-red-500'
              >
                Eliminar
              </button>
              <button
                onClick={() => setEditTask(tasks)}
                className='text-lime-500'
              >
                Editar
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
