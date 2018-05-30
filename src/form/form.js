import React, { Component } from 'react'
import { object, string, func, bool, shape, array } from 'prop-types'

import set from 'lodash.set'
import get from 'lodash.get'
import merge from 'lodash.merge'

export class Form extends Component {
  static propTypes = {
    model: object,
    updateModel: func,
    handleSubmit: func,
    persistModel: func,
    autopersist: bool,
    disabled: bool,
    mergeFieldsImmediately: bool,
  }

  static defaultProps = {
    model: {},
    autopersist: false,
    validations: {},
    disabled: false,
    mergeFieldsImmediately: true,
  }

  static childContextTypes = {
    form: shape({
      // merged form and canonical model
      formModel: object,

      // hash of form errors
      errors: object,

      // form has 0 errors
      formValid: bool,

      // indicates form should be disabled (generally marked as top-level prop)
      formDisabled: bool,

      // hash of fields currently validating
      validating: object,

      // indicates if at least one field is validating
      formValidating: bool,

      // indicates if formModel different from canonical model
      synced: bool,
    }),
    formActions: shape({
      updateFormModel: func,

      // enables child components to register their validations array with
      // the parent Form component
      registerValidations: func,

      // unregister on dismount
      unregisterValidations: func,

      validateField: func,
      submitForm: func,
    }),
  }

  state = {
    formModel: {},
    validating: {},
    errors: {},
    synced: true,
  }

  validations = {}

  getChildContext() {
    const { disabled } = this.props
    const { validating, errors, synced } = this.state
    return {
      form: {
        formModel: this.model,
        errors,
        formValid: !this.hasError(),
        formDisabled: disabled,
        validating,
        formValidating: this.isValidating(),
        synced,
      },
      formActions: {
        updateFormModel: this.updateFormModel,
        registerValidations: this.registerValidations,
        unregisterValidations: this.unregisterValidations,
        validateField: this.validateField,
        submitForm: this.submitForm,
      },
    }
  }

  // displayed values should be merge of form and canonical models
  get model() {
    return merge({}, this.props.model, this.state.formModel)
  }

  componentDidMount() {
    this.setState({
      formModel: this.props.model,
    })
  }

  registerValidations = (name, validations) => {
    this.validations[name] = [...validations]
  }

  unregisterValidations = name => {
    delete this.validations[name]
    this.setState(prevState => {
      const errors = { ...prevState.errors }
      delete errors[name]
      return { errors }
    })
  }

  hasError = (errors = this.state.errors) =>
    Object.keys(errors).some(key => errors[key])

  isValidating = () => {
    const { validating } = this.state
    return Object.keys(validating).some(key => validating[key])
  }

  updateFormModel = (name, type, value) => {
    if (typeof name === 'object') {
      const formModel = merge({}, this.state.formModel, name)
      return this.setState({ formModel })
    }
    const typedValue =
      type === 'number' && !isNaN(value) ? Number(value) : value
    const formModel = merge({}, this.state.formModel, set({}, name, typedValue))
    const errors = { ...this.state.errors, [name]: null }
    this.setState({ formModel, errors, synced: false })
  }

  updateModelField = (name, updater = this.props.updateModel) => {
    const payload = set({}, name, get(this.state.formModel, name))
    updater && updater(payload)

    const { autopersist } = this.props
    autopersist && this.persistModelField(name)
  }

  updateModel = (updater = this.props.updateModel) => {
    updater && updater(this.state.formModel)

    const { autopersist } = this.props
    this.setState(
      { synced: true, formModel: updater ? {} : this.state.formModel },
      () => autopersist && this.persistModel()
    )
  }

  persistModelField = (name, persister = this.props.persistModel) => {
    const payload = set({}, name, get(this.props.model, name))
    persister && persister(payload)
  }

  persistModel = (persister = this.props.persistModel) =>
    persister && persister(this.props.model)

  submitForm = async e => {
    e && e.preventDefault()
    const isValid = await this.validateForm()
    const { handleSubmit } = this.props
    if (isValid && handleSubmit) {
      handleSubmit(this.model)
    }
  }

  validateForm = async () => {
    const validations = Object.keys(this.validations)
    const errorArray = await Promise.all(validations.map(this.validate))
    const errors = Object.assign({}, ...errorArray)
    this.setState({ errors })
    const isValid = !this.hasError(errors)
    if (isValid) {
      this.updateModel()
    }
    return isValid
  }

  // field level validation
  validate = async name => {
    // mark validating
    this.setState(({ validating }) => ({
      validating: { ...validating, [name]: true },
    }))
    // perform validation
    const fieldValidations = this.validations[name] || []
    const error = { [name]: null }
    const value = get(this.model, name)
    try {
      await Promise.all(
        fieldValidations.map(validation => validation(value, this.model))
      )
    } catch (e) {
      error[name] = e ? e.message || e : 'Invalid Input'
    }
    // mark no longer validating
    this.setState(({ validating }) => ({
      validating: { ...validating, [name]: false },
    }))

    // for multi field (batchable)
    return error
  }

  validateField = async name => {
    // validate
    const error = await this.validate(name)

    // update error
    this.setState(({ errors, validating }) => ({
      errors: { ...errors, ...error },
    }))

    // update model if no error and merging immediately
    if (!error[name] && this.props.mergeFieldsImmediately) {
      this.updateModelField(name)
    }
  }

  debug = () => {
    return (
      <div
        style={{
          position: 'fixed',
          right: '30px',
          top: '30px',
          zIndex: '999',
          backgroundColor: 'white',
          borderRadius: '5px',
          width: '460px',
          padding: '20px',
          height: '90%',
          overflowY: 'scroll',
        }}
      >
        <h4>
          <br />Form Internal State
        </h4>
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
        <h4>
          <br />Context Provided to Descendants
        </h4>
        <pre>{JSON.stringify(this.getChildContext(), null, 2)}</pre>
        <h4>
          <br />Current Parent Model
        </h4>
        <pre>{JSON.stringify(this.props.model, null, 2)}</pre>
      </div>
    )
  }

  render() {
    return (
      <form noValidate onSubmit={this.submitForm}>
        {this.props.children}
        {this.props.debug && this.debug()}
      </form>
    )
  }
}
