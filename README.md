# react-form-handler

> Simple, non-opinionated Form data management in React

This package establishes a pattern for processing inputs in a form, holding
their data in internal state until fully validated (both synchronously and
asynchronously), and finally passing that data to a handler function and/or a
centralized state container like
[Redux](https://redux.js.org/basics/usage-with-react).

## Live Demo

Coming Soon

## Getting Started

### Basic Use

Out of the box, `react-form-handler` provides simple input and submit button
bindings. All you need to do is pass a handler to the `<Form>` component that
specifies what to do with the final data:

```js
import React, { Component } from 'react'
import { Form, Input, Submit } from 'react-form-handler'

export default class BasicExample extends Component {
  handleData = data => window.alert(`My data:\n\n${JSON.stringify(data)}`)

  render() {
    return (
      <Form handleSubmit={this.handleData}>
        <Input name="firstName" label="First Name" required />
        <Input name="lastName" label="Last Name" />
        <Submit />
      </Form>
    )
  }
}
```

Our basic implementation uses raw HTML elements, but you can also pass custom
elements like so (see the [API Docs](#) for a full list of props that will be
passed to them):

```js
...
import { CustomInput, CustomSubmit } from 'your/own/library'
...
    <Form handleSubmit={this.handleData}>
      <Input component={CustomInput} name="firstName" label="First Name" required />
      <Input component={CustomInput} name="lastName" label="Last Name" />
      <Submit component={CustomSubmit} />
    </Form>
...
```

### Parent State

For use with a parent or external state, simply pass the state to the `model`
prop along with an updater function in the `updateModel` prop. The Form
component will not sync its internal state with the model until the edited
field(s) are valid:

```js
import React, { Component } from 'react'
import { Form, Input, Submit } from 'react-form-handler'

export class UseWithExternalStateExample extends Component {
  state = {
    testForm: {
      firstName: '',
      lastName: '',
    },
  }

  updateData = newData => {
    const oldData = this.state.testForm
    this.setState({ testForm: { ...oldData, ...newData } })
    // NOTE: for deeply nested data, you may want to consider using a deep
    // merger like lodash's _.merge() function
  }

  render() {
    return (
      <Form model={this.state.testForm} updateModel={this.updateData}>
        <Input name="firstName" label="First Name" required />
        <Input name="lastName" label="Last Name" />
        <Submit />
      </Form>
    )
  }
}
```

### Higher Order State Management

For use with centralized state containers like Redux, you can manually pass a
reference to the model and a function that dispatches an updater action just as
in the above example.

You can also create a Higher Order Component to simplify this like so:

```js
import React from 'react'
import { string, object } from 'prop-types'
import { connect } from 'react-redux'

import { Form } from 'react-form-handler'

const mapStateToProps = (state, ownProps) => ({
  model: state[ownProps.modelName],
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateModel: () => dispatch(ownProps.updateAction),
})

export const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(Form)

ConnectedForm.propTypes = {
  modelName: string.isRequired,
  updateAction: object.isRequired,
}
```

TODO: working example

### Customization Options

#### Nested Fields

Out of the box support for arbitrarily nested model data:

```js
model = {
  name: 'John Smith',
  address: {
    street: {
      street1: '270 Lafayette Street',
      street2: 'Suite 10101',
    },
    city: 'New York',
  }
}
...
<Input name="address.street.street2" /> // Suite 10101
```

#### Validations

Validations are passed along at the input level as an array:

```js
import { Validations } from 'react-form-handler'
const { isPositiveInteger, cannotExceed } = Validations

<Input
  name="age"
  label="Age"
  type="number"
  required
  validations={[isPositiveInteger, cannotExceed(100)]}
/>
```

##### Custom Validations

Validations are functions that take two arguments:

1. value (required) -- the value of the field being validated
2. model (optional) -- optionally accesses the entire form model (used in cases
   where validations depend on the value of another field in the model)

To indicate that the validation failed, throw an Error, or a simple string:

```js
const customValidation = value => {
  if (/* testFails() */) {
    throw 'Validation failed'
  }
}
```

Async validations are also supported natively:

```js
const asyncCustomValidation = async value => {
  await someAsyncAction()
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (/* testFails() */) {
        rej('Async validation failed')
      } else {
        res()
      }
    }, 5000)
  })
}
```

### A note on Context

We're currently using React's
[legacy Context API](https://reactjs.org/docs/legacy-context.html) so that the
parent Form element can communicate with arbitrarily deeply nested descendant
components. While the legacy Context API is deprecated starting in React 16.3,
it will still be functional until version 17. Future versions of
`react-form-handler` will be refactored to use the new context API.

**Warning:** the usage of `PureComponents` and components that alter the
`shouldComponentUpdate()` lifecycle hook should be avoided where possible within
the `<Form>` element. These components can block context and will prevent the
form from working properly.

TODO:

* Deeper customization with InputWrapper and SubmitWrapper
* withForm HOC
* persistence
* full API docs
