//This creates a basic form with input fields for description and amount, and a submit button.
import React, { useState } from 'react';

function ExpenseForm({ onAddExpense }) {
  
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value); // Update the description state with the new input value
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value); // Update the amount state with the new input value
  };

  // Function to handle the form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default (page reload)
    if (description && amount) {
      // Call the onAddExpense function (passed as a prop from App) with the new expense data
      onAddExpense({ description, amount: parseFloat(amount) });
      // Clear the input fields after submitting
      setDescription('');
      setAmount('');
    }
  };
  return (
    <div>
      <h2>Add New Expense</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={description} // Binds the input value to the description state
            onChange={handleDescriptionChange} 
          />
        </div>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount} // Binds the input value to the amount state
            onChange={handleAmountChange} 
          />
        </div>
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
}

export default ExpenseForm;