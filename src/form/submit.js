/*import React, { Component } from 'react'
import { string, bool } from 'prop-types'

import { Button } from 'react-toolbox/lib/button'
import buttonTheme from 'css/themes/Buttons.css'

import { SubmitWrapper } from './input-wrapper'

export class Submit extends Component {
  static propTypes = {
    label: string,
    theme: string,
    flat: bool,
    // override disabled
    disabled: bool,
  }

  static defaultProps = {
    label: 'Submit',
    theme: buttonTheme,
    flat: true,
    disabled: false,
  }

  render() {
    const { disabled, label, theme, flat } = this.props
    return (
      <SubmitWrapper
        render={({ formDisabled, formValidating, formValid, submitForm }) => {
          const isDisabled =
            disabled || formDisabled || formValidating || !formValid
          return (
            <Button
              onClick={submitForm}
              className={
                isDisabled
                  ? `${buttonTheme.disabledButton} ${buttonTheme.noMargin}`
                  : `${buttonTheme.blueButton} ${buttonTheme.noMargin}`
              }
              theme={theme}
              label={label}
              flat={flat}
              disabled={isDisabled}
            />
          )
        }}
      />
    )
  }
}
*/
