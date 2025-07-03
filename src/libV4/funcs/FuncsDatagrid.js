/**
 * Resizes the columns of a data grid.
 *
 * This function waits for 1 second and then resizes the columns of the data grid
 * using the provided `apiRef`. It includes outliers and headers in the resizing process.
 *
 * @param {Object} apiRef - A reference to the data grid API.
 * @param {boolean} loading - A flag indicating whether the data grid is currently loading.
 * @returns {Promise<void>} - A promise that resolves after the columns have been resized.
 */
export const resizeColumns = async (apiRef, loading) => {
  if (!loading) {
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Wait 1 second
    apiRef?.current?.autosizeColumns?.({
      includeOutliers: true,
      includeHeaders: true,
    })
  }
}
