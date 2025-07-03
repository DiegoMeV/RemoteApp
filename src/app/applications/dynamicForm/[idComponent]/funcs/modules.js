import { NotificationsNone } from '@mui/icons-material'

export const optionsAlertas = [
  {
    id: 'alertModule',
    label: 'Módulo de alertas',
    icon: <NotificationsNone />,
    privilege: 'cgr.alertas.visualizar_modulo_alertas',
    submenu: [
      {
        id: 'basicData',
        label: 'Datos básicos',
        privilege: 'cgr.alertas.visualizar_variables',
        submenu: [
          {
            id: 'variables',
            label: 'Variables',
            typeModule: 'variables',
            privilege: 'cgr.alertas.visualizar_variables',
          },
          {
            id: 'blocks',
            label: 'Bloques',
            typeModule: 'blocks',
            privilege: 'cgr.alertas.visualizar_bloques',
          },
          {
            id: 'models',
            label: 'Modelos de alertas',
            privilege: 'cgr.alertas.visualizar_modelos',
            submenu: [
              {
                id: 'criteria',
                label: 'Criterios',
                typeModule: 'criteria',
                privilege: 'cgr.alertas.visualizar_criterios',
              },

              {
                id: 'models',
                label: 'Modelos',
                typeModule: 'models',
                privilege: 'cgr.alertas.visualizar_modelos',
              },
            ],
          },
          {
            id: 'contractsTypes',
            label: 'Modalidad de contratación',
            typeModule: 'contractsTypes',
            privilege: 'cgr.alertas.visualizar_tipos_contrato',
          },
          {
            id: 'contractors',
            label: 'Contratistas',
            typeModule: 'contractors',
            privilege: 'cgr.alertas.visualizar_contratistas',
          },
          {
            id: 'office',
            label: 'Dependencias',
            typeModule: '/administration/hierarchy',
            privilege: 'usuarios.jerarquia.listar',
          },
          {
            id: 'resources',
            label: 'Recursos',
            typeModule: 'domains/resources',
            privilege: 'cgr.alertas.visualizar_recursos',
          },
          {
            id: 'informationSources',
            label: 'Fuentes de información',
            typeModule: 'domains/informationSources',
            privilege: 'cgr.alertas.visualizar_fuentes_informacion',
          },
          {
            id: 'contractSource',
            label: 'Fuentes de contrato',
            typeModule: 'domains/contractSource',
            privilege: 'cgr.alertas.visualizar_fuentes_contrato',
          },
          {
            id: 'Entidades',
            label: 'Entes',
            typeModule: 'entities',
            privilege: 'cgr.alertas.visualizar_entidades',
          },
          {
            id: 'ubication',
            label: 'Ubicación',
            privilege: 'cgr.alertas.visualizar_ubicacion',
            submenu: [
              {
                id: 'regions',
                label: 'Regiones',
                typeModule: 'regions',
                privilege: 'cgr.alertas.visualizar_regiones',
              },
              {
                id: 'province',
                label: 'Departamentos',
                typeModule: 'province',
                privilege: 'cgr.alertas.visualizar_departamentos',
              },
              {
                id: 'cities',
                label: 'Municipios',
                typeModule: 'ubication/cities',
                privilege: 'cgr.alertas.visualizar_municipios',
              },
            ],
          },
        ],
      },
      {
        id: 'contracts',
        label: 'Contratos',
        typeModule: 'contracts',
        privilege: 'cgr.alertas.visualizar_contratos',
      },
      {
        id: 'alerts',
        label: 'Alertas',
        typeModule: 'alerts',
        privilege: 'cgr.alertas.visualizar_alertas',
      },
    ],
  },
  {
    id: 'terceros',
    label: 'Terceros',
    typeModule: 'terceros',
    privilege: 'cgr.alertas.visualizar_modulo_alertas',
  },
]
