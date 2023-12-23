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

export default function CategoryButton({ item }) {
  const { activeCategoryModal } = useModal()
  const { handleDeleteCategory, handleEdit } = useCategory()

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          size='sm'
          radius='full'
          className='opacity-0 group-hover/edit:opacity-[1]'
          onClick={(e) => {
            e.preventDefault()
          }}
          isIconOnly
        >
          <IconEdit size={16} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label='Category options'>
        <DropdownItem
          startContent={<IconEdit />}
          key='edit-category'
          onPress={() => {
            activeCategoryModal()
            handleEdit(item)
          }}
        >
          Cambiar nombre
        </DropdownItem>
        <DropdownItem
          startContent={<IconTrash />}
          color='danger'
          key='delete-category'
          className='text-danger'
          onPress={() => handleDeleteCategory(item)}
        >
          Eliminar categoria
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
