export const populationInputs = ({ form }) => {
  const populationData = [
    {
      name: 'populationInfo.anyDisability',
      label: '¿Presenta alguna discapacidad?',
      type: 'radioSelect',
      required: true,
      className: '!grid grid-cols-12 gap-4 w-full col-span-12',
      options: [
        { value: 'Y', label: 'Sí', className: 'general_form_item' },
        { value: 'N', label: 'No', className: 'general_form_item' },
      ],
      onChange: (e) => {
        form.setValue('populationInfo.anyDisability', e.target.value)
        if (e.target.value !== 'Y') {
          form.setValue('populationInfo.disabilityType', '')
        }
      },
    },
    ...(form.watch('populationInfo.anyDisability') === 'Y'
      ? [
          {
            label: '¿Qué discapacidad presenta?',
            name: 'populationInfo.disabilityType',
            type: 'select',
            required: true,
            options: [
              { value: 'auditiva', label: 'Auditiva' },
              { value: 'cognitiva', label: 'Cognitiva' },
              { value: 'visual', label: 'Visual' },
              { value: 'sordoceguera', label: 'Sordoceguera' },
              { value: 'psicosocial', label: 'Psicosocial' },
              { value: 'multiple', label: 'Múltiple' },
              { value: 'fisica', label: 'Física o motora' },
              { value: 'mental', label: 'Mental' },
            ],
            className: 'general_form_item',
          },
        ]
      : []),
    {
      name: 'populationInfo.someEthnicGroup',
      label: '¿Se reconoce como miembro de algún grupo étnico?',
      type: 'radioSelect',
      className: '!grid grid-cols-12 gap-4 w-full col-span-12',
      options: [
        { value: 'Y', label: 'Sí', className: 'general_form_item' },
        { value: 'N', label: 'No', className: 'general_form_item' },
      ],
      onChange: (e) => {
        form.setValue('populationInfo.someEthnicGroup', e.target.value)
        if (e.target.value !== 'Y') {
          form.setValue('ethnicGroup', '')
        }
      },
    },
    ...(form.watch('populationInfo.someEthnicGroup') === 'Y'
      ? [
          {
            label: '¿A qué grupo étnico pertenece?',
            name: 'populationInfo.ethnicGroup',
            type: 'select',
            required: true,
            options: [
              { value: 'afrocolombiano', label: 'Afrocolombiano' },
              { value: 'indigena', label: 'Indígena' },
              { value: 'negro', label: 'Negro' },
              { value: 'palenquero', label: 'Palenquero' },
              { value: 'raizal', label: 'Raizal' },
              { value: 'romGitano', label: 'Rom o Gitano' },
              { value: 'otro', label: 'Otro' },
            ],
            className: 'general_form_item',
          },
        ]
      : []),
    {
      name: 'populationInfo.isVictimOfArmedConflict',
      label: '¿Es víctima del conflicto?',
      type: 'radioSelect',
      className: '!grid grid-cols-12 gap-4 w-full col-span-12',
      options: [
        { value: 'Y', label: 'Sí', className: 'general_form_item' },
        { value: 'N', label: 'No', className: 'general_form_item' },
      ],
      onChange: (e) => {
        form.setValue('populationInfo.isVictimOfArmedConflict', e.target.value)
        if (e.target.value !== 'Y') {
          form.setValue('victimOfArmedConflictType', '')
        }
      },
    },
    ...(form.watch('populationInfo.isVictimOfArmedConflict') === 'Y'
      ? [
          {
            label: '¿Hecho victimizante?',
            name: 'populationInfo.victimOfArmedConflictType',
            type: 'select',
            required: true,
            options: [
              { value: 'abandono', label: 'Abandono o despojo forzado de tierras' },
              { value: 'abortoForzado', label: 'Aborto forzado' },
              { value: 'accidenteMina', label: 'Accidente por mina (MAP)' },
              { value: 'actoTerrorista', label: 'Acto terrorista' },
              { value: 'amenaza', label: 'Amenaza' },
              {
                value: 'artefactoExplosivoImprovisado',
                label: 'Artefacto explosivo improvisado (AEI)',
              },
              { value: 'atentados', label: 'Atentados' },
              { value: 'combates', label: 'Combates' },
              { value: 'confinamiento', label: 'Confinamiento' },
              { value: 'desaparicionForzada', label: 'Desaparición forzada' },
              { value: 'desplazamientoForzado', label: 'Desplazamiento forzado' },
              { value: 'embarazoForzado', label: 'Embarazo forzado' },
              { value: 'enfrentamientos', label: 'Enfrentamientos' },
              { value: 'esclavitudSexual', label: 'Esclavitud sexual' },
              { value: 'esterilizacionForzada', label: 'Esterilización forzada' },
              { value: 'homicidio', label: 'Homicidio' },
              { value: 'hostigamientos', label: 'Hostigamientos' },
              { value: 'lesionesPersonalesFisicas', label: 'Lesiones personales físicas' },
              {
                value: 'lesionesPersonalesPsicologicas',
                label: 'Lesiones personales psicológicas',
              },
              { value: 'municionSinExplotar', label: 'Munición sin explotar (MUSE)' },
              { value: 'perdidaBienes', label: 'Pérdida de bienes muebles o inmuebles' },
              { value: 'prostitucionForzada', label: 'Prostitución forzada' },
              { value: 'secuestro', label: 'Secuestro' },
              { value: 'sinInformacion', label: 'Sin información' },
              { value: 'tortura', label: 'Tortura' },
              {
                value: 'vinculacionNinosGruArmados',
                label: 'Vinculación de niños, niñas y adolescentes relacionadas con grupos armados',
              },
              { value: 'violacion', label: 'Violación' },
              { value: 'violacionSexual', label: 'Violación sexual' },
            ],
            className: 'general_form_item',
          },
        ]
      : []),
    {
      name: 'populationInfo.isLgbtiq',
      label: '¿Pertenece a la comunidad LGBTQI+?',
      type: 'radioSelect',
      className: '!grid grid-cols-12 gap-4 w-full col-span-12',
      options: [
        { value: 'Y', label: 'Sí', className: 'general_form_item' },
        { value: 'N', label: 'No', className: 'general_form_item' },
      ],
    },
    {
      label: 'Sexo',
      name: 'populationInfo.gender',
      type: 'select',
      required: true,
      options: [
        { value: 'masculino', label: 'Masculino' },
        { value: 'femenino', label: 'Femenino' },
      ],
      className: 'general_form_item',
    },
    {
      label: '¿En que rango de edad se encuentra?',
      name: 'populationInfo.ageRange',
      type: 'select',
      required: true,
      options: [
        { value: '5-12', label: '5 a 12 años' },
        { value: '13-17', label: '13 a 17 años' },
        { value: '18-26', label: '18 a 26 años' },
        { value: '27-40', label: '27 a 40 años' },
        { value: '41-60', label: '41 a 60 años' },
        { value: '+61', label: 'más de 61 años' },
      ],
      className: 'general_form_item',
    },
    {
      label: '¿En que actividad ocupa la mayor parte de su tiempo?',
      name: 'populationInfo.ocupation',
      type: 'select',
      required: true,
      options: [
        { value: 'personaHogar', label: 'Persona que trabaja en el hogar' },
        { value: 'estudia', label: 'Estudia' },
        { value: 'estudiaTrabaja', label: 'Estudia y trabaja' },
        { value: 'empleado', label: 'Empleado' },
        { value: 'desempleado', label: 'Desempleado' },
        { value: 'independiente', label: 'Independiente' },
        { value: 'pensionado', label: 'Pensionado' },
        { value: 'actividadCampo', label: 'Actividades del campo' },
        { value: 'comercioInformal', label: 'Comercio informal' },
        { value: 'otro', label: 'Otro' },
      ],
      className: 'general_form_item',
    },
    {
      label: 'Estrato',
      name: 'populationInfo.stratum',
      type: 'select',
      required: true,
      options: [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '5' },
        { value: '6', label: '6' },
        { value: 'otro', label: 'Otro' },
      ],
      className: 'general_form_item',
    },
    {
      label: 'Nivel educativo alcanzado',
      name: 'populationInfo.educationLevel',
      type: 'select',
      required: true,
      options: [
        { value: 'basicaPrimaria', label: 'Básica primaria' },
        { value: 'educacionMedia', label: 'Educación media' },
        { value: 'educacionSuperior', label: 'Educación superior' },
        { value: 'educacionEspecializada', label: 'Educación especializada' },
        { value: 'otro', label: 'Otro' },
        { value: 'ninguno', label: 'Ninguno' },
      ],
      className: 'general_form_item',
    },
  ]
  return populationData
}

export const SensitiveData = [
  { value: 'Y', label: 'Si', className: 'general_form_item' },
  { value: 'N', label: 'No', className: 'general_form_item' },
]
