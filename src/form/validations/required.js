export const required = (value, model) => {
  if (typeof value === 'undefined' || !value.toString().trim()) {
    throw 'Required field'
  }
}
