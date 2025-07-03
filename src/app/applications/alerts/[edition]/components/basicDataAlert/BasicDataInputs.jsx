import {
  AutocompleteValueList,
  ChooseInput,
  ClassicIconButton,
  CustomAccordion,
  CustomModal,
  CustomTextField,
  GenericSelect,
  GenericTextfield,
  useBoolean,
  useGetCatModel,
  useGetCriteriaCat,
  useInfoInputs,
  useListModelsInfo,
  usePrivileges,
  useSearch,
} from '@/lib'
import { Box, Grid, TextField } from '@mui/material'
import { useState } from 'react'
import { columnsCategories, columnsCriteria, columnsModels } from './constant'
import { Controller } from 'react-hook-form'
import { inputsList } from './funcs'
import { Comment } from '@mui/icons-material'
import { ModalComments } from './components'

const BasicDataInputs = ({ control, setValue, infoAlert, idEdition, watch, isView }) => {
  const modalModelos = useBoolean()
  const modalCategorias = useBoolean()
  const modalCriterios = useBoolean()
  const buscarModelos = useSearch()
  const buscarCategorias = useSearch()
  const buscarCriterios = useSearch()
  const [modalValue, setModalValue] = useState(infoAlert?.modeloInfo)
  const [categoryValue, setCategoryValue] = useState(infoAlert?.categoriaInfo)
  const modelSelected = watch('modelo')

  const qryModel = buscarModelos.searchText
    ? `?activo=S&palabraClave=${buscarModelos.searchText}`
    : '?activo=S'

  const { data: modelList, isFetching: isLoadingModel } = useListModelsInfo({ qry: qryModel })

  const qry = buscarCategorias.searchText
    ? `/${modalValue?.id}/categorias?palabraClave=${buscarCategorias.searchText}&activo=S`
    : `/${modalValue?.id}/categorias?activo=S`

  const { data: categoryList, isFetching: isLoadingCategory } = useGetCatModel({
    qry: qry,
  })
  const qryCriteria = buscarCriterios.searchText
    ? `?idCategoria=${categoryValue?.id}&palabraClave=${buscarCriterios.searchText}&aumentarInfo=true&activo=S`
    : `?idCategoria=${categoryValue?.id}&aumentarInfo=true&activo=S`
  const { data: criteriaInfo, isFetching: isLoadingCriteria } = useGetCriteriaCat({
    enabled: !!categoryValue,
    qry: qryCriteria,
  })
  const [headerName, setHeaderName] = useState('Nombre')
  const isParamsValue = (params) => {
    if (params?.value === undefined) {
      setHeaderName('Identificador')
    } else {
      setHeaderName('Nombre')
    }
  }
  const columnsModal = [
    {
      field: 'nombre',
      headerName: `${headerName}`,
      flex: 1,
      valueGetter: (params) => {
        isParamsValue(params)
        return `${params?.value ? params?.value : params?.row?.identificador ?? ''}`
      },
    },
  ]
  const fteInfo = useInfoInputs({
    qry: '/dominios',
    baseKey: 'urlCgr',
    qryParams: 'tipo=FTE_INFORMACION&activo=S',
  })
  const regInfo = useInfoInputs({ qry: '/satelite', baseKey: 'urlCgr' })

  const alertsModel = useInfoInputs({
    qry: `/alertas?modeloId=${
      infoAlert?.modelo_id || modelSelected?.id
    }&isNullAlertInicial=false&activo=S`,
    baseKey: 'urlCgr',
    enabled: !!infoAlert?.modelo_id || !!modelSelected,
  })
  const fieldsDatabasic = inputsList({ fteInfo, regInfo, alertsModel, isView })

  const state = infoAlert?.estado

  const editState = state === 'NUEVA' || state === 'PENDIENTE'
  const privToChangeState = usePrivileges('cgr.alertas.cambiar_estado_alerta')

  const modalComments = useBoolean()

  return (
    <CustomAccordion
      defaultExpanded={true}
      title='Datos basicos'
      color='primary'
    >
      <Box
        bgcolor={'backgroundWhite1'}
        borderRadius={2}
        p={2}
      >
        <Grid
          container
          spacing={2}
        >
          {idEdition && (
            <Grid
              item
              xs={12}
              md={editState && privToChangeState ? 3 : 4}
            >
              <Controller
                name='identificador'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    value={field?.value ?? ''}
                    fullWidth
                    label='Número'
                    name='identificador'
                    size='small'
                    required
                    disabled={isView}
                  />
                )}
              />
            </Grid>
          )}

          {idEdition ? (
            <Grid
              item
              xs={12}
              md={editState && privToChangeState ? 3 : 4}
            >
              <CustomTextField
                item={{
                  name: 'modelo',
                  label: 'Modelo',
                  type: 'text',
                  readOnly: true,
                  disabled: isView,
                }}
                control={control}
              />
            </Grid>
          ) : (
            <AutocompleteValueList
              controlModal={modalModelos}
              control={control}
              name='modelo'
              md={4.5}
              label='Modelo'
              options={modelList}
              loading={isLoadingModel}
              searchText={buscarModelos}
              setValue={setValue}
              columns={columnsModels}
              getValues={setModalValue}
              required={true}
              disabled={isView}
            />
          )}
          <Grid
            item
            xs={12}
            md={3}
          >
            <GenericTextfield
              size='small'
              label='Estado'
              value={state}
              InputProps={{
                readOnly: true,
              }}
              disabled={isView}
            />
          </Grid>
          {idEdition && (
            <Grid
              item
              xs={12}
              sm={6}
              md={1}
            >
              <ClassicIconButton
                title='Comentarios del comite'
                onClick={modalComments.handleShow}
                disabled={isView}
              >
                <Comment />
              </ClassicIconButton>
              <CustomModal
                title='Comentarios del comite'
                open={modalComments.show}
                handleClose={modalComments.handleShow}
                size='xl'
                height='calc(100vh - 200px)'
              >
                <ModalComments idAlert={idEdition} />
              </CustomModal>
            </Grid>
          )}
          {editState && privToChangeState && (
            <Grid
              item
              xs={12}
              md={2}
            >
              <Controller
                name='estado'
                control={control}
                render={({ field }) => (
                  <GenericSelect
                    {...field}
                    disabled={isView}
                    label='Cambiar estado'
                    value={field?.value ?? ''}
                    options={[
                      {
                        label: 'PENDIENTE',
                        value: 'PENDIENTE',
                      },
                      {
                        label: 'DESCARTADA',
                        value: 'DESCARTADA',
                      },
                    ]}
                  />
                )}
              />
            </Grid>
          )}
          <AutocompleteValueList
            controlModal={modalCategorias}
            control={control}
            name='categoria'
            md={6}
            label='Categorias'
            disabled={!modalValue || isView}
            options={categoryList}
            loading={isLoadingCategory}
            searchText={buscarCategorias}
            setValue={setValue}
            columns={columnsCategories}
            getValues={setCategoryValue}
            required={true}
          />
          <AutocompleteValueList
            controlModal={modalCriterios}
            control={control}
            name='criterio'
            md={6}
            label='Criterios'
            disabled={!categoryValue || isView}
            options={criteriaInfo}
            loading={isLoadingCriteria}
            searchText={buscarCriterios}
            setValue={setValue}
            columns={columnsCriteria}
            getLabel={(option) => {
              return option.criterioInfo.nombre
            }}
            valueId={true}
            required={true}
          />
          {fieldsDatabasic.map((input) =>
            input.type === 'autocomplete' ? (
              <AutocompleteValueList
                key={input.name}
                controlModal={input.control?.controlModal}
                control={control}
                name={input.name}
                md={input.md}
                label={input.label}
                options={input.control?.dataList}
                loading={input.control?.isLoading}
                searchText={input.control?.controlSearch}
                columns={columnsModal}
                setValue={setValue}
                getLabel={input.labelOption}
                required={input.required ?? false}
                disabled={input.disabled}
              />
            ) : (
              <ChooseInput
                key={input.name}
                item={input}
                control={control}
                setValue={setValue}
              />
            )
          )}
        </Grid>
      </Box>
    </CustomAccordion>
  )
}

export default BasicDataInputs
