export const qryBuilder = (url, filterBy, searchParam) => {
  const newUrl = searchParam?.searchText ? `${url}${filterBy}=${searchParam?.searchText}` : url
  return newUrl
}
