export const adaptDataToDocumentRequest = (data, elementAction) => {
  const { idTablaRetencion, redactor, transcriptor, ...restData } = data

  const firmantes =
    restData?.firmantes?.map?.((item) => {
      return {
        idJoin: item?.idJoin,
        idUser: item?.idUser,
        dependencyId: item?.dependencyId,
      }
    }) ?? []

  return {
    idPlantilla: elementAction.idTemplate,
    tipo: 'pdf',
    data: { ...restData, firmantes },
    idTablaRetencion: idTablaRetencion?.id,
    redactor: redactor?.id,
    transcriptor: transcriptor?.id,
  }
}

export const fixedFiledToGenerationDocument = ({
  handleOpenTRDLV,
  searchTrd,
  subSeries,
  loadingSubseries,
  handleOpenUserVL,
  users,
  searchUser,
  loadingUsers,
  initialVariables,
  userData,
  enableUserRequestFunction,
  enableTRDRequestFun,
}) => {
  const tablaRetencion = initialVariables?.TablaRetencion
  const redactorData = initialVariables?.redactorData
  const transcriptorData = initialVariables?.transcriptorData ?? userData

  return [
    {
      name: 'idTablaRetencion',
      type: 'autocomplete',
      space: 12,
      autocompleteProps: {
        openModal: handleOpenTRDLV,
        options: subSeries?.data ?? [],
        loadingOptions: loadingSubseries,
        disabled: !!tablaRetencion,
      },
      textFieldProps: {
        label: 'TRD',
        onChange: (e) => searchTrd.handleSearchText(e.target.value),
        onClick: enableTRDRequestFun,
      },
    },
    {
      name: 'redactor',
      type: 'autocomplete',
      space: 12,
      autocompleteProps: {
        openModal: handleOpenUserVL,
        options: users?.data ?? [],
        loadingOptions: loadingUsers,
        getOptionLabel: (option) => `${option?.firstName ?? ''} ${option?.lastName ?? ''}`,
        disabled: !!redactorData,
      },
      textFieldProps: {
        label: 'Redactor',
        onChange: (e) => searchUser.handleSearchText(e.target.value),
        onClick: enableUserRequestFunction,
      },
    },
    {
      name: 'transcriptor',
      type: 'autocomplete',
      space: 12,
      autocompleteProps: {
        options: [],
        getOptionLabel: (option) => `${option?.firstName ?? ''} ${option?.lastName ?? ''}`,
        disabled: !!transcriptorData,
      },
      textFieldProps: {
        label: 'Transcriptor',
      },
    },
  ]
}

export const selectModalAdditionalInputs = (modals) => {
  const modalOptions = modals.find((modal) => modal.openOptions.show)
  return modalOptions
}

export const valueListModalsToGenerationDocument = ({
  trdModal,
  searchTrd,
  subSeries,
  loadingSubseries,
  userModal,
  users,
  searchUser,
  loadingUsers,
  refetchingUsers,
  paginationSubseries,
  paginationUsers,
}) => {
  return [
    {
      title: 'TRD',
      openOptions: trdModal,
      rows: subSeries?.data,
      columns: [
        {
          field: 'nombre',
          headerName: 'Nombre',
        },
      ],
      searchOptions: searchTrd,
      loading: loadingSubseries || refetchingUsers,
      pagination: paginationSubseries,
      name: 'idTablaRetencion',
    },
    {
      title: '',
      openOptions: userModal,
      rows: users?.data,
      columns: [
        {
          field: 'firstName',
          headerName: 'Nombre',
          minWidth: 150,
        },
        {
          field: 'lastName',
          headerName: 'Apellido',
          minWidth: 150,
        },
      ],
      loading: loadingUsers,
      searchOptions: searchUser,
      pagination: paginationUsers,
      name: 'redactor',
    },
  ]
}
