import { ChartDynamic, Loading } from '@/lib'

const ViewRiskCristerionAlert = ({ optionsRiskCriterion, seriesRiskCriterion, isPending }) => {
  return (
    <>
      {isPending ? (
        <Loading />
      ) : (
        <ChartDynamic
          options={optionsRiskCriterion}
          series={seriesRiskCriterion}
          height={500}
          type='bar'
        />
      )}
    </>
  )
}

export default ViewRiskCristerionAlert
