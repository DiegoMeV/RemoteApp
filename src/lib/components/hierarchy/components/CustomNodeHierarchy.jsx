import { Handle, Position } from 'reactflow'
import { Box } from '@mui/material'
import { CustomModal } from '@/lib'
import { useNodeHierarchy } from '../hooks'
import { customNodeHierarchyStyles } from '../styles'
import { ContentNodeHierarchy, NodeToolbarHierarchy } from '.'
import { ModalInfoDependency } from './ModalDependency'

const CustomNodeHierarchy = ({ id, data, sourcePosition, targetPosition }) => {
  const [stateVar, stateFunc] = useNodeHierarchy(id, data)

  const {
    modalStruct,
    modalButtons,
    control,
    creationStructDependency,
    editStructDependency,
    isLoading,
  } = stateVar
  const { onSubmit, setInfoDependency, handleSubmit, handleSetOpen, setValue } = stateFunc

  return (
    <Box
      sx={customNodeHierarchyStyles.nodeHierarchyContainer(data?.isActive ?? true)}
      title={data.label}
    >
      <Handle
        type='target'
        position={targetPosition || Position.Top}
        style={{ background: '#1E88E5', visibility: 'hidden' }}
        isConnectable={false}
      />
      <ContentNodeHierarchy
        data={data}
        setInfoDependency={setInfoDependency}
        editStructDependency={editStructDependency}
      />
      <NodeToolbarHierarchy
        data={data}
        setInfoDependency={setInfoDependency}
        creationStructDependency={creationStructDependency}
      />
      <Handle
        type='source'
        position={sourcePosition || Position.Bottom}
        style={{ background: '#1E88E5', visibility: 'hidden' }}
        isConnectable={false}
      />
      {modalStruct?.openModal && (
        <CustomModal
          open={modalStruct?.openModal}
          handleClose={handleSetOpen}
          modalType='form'
          onSubmit={handleSubmit(onSubmit)}
          title={
            modalStruct?.id !== modalStruct?.parentId
              ? `Edición de dependencia ${data.label}`
              : 'Creación dependencia'
          }
          actions={modalButtons}
        >
          <ModalInfoDependency
            isLoading={isLoading}
            dependency={modalStruct}
            control={control}
            setValue={setValue}
            required={modalStruct?.id === modalStruct?.parentId}
            setIsActive={data?.setIsActive}
          />
        </CustomModal>
      )}
    </Box>
  )
}

export default CustomNodeHierarchy
