
import React, { useState } from 'react';
import ExpenseTable from './components/ExpenseTable';
import ExpenseForm from './components/ExpenseForm';
import SearchBar from './components/SearchBar';
import './App.css';

function App() {
  // State variable to hold the list of expenses
  const [expenses, setExpenses] = useState([
    { id: 1, description: 'Grocery Shopping', amount: 50.75 },
    { id: 2, description: 'Movie Ticket', amount: 12.00 },
    { id: 3, description: 'Dinner with Friends', amount: 35.50 },
  ]);

  const handleAddExpense = (newExpense) => {
    // Update the expenses state by creating a new array with the existing expenses and the new one
    setExpenses([...expenses, { id: Date.now(), ...newExpense }]);
  };

  return (
    <div className="App">
      <h1>Expense Tracker</h1>
      <SearchBar />
      <ExpenseForm onAddExpense={handleAddExpense} />
      <ExpenseTable expenses={expenses} />
    </div>
  );
}

export default App;