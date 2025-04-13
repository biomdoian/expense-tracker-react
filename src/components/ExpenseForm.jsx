//This creates a basic form with input fields for description and amount, and a submit button.
import React from 'react';

function ExpenseForm() {
  return (
    <div>
      <h2>Add New Expense</h2>
      <form>
        <div>
          <label htmlFor="description">Description:</label>
          <input type="text" id="description" />
        </div>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input type="number" id="amount" />
        </div>
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
}

export default ExpenseForm;