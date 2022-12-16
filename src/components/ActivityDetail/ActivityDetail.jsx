import React from "react";
import axios from "axios";
import "./ActivityDetail.scss";
//Detail component of individual call

const formatDate = (date) => {
  var d = new Date(date),
    month = d.toLocaleString("default", { month: "long" }),
    day = d.getDate(),
    year = d.getFullYear();

  return `${month.toUpperCase()}, ${day} ${year}`;
};

const ActivityDetail = (props) => {
  return (
    <div className="activityDetail">
      <p className="activityDetail__created-at">
        &nbsp;&nbsp;{formatDate(props.calls.created_at)}&nbsp;&nbsp;
      </p>
      <div className="activityDetail__card">
        <p className="activityDetail__call-from">{props.calls.id}</p>
        {props.calls.is_archived ? (
          <button onClick={() => props.onClick()}>unarchive</button>
        ) : (
          <button onClick={() => props.onClick()}>Archive</button>
        )}
      </div>
    </div>
  );
};

export default ActivityDetail;
