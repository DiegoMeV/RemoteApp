export const generalForm = [
  { name: 'nombre', label: 'Nombre', required: true, space: 10 },
  { name: 'activo', label: 'Estado', type: 'switch', required: true, space: 2 },
  { name: 'descripcion', label: 'Descripción', type: 'multiline', minRows: 3, space: 12 },
]

export const typeDomain = {
  resources: 'RECURSO',
  informationSources: 'FTE_INFORMACION',
  contractSource: 'FTE_CONTRATO',
}
