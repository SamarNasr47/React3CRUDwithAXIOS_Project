import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import Users from './components/Users.jsx'

export default function App() {
  let [aname, setAname] = useState("");
  let [aemail, setAemail] = useState("");
  let [userIdSelected, setUserIdSelected] = useState("");
  let [updatename, setUpdatename] = useState("");
  let [updateemail, setUpdateemail] = useState("");
  let [users, setUsers] = useState([]);


  async function getUser() {
    const res = await axios.get("http://localhost:5000/users");
    setUsers(res.data);
  }
  async function Add(event) {
    event.preventDefault();
    await axios.post("http://localhost:5000/users", { name: aname, email: aemail });
    getUser();
  }

  async function DeletUser(event, id) {
    event.preventDefault();
    await axios.delete(`http://localhost:5000/users/${id}`);
    getUser();
  }

  function InputId(id) {
    setUserIdSelected(id);
  }
  async function UpdateUser(event, id) {
    event.preventDefault();
    await axios.put(`http://localhost:5000/users/${id}`, { name: updatename, email: updateemail });
    getUser();
  }

  useEffect(() => { getUser(); }, []);

  return (
    <>
      <h1 className='text-emerald-950 text-center text-7xl font-medium my-3'>User Managment System</h1>

      <h2 className="txt">Add User</h2>
      <form className='ml-90 mb-10' onSubmit={(e) => { Add(e) }}>
        <input className='b' type="text" placeholder="name" value={aname} onChange={(e) => { setAname(e.target.value) }} required />
        <input className='b' type="email" placeholder="email" value={aemail} onChange={(e) => { setAemail(e.target.value) }} required />
        <button className='btn bg-emerald-600 border-emerald-900' type='submit'>add</button>
      </form>

      <h2 className="txt">Users</h2>
      <div className="flex flex-wrap">
        {
          users.map((user) => <Users key={user.id} id={user.id} name={user.name} email={user.email} DeletUsers={DeletUser} UserId={InputId} />)
        }
      </div>

      <h2 className="txt">Update User</h2>
      <form className='ml-90 mb-10' onSubmit={(e) => {UpdateUser(e, userIdSelected)}}>
        <input className='b' type="text" placeholder="id" value={userIdSelected} onChange={(e) => 
          { setUserIdSelected(e.target.value) }} required readOnly />
        <input className='b' type="text" placeholder="name" value={updatename} onChange={(e) => 
          {setUpdatename(e.target.value)}} required />
        <input className='b' type="email" placeholder="email" value={updateemail} onChange={(e) => 
          {setUpdateemail(e.target.value)}} required />
        <button className='btn bg-emerald-600 border-emerald-900' type='submit'>Update</button>
      </form>
    </>
  )
}