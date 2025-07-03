export const inputsOrdenadorPago = ({ nit_compania, setFormValue }) => {
  return [
    {
      name: 'orden_pago.tercero_sol',
      label: 'Solicitante pago',
      type: 'textfieldQuery',
      lovTitle: 'Tercero solicitante',
      onChange: (_, value) => {
        setFormValue('orden_pago.tercero_sol', value?.tercero)
        setFormValue('orden_pago.nombre_tercero_sol', value?.nombre)
        setFormValue('orden_pago.tercero_type_sol', value?.tercero_type)
      },
      queryProps: {
        lovQuery: `SELECT
                        tercero,
                        tercero_type,
                        nombre
                        || ' '
                        || apellido_1
                        || ' '
                        || apellido_2 nombre
                    FROM
                        tercero
                    WHERE
                            nit_compania = ${nit_compania}
                        AND tercero_type IN ( 'EMPLEADO', 'NATURAL' )
                    ORDER BY
                        3`,
      },
      tableProps: {
        columns: [
          {
            field: 'tercero',
            headerName: 'Tercero',
          },
          {
            field: 'tercero_type',
            headerName: 'Tipo tercero',
          },
          {
            field: 'nombre',
            headerName: 'Nombre',
          },
        ],
      },
      className: 'general_form_item md:col-span-6',
    },
    {
      name: 'orden_pago.nombre_tercero_sol',
      label: 'Nombre solicitante',
      inputProps: {
        readOnly: true,
      },
      className: 'general_form_item md:col-span-6',
    },
    {
      name: 'orden_pago.tercero_ordenador',
      label: 'Ordenador de pago',
      type: 'textfieldQuery',
      lovTitle: 'Ordenador de pago',
      onChange: (_, value) => {
        setFormValue('orden_pago.tercero_ordenador', value?.tercero)
        setFormValue('orden_pago.nombre_tercero_ordenador', value?.nombre)
        setFormValue('orden_pago.tercero_type_ordenador', value?.tercero_type)
      },
      queryProps: {
        lovQuery: `SELECT
                        tercero,
                        tercero_type,
                        nombre
                        || ' '
                        || apellido_1
                        || ' '
                        || apellido_2 nombre
                    FROM
                        tercero
                    WHERE
                            nit_compania = ${nit_compania}
                        AND tercero_type IN ( 'EMPLEADO', 'NATURAL' )
                    ORDER BY
                        3`,
      },
      tableProps: {
        columns: [
          {
            field: 'tercero',
            headerName: 'Tercero',
          },
          {
            field: 'tercero_type',
            headerName: 'Tipo tercero',
          },
          {
            field: 'nombre',
            headerName: 'Nombre',
          },
        ],
      },
      className: 'general_form_item md:col-span-6',
    },
    {
      name: 'orden_pago.nombre_tercero_ordenador',
      label: 'Nombre ordenador de pago',
      inputProps: {
        readOnly: true,
      },
      className: 'general_form_item md:col-span-6',
    },
  ]
}
