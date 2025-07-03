const convertInformationToRows = (infoRows, setRows) => {
  const struturedRows = infoRows?.data?.map((cell) => {
    return {
      id: cell?.id ?? '',
      name: cell?.nombre ?? '',
    }
  })
  setRows(struturedRows)
}

export default convertInformationToRows
