import plugin from 'tailwindcss/plugin'

const generateGrid = (size) => {
  const gridColumn = {}
  const gridTemplateColumns = {}
  const gridColumnStart = {}
  const gridColumnEnd = {}

  for (let i = 1; i <= size; i++) {
    gridColumn[`span-${i}`] = `span ${i} / span ${i}`
    gridTemplateColumns[i] = `repeat(${i}, minmax(0, 1fr))`
    gridColumnStart[i] = `${i}`
    gridColumnEnd[i] = `${i}`
  }

  return {
    gridColumn,
    gridTemplateColumns,
    gridColumnStart,
    gridColumnEnd,
  }
}

export default plugin(
  function ({ matchUtilities, theme }) {
    const gridExtensions = generateGrid(theme('extendedGridColumns'))

    matchUtilities(
      { 'grid-cols': (value) => ({ gridTemplateColumns: value }) },
      { values: gridExtensions.gridTemplateColumns }
    )

    matchUtilities(
      { col: (value) => ({ gridColumn: value }) },
      { values: gridExtensions.gridColumn }
    )

    matchUtilities(
      { 'col-start': (value) => ({ gridColumnStart: value }) },
      { values: gridExtensions.gridColumnStart }
    )

    matchUtilities(
      { 'col-end': (value) => ({ gridColumnEnd: value }) },
      { values: gridExtensions.gridColumnEnd }
    )
  },
  {
    theme: {
      extendedGridColumns: 60,
    },
  }
)
