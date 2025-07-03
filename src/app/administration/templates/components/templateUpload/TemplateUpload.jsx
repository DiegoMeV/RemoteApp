import { BackdropLoading, GenericForm, SquareIconButton, UploadFileButton } from '@/lib'
import { Grid, Divider } from '@mui/material'
import {
  AutocompleteSigners,
  ItemsContainer,
  ReferenceTemplateItems,
  TabsTemplates,
  VarsInfoTemplate,
} from '.'
import { Download } from '@mui/icons-material'
import { useFieldArray } from 'react-hook-form'
import { CustomTabPanel } from '@/libV4'
import { useState } from 'react'

const TemplateUpload = ({ form, apiVars, loading, downloadTemplate }) => {
  const {
    fields: fieldVars,
    append: appendVars,
    remove: removeVars,
  } = useFieldArray({
    control: form?.control,
    name: 'variables',
  })

  const {
    fields: fieldTemplates,
    append: appendTemplates,
    remove: removeTemplates,
  } = useFieldArray({
    control: form?.control,
    name: 'plantillasRelacionadas',
  })

  const [currentTab, setCurrentTab] = useState(0)

  const handleChangeTab = (_, newValue) => {
    setCurrentTab(newValue)
  }

  const handleAdd = () => {
    if (currentTab === 0) {
      const newItem = {
        uuid: crypto.randomUUID(),
        orden: '',
        nombre: '',
        titulo: '',
        tipo: '',
        valorInicial: '',
        required: '',
      }
      appendVars(newItem)
      return
    }

    const newItem = {
      uuid: crypto.randomUUID(),
      id: '',
      keyName: '',
    }
    appendTemplates(newItem)
  }

  const handleDelete = ({ position = '' } = {}) => {
    if (currentTab === 0) {
      removeVars(position)
      return
    }
    removeTemplates(position)
  }

  const INPUTS = [
    {
      name: 'nombrePlantilla',
      label: 'Nombre de la plantilla',
      required: true,
      disabled: !!apiVars,
      space: 4,
    },
    {
      name: 'nombreVersion',
      label: 'Nombre de la versión',
      required: true,
      space: 4,
    },
    {
      name: 'estructuraNumero',
      label: 'Estructura número',
      validate: false,
      helperText: '${vigencia}.${codigoDependencia}.${subserie}.${consecutivo}',
      space: 4,
    },
  ]

  return (
    <Grid
      container
      spacing={2}
    >
      <BackdropLoading loading={loading} />
      <GenericForm
        control={form?.control}
        inputs={INPUTS}
      />
      <AutocompleteSigners form={form} />
      <Grid
        item
        xs={12}
        md={4}
      >
        <UploadFileButton
          register={form.register}
          title={'Cargar Plantilla'}
          accept={['.docx', '.pdf']}
          color={'success'}
          required={apiVars?.info ?? null}
        />
      </Grid>
      {apiVars?.info && (
        <Grid
          item
          xs={12}
          md={4}
        >
          <SquareIconButton
            text={'Descargar plantilla'}
            IconComponent={<Download />}
            size={'small'}
            onClick={() =>
              downloadTemplate(
                { idTemplate: apiVars?.info?.idPlantilla, idVersion: apiVars?.info?.id },
                true
              )
            }
          />
        </Grid>
      )}

      <Grid
        item
        xs={12}
      >
        <Divider />
      </Grid>
      <Grid
        item
        container
        spacing={1.5}
        xs={12}
        md={12}
      >
        <TabsTemplates
          currentTab={currentTab}
          handleChangeTab={handleChangeTab}
          handleAdd={handleAdd}
        />

        {/* TO-DO: It can be in a map of TabPanels */}
        {currentTab === 0 && (
          <Grid
            item
            xs={12}
          >
            <CustomTabPanel
              value={currentTab}
              index={0}
            >
              {fieldVars?.map((item, index) => {
                return (
                  <ItemsContainer key={item?.uuid}>
                    <VarsInfoTemplate
                      data={item}
                      form={form}
                      index={index}
                      handleDelete={handleDelete}
                    />
                  </ItemsContainer>
                )
              })}
            </CustomTabPanel>
          </Grid>
        )}

        {currentTab === 1 && (
          <Grid
            item
            xs={12}
          >
            <CustomTabPanel
              value={currentTab}
              index={1}
            >
              {fieldTemplates?.map((item, index) => {
                return (
                  <ItemsContainer key={item?.uuid}>
                    <ReferenceTemplateItems
                      data={item}
                      form={form}
                      index={index}
                      handleDelete={handleDelete}
                    />
                  </ItemsContainer>
                )
              })}
            </CustomTabPanel>
          </Grid>
        )}
      </Grid>
    </Grid>
  )
}

export default TemplateUpload
