import React, { Component } from 'react'
import { object, string, func, bool, shape, array } from 'prop-types'
import { required as isRequired } from './validations'

import { format } from 'd3-format'

import get from 'lodash.get'

const getFormattedNumber = (value, formatter) => {
  if (formatter) {
    return formatter(value)
  }

  if (!value || isNaN(value)) {
    return value
  }

  return format(',')(value)
}

// provides render prop accessing form model/actions from context provided
// by parent Form component
export class InputWrapper extends Component {
  static propTypes = {
    name: string.isRequired,
    render: func.isRequired,
    validations: array,
    required: bool,
    customValue: func,
  }

  state = {
    editing: false
  }

  static defaultProps = {
    type: 'text',
    validations: [],
    required: false,
  }

  static contextTypes = {
    form: object.isRequired,
    formActions: object.isRequired,
  }

  componentDidMount() {
    const { name, required } = this.props
    const validations = [...this.props.validations]
    required && validations.unshift(isRequired)
    this.context.formActions.registerValidations(name, validations)
  }

  componentWillUnmount() {
    this.context.formActions.unregisterValidations(this.props.name)
  }

  showRealValue = (e) => {
    this.setState({
      editing: true
    })
  }

  showPrettyValueAndValidate = async (e) => {
    const {
      formActions: { validateField },
    } = this.context

    const { name } = this.props

    await validateField(name)

    this.setState({
      editing: false
    })
  }

  formatNumber = () => {
    const {
      form: { formModel, errors, validating, formDisabled },
      formActions: { updateFormModel, validateField },
    } = this.context
    const {
      editing
    } = this.state
    const { name, render, customValue, formatNumber } = this.props
    if (customValue) {
      return customValue(formModel)
    }
    const value = get(formModel, name, '')
    return this.props.type === 'number' && !editing ? getFormattedNumber(value, formatNumber) : value
  }

  render() {
    const {
      form: { formModel, errors, validating, formValidating, formDisabled },
      formActions: { updateFormModel, validateField },
    } = this.context

    const { name, type, render, customValue, formatNumber } = this.props

    return render({
      value: this.formatNumber(),
      update: updateFormModel.bind(null, name, type),
      error: errors[name],
      formValidating: formValidating,
      inputValidating: validating[name],
      formDisabled,
      onFocus: this.showRealValue,
      onBlur: this.showPrettyValueAndValidate
    })
  }
}
