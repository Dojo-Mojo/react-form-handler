const _defMaxLengthError = 'You have exceeded the character limit'

export const maxLength = (max, error = _defMaxLengthError) => value => {
  if (value && value.toString().length > max) {
    throw error
  }
}
