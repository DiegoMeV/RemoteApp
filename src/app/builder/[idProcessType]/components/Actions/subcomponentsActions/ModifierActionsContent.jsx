import { ClassicIconButton } from '@/libV4'
import { ContentSwitch } from '.'

const ModifierActionsContent = ({
  children,
  control,
  actionsButtons = [],
  loadingElement = false,
}) => {
  return (
    <div className='flex justify-between m-1'>
      {children}
      <ContentSwitch control={control} />
      <div className='flex'>
        {actionsButtons?.map((action, index) => (
          <ClassicIconButton
            key={index}
            color='default'
            placement='bottom'
            type={action?.type}
            title={action?.title}
            disabled={loadingElement || action?.disabled}
            onClick={action?.onClick}
            hoverColor={action?.hoverColor}
          >
            {action?.icon}
          </ClassicIconButton>
        ))}
      </div>
    </div>
  )
}

export default ModifierActionsContent
