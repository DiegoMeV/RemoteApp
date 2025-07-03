export const queryWithPagination = (query, paginationModel) => {
  return `SELECT qpag.*
                        FROM  (
                            SELECT qorigen.*,
                            rownum           AS numfilapag,
                            Count(*) OVER () AS total_count
                                FROM   (
                                ${query}
                                ) qorigen
                                ) qpag
                                WHERE  qpag.numfilapag BETWEEN ( (${paginationModel?.page}) 
                                * ${paginationModel?.pageSize} + 1 )
                                AND (${paginationModel?.page + 1} * ${paginationModel?.pageSize} )`
}
