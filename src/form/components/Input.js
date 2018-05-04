import React, { Component } from 'react'
import {
  string,
  array,
  bool,
  object,
  func,
  oneOfType,
  instanceOf,
} from 'prop-types'

import { InputWrapper } from '../input-wrapper'

export class Input extends Component {
  static propTypes = {
    name: string.isRequired,

    component: oneOfType([string, instanceOf(Component)]),
    type: string,
    required: bool,
    disabled: bool,
    validations: array,

    label: string,
    placeholder: string,
    formatNumber: func,

    className: string,
    style: object,
  }

  static defaultProps = {
    component: 'input',
    type: 'text',
    required: false,
    disabled: false,
    validations: [],
  }

  render() {
    const {
      name,
      component: C,
      type,
      required,
      disabled,
      validations,
      label,
      placeholder,
      formatNumber,
      className,
      style,
    } = this.props

    const isCustomComponent = C !== 'input'

    return (
      <InputWrapper
        name={name}
        type={type}
        required={required}
        validations={validations}
        formatNumber={formatNumber}
        render={({ inputValidating, formDisabled, ...rest }) => {
          const isDisabled = disabled || inputValidating || formDisabled
          const { value, update, error, onFocus, onBlur } = rest

          return isCustomComponent ? (
            <C disabled={isDisabled} {...rest} />
          ) : (
            <div>
              <label>
                {label}
                <input
                  value={value}
                  onFocus={onFocus} // resets errors and removes formatting
                  onBlur={onBlur} // triggers validation and applies formatting
                  disabled={isDisabled}
                  onChange={e => update(e.target.value)}
                />
              </label>
              {error ? <span>Error: {error}</span> : null}
            </div>
          )
        }}
      />
    )
  }
}
