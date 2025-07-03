import { CardLayout, GenericTable } from '@/lib'

const ListingDue = () => {
  return (
    <CardLayout title='Listado Adeudado'>
      <GenericTable
        columns={[
          { field: 'id', headerName: 'ID', width: 150 },
          { field: 'name', headerName: 'Nombre', width: 150 },
          { field: 'email', headerName: 'Correo', width: 150 },
          { field: 'phone', headerName: 'Teléfono', width: 150 },
          { field: 'address', headerName: 'Dirección', width: 150 },
        ]}
        rows={[]}
      />
    </CardLayout>
  )
}

export default ListingDue
