import { useContext } from 'react';
import { SocketContext } from '../context/socketContext';

const UserList = () => {
  const { users, typingUsers } = useContext(SocketContext);

  return (
    <div className="user-list">
      <h4>Online Users</h4>
      {users.map((user) => (
        <div key={user.id}>
          {user.username} {typingUsers.includes(user.username) && '🖋 typing...'}
        </div>
      ))}
    </div>
  );
};

export default UserList;
