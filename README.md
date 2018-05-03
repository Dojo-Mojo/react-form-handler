# react-form-handler

> An easily customizable reliable pattern to handling form data

This package is designed to establish a pattern for validating inputs in a form, and knowing when to pass data from the form to the parent data model

## Live Demo

TBA

## Getting Started

### Basic Use

The prototype for the most basic use case can be as simple as the following
```js
import { InputWrapper, Form, Submit } from 'react-form-handler/form'

import { Input } from './Input'

export class BasicUse extends Component {
  state = {
    testForm: {
      firstName: '',
      lastName: ''
    }
  }

  updateForm = (data) => {
    this.setState(data)
  }

  submit = () => {
    // handle submit
  }

  render() {
    return (
      <Form
        modelName="testForm"
        updateModel={this.updateForm}
        handleSubmit={this.submit}
      >
        <Input
          name="firstName"
          label="First Name"
          required
        />
        <Input
          name="lastName"
          label="Last Name"
        />
        <Submit />
      </Form>
    )
  }
}
```
But this requires you to set up your `Input` class which can be done in the following manner:
```js
import React, { Component } from 'react'
import { InputWrapper } from 'react-form-handler'

class Input extends Component {
  render() {
    let {
      name, // required
      validations, // optional
      required, // optional
      label, // optional
      type, // optional type = 'text'
      disabled, // optional
    } = this.props

    return (
      <InputWrapper
        name={name}
        type={type}
        required={required}
        validations={validations}
        render={({
          value,
          update,
          error,
          inputValidating,
          formValidating,
          formDisabled,
          onFocus,
          onBlur
        }) => {
          return (
            <div>
              <label>
                {label}
                <input
                  value={value} // handled
                  onFocus={onFocus} // handled, hides errors
                  onBlur={onBlur} // handled, triggers validation, and applies formatting
                  disabled={disabled || inputValidating || formDisabled} // handled
                  onChange={(e) => {
                    update(e.target.value) // expects the value
                  }}
                  />
              </label>
              { error ?
                <span>Error {error}</span>
                :
                null
              }
            </div>
          )
        }}
      />
    )
  }
}
```

This implementation using raw html elements gives you the freedom to apply whatever styles you need in the manner that fits your project, the purpose of package is to handle the heavy lifting of deciding what to validate when, and how to pass data up to the parent store.

### Customization Options


#### Nested Fields

```js
{
  attr: val,
  parrentAttr: {
    childAttr: val
  }
}

<Input
  name="parrentAttr.childAttr"
/>
```
#### Validations
```js
import { isPositiveInteger, cannotExceed } from 'react-form-handler/validations'

<Input
  name="age"
  label="Age"
  type="number"
  required
  validations={[isPositiveInteger, cannotExceed(100)]}
/>
```
##### Custom Validations
The core of a validation is throwing an error in context, so to add a validation the validation needs only to throw an error
```js
const asyncCustomValidation = (value) => { // asynchronous custom validation
  return new Promise((res, rej) => {
    setTimeout(() => {
      testFails() ? rej('Async validation failed') : res()
    }, 5000)
  })
}
const customValidation = value => {  // custom synchronous validation
  if (testFails()) {
    throw 'Validation failed'
  }
}
```
