import React from "react";
export default function Follower({ follower }) {
  return (
    <div className="followerCon">
      <img src={follower.avatar_url} alt="avatar Icon" />
      <p className="followerLogin" >{follower.login}</p>
    </div>
  );
}
