import React, { useState } from "react";
import "./ActivityDetail.scss";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

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
  const [show, setShow] = useState(false);

  const handlePropsClose = () => {
    props.onClick();
    setShow(false);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="activityDetail">
      <p className="activityDetail__created-at">
        &nbsp;&nbsp;{formatDate(props.calls.created_at)}&nbsp;&nbsp;
      </p>
      <div className="activityDetail__card">
        {props.calls.direction === "inbound" ? (
          <div className="activityDetail__div">
            <div>
              <img
                className="activityDetail__phone-img"
                src={inboundCall}
                alt=""
              />
            </div>
            <div className="mx-2 activityDetail__second-div">
              <p className="activityDetail__call">+ {props.calls.from}</p>
              <p>Tried to call you on</p>
              <p className="activityDetail__call-via ">{props.calls.via}</p>
            </div>
            <div className="d-flex flex-column justify-content-between mr-4">
              <p>Duration: {props.calls.duration}s</p>
              <p>{props.calls.call_type}</p>
            </div>
          </div>
        ) : (
          <div className="activityDetail__div">
            <div>
              <p className="activityDetail__call-from">
                <img
                  className="activityDetail__phone-img"
                  src={outboundCall}
                  alt=""
                />
              </p>
            </div>
            <div className="mx-2 activityDetail__second-div">
              <p className="activityDetail__call">+ {props.calls.to}</p>
              <p>Tried to call you on</p>
              <p className="activityDetail__call-via">{props.calls.via}</p>
            </div>
            <div className="d-flex flex-column justify-content-between mr-4">
              <p>Duration: {props.calls.duration}s</p>
              <p>{props.calls.call_type}</p>
            </div>
          </div>
        )}
        <a className="archive-button" role="button" onClick={handleShow}>
          :
        </a>

        <Modal centered size="sm" show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>
              {props.calls.is_archived
                ? `Unarchive Confirmation`
                : `Archive Confirmation`}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to{" "}
            {props.calls.is_archived ? `unarchive` : `archive`} this call?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handlePropsClose}>
              {props.calls.is_archived ? `Unarchive` : `Archive`}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default ActivityDetail;
