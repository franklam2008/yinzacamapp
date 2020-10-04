import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import uuid from "react-uuid";
import User from "./User.jsx";
import { ImSpinner10 } from "react-icons/im";
import { AiOutlineSearch } from "react-icons/ai";
import "../../css/Users.css";

export default function Users({ updateSelectUser }) {

  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const searchInput = useRef();
  const observer = useRef();

  const lastUserElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !searching) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, searching]
  );

  useEffect(() => {
    const url = `https://api.github.com/users?since=${pageNumber}`;
    setLoading(true);
    axios.get(url).then((response) => {
      setUsers((users) => [...users, ...response.data]);
      setFilteredUsers((users) => [...users, ...response.data]);
      setLoading(false);
    });
  }, [pageNumber]);

  return (
    <section className="mainCon">
      <div className="searchBar">
        <AiOutlineSearch />
        <input
          type="text"
          placeholder="Search by login name"
          className="searchBarInput"
          ref={searchInput}
          onChange={handleInput}
        />
        <button onClick={clearUserSearch}>Clear</button>
      </div>

      <section className="usersCon">
        {filteredUsers.map((user) => (
          <User
            user={user}
            key={uuid()}
            updateSelectUser={updateSelectUser}
          />))}
      </section>

      <div ref={lastUserElementRef} className="spinnerCon" >
        <ImSpinner10 className={loading ? "spinner loading" : "spinner notLoading"} />
        <p>{loading ? "Loading..." : ""}</p>
      </div>
    </section>
  );
  function handleInput(e) {
    setSearching(e.target.value.length > 0 ? true : false)
    filterChamps(e.target.value);
  }

  function filterChamps(value) {
    const filteredUsers = users.filter(
      (user) => user.login.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
    setFilteredUsers(filteredUsers);
  }

  function clearUserSearch() {
    searchInput.current.value = ''
    filterChamps('')
    setSearching(false)
  }

}
