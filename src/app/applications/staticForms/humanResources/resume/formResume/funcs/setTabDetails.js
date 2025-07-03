import { AcademicFormation } from '../components/detail/components/AcademicFormation'
import { BasicData } from '../components/detail/components/BasicData'
import { Family } from '../components/detail/components/Family'
import { Languages } from '../components/detail/components/Languages'
import { Publications } from '../components/detail/components/Publications'
import { WorkHistory } from '../components/detail/components/WorkHistory'

const setTabDetails = (props = {}) => {
  return [
    {
      id: 'basicData',
      label: 'Datos básicos',
      component: <BasicData {...props} />,
      props: {
        sx: {
          textTransform: 'none',
        },
      },
    },
    {
      id: 'academicFormation',
      label: 'Formación académica',
      component: <AcademicFormation {...props} />,
      props: {
        sx: {
          textTransform: 'none',
        },
      },
    },
    {
      id: 'family',
      label: 'Familia',
      component: <Family {...props} />,
      props: {
        sx: {
          textTransform: 'none',
        },
      },
    },
    {
      id: 'languages',
      label: 'Idiomas',
      component: <Languages {...props} />,
      props: {
        sx: {
          textTransform: 'none',
        },
      },
    },
    {
      id: 'publications',
      label: 'Publicaciones',
      component: <Publications {...props} />,
      props: {
        sx: {
          textTransform: 'none',
        },
      },
    },
    {
      id: 'workHistory',
      label: 'Historia laboral',
      component: <WorkHistory {...props} />,
      props: {
        sx: {
          textTransform: 'none',
        },
      },
    },
    {
      id: 'vinculation',
      label: 'Vinculación',
      component: <BasicData {...props} />,
      props: {
        sx: {
          textTransform: 'none',
        },
      },
    },
    {
      id: 'bankAccounts',
      label: 'Cuentas bancarias',
      component: <BasicData {...props} />,
      props: {
        sx: {
          textTransform: 'none',
        },
      },
    },
    {
      id: 'pensionContribution',
      label: 'Aporte pensional',
      component: <BasicData {...props} />,
      props: {
        sx: {
          textTransform: 'none',
        },
      },
    },
  ]
}

export default setTabDetails
