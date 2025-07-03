export const options = [
  // {
  //   id: 'alerts',
  //   label: 'Alertas',
  //   path: '/alerts',
  // },
  {
    id: 'criteria',
    label: 'Criterios',
    path: '/criteria',
  },
  // {
  //   id: 'models',
  //   label: 'Modelos',
  //   path: '/models',
  // },
  {
    id: 'blocks',
    label: 'Bloques',
    path: '/blocks',
  },
  {
    id: 'variables',
    label: 'Variables',
    path: '/variables',
  },
  // {
  //   id: 'dependencias',
  //   label: 'Dependencias',
  //   path: '/dependencias',
  // },
  {
    id: 'contractRegistry',
    label: 'Registro de contratos',
    path: '/contractRegistry',
    submenu: [
      // {
      //   id: 'contracts',
      //   label: 'Contratos',
      //   path: '/contracts',
      // },
      {
        id: 'contractsTypes',
        label: 'Modalidad de contratación',
        path: '/contractsTypes',
      },
      {
        id: 'contractors',
        label: 'Contratistas',
        path: '/contractors',
      },
    ],
  },
  {
    id: 'domains',
    label: 'Dominios',
    path: '/domains',
    submenu: [
      {
        id: 'resources',
        label: 'Recursos',
        path: '/domains/resources',
      },
      {
        id: 'informationSources',
        label: 'Fuentes de informacion',
        path: '/domains/informationSources',
      },
      {
        id: 'contractSource',
        label: 'Fuentes de contrato',
        path: '/domains/contractSource',
      },
    ],
  },
  {
    id: 'Entidades',
    label: 'Entes',
    path: '/entities',
  },
  {
    id: 'ubication',
    label: 'Ubicacion',
    path: '/ubication',
    submenu: [
      {
        id: 'regions',
        label: 'Regiones',
        path: '/regions',
      },
      {
        id: 'province',
        label: 'Departamentos',
        path: '/province',
      },
      {
        id: 'cities',
        label: 'Municipios',
        path: '/ubication/cities',
      },
    ],
  },
]
