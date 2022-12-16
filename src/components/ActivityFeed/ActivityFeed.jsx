import React, { useEffect, useState } from "react";
import axios, { isCancel } from "axios";
import "./ActivityFeed.scss";
import ActivityDetail from "../ActivityDetail/ActivityDetail.jsx";

export default function ActivityFeed() {
  const [allCalls, setAllCalls] = useState([]);
  const [activeCalls, setActiveCalls] = useState([]);
  const [archivedCalls, setArchivedCalls] = useState([]);
  //initially set call state with all calls
  const [callState, setCallState] = useState(true);

  //GET ALL CALLS FROM GIVEN API
  useEffect(() => {
    axios({
      method: "get",
      url: `https://charming-bat-singlet.cyclic.app/https://cerulean-marlin-wig.cyclic.app/activities`,
    })
      .then((response) => {
        // console.log(response.data);
        response.data.map((call) => {
          setAllCalls((allCalls) => [...allCalls, call]);
          if (call.is_archived === true) {
            setArchivedCalls((archivedCalls) => [...archivedCalls, call]);
          } else {
            setActiveCalls((activeCalls) => [...activeCalls, call]);
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //HANDLER FOR ARCHIVING INDIVIDUAL CALL
  const handleArchiveClick = (callID) => {
    axios({
      method: "patch",
      url: `https://charming-bat-singlet.cyclic.app/https://cerulean-marlin-wig.cyclic.app/activities/${callID}`,
      data: { is_archived: true },
    })
      .then((response) => {
        location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //HANDLER FOR UNARCHIVING INDIVIDUAL CALL
  const handleUnarchiveClick = (callID) => {
    axios({
      method: "patch",
      url: `https://charming-bat-singlet.cyclic.app/https://cerulean-marlin-wig.cyclic.app/activities/${callID}`,
      data: { is_archived: false },
    })
      .then((response) => {
        location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="activityTabs">
        <ul className="activityTabs__tab-div">
          <li className="activityTabs__tab">
            <button
              onClick={() => {
                setCallState(true);
              }}
            >
              All Calls
            </button>
          </li>
          <li className="activityTabs__tab">
            <button
              onClick={() => {
                setCallState(false);
              }}
            >
              Archived Calls
            </button>
          </li>
        </ul>
      </div>
      {callState
        ? activeCalls.map((activeCall, index) => {
            return (
              <ActivityDetail
                key={index}
                calls={activeCall}
                onClick={() => handleArchiveClick(activeCall.id)}
              />
            );
          })
        : archivedCalls.map((archivedCall, index) => {
            return (
              <ActivityDetail
                key={index}
                calls={archivedCall}
                onClick={() => handleUnarchiveClick(archivedCall.id)}
              />
            );
          })}
    </div>
  );
}
