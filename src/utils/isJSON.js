export const isJSON = (item) => {
  item = typeof item !== 'string'
    ? JSON.stringify(item)
    : item

  try {
    item = JSON.parse(item)
  } catch (e) {
    return false
  }

  if (typeof item === 'object' && item !== null) {
    return item
  }

  return false
}

export default isJSON