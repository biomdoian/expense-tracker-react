
import React from 'react';
import ExpenseTable from './components/ExpenseTable';
import ExpenseForm from './components/ExpenseForm';
import SearchBar from './components/SearchBar';
import './App.css'; 

function App() {
  return (
    <div className="App">
      <h1>Expense Tracker</h1>
      <SearchBar />
      <ExpenseForm />
      <ExpenseTable />
    </div>
  );
}

export default App;