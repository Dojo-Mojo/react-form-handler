import React, { Component } from 'react'
import { object, func } from 'prop-types'

export class SubmitWrapper extends Component {
  static propTypes = {
    render: func.isRequired,
  }

  static contextTypes = {
    form: object.isRequired,
    formActions: object.isRequired,
  }

  render() {
    const {
      form: { formDisabled, formValidating, formValid },
      formActions: { submitForm },
    } = this.context

    return this.props.render({
      formDisabled,
      formValidating,
      formValid,
      submitForm,
    })
  }
}
