import React, { Component } from 'react';

const CustomerRow = ({ id, name, account_credit, address, city, state, postal_code, movies_checkout_out_count, phone, registered_at }) => {
  return (
    <tr>
      <td>{ id }</td>
      <td>{ name }</td>
      <td>{ movies_checkout_out_count > 0 ? movies_checkout_out_count : "none" }</td>
      <td>$ { account_credit }</td>
      <td>{ address } { city }, { state } { postal_code }</td>
      <td>{ phone }</td>
      <td>{ registered_at }</td>
    </tr>
  );
}

export default CustomerRow;
