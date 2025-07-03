export const resizeColumns = async (apiRef, loading) => {
  if (!loading) {
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Wait 1 second
    apiRef?.current?.autosizeColumns?.({
      includeOutliers: true,
      includeHeaders: true,
    })
  }
}
