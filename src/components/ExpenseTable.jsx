//This creates a basic HTML table with a header and some placeholder data in the body.
import React from 'react';

function ExpenseTable() {
  return (
    <div>
      <h2>Expenses</h2>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Sample Expense 1</td>
            <td>10.00</td>
          </tr>
          <tr>
            <td>Another Expense</td>
            <td>25.50</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseTable;