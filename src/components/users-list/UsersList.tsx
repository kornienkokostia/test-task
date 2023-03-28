import React from 'react';
import './usersList.scss';
import { User } from '../../models/users';
import photoCover from './../../assets/photo-cover.svg';
import { useUser } from '../../hooks/user';

interface UserProps {
  user: User;
}

export const UsersList = () => {
  const { users, totalPages, currentPage, setCurrentPage } = useUser();

  const User = (props: UserProps) => {
    const curUser = props.user;
    return (
      <div className="user">
        {curUser.photo ===
        'https://frontend-test-assignment-api.abz.agency/images/placeholders/placeholder.png' ? (
          <img src={photoCover} alt="profile-avatar" className="user-photo" />
        ) : (
          <img
            src={curUser.photo}
            alt="profile-avatar"
            className="user-photo"
          />
        )}

        <div className="user-name">
          <p>{curUser.name}</p>
        </div>
        <div className="user-info">
          <p>{curUser.position}</p>
          <p>{curUser.email}</p>
          <p>{curUser.phone}</p>
        </div>
      </div>
    );
  };

  return (
    <section className="users-list-container">
      <h1 className="users-list-title">Working with GET request</h1>
      <div className="users-list">
        {users.map((el, i) => {
          return <User user={el} key={i} />;
        })}
      </div>
      <button
        className="btn"
        onClick={() => {
          if (currentPage < totalPages) {
            setCurrentPage(prev => (prev += 1));
          }
        }}>
        Show more
      </button>
    </section>
  );
};
