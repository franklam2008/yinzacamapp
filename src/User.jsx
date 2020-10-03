import React from "react";
export default function User({ user }) {
  return (
    <div className="userCon">
      <img src={user.avatar_url} alt="" className="userAvatarIcon" />
      <p className="userLogin" >{user.login}</p>
    </div>
  );
}
