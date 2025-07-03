import { ChartDynamic, Loading } from '@/lib'

const ViewAlertBySocialization = ({
  optionsAlertSocialization,
  serieAlertSocialization,
  isPending,
}) => {
  return (
    <>
      {isPending ? (
        <Loading />
      ) : (
        <ChartDynamic
          options={optionsAlertSocialization}
          series={serieAlertSocialization}
          type='line'
        />
      )}
    </>
  )
}

export default ViewAlertBySocialization
