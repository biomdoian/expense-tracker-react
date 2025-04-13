// This is a simple React application that tracks expenses.
// It includes components for adding expenses, displaying them in a table, and searching through them.
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
  // State variable to hold the current search text
  const [searchText, setSearchText] = useState('');
  // State variable to hold the ID of the expense being edited 
  const [editingExpenseId, setEditingExpenseId] = useState(null);

  // Find the expense object that matches the ID in editingExpenseId
  const editingExpense = expenses.find((expense) => expense.id === editingExpenseId);

  const handleAddExpense = (newExpense) => {
    // Update the expenses state by creating a new array with the existing expenses and the new one
    setExpenses([...expenses, { id: Date.now(), ...newExpense }]);
    // Reset editing mode after adding a new expense
    setEditingExpenseId(null);
  };

  const handleUpdateExpense = (updatedExpense) => {
    const updatedExpenses = expenses.map((expense) =>
      expense.id === updatedExpense.id ? updatedExpense : expense
    );
    setExpenses(updatedExpenses);
    setEditingExpenseId(null);
  };

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const handleDeleteExpense = (id) => {
    // Update the expenses state by filtering out the expense with the given ID
    setExpenses(expenses.filter((expense) => expense.id !== id));
    setEditingExpenseId(null);
  };

  const handleEditExpense = (id) => {
    setEditingExpenseId(id); // Set the ID of the expense being edited, triggering the form to pre-fill
  };

  // Filter the expenses based on the search text
  const filteredExpenses = expenses.filter((expense) =>
    expense.description.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Expense Tracker</h1>
      <SearchBar onSearch={handleSearch} />
      <ExpenseForm
        onAddExpense={handleAddExpense}
        editingExpense={editingExpense}
        onUpdateExpense={handleUpdateExpense}
      />
      <ExpenseTable
        expenses={filteredExpenses}
        onDeleteExpense={handleDeleteExpense}
        onEditExpense={handleEditExpense}
      />
    </div>
  );
}

export default App;