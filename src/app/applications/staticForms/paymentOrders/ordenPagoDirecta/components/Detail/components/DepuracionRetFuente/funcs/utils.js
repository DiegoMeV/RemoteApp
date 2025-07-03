export const redondeo = (unvalor) => {
  const mivalor1 = unvalor % 1 // We still need mivalor1 to check the condition

  if (mivalor1 > 0.1 && mivalor1 < 0.5) {
    return Math.round(unvalor) + 1 // Return directly if the condition is met
  } else {
    return Math.round(unvalor) // Return directly otherwise
  }
}

export const redondeoacien_cond = (unvalor) => {
  const mivalor1 = unvalor % 100 // Get the remainder when divided by 100

  if (mivalor1 < 50 && mivalor1 > 0) {
    // If the remainder is between 0 and 50 (exclusive)
    return Math.round((unvalor + 50) / 100) * 100
  } else {
    // Otherwise
    return Math.round(unvalor / 100) * 100
  }
}
