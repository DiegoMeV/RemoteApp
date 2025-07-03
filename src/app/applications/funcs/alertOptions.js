import {
  AllInbox,
  Assignment,
  AssignmentIndOutlined,
  Folder,
  Insights,
  JoinFullSharp,
  ListAlt,
  NotificationsNone,
  Quiz,
  UnsubscribeSharp,
  ViewList,
} from '@mui/icons-material'

export const useOptionsAlertas = () => {
  return [
    {
      key: 'alertModule',
      label: 'Módulo de alertas',
      title: 'Módulo de alertas',
      icon: <NotificationsNone />,
      privilege: 'cgr.alertas.visualizar_modulo_alertas',
      children: [
        {
          key: 'dashboard',
          label: 'Dashboard',
          icon: <Insights color='secondary' />,
          data: { path: '/applications/dashboard' },
          privilege: 'cgr.alertas.visualizar_dashboard',
        },
        {
          key: 'basicData',
          label: 'Datos básicos',
          privilege: 'cgr.alertas.visualizar_variables',
          icon: <Folder color='secondary' />,
          children: [
            {
              key: 'variables',
              label: 'Variables',
              icon: <ViewList color='secondary' />,
              data: { path: '/applications/variables' },
              privilege: 'cgr.alertas.visualizar_variables',
            },
            {
              key: 'variablesContrato',
              label: 'Variables de contratos',
              icon: <ViewList color='secondary' />,
              data: { path: '/applications/variablesContract' },
              privilege: 'cgr.alertas.visualizar_variables',
            },
            {
              key: 'blocks',
              label: 'Bloques',
              icon: <ViewList color='secondary' />,
              data: { path: '/applications/blocks' },
              privilege: 'cgr.alertas.visualizar_bloques',
            },
            {
              key: 'modelsAlerts',
              label: 'Modelos de alertas',
              privilege: 'cgr.alertas.visualizar_modelos',
              icon: <Folder color='secondary' />,
              children: [
                {
                  key: 'criteria',
                  label: 'Criterios',
                  icon: <ViewList color='secondary' />,
                  data: { path: '/applications/criteria' },
                  privilege: 'cgr.alertas.visualizar_criterios',
                },

                {
                  key: 'models',
                  label: 'Modelos',
                  icon: <ViewList color='secondary' />,
                  data: { path: '/applications/models' },
                  privilege: 'cgr.alertas.visualizar_modelos',
                },
              ],
            },
            {
              key: 'contractsTypes',
              label: 'Modalidad de contratación',
              icon: <ViewList color='secondary' />,
              data: { path: '/applications/contractsTypes' },
              privilege: 'cgr.alertas.visualizar_tipos_contrato',
            },
            // {
            //   key: 'actingTypes',
            //   label: 'Tipos de actuación',
            // icon: <ViewList color='secondary' />,
            // data: { path: '/applications/actingTypes', },
            //   privilege: 'cgr.alertas.visualizar_tipos_actuacion',
            // },  TO DO: Inactivada por trivi hasta nuevo aviso
            {
              key: 'resultTypes',
              label: 'Tipos de resultado',
              icon: <ViewList color='secondary' />,
              data: { path: '/applications/resultTypes' },
              // privilege: 'cgr.alertas.visualizar_tipos_resultado',
            },
            {
              key: 'contractors',
              label: 'Contratistas',
              icon: <ViewList color='secondary' />,
              data: { path: '/applications/contractors' },
              privilege: 'cgr.alertas.visualizar_contratistas',
            },
            {
              key: 'office',
              label: 'Dependencias',
              icon: <ViewList color='secondary' />,
              data: { path: '/applications/dependencias' },
              privilege: 'usuarios.jerarquia.listar',
            },
            {
              key: 'resources',
              label: 'Recursos',
              icon: <ViewList color='secondary' />,
              data: { path: '/applications/domains/resources' },
              privilege: 'cgr.alertas.visualizar_recursos',
            },
            {
              key: 'informationSources',
              label: 'Fuentes de información',
              icon: <ViewList color='secondary' />,
              data: { path: '/applications/domains/informationSources' },
              privilege: 'cgr.alertas.visualizar_fuentes_informacion',
            },
            {
              key: 'contractSource',
              label: 'Fuentes de contrato',
              icon: <ViewList color='secondary' />,
              data: { path: '/applications/domains/contractSource' },
              privilege: 'cgr.alertas.visualizar_fuentes_contrato',
            },
            {
              key: 'Entidades',
              label: 'Entes',
              icon: <ViewList color='secondary' />,
              data: { path: '/applications/entities' },
              privilege: 'cgr.alertas.visualizar_entidades',
            },
            {
              key: 'ubication',
              label: 'Ubicación',
              privilege: 'cgr.alertas.visualizar_ubicacion',
              icon: <Folder color='secondary' />,
              children: [
                {
                  key: 'regions',
                  label: 'Regiones',
                  icon: <ViewList color='secondary' />,
                  data: { path: '/applications/ubication/regions' },
                  privilege: 'cgr.alertas.visualizar_regiones',
                },
                {
                  key: 'province',
                  label: 'Departamentos',
                  icon: <ViewList color='secondary' />,
                  data: { path: '/applications/ubication/province' },
                  privilege: 'cgr.alertas.visualizar_departamentos',
                },
                {
                  key: 'cities',
                  label: 'Municipios',
                  icon: <ViewList color='secondary' />,
                  data: { path: '/applications/ubication/cities' },
                  privilege: 'cgr.alertas.visualizar_municipios',
                },
                {
                  key: 'satellite',
                  label: 'Satelitales',
                  icon: <ViewList color='secondary' />,
                  data: { path: '/applications/ubication/satellite' },
                  privilege: 'cgr.alertas.visualizar_municipios', // change for correct priv when available
                },
              ],
            },
          ],
        },
        {
          key: 'contracts',
          label: 'Contratos',
          icon: <ViewList color='secondary' />,
          data: { path: '/applications/contracts' },
          privilege: 'cgr.alertas.visualizar_contratos',
        },
        {
          key: 'alerts',
          label: 'Alertas',
          icon: <ViewList color='secondary' />,
          data: { path: '/applications/alerts' },
          privilege: 'cgr.alertas.visualizar_alertas',
        },
        // { TO DO: Inactivadas por trivi hasta nuevo aviso
        //   key: 'sendAlerts',
        //   label: 'Envío de alertas',
        //   path: '/applications/sendAlerts',
        // },
        // {
        //   key: 'alertMonitoring',
        //   label: 'Seguimiento de Alertas',
        //   data: { path: '/applications/alertMonitoring', },
        //   privilege: 'cgr.alertas.visualizar_alertas',
        //   // privilege: 'cgr.alertas.visualizar_seguimiento_alertas',
        // },
      ],
    },
    /*  {
      key: 'requestModule',
      label: 'Módulo de requerimientos',
      icon: <Quiz />,
      privilege: 'cgr.alertas.visualizar_dashboard',
      children: [
        {
          key: 'dashboard',
          label: 'Dashboard',
          data: { path: '/applications/request', },          
          icon: <DashboardOutlined />,
          privilege: 'cgr.alertas.visualizar_dashboard',
        },
      ],
    }, */
    {
      key: 'transferExpedients',
      label: 'Traslado de procesos',
      data: { path: `/applications/transferExpedients` },
      icon: <ListAlt />,
      privilege: 'procesos.herramientas.transferencia_actividades_pendientes',
    },
    {
      key: 'expenseManagementModule',
      label: 'Módulo de gestión de gastos',
      data: { path: `/applications/expenseManagementModule` },
      icon: <ListAlt />,
      privilege: 'aplicaciones.gestion_gasto.visualizar',
      children: [
        {
          key: 'reports',
          label: 'Informes',
          data: { path: '/applications/expenseManagementModule/reports' },
          icon: <JoinFullSharp />,
          privilege: 'aplicaciones.gestion_gasto_informes.visualizar',
          children: [
            {
              key: 'paymentOrdersReportsDates',
              label: 'Informe ordenes de pago entre fechas',
              data: {
                path: '/applications/expenseManagementModule/reports/PaymentOrdersReportsDates',
              },
              icon: <ViewList />,
              privilege: 'aplicaciones.informes_gen_reportes_op.visualizar',
            },
          ],
        },
      ],
    },

    {
      key: 'ari',
      label: 'Formularios URI',
      icon: <UnsubscribeSharp />,
      privilege: 'cgr.uri.visualizar',
      children: [
        {
          key: 'uriDashboard',
          label: 'Dashboard',
          data: { path: '/applications/uri/uriDashboard' },
          icon: <Insights />,
          privilege: 'cgr.uri.visualizar_dashboard',
        },
        {
          key: 'basicDataUri',
          label: 'Datos básicos',
          icon: <Folder />,
          privilege: 'cgr.uri.visualiza_datos_basicos',
          children: [
            {
              key: 'teams',
              label: 'Regiones',
              icon: <Assignment />,
              data: { path: '/applications/teams' },
              privilege: 'cgr.uri.visualizar_equipos',
            },
          ],
        },
        {
          key: 'records',
          label: 'Registros',
          data: { path: '/applications/uri/records' },
          icon: <JoinFullSharp />,
          privilege: 'cgr.uri.visualizar_registros',
        },

        {
          key: 'tables',
          label: 'Mesas',
          data: { path: '/applications/uri/tables' },
          icon: <Quiz />,
          privilege: 'cgr.uri.visualizar_mesas',
        },
      ],
    },
    {
      key: 'rethus',
      label: 'RETHUS',
      data: { path: `/applications/rethusRegistry` },
      icon: <ListAlt />,
      privilege: 'rethus.opciones.visualizar_rethus',
    },
    {
      key: 'paymentOrders',
      label: 'Bandeja de ordenes de pago',
      data: { path: `/applications/treasury` },
      icon: <AllInbox />,
      privilege: 'aplicaciones.bandeja_ordenes_pago.visualizar',
    },
    {
      key: 'assignmentPaymentOrders',
      label: 'Reparto de ordenes de pago',
      data: { path: `/applications/assigmentPaymentOrder` },
      icon: <AssignmentIndOutlined />,
      privilege: 'aplicaciones.asignar_ordenes_pago.visualizar',
    },
  ]
}
