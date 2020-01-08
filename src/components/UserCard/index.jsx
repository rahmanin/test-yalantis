import React from "react";

const UserCard = ({ user }) => (
    <div className="user-card">
      <span>
        {user.firstName} {user.lastName}
      </span>
    </div>
);

export default UserCard;
