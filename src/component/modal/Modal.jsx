import React, { useState, useEffect } from "react";
import axios from "axios";
import uuid from "react-uuid";
import Follower from "./Follower.jsx";
import { ImSpinner10 } from "react-icons/im";
import { CgClose } from "react-icons/cg";
import "../../css/Modal.css";

export default function Modal({ user, showModal, closeModal, loadingModal, setLoadingModal }) {
  // console.log(user);
  const [userData, setUserData] = useState(null);
  const [followers, setFollowers] = useState(null);
  useEffect(() => {
    if (!!user) {
      const requestUser = axios.get(user.url);
      const requestFollowers = axios.get(user.followers_url);
      axios.all([requestUser, requestFollowers]).then(axios.spread((...responses) => {
        setUserData(responses[0].data)
        setFollowers(responses[1].data)
        setLoadingModal(false)
      })).catch(() => {
        closeModal()
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  const modal = document.getElementById('modal');
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target === modal) {
      closeModal()
    }
  }
  return !!userData && !!followers && showModal ? (
    <section id="modal" className="modal" >
      <div className="modalCon">
        <CgClose title="close modal" className="exitBtn" onClick={() => closeModal()} />

        {!loadingModal ?
          <section className="modalSection">
            <div className="userDetail">
              <img src={userData.avatar_url} alt="" className="userAvatarIcon" />
              <h3>{userData.name}</h3>
              <p>Id: {userData.id}</p>
              <p>Followers: {userData.followers}</p>
              <p>Following: {userData.following}</p>
              <p>Login: {userData.login}</p>
              <p>Type: {userData.type}</p>
              {!!userData.location ? <p>location: <span>{userData.location}</span></p> : null}
              {!!userData.company ? <p>Company: {userData.company}</p> : null}
            </div>

            <div className="followersCon">
              <h4>Followers</h4>
              <div className="followers">
                {followers.map(follower => (
                  <Follower key={uuid()} follower={follower} />
                ))}
              </div>
            </div>
          </section> :

          <div className="spinnerCon modalSpinner" >
            <ImSpinner10 className="spinner loading" />
            <p>{"Loading..."}</p>
          </div>
        }
      </div>

    </section>
  ) : <></>;

}
