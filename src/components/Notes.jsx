import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Input,
  Textarea,
  Button
} from '@nextui-org/react'
import { useNote } from '../context/NoteProvider'
import { formattedDate } from '../helpers/formattedDate'
import Markdown from 'marked-react'

export default function Notes() {
  const {
    note,
    notes,
    editNote,
    updateNote,
    handleChange,
    handleChangeNotes,
    handleDeleteNote,
    handleSubmit,
    handleEditNote,
    handleUpdateNote
  } = useNote()

  return (
    <div>
      <form className='flex flex-col gap-4 w-[350px]'>
        <Input
          name='title'
          label='Titulo'
          type='text'
          value={note.title}
          onChange={handleChange}
        />
        <Textarea
          name='description'
          label='Descripcion'
          maxRows={20}
          maxLength={300}
          value={note.description}
          onChange={handleChange}
        />
        <p>{note.description.length}/300</p>
        <Button onPress={handleSubmit} color='primary'>
          Crear
        </Button>
      </form>
      <ul className='w-full grid grid-cols-2 gap-5 my-8'>
        {notes.map((item) => {
          return (
            <Card className='col-span-1' key={item.id}>
              <CardHeader>
                <div>
                  {editNote.id === item.id ? (
                    <Input
                      name='title'
                      label='Titulo'
                      type='text'
                      value={updateNote.title}
                      onChange={handleChangeNotes}
                    />
                  ) : (
                    <p>{item.title}</p>
                  )}
                  <p className='capitalize'>
                    {formattedDate(item.date_created)}
                  </p>
                </div>
              </CardHeader>
              <Divider />
              <CardBody>
                {editNote.id === item.id ? (
                  <div>
                    <Textarea
                      name='description'
                      label='Descripcion'
                      maxRows={30}
                      maxLength={300}
                      value={updateNote.description}
                      onChange={handleChangeNotes}
                    />
                    <p>{updateNote.description.length}/300</p>
                  </div>
                ) : (
                  item.description !== '' && (
                    <Markdown breaks className='my-4'>
                      {item.description}
                    </Markdown>
                  )
                )}
              </CardBody>
              <Divider />
              <CardFooter className='grid grid-cols-2 gap-5'>
                <Button
                  color='danger'
                  onPress={() => handleDeleteNote(item.id)}
                >
                  Eliminar
                </Button>
                <Button
                  color='success'
                  onPress={
                    editNote.id === item.id
                      ? () => handleUpdateNote()
                      : () => handleEditNote(item)
                  }
                >
                  {editNote.id === item.id ? 'Guardar' : 'Editar'}
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </ul>
    </div>
  )
}
