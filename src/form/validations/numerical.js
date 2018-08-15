import { format } from 'd3-format'

const _isPositive = value => value && +value > 0
const _isPositiveOrZero = value => value && +value >= 0
const _isInteger = value => Math.round(+value) === +value
const _getNumber = value => value.replace(/,/g, '')

export const isPositive = value => {
  const number = _getNumber(value)
  if (!_isPositive(value)) {
    throw 'Must be positive'
  }
}

export const isPositiveOrZero = value => {
  if (!_isPositiveOrZero(value)) {
    throw 'Must be positive or zero'
  }
}

const isPositiveInteger = (value) => {
  const number = _getNumber(value)
  if (!_isPositive(number) || !_isInteger(number)) {
    throw 'Must be positive integer'
  }
}

const _defCannotExceedError = max => `Cannot exceed ${format(',')(max)}`

const cannotExceed = (max, error = _defCannotExceedError) => value => {
  const number = _getNumber(value)
  if (number > max) {
    throw error(max, value)
  }
}

export const asyncTest = (value, model) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      value > 50 ? rej('Async cannot exceed 50') : res()
    }, 5000)
  })
}
