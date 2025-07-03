/**
 * Checks if a given argument is empty.
 *
 * This function determines if the provided argument is empty. It handles different types:
 * - `null` or `undefined` values are considered empty.
 * - Strings and arrays are considered empty if their length is 0.
 * - Objects are considered empty if they have no own properties.
 *
 * @param {*} arg - The argument to check.
 * @returns {boolean} - True if the argument is empty, false otherwise.
 */
export const isEmpty = (arg) => {
  let isEmpty = false
  if (!arg && typeof arg !== 'number') {
    isEmpty = true
  } else if (typeof arg === 'string' || Array.isArray(arg)) {
    isEmpty = arg.length === 0
  } else if (typeof arg === 'object') {
    isEmpty = Object.keys(arg).length === 0
  }
  return isEmpty
}

/**
 * Checks if a given value is a valid date string in ISO format.
 *
 * This function determines if the provided value is a valid date string that can be parsed
 * into a Date object and matches the ISO format.
 *
 * @param {string} value - The value to check.
 * @returns {boolean} - True if the value is a valid date string in ISO format, false otherwise.
 */
export const isDate = (value) => {
  return !isNaN(Date.parse(value)) && new Date(value).toISOString() === value
}

/**
 * Deeply compares two objects for equality.
 *
 * This function checks if two objects are deeply equal by comparing their properties recursively.
 * It handles cases where the objects are not of type 'object' or are null.
 *
 * @param {Object} obj1 - The first object to compare.
 * @param {Object} obj2 - The second object to compare.
 * @returns {boolean} - True if the objects are deeply equal, false otherwise.
 */
export const deepEqual = (obj1, obj2) => {
  if (obj1 === obj2) return true

  if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
    return false
  }

  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)

  if (keys1.length !== keys2.length) return false

  for (let key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false
    }
  }

  return true
}
