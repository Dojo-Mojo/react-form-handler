/*import React, { Component } from 'react'
import { string, array, number, bool } from 'prop-types'
import { maxLength } from './validations'

import { Input as InputRT } from 'react-toolbox/lib/input'
import inputTheme from 'css/themes/Input.css'

import { Micro } from 'visual-components/util/texts'
import Label from 'visual-components/util/inputs/label'

import { InputWrapper } from './input-wrapper'

export class Input extends Component {
  static propTypes = {
    name: string.isRequired,
    validations: array,
    required: bool,
  }

  static defaultProps = {
    type: 'text',
    required: false,
    validations: [],
  }

  render() {
    let {
      name,
      validations,
      required,
      label,
      sublabel,
      type,
      multiline,
      rows,
      placeholder,
      tooltip,
      disabled,
      className,
      style,
      characterLimit,
      outerClassName,
      canRemove,
      remove,
      index,
      formatNumber
    } = this.props

    const classNames = `${className} ${remove ? inputTheme.withTrashcan : null}`

    if (characterLimit) {
      validations = [maxLength(characterLimit), ...validations]
    }

    return (
      <InputWrapper
        name={name}
        type={type}
        required={required}
        validations={validations}
        formatNumber={formatNumber}
        render={({
          value,
          update,
          validate,
          error,
          isValidating,
          formDisabled,
          showRealValue,
          showPrettyValueAndValidate
        }) => {
          const charactersRemaining =
            characterLimit - (value ? value.length : 0)
          const overLimit = charactersRemaining < 0
          return (
            <div
              className={outerClassName}
              style={{
                position: 'relative',
              }}
            >
              {label && (
                <Label label={label} sublabel={sublabel} tooltip={tooltip} />
              )}

              <InputRT
                value={value}
                type={type === 'number' ? 'text' : type}
                multiline={multiline || false}
                rows={rows}
                hint={placeholder}
                error={error}
                disabled={disabled || isValidating || formDisabled}
                onBlur={showPrettyValueAndValidate}
                onFocus={showRealValue}
                onChange={update}
                theme={inputTheme}
                className={classNames}
                style={style}
              />
              {canRemove && !disabled && !formDisabled ? (
                <div
                  className={inputTheme.trashIcon}
                  onClick={e => remove(index)}
                >
                  <img src="/images/icons/trash.svg" />
                </div>
              ) : null}
              {characterLimit && (
                <div
                  style={{
                    position: 'relative',
                  }}
                >
                  <span
                    style={{
                      float: 'right',
                      position: 'absolute',
                      bottom: '18px',
                      width: '120px',
                      right: '0px',
                      textAlign: 'right',
                    }}
                  >
                    {overLimit ? (
                      <Micro alertRed>
                        {`${Math.abs(
                          charactersRemaining
                        )} characters over limit`}
                      </Micro>
                    ) : (
                      <Micro>
                        {`${Math.abs(
                          charactersRemaining
                        )} characters remaining`}
                      </Micro>
                    )}
                  </span>
                </div>
              )}
            </div>
          )
        }}
      />
    )
  }
}
*/
