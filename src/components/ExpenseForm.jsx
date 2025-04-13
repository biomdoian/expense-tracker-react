//This creates a basic form with input fields for description and amount, and a submit button.
import React, { useState, useEffect } from 'react';

function ExpenseForm({ onAddExpense, editingExpense, onUpdateExpense }) {
  // State variables to hold the values of the description and amount input fields
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  // New state for the date input
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  // New state for the comment input
  const [comment, setComment] = useState('');
  // State variables to hold validation error messages
  const [descriptionError, setDescriptionError] = useState('');
  const [amountError, setAmountError] = useState('');

  useEffect(() => {
    if (editingExpense) {
      // If an expense is being edited, set the form fields to the expense's values and clear any errors
      setDescription(editingExpense.description);
      setAmount(String(editingExpense.amount)); // Convert amount to string for input
      setDate(editingExpense.date); // Pre-fill date for editing
      setComment(editingExpense.comment); // Pre-fill comment for editing
      setDescriptionError('');
      setAmountError('');
    } else {
      // If no expense is being edited, reset the form fields to empty and clear any errors
      setDescription('');
      setAmount('');
      setDate(new Date().toISOString().slice(0, 10)); // Default to current date for new expenses
      setComment(''); // Initialize comment as empty for new expenses
      setDescriptionError('');
      setAmountError('');
    }
    // The effect runs whenever the editingExpense prop changes
  }, [editingExpense]);

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
    setDescriptionError(''); // Clear description error on input change
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value); // Update the amount state with the new input value
    setAmountError(''); // Clear amount error on input change
  };

  // Function to handle changes in the date input
  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  // Function to handle changes in the comment input
  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default (page reload)
    let isValid = true; // Flag to track if the form data is valid

    // Validate description
    if (!description.trim()) {
      setDescriptionError('Description cannot be empty.');
      isValid = false;
    }

    // Validate amount
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount)) {
      setAmountError('Amount must be a valid number.');
      isValid = false;
    } else if (parsedAmount <= 0) {
      setAmountError('Amount must be greater than zero.');
      isValid = false;
    }

    // If the form is valid, proceed with adding or updating the expense
    if (isValid) {
      if (editingExpense) {
        onUpdateExpense({ id: editingExpense.id, description, amount: parsedAmount, date, comment }); // Include date and comment on update
      } else {
        // If not in edit mode, call onAddExpense for a new expense
        onAddExpense({ description, amount: parsedAmount, date, comment }); // Include date and comment on add
      }
      // Clear the form after successful submission (either add or update)
      setDescription('');
      setAmount('');
      setDate(new Date().toISOString().slice(0, 10)); // Reset date to current for next entry
      setComment(''); // Reset comment for next entry
    }
  };

  return (
    <div>
      {/* Display "Edit Expense" if editingExpense exists, otherwise "Add New Expense" */}
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
          {/* Display description error message if it exists */}
          {descriptionError && <p style={{ color: 'red' }}>{descriptionError}</p>}
        </div>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount} // Binds the input value to the amount state
            onChange={handleAmountChange}
          />
          {/* Display amount error message if it exists */}
          {amountError && <p style={{ color: 'red' }}>{amountError}</p>}
        </div>
        {/* New input field for date */}
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={handleDateChange}
          />
        </div>
        {/* New textarea for comment */}
        <div>
          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            value={comment}
            onChange={handleCommentChange}
            rows="3" // You can adjust the number of rows as needed
          ></textarea>
        </div>
        {/* Display "Update Expense" button if editingExpense exists, otherwise "Add Expense" */}
        <button type="submit">{editingExpense ? 'Update Expense' : 'Add Expense'}</button>
      </form>
    </div>
  );
}

export default ExpenseForm;