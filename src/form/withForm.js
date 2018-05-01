import { object } from 'prop-types'

export const withForm = Component => {
  const Wrapper = (props, context) => <Component {...props} {...context} />

  Wrapper.contextTypes = {
    form: object.isRequired,
    formActions: object.isRequired,
  }
  Wrapper.WrappedComponent = Component
  Wrapper.displayName = `withForm(${Component.displayName || Component.name})`

  return Wrapper
}
