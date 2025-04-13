// This is a simple React application that tracks expenses.
// It includes components for adding expenses, displaying them in a table, and searching through them.

import React, { useState, useEffect } from 'react';
import ExpenseTable from './components/ExpenseTable';
import ExpenseForm from './components/ExpenseForm';
import SearchBar from './components/SearchBar';
import './App.css';

// Key used to store and retrieve expenses from localStorage
const LOCAL_STORAGE_KEY = 'expenseTrackerApp.expenses';

function App() {
  // State variable to hold the list of expenses.
  // We initialize it by trying to load from localStorage.
  // If nothing is in localStorage, we use the initial sample data.
  const [expenses, setExpenses] = useState(() => {
    const storedExpenses = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedExpenses ? JSON.parse(storedExpenses) : [
      { id: 1, description: 'Grocery Shopping', amount: 50.75 },
      { id: 2, description: 'Movie Ticket', amount: 12.00 },
      { id: 3, description: 'Dinner with Friends', amount: 35.50 },
    ];
  });
  // State variable to hold the current search text
  const [searchText, setSearchText] = useState('');
  
  const [editingExpenseId, setEditingExpenseId] = useState(null);

  const editingExpense = expenses.find((expense) => expense.id === editingExpenseId);

  // useEffect hook to save the expenses to localStorage.
  // This runs whenever the 'expenses' state changes.
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(expenses));
  }, [expenses]); // The effect depends on the 'expenses' state

  const handleAddExpense = (newExpense) => {

    setExpenses([...expenses, { id: Date.now(), ...newExpense }]);

    setEditingExpenseId(null);
  };

  const handleUpdateExpense = (updatedExpense) => {
    const updatedExpenses = expenses.map((expense) =>
      expense.id === updatedExpense.id ? updatedExpense : expense
    );
    setExpenses(updatedExpenses);
    // Reset editing mode 
    setEditingExpenseId(null);
  };

  const handleSearch = (text) => {
    setSearchText(text); 
  };

  const handleDeleteExpense = (id) => {

    setExpenses(expenses.filter((expense) => expense.id !== id));
    setEditingExpenseId(null);
  };

  // Function to handle the "Edit" button click in the table
  const handleEditExpense = (id) => {
    setEditingExpenseId(id); 
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