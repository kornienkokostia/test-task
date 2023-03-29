import React from 'react';
import './usersList.scss';
import { User } from '../../models/users';
import photoCover from './../../assets/photo-cover.svg';
import { useUser } from '../../hooks/user';

interface UserProps {
  user: User;
}

interface Props {
  users: User[];
  currentPage: number;
  totalPages: number | null;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export const UsersList = (props: Props) => {
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
          <p title={curUser.email}>{curUser.email}</p>
          <p title={curUser.phone}>{curUser.phone}</p>
        </div>
      </div>
    );
  };

  return (
    <section className="users-list-container section" id="users">
      <h1 className="users-list-title">Working with GET request</h1>
      <div className="users-list">
        {props.users.map((el, i) => {
          return <User user={el} key={i} />;
        })}
      </div>
      <button
        className="btn"
        onClick={() => {
          if (props.currentPage < props.totalPages!) {
            props.setCurrentPage(prev => (prev += 1));
          }
        }}>
        Show more
      </button>
    </section>
  );
};
