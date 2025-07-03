export const buildingURL = (url, queryRequest, requestParams, searchParam) => {
  let newUrl =
    queryRequest?.querySearch && requestParams
      ? `${url ?? ''}?${queryRequest?.querySearch}=${searchParam?.value}`
      : url

  if (queryRequest?.additionalQuery) {
    newUrl += `${queryRequest?.additionalQuery}`
  }

  return newUrl
}
