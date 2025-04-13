// This is a simple React application that tracks expenses.
// It includes components for adding expenses, displaying them in a table, and searching through them.
import React, { useState } from 'react';
import ExpenseTable from './components/ExpenseTable';
import ExpenseForm from './components/ExpenseForm';
import SearchBar from './components/SearchBar';
import './App.css';

function App() {

  // State to hold the list of expenses
  const [expenses, setExpenses] = useState([
    { id: 1, description: 'Grocery Shopping', amount: 50.75 },
    { id: 2, description: 'Movie Ticket', amount: 12.00 },
    { id: 3, description: 'Dinner with Friends', amount: 35.50 },
  ]);
  const [searchText, setSearchText] = useState('');

  const handleAddExpense = (newExpense) => {
    // Adds a new expense to the list
    setExpenses([...expenses, { id: Date.now(), ...newExpense }]);
  };

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const filteredExpenses = expenses.filter((expense) =>
    expense.description.toLowerCase().includes(searchText.toLowerCase())
  );
// This filters the expenses based on the search text
  return (
    <div className="App">
      <h1>Expense Tracker</h1>
      <SearchBar onSearch={handleSearch} />
      <ExpenseForm onAddExpense={handleAddExpense} />
      <ExpenseTable expenses={filteredExpenses} />
    </div>
  );
}

export default App;