import { Box } from '@mui/material'
import { HierarchyFlow } from '../components'
import { BasicTitle } from '@/lib/ui'
import { NoAccessCard } from '../../NoAccessCard'
import { AccessControl } from '@/libV4'

const ViewHierarchy = () => {
  return (
    <AccessControl
      privilege='cgr.alertas.visualizar_dependencias'
      nodeContent={<NoAccessCard />}
    >
      <Box>
        <BasicTitle title='Administración de Jerarquia' />
        <HierarchyFlow />
      </Box>
    </AccessControl>
  )
}

export default ViewHierarchy
