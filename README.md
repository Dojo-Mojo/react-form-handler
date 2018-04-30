# react-form-handler

> An easily customizable input form

## Live Demo

TBA

## Getting Started

### Basic Use

```js
import { Input, Form, Submit } from 'react-form-handler/form'

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

### Customization


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
#### Visual Customization
We're using [React Toolbox](http://react-toolbox.io) under the hood which uses [CSS Modules](https://github.com/css-modules/css-modules).  Each input typically contains three components: label, input, and error text.  Themeing any of these is optional and can be passed in the following manner:
```js
import inputTheme from 'css/themes/input.css'
/*
.input {
  padding: 0 0 32px;
  max-height: 100px;
}

.label {
  color: blue;
}

.error {
  color: red;
}

.tooltip {
  font-size: 8px
}
*/

<Input
  name="firstName"
  label="First Name"
  tooltip="This is what you usually go by"
  inputTheme={inputTheme}
/>
```
