// This component is responsible for displaying a table of expenses
import React from 'react';

function ExpenseTable({ expenses, onDeleteExpense, onEditExpense }) {
  // This component receives the expenses array, a function to handle deletion, and a function to handle editing as props
  return (
    <div>
      <h2>Expenses</h2>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.description}</td>
              <td>${expense.amount.toFixed(2)}</td>
              <td>
                <button onClick={() => onEditExpense(expense.id)}>Edit</button>
                {/* Edit button that calls the onEditExpense prop with the expense's ID */}
                <button onClick={() => onDeleteExpense(expense.id)}>Delete</button>
                {/* Delete button that calls the onDeleteExpense prop with the expense's ID */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseTable;