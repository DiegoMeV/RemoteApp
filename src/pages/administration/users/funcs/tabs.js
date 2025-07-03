import { matchIsValidTel } from 'mui-tel-input'
import {
  aditionalData,
  BasicData,
  basicDataInputs,
  SignUpload,
  SpecialOptions,
  UserJobtitles,
  UserRoles,
} from '../EditUser/components'
import { validEmail } from '@/libV4'

export const tabs = [
  {
    label: 'Información del usuario',
    privilege: 'usuarios.usuarios.editar',
    component: (props) => {
      const inputs = basicDataInputs(validEmail, matchIsValidTel)
      return BasicData({
        title: 'Información del usuario',
        inputs: inputs,
        ...props,
      })
    },
  },
  {
    label: 'Información adicional',
    privilege: 'usuarios.usuarios.editar',
    component: (props) => {
      return BasicData({
        title: 'Información adicional',
        inputs: aditionalData,
        ...props,
      })
    },
  },
  {
    label: 'Cargos',
    privilege: 'usuarios.usuarios.listar_cargos',
    component: (props) => UserJobtitles({ ...props }),
  },
  {
    label: 'Roles',
    privilege: 'usuarios.usuarios.listar_roles',
    component: (props) => UserRoles({ ...props }),
  },
  {
    label: 'Opciones Especiales',
    privilege: 'usuarios.usuarios.listar_roles',
    component: (props) => SpecialOptions({ ...props }),
  },
  {
    label: 'Cargar Firma',
    privilege: 'usuarios.usuarios.listar_roles',
    component: (props) => SignUpload({ ...props }),
  },
]
