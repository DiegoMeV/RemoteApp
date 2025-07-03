import { GenericAutocompleteRequest } from '@/libV4'

const UserAutocomplete = ({ label, value, onChange }) => (
  <GenericAutocompleteRequest
    className='general_form_item'
    label={label}
    requestprops={{
      baseKey: 'urlUsers',
      url: '/users',
      isPaginated: true,
      additionalQry: '&isActive=true',
    }}
    value={value}
    onChange={onChange}
    required={true}
    autocompleteprops={{
      getOptionLabel: (option) => `${option?.firstName ?? ''} ${option?.lastName ?? ''}`,
    }}
    queryRequest={{
      querySearch: 'querySearch',
      additionalQuery: '&rowsPerPage=10&isActive=true',
    }}
    vlprops={{
      shouldClose: true,
      columns: [
        {
          title: 'Nombre',
          dataIndex: 'name',
          width: 200,
          render: (_, record) => `${record?.firstName ?? ''} ${record?.lastName ?? ''}`,
        },
        {
          title: 'Correo',
          dataIndex: 'email',
          width: 200,
        },
      ],
    }}
  />
)

const AutocompletesUsers = ({ originUser, setOriginUser, assignedUser, setAssignedUser }) => (
  <div className='general_form_container'>
    <UserAutocomplete
      label='Usuario Origen'
      value={originUser}
      onChange={(_, params) => setOriginUser(params)}
    />
    <UserAutocomplete
      label='Usuario Destino'
      value={assignedUser}
      onChange={(_, params) => setAssignedUser(params)}
    />
  </div>
)

export default AutocompletesUsers
