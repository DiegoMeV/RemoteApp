export const handleParamSearch = ({ searchText }) => {
  const url = searchText ? `?search=${searchText}` : ''

  return url
}
