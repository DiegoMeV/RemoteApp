import { ChartDynamic, Loading } from '@/lib'

const ViewAlertByModel = ({ series, options, isPending }) => {
  return (
    <>
      {isPending ? (
        <Loading />
      ) : (
        <ChartDynamic
          options={options}
          series={series}
          type='bar'
        />
      )}
    </>
  )
}

export default ViewAlertByModel
