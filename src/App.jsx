import React, { useState } from "react";
import Users from "./component/users/Users.jsx";
import Modal from "./component/modal/Modal.jsx";
import { FaHeart } from "react-icons/fa";

import "./css/App.css";
import yinzcamLogo from "./images/yinzcamLogo.png";
import yinzcamIcon from "./images/yinzcamIcon.png";
function App() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loadingModal, setLoadingModal] = useState(true);

  return (
    <main className="App">
      <Modal
        user={selectedUser}
        showModal={showModal}
        closeModal={closeModal}
        setLoadingModal={setLoadingModal}
        loadingModal={loadingModal}
      />
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
      <Users updateSelectUser={updateSelectUser} />
      <p className="madeWith">
        Made by Frank Lam with <FaHeart /> in Pittsburgh, Pennsylvania
      </p>
    </main>
  );
  function updateSelectUser(user) {
    setSelectedUser(user)
    setShowModal(true)
    if (user !== selectedUser) {
      setLoadingModal(true)
    }
  }
  function closeModal() {
    setShowModal(false)
  }
}

export default App;
