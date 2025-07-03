import { BasicListItem, BasicTitle } from '@/libV4'
import { Add, Air, Edit, Layers } from '@mui/icons-material'
import { Divider, IconButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const GroupsList = ({ filterData }) => {
  const navigate = useNavigate()

  const buttonItem = {
    title: 'Agregar grupo',
    icon: <Add />,
  }

  return (
    <section className='general_form_container w-full h-[calc(100vh-280px)] overflow-auto px-4 gap-x-8 gap-y-5 pt-2 pb-7'>
      {filterData?.map?.((application, index) => {
        return (
          <div
            key={index}
            className='h-[450px] xs:col-span-12 lg:col-span-6 2xl:col-span-4 shadow-lg rounded-bl-xl rounded-br-xl'
          >
            <BasicTitle
              title={`${application?.name ?? ''}`}
              className={'py-4 px-4 justify-between'}
              titleProps={{ variant: 'h6' }}
              button={{
                ...buttonItem,
                onClick: () =>
                  navigate(`/administration/editProcessTypeGroups/${application?.id}/new`),
              }}
            />
            <Divider />
            <div className='backgroundwhite1 h-[400px] overflow-auto rounded-bl-xl rounded-br-xl'>
              {application?.groups?.map?.((group, index) => (
                <BasicListItem
                  key={index}
                  icon={<Layers />}
                  label={group?.name ?? ''}
                >
                  <IconButton
                    title='Editar grupo'
                    onClick={() =>
                      navigate(
                        `/administration/editProcessTypeGroups/${application?.id}/${group?.id}`
                      )
                    }
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    title='Tipos de proceso'
                    onClick={() => navigate(`/administration/groupProcess/${group?.id}`)}
                  >
                    <Air />
                  </IconButton>
                </BasicListItem>
              ))}
            </div>
          </div>
        )
      })}
    </section>
  )
}

export default GroupsList
