const React = require('react')
const { checkPhoneNumber } = require('./helpers')

const renderFieldError = type => {
  return type && <div className="invalid-feedback d-block">{type.message}</div>
}

const emailValidation = () => {
  return {
    required: 'Email is required',
    pattern: {
      value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
      message: 'Invalid email address',
    },
  }
}

const firstNameValidation = () => {
  return {
    required: "First name can't be blank.",
    minLength: {
      value: 2,
      message: 'Name must be at least 2 characters',
    },
    maxLength: {
      value: 70,
      message: 'Name must contain no more than 70 characters',
    },
    pattern: {
      value: /^[\p{L}'][ \p{L}'-]*[\p{L}][^0-9]$/u,
      message: 'Wrong name format',
    },
  }
}

const lastNameValidation = () => {
  return {
    required: "Last name can't be blank.",
    minLength: {
      value: 2,
      message: 'Name must be at least 2 characters',
    },
    maxLength: {
      value: 70,
      message: 'Name must contain no more than 70 characters',
    },
    pattern: {
      value: /^[\p{L}'][ \p{L}'-]*[\p{L}][^0-9]$/u,
      message: 'Wrong name format',
    },
  }
}

const passwordValidation = () => {
  return {
    required: "Password can't be blank.",
    minLength: {
      value: 5,
      message: 'Min length is 5',
    },
  }
}

const passwordRepeatValidation = password => {
  return {
    validate: value =>
      value === password.current || 'The passwords do not match',
  }
}

const phoneValidation = () => {
  return {
    required: "Phone number can't be blank.",
    minLength: {
      value: 6,
      message: 'Phone number is too short.',
    },
    pattern: {
      value: /(^[0-9 + . ( ) -]+$)/,
      message: 'Invalid phone number.',
    },
    validate: value => {
      if (checkPhoneNumber(value) === '') {
        return 'Invalid phone number.'
      }
      return true
    },
  }
}

const addressValidation = () => {
  return {
    required: "Address can't be blank.",
    minLength: {
      value: 2,
      message: 'Address must be at least 2 characters',
    },
  }
}

const countryValidation = () => {
  return {
    required: "Country can't be blank.",
    minLength: {
      value: 2,
      message: 'Country must be at least 2 characters',
    },
  }
}

const cityValidation = () => {
  return {
    required: "City can't be blank.",
    minLength: {
      value: 2,
      message: 'City must be at least 2 characters',
    },
  }
}

const fieldRequireValidation = (msg) => {
  return {
    required: msg,
  }
}

const companyValidation = () => {
  return {
    maxLength: 80,
  }
}

const zipCodeValidation = (getValues) => {
  return {
    required: "ZIP Code can't be blank.",
    validate: {
      pattern: value => {
        if (getValues().country === 'US') {
          return /^[0-9]{5}(?:-[0-9]{4})?$/.test(value) || 'Invalid zip code'
        } else {
          return value.length > 1 || 'Invalid zip code'
        }
      },
    },
  }
}

module.exports.renderFieldError = renderFieldError
module.exports.emailValidation = emailValidation
module.exports.passwordValidation = passwordValidation
module.exports.passwordRepeatValidation = passwordRepeatValidation
module.exports.firstNameValidation = firstNameValidation
module.exports.lastNameValidation = lastNameValidation
module.exports.phoneValidation = phoneValidation
module.exports.addressValidation = addressValidation
module.exports.countryValidation = countryValidation
module.exports.cityValidation = cityValidation
module.exports.zipCodeValidation = zipCodeValidation
module.exports.fieldRequireValidation = fieldRequireValidation
module.exports.companyValidation = companyValidation
