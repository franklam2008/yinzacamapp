import React from "react";
export default function User({ user, updateSelectUser }) {
  return (
    <div className="userCon" onClick={() => updateSelectUser(user)}>
      <img src={user.avatar_url} alt="" className="userAvatarIcon" />
      <p className="userLogin" >{user.login}</p>
    </div>
  );
}
