import React from 'react';
import { Header } from './components/header/Header';
import { Banner } from './components/banner/Banner';
import { UsersList } from './components/users-list/UsersList';
import { Registration } from './components/registration/Registration';
import { useUser } from './hooks/user';

function App() {
  const {
    users,
    totalPages,
    currentPage,
    setCurrentPage,
    updateUsers,
    usersLoading,
  } = useUser();

  return (
    <div className="app-container">
      <div className="app">
        <Header />
        <main className="main">
          <Banner />
          <UsersList
            users={users}
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            usersLoading={usersLoading}
          />
          <Registration updateUsers={updateUsers} />
        </main>
      </div>
    </div>
  );
}

export default App;
