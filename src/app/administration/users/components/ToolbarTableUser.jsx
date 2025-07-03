import { GenericSelect } from '@/libV4'
import { Button } from '@mui/material'

const ToolbarTableUser = ({ paramsFilter, buttons }) => {
  const handleChangeIsActive = (e) => {
    paramsFilter.setIsActive(e.target.value)
  }
  return (
    <>
      <div className='xs:col-span-12 sm:col-span-6 md:col-span-2'>
        <GenericSelect
          value={paramsFilter.isActive}
          onChange={handleChangeIsActive}
          options={[
            { value: true, label: 'Activos' },
            { value: false, label: 'Inactivo' },
          ]}
        />
      </div>
      <div className='xs:col-span-12 sm:col-span-6 md:col-span-4 flex justify-end gap-2 items-center'>
        {buttons?.map((button, index) => {
          return (
            <div key={index}>
              <Button
                size='small'
                startIcon={button?.icon}
                disabled={button?.disabled ?? false}
                onClick={button?.onClick}
              >
                {button?.title}
              </Button>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default ToolbarTableUser
