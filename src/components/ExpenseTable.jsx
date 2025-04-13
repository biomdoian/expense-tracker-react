// This component is responsible for displaying a table of expenses
import React from 'react';

function ExpenseTable({ expenses, onDeleteExpense, onEditExpense, onSort }) {
  return (
    <div>
      <h2>Expenses</h2>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Comment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(expense => (
            <tr key={expense.id}>
              <td>{expense.description}</td>
              <td>KES {expense.amount.toFixed(2)}</td> {/* Added "KES " before the amount */}
              <td>{expense.date}</td>
              <td>{expense.comment}</td>
              <td>
                <div className="actions-buttons">
                  <button onClick={() => onEditExpense(expense.id)}>Edit</button>
                  <button onClick={() => onDeleteExpense(expense.id)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseTable;