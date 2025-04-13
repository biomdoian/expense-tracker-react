//This creates a basic form with input fields for description and amount, and a submit button.
import React, { useState, useEffect } from 'react';

function ExpenseForm({ onAddExpense, editingExpense, onUpdateExpense }) {
  // State variables to hold the values of the description and amount input fields
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    if (editingExpense) {
      // If an expense is being edited, set the form fields to the expense's values
      setDescription(editingExpense.description);
      setAmount(String(editingExpense.amount)); 
    } else {
      // If no expense is being edited, reset the form fields to empty
      setDescription('');
      setAmount('');
    }
    // The effect runs whenever the editingExpense prop changes
  }, [editingExpense]);

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value); // Update the description state with the new input value
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value); 
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default (page reload)
    if (description && amount) {
      if (editingExpense) {
        // If in edit mode, call onUpdateExpense with the updated data and the ID
        onUpdateExpense({ id: editingExpense.id, description, amount: parseFloat(amount) });
      } else {
        // If not in edit mode, call onAddExpense for a new expense
        onAddExpense({ description, amount: parseFloat(amount) });
      }
      // Clear the form after submission (either add or update)
      setDescription('');
      setAmount('');
    }
  };

  return (
    <div>
      <h2>{editingExpense ? 'Edit Expense' : 'Add New Expense'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={description} // Bind the input value to the description state
            onChange={handleDescriptionChange} // Call handleDescriptionChange on input change
          />
        </div>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount} 
            onChange={handleAmountChange} 
          />
        </div>
        {/* Display "Update Expense" button if editingExpense exists, otherwise "Add Expense" */}
        <button type="submit">{editingExpense ? 'Update Expense' : 'Add Expense'}</button>
      </form>
    </div>
  );
}

export default ExpenseForm;