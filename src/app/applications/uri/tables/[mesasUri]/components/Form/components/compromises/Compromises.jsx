import { BackdropLoading, BasicTitle, useGetCompromise } from '@/lib'
import { Box, Divider, Grid } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { NewCompromise, NewCompromiseButton } from '.'

const Compromises = ({ mesasAriId, isTotallyApp }) => {
  const {
    data: compromisesData,
    isFetching: loadingCompromises,
    refetch: refechCompromises,
  } = useGetCompromise({ qry: `?mesaId=${mesasAriId}`, enabled: mesasAriId !== 'mesasUri' })
  const [compromises, setCompromises] = useState([])
  const handleNewRow = () => {
    setCompromises([{ id: crypto.randomUUID(), isNew: true }, ...compromises])
  }
  const handleDelete = useCallback((idToDelete) => {
    setCompromises((compromises) =>
      compromises.filter((compromise) => compromise.id !== idToDelete)
    )
  }, [])
  useEffect(() => {
    if (compromisesData?.data) {
      setCompromises(compromisesData.data)
    }
  }, [compromisesData?.data])
  return (
    <Box>
      <Grid
        item
        xs={12}
      >
        <BasicTitle title='Compromisos' />
      </Grid>
      <Box
        overflow='hidden'
        pl={1}
        py={3}
        px={2}
      >
        <BackdropLoading loading={loadingCompromises} />
        <NewCompromiseButton
          handleNewRow={handleNewRow}
          isTotallyApp={isTotallyApp}
        />
        {compromises.map((compromise, index) => (
          <Box
            sx={{
              mt: '20px',
              boxShadow: '0px 8px 5px -3px rgba(0,0,0,0.1),0px 10px 15px -3px rgba(0,0,0,0.1)',
            }}
            key={compromise.id}
          >
            <NewCompromise
              index={index}
              compromise={compromise}
              handleDelete={() => handleDelete(compromise?.id)}
              refechCompromises={refechCompromises}
              idTable={mesasAriId}
              isTotallyApp={isTotallyApp}
            />
            <Divider />
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default Compromises
