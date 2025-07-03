export const localeTextsEsp = {
  //opcion Columnas
  toolbarColumns: 'Columnas',
  columnsPanelTextFieldLabel: 'Buscar Columnas',
  columnsPanelTextFieldPlaceholder: 'Titulo Columna',
  columnsPanelShowAllButton: 'Mostrar Todo',
  columnsPanelHideAllButton: 'Ocultar Todo',
  //opcion Filtros
  toolbarFilters: 'Filtros',
  toolbarFiltersLabel: 'Mostrar Filtros',
  toolbarFiltersTooltipHide: 'Ocultar Filtros',
  toolbarFiltersTooltipShow: 'Mostrar Filtros',
  toolbarFiltersTooltipActive: (count) =>
    count !== 1 ? `${count} Filtros Activos` : `${count} Filtro Activo`,
  filterPanelAddFilter: 'Agregar Filtro',
  filterPanelRemoveAll: 'Quitar Todo',
  filterPanelDeleteIconLabel: 'Eliminar',
  filterPanelOperator: 'Operador',
  filterPanelOperatorAnd: 'Y',
  filterPanelOperatorOr: 'O',
  filterPanelColumns: 'Columna',
  filterPanelInputLabel: 'Valor',
  filterPanelInputPlaceholder: 'Filtro de Valor',
  //opcion Operadores del Filtro
  filterOperatorContains: 'Contiene',
  filterOperatorEquals: 'Es Igual A',
  filterOperatorStartsWith: 'Inicia Con',
  filterOperatorEndsWith: 'Termina Con',
  filterOperatorIsEmpty: 'Esta Vació',
  filterOperatorIsNotEmpty: 'No Esta Vació',
  filterOperatorIsAnyOf: 'Es Alguno De',
  filterOperatorIs: 'Es',
  filterOperatorNot: 'No Es',
  filterOperatorAfter: 'Es Después',
  filterOperatorOnOrAfter: 'Es En O Después',
  filterOperatorBefore: 'Es Antes',
  filterOperatorOnOrBefore: 'Es En O Antes',
  //opcion Densidad
  toolbarDensity: 'Espaciado',
  toolbarDensityLabel: 'Espaciado',
  toolbarDensityCompact: 'Compacto',
  toolbarDensityStandard: 'Normal',
  toolbarDensityComfortable: 'Amplio',
  //opcion Exportar
  toolbarExport: 'Exportar',
  toolbarExportCSV: 'Descargar CSV',
  toolbarExportPrint: 'Imprimir',
  toolbarExportExcel: 'Excel',
  //opcion encabezado por columnas
  columnHeaderFiltersTooltipActive: (count) =>
    count !== 1 ? `${count} Filtros Activos` : `${count} Filtro Activo`,
  columnHeaderFiltersLabel: 'Mostrar Filtros',
  columnHeaderSortIconLabel: 'Ordenar',
  //opcion menu por columnas
  columnMenuLabel: 'Menu',
  columnMenuShowColumns: 'Opciones Columnas',
  columnMenuFilter: 'Filtrar',
  columnMenuHideColumn: 'Ocultar Columna',
  columnMenuManageColumns: 'Columnas',
  columnMenuUnsort: 'Quitar Orden',
  columnMenuSortAsc: 'Ordenar Por ASC',
  columnMenuSortDesc: 'Ordenar Por DESC',
  //opcion agrupacion
  groupColumn: (name) => `Agrupar Por ${name}`,
  unGroupColumn: (name) => `Quitar Agrupación Por ${name}`,
  // opcion Fijar Columna
  pinToLeft: 'Fijar En Izquierda',
  pinToRight: 'Fijar En Derecha',
  unpin: 'Desfijar',
  //opcion paginacion
  footerRowSelected: (count) =>
    count !== 1
      ? `${count.toLocaleString()} Filas seleccionadas`
      : `${count.toLocaleString()} Fila seleccionada`,
  MuiTablePagination: {
    labelRowsPerPage: 'Filas Por Pagina:',
    labelDisplayedRows: ({ from, to, count }) => `${from} - ${to} de ${count}`,
  },
}
