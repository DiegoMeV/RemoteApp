import { ChartDynamic, Loading } from '@/lib'

const ViewAlertByCategory = ({ optionByCategory, seriesByCategory, isPending }) => {
  return (
    <>
      {isPending ? (
        <Loading />
      ) : (
        <ChartDynamic
          options={optionByCategory}
          series={seriesByCategory}
          height={500}
          type='bar'
        />
      )}
    </>
  )
}

export default ViewAlertByCategory
