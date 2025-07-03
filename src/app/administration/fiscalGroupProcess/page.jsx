import { ViewFiscalProcessGroup } from './views'

// import AccessControl from '@/app/AccessControl'
// import { NoAccessCard } from '@/lib'

const ProcessGroup = () => {
  return (
    // <AccessControl
    //   privilege='procesos.grupos_procesos.visualizar_tipos'
    //   nodeContent={<NoAccessCard />}
    // >
    <ViewFiscalProcessGroup />
    // </AccessControl>
  )
}

export default ProcessGroup
