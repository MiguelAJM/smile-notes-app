import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from '@nextui-org/react'
import { IconEdit, IconTrash } from '@tabler/icons-react'
import { useCategory } from '../context/CategoryProvider'
import { useModal } from '../context/ModalProvider'
import { useNavigate } from 'react-router-dom'
import { handleDeleteCategory } from '../firebase/categories-services/deleteCategory'
import { useAuth } from '../context/AuthProvider'

export default function CategoryButton({ item }) {
  const { user } = useAuth()

  const { toggleModalCategory } = useModal()
  const { handleEdit, handleClear } = useCategory()

  const navigate = useNavigate()

  const handleModal = () => {
    handleEdit(item)
    toggleModalCategory()
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          size='sm'
          radius='full'
          className='opacity-0 group-hover/edit:opacity-[1]'
          onClick={(e) => e.preventDefault()}
          isIconOnly
        >
          <IconEdit size={16} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label='Category options'>
        <DropdownItem
          startContent={<IconEdit />}
          key='edit-category'
          onPress={handleModal}
        >
          Cambiar nombre
        </DropdownItem>
        <DropdownItem
          startContent={<IconTrash />}
          color='danger'
          key='delete-category'
          className='text-danger'
          onPress={() =>
            handleDeleteCategory(item, user, handleClear, navigate)
          }
        >
          Eliminar categoria
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
