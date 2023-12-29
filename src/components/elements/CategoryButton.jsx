import { handleDeleteCategory } from '../../firebase/services/categories/deleteCategory'
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from '@nextui-org/react'
import { IconEdit, IconTrash } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthProvider'
import { useModal } from '../../context/ModalProvider'
import { useCategory } from '../../context/CategoryProvider'

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
