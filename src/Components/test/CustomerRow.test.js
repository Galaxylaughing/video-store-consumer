import React from 'react';
import { render, cleanup } from '@testing-library/react'
import CustomerRow from '../CustomerRow';

test('It will render the proper name for the customer', () => {
  // Arrange & Act

  const container = render(<CustomerRow
    id={1}
    name={"Georgina"}
    movies_checked_out_count={2}
    account_credit={200}
    address={"An address"}
    city={"Gdl"} 
    state={"Jal"} 
    postal_code={"44600"}
    phone={"1781293691"}
    selectCustomer={() => { }}
  />);

  // Assert
  expect(container.getByText(/Georgina/)).toBeDefined();
});

test('The "onSelectClick" function is called when the `select` button is clicked on', () => {

  // Arrange
  const selectCustomer = jest.fn();

  const container = render(<CustomerRow
    id={2}
    name={"Sabrina"}
    movies_checked_out_count={2}
    account_credit={200}
    address={"An address"}
    city={"Gdl"} 
    state={"Jal"} 
    postal_code={"44600"}
    phone={"1781293691"}
    onSelectClick={selectCustomer}
  />);

  // Act
  const selectButton = container.getByText(/Select/);
  selectButton.click();

  // Assert
  expect(selectCustomer).toHaveBeenCalled();
});