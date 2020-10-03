import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { uuid } from 'uuidv4';
import "./App.css";
import yinzcamLogo from "./images/yinzcamLogo.png";
import yinzcamIcon from "./images/yinzcamIcon.png";
import User from "./User.jsx";
function App() {
  const searchInput = useRef();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const url = `https://api.github.com/users?since=${pageNumber}`;

  useEffect(() => {
    axios.get(url).then((response) => {
      setUsers((users) => [...users, ...response.data]);
      setFilteredUsers(response.data);
      console.log(response.data);
    });
  }, [url]);
  return (
    <main className="App">
      <header className="AppHeader">
        <section className="appLogoCon">
          <img
            src={yinzcamIcon}
            alt="Yinzcam Icon"
            className="yinzcamIcon App-Icon"
          />
          <img src={yinzcamLogo} alt="Yinzcam Logo" className="yinzcamLogo " />
        </section>
      </header>
      <section className="mainCon">
        <div className="searchBar">
          <input
            type="text"
            placeholder="Search by name"
            className="searchBarInput"
            ref={searchInput}
            onChange={handleInput}
          />
        </div>

        <section className="usersCon">
          {users.map((user) => (
            <User user={user} key={uuid()} />
          ))}
          <button onClick={test}>test</button>
        </section>
      </section>
    </main>
  );

  function handleInput(e) {
    // setSearch(true);
    filterChamps(e.target.value);
  }
  function filterChamps(value) {
    console.log(value);
    const filteredUsers = Object.keys(users)
      .filter((key) => key.toLowerCase().indexOf(value.toLowerCase()) !== -1)
      //combine
      .reduce((obj, key) => {
        obj[key] = users[key];
        return obj;
      }, {});
    setFilteredUsers(filteredUsers);
  }
  function test() {
    console.log("test");
    setPageNumber(pageNumber + 1);
  }
}

export default App;
