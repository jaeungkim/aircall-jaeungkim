import React from "react";
import "./ActivityDetail.scss";
import outboundCall from "../../assets/outbound-call.png";
import inboundCall from "../../assets/inbound-call.png";

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
        {props.calls.direction === "inbound" ? (
          <div className="d-flex">
            <div>
              <img className="activityDetail__phone-img" src={inboundCall} alt="" />
            </div>
            <div>
              <p className="activityDetail__call-from">{props.calls.from}</p>
              <p className="activityDetail__call-via">Tried to call you on {props.calls.via}</p>
            </div>
            <div>
              <p className="activityDetail__call-from">
                {props.calls.duration}
              </p>
              <p className="activityDetail__call-from">
                {props.calls.call_type}
              </p>
            </div>
          </div>
        ) : (
          <div className="d-flex">
            <div>
              <p className="activityDetail__call-from">
                <img className="activityDetail__phone-img" src={outboundCall} alt="" />
              </p>
            </div>
            <div>
              <p className="activityDetail__call-from">{props.calls.to}</p>
              <p className="activityDetail__call-via">Tried to call you on {props.calls.via}</p>
            </div>
            <div>
              <p className="activityDetail__call-from">
                {props.calls.duration}
              </p>
              <p className="activityDetail__call-from">
                {props.calls.call_type}
              </p>
            </div>
          </div>
        )}

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
