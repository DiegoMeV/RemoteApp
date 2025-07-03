import { Button, Divider, Grid, useMediaQuery, useTheme } from '@mui/material'
import { useForm } from 'react-hook-form'
import { disabledInputs, editableInpus, generarRetencion, QUERY_DEP_RET_FUENTE } from './funcs'
import MoneyInputs from './MoneyInputs'
import { BackdropLoading, useOracleExecutes, useQueryOracle, useSubmitRuntime } from '@/libV4'
import { useEffect, useState } from 'react'
import { keyName } from '../../../../constants'
import toast from 'react-hot-toast'
import { filterData } from '../../../../funcs'
import ArticleSection from './ArticleSection'
import { calculateTotal, QUERY_DETALLE_ORDEN } from '../DetalleOrden/funcs'

const DepuracionRetFuente = ({
  nit_compania,
  queryParamsPks,
  globalVariables,
  getFormValue,
  ordenPagouData,
  commonPostInsert,
  commonPostUpdate,
  detalleOrdenValorNeto,
}) => {
  const theme = useTheme()
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'))
  const [dataToShow, setDataToShow] = useState({})

  const { control, setValue, watch, trigger, getValues } = useForm()

  const { getQueryResult, isPendingQuery, getProcedureResult, isPendingProcedure } =
    useOracleExecutes()

  const { data: detalleOrdenData, isFetching: loadingDOrdenData } = useQueryOracle({
    query: QUERY_DETALLE_ORDEN({ nit_compania, queryParamsPks }),
    enabled: !!queryParamsPks?.orden,
    queryKey: ['detalleOrdenPago'],
  })

  const {
    data: depRetFuenteData,
    isFetching: loadingDepRetFuenteData,
    refetch: refetchdepRetFuente,
  } = useQueryOracle({
    query: QUERY_DEP_RET_FUENTE({ nit_compania, queryParamsPks }),
    enabled: !!queryParamsPks?.orden,
    queryKey: ['depRetFuenteOrdenPago', nit_compania, queryParamsPks?.orden],
  })

  const getData = async ({ depRetFuenteData, detalleOrdenData }) => {
    const data = depRetFuenteData?.data?.[0]

    inputs.forEach((input) => {
      const name = input.name
      if (data?.[name]) {
        setValue(input.name, data[name])
      }
    })

    informativeInputs.forEach((input) => {
      const name = input.name
      if (data?.[name]) {
        setValue(input.name, data[name])
      }
    })

    if (!data?.valor_mes || data?.valor_mes?.trim?.() === '') {
      const { totalService } = calculateTotal(detalleOrdenData?.data)
      setValue('valor_mes', totalService)
    }

    setDataToShow({
      texto_art1: data?.texto_art1,
      texto_art3: data?.texto_art3,
    })
  }

  useEffect(() => {
    if (queryParamsPks?.orden && depRetFuenteData && detalleOrdenData) {
      getData({ depRetFuenteData, detalleOrdenData })
      return
    }
    setValue('valor_mes', detalleOrdenValorNeto)
  }, [nit_compania, queryParamsPks?.orden, depRetFuenteData, detalleOrdenData])

  const { mutateAsync: submitRuntime, isPending: loadingSubmit } = useSubmitRuntime({
    qry: `/keyname/${keyName}`,
    onSuccess: async () => {
      toast.success('Guardado exitosamente')
      if (!depRetFuenteData?.data?.[0]?.orden) {
        await commonPostInsert()
      } else {
        await commonPostUpdate()
      }

      refetchdepRetFuente()
    },
    onError: (error) => {
      toast.error(error?.message ?? 'Error al guardar')
    },
  })

  const onSubmit = async () => {
    const triggerValidation = await trigger()

    if (!triggerValidation) {
      return
    }

    const allData = getValues()

    const dataFiltered = filterData([...inputs, ...informativeInputs], allData)

    if (!depRetFuenteData?.data?.[0]?.orden) {
      submitRuntime({
        bodyMethod: 'post',
        body: {
          blockId: 'rtefte_orden',
          data: {
            nit_compania,
            orden: Number(queryParamsPks?.orden),
            ...dataFiltered,
            ...dataToShow,
            vr_rte_fte: Number(dataFiltered?.vr_rte_fte || 0),
            vr_rte_fte_art1: Number(dataFiltered?.vr_rte_fte_art1 || 0),
            vr_rte_fte_art3: Number(dataFiltered?.vr_rte_fte_art3 || 0),
          },
        },
      })
      return
    }
    submitRuntime({
      body: {
        rtefte_orden: {
          where: { nit_compania, ...queryParamsPks },
          data: {
            ...dataFiltered,
            ...dataToShow,
            vr_rte_fte: Number(dataFiltered?.vr_rte_fte || 0),
            vr_rte_fte_art1: Number(dataFiltered?.vr_rte_fte_art1 || 0),
            vr_rte_fte_art3: Number(dataFiltered?.vr_rte_fte_art3 || 0),
          },
        },
      },
      bodyMethod: 'put',
    })
  }

  const inputs = editableInpus({
    nit_compania,
    globalVariables,
    watch,
    getFormValue,
    valores_dorden_pagou: calculateTotal(detalleOrdenData?.data) || {},
    isNew: !depRetFuenteData?.data?.[0]?.orden,
    setValue,
    ordenPagouData,
    getQueryResult,
  })

  const informativeInputs = disabledInputs({ watch })

  return (
    <form className='relative py-2'>
      <BackdropLoading
        loading={
          loadingDepRetFuenteData ||
          loadingSubmit ||
          loadingDOrdenData ||
          isPendingQuery ||
          isPendingProcedure
        }
        sizeLoading={80}
        sx={{
          position: 'absolute',
          borderRadius: '5px',
          zIndex: 1,
        }}
      />
      <Grid
        container
        spacing={8}
      >
        <Grid
          item
          xs={12}
          md={5.5}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '25px',
          }}
        >
          {inputs?.map((item) => {
            return (
              <MoneyInputs
                key={item?.name}
                control={control}
                item={item}
              />
            )
          })}
        </Grid>

        <Grid
          item
          xs={12}
          md={0.4}
        >
          <Divider orientation={isLargeScreen ? 'vertical' : 'horizontal'} />
        </Grid>

        <Grid
          item
          xs={12}
          md={5.5}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: '25px',
          }}
        >
          {informativeInputs?.map((item) => {
            return (
              <MoneyInputs
                key={item?.name}
                control={control}
                item={{ ...item, defaultValue: 0 }}
              />
            )
          })}

          <ArticleSection
            dataToShow={dataToShow}
            control={control}
            setValue={setValue}
          />

          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              columnGap: '40px',
            }}
          >
            <Button
              variant='contained'
              size='small'
              fullWidth
              onClick={() => {
                generarRetencion({
                  nit_compania,
                  queryParamsPks,
                  globalVariables,
                  getFormValue,
                  getProcedureResult,
                  valores_dorden_pagou: calculateTotal(detalleOrdenData?.data),
                  getValues,
                  setValue,
                  setDataToShow,
                  onSubmit,
                })
              }}
            >
              Calcular retención
            </Button>
            <Button
              variant='contained'
              size='small'
              fullWidth
              onClick={onSubmit}
            >
              Guardar
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  )
}

export default DepuracionRetFuente
