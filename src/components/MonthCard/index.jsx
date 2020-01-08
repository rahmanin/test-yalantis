import React from "react";

const MonthCard = ({
  month,
  additionalClass,
  onOpenUsers,
  hideUsers
}) => (
  <div
    className={`month-card ${additionalClass}`}
    onMouseEnter={onOpenUsers}
    onMouseLeave={hideUsers}
  >
    {month}
  </div>
);

export default MonthCard;
