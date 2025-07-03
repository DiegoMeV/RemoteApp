import { firstValidationTipo, secondValidationTipo } from '../../constants'

export const onChangeTipo = ({ e, setFormValue, handleChangeTab }) => {
  const value = e.target.value

  setFormValue('orden_pagou.tipo', value)

  if (firstValidationTipo.includes(value)) {
    handleChangeTab(null, 3)
  } else if (secondValidationTipo.includes(value)) {
    handleChangeTab(null, 0)
  }
}
