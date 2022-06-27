import React from 'react'

const AddressFormTmpl = props => (
  <form method="post" onSubmit={props.handleSubmit(props.onSubmit)}>
    <div className="form-group">
      <input
        className="form-control border-primary py-2"
        type="text"
        name="firstName"
        placeholder="First Name"
        ref={props.register(props.firstNameValidation())}
      />
      {props.renderFieldError(props.errors.firstName)}
    </div>

    <div className="form-group">
      <input
        className="form-control border-primary py-2"
        type="text"
        name="lastName"
        placeholder="Last Name"
        ref={props.register(props.lastNameValidation())}
      />
      {props.renderFieldError(props.errors.lastName)}
    </div>

    <div className="form-group">
      <input
        className="form-control border-primary py-2"
        type="text"
        name="company"
        placeholder="Company"
        ref={props.register(props.companyValidation())}
      />
      {props.renderFieldError(props.errors.company)}
    </div>

    <div className="form-group">
      <input
        className="form-control border-primary py-2"
        type="text"
        name="address1"
        placeholder="Address 1"
        ref={props.register(props.addressValidation())}
      />
      {props.renderFieldError(props.errors.address1)}
    </div>

    <div className="form-group">
      <input
        className="form-control border-primary py-2"
        type="text"
        name="address2"
        placeholder="Address 2"
        ref={props.register({})}
      />
    </div>

    <div className="row">
      <div className="col">
        <div className="form-group">
          <input
            className="form-control border-primary py-2"
            type="text"
            name="city"
            placeholder="City"
            ref={props.register(props.cityValidation())}
          />
          {props.renderFieldError(props.errors.city)}
        </div>
      </div>

      {props.provincesForCountry.length > 0 && (
        <div className="col">
          <div className="form-group">
            <select
              className="custom-select border-primary"
              name="province"
              defaultValue={props.getValues().province}
              ref={props.register(
                props.fieldRequireValidation('Province is required')
              )}
            >
              {props.provincesForCountry.map(c => (
                <option key={c.id} value={c.code}>
                  {c.name}
                </option>
              ))}
            </select>
            {props.renderFieldError(props.errors.province)}
          </div>
        </div>
      )}
    </div>

    <div className="form-group">
      <select
        className="custom-select border-primary"
        name="country"
        ref={props.register(props.countryValidation())}
      >
        {Object.values(props.shipping_zones).map(c => (
          <option key={c.id} value={c.code} disabled={c.code === '---'}>
            {c.name}
          </option>
        ))}
      </select>
    </div>

    <div className="row">
      <div className="col">
        <div className="form-group">
          <input
            className="form-control border-primary py-2"
            type="text"
            name="zip"
            autoCapitalize="characters"
            placeholder="ZIP"
            ref={props.register(props.zipCodeValidation(props.getValues))}
          />
          {props.renderFieldError(props.errors.zip)}
        </div>
      </div>

      <div className="col">
        <div className="form-group">
          <input
            className="form-control border-primary py-2"
            type="tel"
            name="phone"
            placeholder="Phone"
            ref={props.register(props.phoneValidation())}
          />
          {props.renderFieldError(props.errors.phone)}
        </div>
      </div>
    </div>

    {!props.isDefaultAddress && (
      <div className="form-group">
        <label className="form-check-label">
          <input
            type="checkbox"
            name="setDefault"
            disabled={props.isDefaultAddress}
            ref={props.register({})}
          />{' '}
          Set as Default Address
        </label>
      </div>
    )}

    {props.userErrors && props.userErrors.length > 0 && (
      <div className="invalid-feedback d-block">
        {props.userErrors[0].message || props.userErrors}
      </div>
    )}

    <button className="btn btn-block btn-primary py-2" type="submit">
      {props.submitText}
    </button>
  </form>
)

export default AddressFormTmpl
