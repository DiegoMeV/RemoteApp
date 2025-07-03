import { Grid } from '@mui/material'
import { TypeOfItem } from '../..'

const Inputs = ({
  nonButtonItems,
  dataBlock,
  form,
  modeEditCreate,
  pkValues,
  isEdit,
  blockId,
  isFieldEnabled,
}) => {
  return (
    <>
      {nonButtonItems?.map((item) => (
        <Grid
          item
          display={item.hidden ? 'none' : 'flex'}
          xs={12}
          sm={6}
          md={Number(item?.size ?? 3)}
          key={item.id}
        >
          <TypeOfItem
            disabled={item?.disabled ?? !isFieldEnabled(dataBlock?.blockId, item?.id)}
            form={form}
            infoItem={item}
            modeEditCreate={modeEditCreate}
            pkValues={pkValues}
            isEdit={isEdit}
            onlyView={dataBlock?.isReadOnly}
            blockId={blockId}
            isInTable={false}
            items={dataBlock?.items}
          />
        </Grid>
      ))}
    </>
  )
}

export default Inputs
