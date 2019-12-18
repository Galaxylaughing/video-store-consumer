import React from 'react';
import PropTypes from 'prop-types';
import './CustomerRow.css';

const CustomerRow = (
  { id, 
    name, 
    account_credit, 
    address, 
    city, 
    state, 
    postal_code, 
    movies_checked_out_count, 
    phone, 
    registered_at,
    selectCustomer,
    isSelected }
  ) => {

  const formatDate = (date) => {
    const formattedDate = date.match(/^\d{4}-\d{2}-\d{2}/);
    return formattedDate;
  }

  const onSelectClick = () => {
    selectCustomer( id );
  }

  return (
    <tr className={ isSelected ? "selected" : "" }>
      <td>{ id }</td>
      <td>{ name }</td>
      <td>{ movies_checked_out_count }</td>
      <td>$ { account_credit }</td>
      <td>{ address } <br /> { city }, { state } { postal_code }</td>
      <td>{ phone }</td>
      <td>{ formatDate(registered_at) }</td>
      <td><button onClick={ onSelectClick } className="customer-table--select-button">Select</button></td>
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
  movies_checked_out_count: PropTypes.number,
  phone: PropTypes.string,
  registered_at: PropTypes.string,
  selectCustomer: PropTypes.func.isRequired,
  isSelected: PropTypes.bool
}

export default CustomerRow;
