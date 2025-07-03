import { ChartDynamic, Loading } from '@/lib'

const ViewAlertByActor = ({ optionsAlertActor, serieAlertActor, isPending }) => {
  return (
    <>
      {isPending ? (
        <Loading />
      ) : (
        <ChartDynamic
          options={optionsAlertActor}
          series={serieAlertActor}
          type='bar'
        />
      )}
    </>
  )
}

export default ViewAlertByActor
