/*import React, { Component } from 'react'
import { string, array, bool } from 'prop-types'

import Dropdown from 'react-toolbox/lib/dropdown'
import DropdownTheme from 'css/themes/Dropdown.css'
import Label from 'visual-components/util/inputs/label'

import { InputWrapper } from './input-wrapper'

export class Select extends Component {
  static propTypes = {
    name: string.isRequired,
    validations: array,
    required: bool,
  }

  static defaultProps = {
    required: false,
  }

  render() {
    const {
      name,
      label,
      sublabel,
      validations,
      options,
      style,
      defaultSelected,
      disabled,
      required,
    } = this.props

    return (
      <div style={{ position: 'relative' }}>
        <Label label={label} sublabel={sublabel} />
        <InputWrapper
          name={name}
          required={required}
          validations={validations}
          render={({
            value,
            update,
            validate,
            error,
            isValidating,
            formDisabled,
          }) => (
            <Dropdown
              source={options}
              value={value !== undefined ? value : defaultSelected}
              onBlur={() => setTimeout(validate, 100)}
              onChange={update}
              error={error}
              disabled={disabled || isValidating || formDisabled}
              theme={DropdownTheme}
              style={style}
              auto
            />
          )}
        />
      </div>
    )
  }
}

export class SelectRange extends Component {
  static propTypes = {
    name: string.isRequired,
    maxFieldName: string.isRequired,
    validations: array,
  }

  static defaultProps = {
    required: false,
  }

  render() {
    const {
      name,
      maxFieldName,
      label,
      sublabel,
      validations,
      options,
      style,
      defaultSelected,
      disabled,
      required,
    } = this.props

    return (
      <div style={{ position: 'relative' }}>
        <Label label={label} sublabel={sublabel} />
        <InputWrapper
          name={name}
          customValue={model => `${model[name]}-${model[maxFieldName] || ''}`}
          required={required}
          validations={validations}
          render={({
            value,
            update,
            validate,
            error,
            isValidating,
            formDisabled,
            updateFormModel,
          }) => (
            <Dropdown
              source={options}
              value={value !== undefined ? value : defaultSelected}
              onBlur={() => setTimeout(validate, 100)}
              onChange={value => {
                const [min, max] = value.split('-')
                updateFormModel({ [name]: min, [maxFieldName]: max || null })
              }}
              error={error}
              disabled={disabled || isValidating || formDisabled}
              theme={DropdownTheme}
              style={style}
              auto
            />
          )}
        />
      </div>
    )
  }
}
*/
