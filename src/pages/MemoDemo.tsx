import React, { useState, memo } from 'react';

// 此处如果加上memo,新增users的时候则其他UserItem组件不会render，
// 此处如果不加memo,只要新增一个user，则所有的UserItem都会render，全部重新遍历;
// 最小粒度的组件
const UserItem = memo(function UserItem({ user }: any) {
  console.log('UserItem is rendering');
  return (
    <div>
      <img style={{width: '60px', height: '60px'}} src={user.avatarUrl} alt={user.name} />
      <h3>{user.name}</h3>
    </div>
  );
});

const UsersList = ({ users }: any) => {
  return (
    <div>
      {users.map((user: { id: any; }) => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  );
};

function MemoDemo() {
  const [users, setUsers] = useState([
    { id: 1, name: 'Alice', avatarUrl: 'https://cdn.jsdelivr.net/gh/maoyln/maoyl-img/blog/5341723271107_.pic.jpg' },
    { id: 2, name: 'Bob', avatarUrl: 'https://cdn.jsdelivr.net/gh/maoyln/maoyl-img/blog/5341723271107_.pic.jpg' },
    { id: 3, name: 'Charlie', avatarUrl: 'https://cdn.jsdelivr.net/gh/maoyln/maoyl-img/blog/5341723271107_.pic.jpg' },
  ]);

  const addNewUser = () => {
    const newUser = { id: Date.now(), name: 'New User', avatarUrl: 'https://cdn.jsdelivr.net/gh/maoyln/maoyl-img/blog/5341723271107_.pic.jpg' };
    setUsers([...users, newUser]);
  };

  return (
    <div>
      <button onClick={addNewUser}>Add New User</button>
      <UsersList users={users} />
    </div>
  );
}

export default MemoDemo;
