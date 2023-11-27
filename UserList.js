// src/components/UserList.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectAllUsers, setUsers, selectUser } from '../redux/usersSlice';
import { fetchUsers } from '../api';

const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector(selectAllUsers);

  useEffect(() => {
    const fetchData = async () => {
      const userList = await fetchUsers();
      dispatch(setUsers(userList));
    };

    fetchData();
  }, [dispatch]);

  const handleUserClick = (user) => {
    dispatch(selectUser(user));
    navigate(`/user/${user.id}`);
  };

  return (
    <div>
      <h2>User Directory</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id} onClick={() => handleUserClick(user)}>
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
