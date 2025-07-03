import { BackdropLoading, BasicTitle, GenericForm } from '@/libV4'
import { SummarizeOutlined } from '@mui/icons-material'
import { Button } from '@mui/material'
const ViewSubmittedFiles = ({ inputs, control, handleClick, isPendingDownloadExcel }) => {
  return (
    <section>
      <BackdropLoading
        loading={isPendingDownloadExcel}
        sizeLoading={80}
      />
      <BasicTitle
        title='Archivos presentados'
        titleStyles={{ display: 'flex' }}
        backpath={-1}
        typographyProps={{ className: 'w-full' }}
      />
      <div className='backgroundGray2 rounded-b-md'>
        <section className='grid grid-cols-12 gap-4 p-4'>
          <GenericForm
            inputs={inputs}
            control={control}
          />
        </section>
        <div className='col-span-12 flex justify-end items-center p-4'>
          <Button
            color='success'
            variant='contained'
            startIcon={<SummarizeOutlined />}
            onClick={handleClick}
          >
            Descargar excel
          </Button>
        </div>
      </div>
    </section>
  )
}

export default ViewSubmittedFiles
