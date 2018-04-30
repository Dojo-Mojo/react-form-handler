import d3 from 'd3'

const _isPositive = value => value && +value > 0
const _isPositiveOrZero = value => value && +value >= 0
const _isInteger = value => Math.round(+value) === +value

export const isPositive = value => {
  if (!_isPositive(value)) {
    throw 'Must be positive'
  }
}

export const isPositiveOrZero = value => {
  if (!_isPositiveOrZero(value)) {
    throw 'Must be positive or zero'
  }
}

export const isPositiveInteger = value => {
  if (!_isPositive(value) || !_isInteger(value)) {
    throw 'Must be positive integer'
  }
}

const _defCannotExceedError = max => `Cannot exceed ${d3.format(',')(max)}`

export const cannotExceed = (max, error = _defCannotExceedError) => value => {
  if (+value > max) {
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
