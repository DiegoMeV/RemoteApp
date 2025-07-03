import { DetailRow } from '../components'

const useGetDetail = ({ funProps }) => {
  const getDetailPanelContent = ({ row }) => {
    const { qry, pl, columns, getDetailPanelContentChildren } = funProps(row)
    return (
      <DetailRow
        qry={qry}
        pl={pl}
        columns={columns}
        getDetailPanelContent={getDetailPanelContentChildren ?? null}
      />
    )
  }

  return { getDetailPanelContent }
}

export default useGetDetail
