import { Typography } from '@mui/material'
import {
  AcademicInfoComponent,
  AddDocumentsComponent,
  ContactInfoComponent,
  InfoConfirmProcess,
  PersonalInfoComponent,
  ProfessionalTitleInfoComponent,
  TypeProcessComponent,
} from '../components'

export const getStepComponents = (
  control,
  setValue,
  infoGroupProcess,
  getValues,
  watch,
  infoProcessSelected,
  idCompany,
  unregister,
  isEditing
) => ({
  0: (
    <TypeProcessComponent
      control={control}
      setValue={setValue}
      infoGroupProcess={infoGroupProcess}
      getValues={getValues}
      watch={watch}
      infoProcessSelected={infoProcessSelected}
      unregister={unregister}
    />
  ),
  1: (
    <>
      <PersonalInfoComponent
        control={control}
        setValue={setValue}
        idCompany={idCompany}
        unregister={unregister}
        watch={watch}
        isEditing={isEditing}
      />
      <Typography
        variant='h5'
        color='primary'
        m={3}
      >
        Información de Académica
      </Typography>
      <AcademicInfoComponent
        control={control}
        setValue={setValue}
        unregister={unregister}
        watch={watch}
        idCompany={idCompany}
      />
    </>
  ),
  2: (
    <ContactInfoComponent
      control={control}
      setValue={setValue}
      idCompany={idCompany}
      unregister={unregister}
      getValues={getValues}
      isEditing={isEditing}
    />
  ),
  3: (
    <ProfessionalTitleInfoComponent
      control={control}
      setValue={setValue}
    />
  ),
  4: (
    <AddDocumentsComponent
      control={control}
      setValue={setValue}
      infoGroupProcess={infoGroupProcess}
      infoProcessSelected={infoProcessSelected}
      idCompany={idCompany}
    />
  ),
  6: (
    <InfoConfirmProcess
      infoProcessSelected={infoProcessSelected}
      idCompany={idCompany}
    />
  ),
})
