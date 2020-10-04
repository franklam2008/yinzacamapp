import React from "react";
export default function Follower({ follower }) {
  return (
    <div className="followerCon" >
      <img src={follower.avatar_url} alt="" />
      <p className="followerLogin" >{follower.login}</p>
    </div>
  );
}
