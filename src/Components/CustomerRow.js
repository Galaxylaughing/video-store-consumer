import React from 'react';
import PropTypes from 'prop-types';

const CustomerRow = (
  { id, 
    name, 
    account_credit, 
    address, 
    city, 
    state, 
    postal_code, 
    movies_checkout_out_count, 
    phone, 
    registered_at,
    selectCustomer,
    isSelected }
  ) => {

  const onSelectClick = () => {
    selectCustomer( id );
  }

  return (
    <tr className={ isSelected ? "selected" : "" }>
      <td>{ id }</td>
      <td>{ name }</td>
      <td>{ movies_checkout_out_count > 0 ? movies_checkout_out_count : "none" }</td>
      <td>$ { account_credit }</td>
      <td>{ address } { city }, { state } { postal_code }</td>
      <td>{ phone }</td>
      <td>{ registered_at }</td>
      <td><button onClick={ onSelectClick }>Select</button></td>
    </tr>
  );
}

CustomerRow.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  account_credit: PropTypes.number,
  address: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
  postal_code: PropTypes.string,
  movies_checkout_out_count: PropTypes.number,
  phone: PropTypes.string,
  registered_at: PropTypes.string,
  selectCustomer: PropTypes.func.isRequired,
  isSelected: PropTypes.bool
}

export default CustomerRow;
