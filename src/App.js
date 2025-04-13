// This is a simple React application that tracks expenses.
// It includes components for adding expenses, displaying them in a table, and searching through them and also sorting.
import React, { useState, useEffect } from 'react';
import ExpenseTable from './components/ExpenseTable';
import ExpenseForm from './components/ExpenseForm';
import SearchBar from './components/SearchBar';
import './App.css';

// Key for storing expenses in local storage
const LOCAL_STORAGE_KEY = 'expenseTrackerApp.expenses';

function App() {
  // State for the list of expenses, initialized from local storage or default data
  const [expenses, setExpenses] = useState(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [{ id: 1, description: 'Grocery Shopping', amount: 50.75, date: '2025-04-13', comment: '' }, { id: 2, description: 'Movie Ticket', amount: 12.00, date: '2025-04-14', comment: '' }, { id: 3, description: 'Dinner', amount: 35.50, date: '2025-04-15', comment: '' }];
  });
  // State for the search text
  const [searchText, setSearchText] = useState('');
  // State for the ID of the expense being edited
  const [editingId, setEditingId] = useState(null);
  // State for the current sorting criteria (field)
  const [sortBy, setSortBy] = useState(null);
  // State for the sorting direction ('asc' or 'desc')
  const [sortDirection, setSortDirection] = useState('asc');
  // State to control the visibility of the sorting options
  const [isSortOptionsVisible, setIsSortOptionsVisible] = useState(false);

  // Find the expense object if in editing mode
  const editingExpense = expenses.find(exp => exp.id === editingId);

  // Save expenses to local storage whenever the expenses state changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(expenses));
  }, [expenses]);

  const handleAddExpense = newExpense => {
    setExpenses([...expenses, { id: Date.now(), date: new Date().toISOString().slice(0, 10), comment: '', ...newExpense }]);
    setEditingId(null); // Reset edit mode after adding
  };

  const handleUpdateExpense = updatedExpense => {
    const updatedList = expenses.map(exp => exp.id === updatedExpense.id ? updatedExpense : exp);
    setExpenses(updatedList);
    setEditingId(null);
  };

  const handleSearch = text => setSearchText(text);
  const handleDeleteExpense = id => setExpenses(expenses.filter(exp => exp.id !== id));
  const handleEditExpense = id => setEditingId(id);
  const sortExpenses = (key, direction) => {
    setSortBy(key);
    setSortDirection(direction);
    setIsSortOptionsVisible(false); // Hide sorting options after selection
  };

  // Function to toggle the visibility of the sorting options
  const toggleSortOptions = () => {
    setIsSortOptionsVisible(!isSortOptionsVisible);
  };

  // Sort the expenses array based on the sortBy and sortDirection state
  const sortedExpenses = [...expenses].sort((a, b) => {
    if (sortBy === 'description') {
      const descA = a.description.toLowerCase();
      const descB = b.description.toLowerCase();
      return sortDirection === 'asc' ? descA.localeCompare(descB) : descB.localeCompare(descA);
    } else if (sortBy === 'amount') {
      return sortDirection === 'asc' ? a.amount - b.amount : b.amount - a.amount;
    }
    return 0; // No sorting applied if sortBy is null
  });

  // Filter the sorted expenses based on the search text
  const displayedExpenses = sortedExpenses.filter(exp =>
    exp.description.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="App-container">
      <div className="App">
        <h1>Expense Tracker - Track and Manage Your Finances</h1>
        <SearchBar onSearch={handleSearch} />
        <ExpenseForm onAddExpense={handleAddExpense} editingExpense={editingExpense} onUpdateExpense={handleUpdateExpense} />
        {/* Container for the sort button and its options */}
        <div className="sort-buttons">
          {/* Button to toggle the visibility of sorting options */}
          <button onClick={toggleSortOptions}>Sort Expenses</button>
          {/* Conditional rendering of sorting options */}
          {isSortOptionsVisible && (
            <div>
              {/* Buttons to sort by description (A-Z and Z-A) */}
              <button onClick={() => sortExpenses('description', 'asc')}>A-Z</button>
              <button onClick={() => sortExpenses('description', 'desc')}>Z-A</button>
              {/* Buttons to sort by amount (Low to High and High to Low) */}
              <button onClick={() => sortExpenses('amount', 'asc')}>Low to High</button>
              <button onClick={() => sortExpenses('amount', 'desc')}>High to Low</button>
            </div>
          )}
        </div>
        <ExpenseTable
          expenses={displayedExpenses}
          onDeleteExpense={handleDeleteExpense}
          onEditExpense={handleEditExpense}
          onSort={() => {}} // Header click sorting is disabled with buttons
        />
      </div>
      <div className="left-space"></div>
    </div>
  );
}

export default App;