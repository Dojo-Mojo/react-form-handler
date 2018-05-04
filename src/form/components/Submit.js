import React, { Component } from 'react'
import { string, bool, object, oneOfType, instanceOf } from 'prop-types'

import { SubmitWrapper } from '../submit-wrapper'

export class Submit extends Component {
  static propTypes = {
    label: string,
    component: oneOfType([string, instanceOf(Component)]),
    disabled: bool,
    className: string,
    style: object,
  }

  static defaultProps = {
    label: 'Submit',
    component: 'button',
    disabled: false,
  }

  render() {
    const { label, component: C, disabled, className, style } = this.props

    const isCustomComponent = C !== 'button'

    return (
      <SubmitWrapper
        render={({ formDisabled, formValidating, formValid, submitForm }) => {
          const isDisabled =
            disabled || formDisabled || formValidating || !formValid
          return (
            <C
              type={isCustomComponent ? null : 'submit'}
              onClick={submitForm}
              className={className}
              style={style}
              disabled={isDisabled}
              label={isCustomComponent ? label : null}
            >
              {label}
            </C>
          )
        }}
      />
    )
  }
}
