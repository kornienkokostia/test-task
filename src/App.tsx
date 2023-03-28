import React from 'react';
import { Header } from './components/header/Header';
import { Banner } from './components/banner/Banner';
import { UsersList } from './components/users-list/UsersList';

function App() {
  return (
    <div className="app-container">
      <div className="app">
        <Header />
        <main className="main">
          <Banner />
          <UsersList />
        </main>
      </div>
    </div>
  );
}

export default App;
