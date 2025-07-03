import { NoAccessCard, useGetTemplate, useSearch } from '@/lib'
import { useEffect, useState } from 'react'
import { ViewTemplates } from './views'
import { qryBuilder } from './funcs'
import { AccessControl } from '@/libV4'

const Templates = () => {
  const [cursorApi, setCursorApi] = useState()
  const [totalCount, setTotalCount] = useState(0)
  const searchTemplate = useSearch()
  const qry = qryBuilder(searchTemplate?.searchText, cursorApi)

  const {
    data: templatesInfo,
    isFetching: isLoadingTemplates,
    isError: isErrorTemplates,
  } = useGetTemplate({ qry })

  useEffect(() => {
    if (templatesInfo?.cantidadPlantillas) {
      setTotalCount(templatesInfo?.cantidadPlantillas)
    }
  }, [templatesInfo])

  const templatesProps = {
    templatesInfo,
    isLoadingTemplates,
    isErrorTemplates,
    searchTemplate,
    setCursorApi,
    totalCount,
  }

  return (
    <AccessControl
      privilege='documentos.plantillas.listar_plantillas'
      nodeContent={<NoAccessCard />}
    >
      <ViewTemplates {...templatesProps} />
    </AccessControl>
  )
}

export default Templates
