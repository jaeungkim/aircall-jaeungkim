import React, { useEffect, useState } from "react";
import axios, { isCancel } from "axios";
import "./ActivityFeed.scss";
import Header from "../../Header.jsx";
import ActivityDetail from "../ActivityDetail/ActivityDetail.jsx";

export default function ActivityFeed() {
  // const [allCalls, setAllCalls] = useState([]);
  const [activeCalls, setActiveCalls] = useState([]);
  const [archivedCalls, setArchivedCalls] = useState([]);
  //initially set call state with all calls
  const [callState, setCallState] = useState(true);
  const [initLoading, setInitLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  //HANDLER FOR ARCHIVING INDIVIDUAL CALL
  const handleArchiveClick = (callID) => {
    setLoading(true);
    axios({
      method: "patch",
      url: `https://charming-bat-singlet.cyclic.app/https://cerulean-marlin-wig.cyclic.app/activities/${callID}`,
      data: { is_archived: true },
    })
      .then((response) => {
        const selectedCallIndex = activeCalls.findIndex(
          (activeCall) => activeCall.id === callID
        );
        let selectedCall = activeCalls[selectedCallIndex];

        //UPDATE ARCHIVED ARRAY
        setArchivedCalls([...archivedCalls, selectedCall]);

        //UPDATE ACTIVE ARRAY
        const newArray = activeCalls.filter((filteredActiveCalls) => {
          return filteredActiveCalls.id !== callID;
        });
        setActiveCalls([...newArray]);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  //HANDLER FOR UNARCHIVING INDIVIDUAL CALL
  const handleUnarchiveClick = (callID) => {
    setLoading(true);
    axios({
      method: "patch",
      url: `https://charming-bat-singlet.cyclic.app/https://cerulean-marlin-wig.cyclic.app/activities/${callID}`,
      data: { is_archived: false },
    })
      .then((response) => {
        const selectedCallIndex = archivedCalls.findIndex(
          (archivedCall) => archivedCall.id === callID
        );
        let selectedCall = archivedCalls[selectedCallIndex];
        //UPDATE ARCHIVED ARRAY
        setActiveCalls([...activeCalls, selectedCall]);

        //UPDATE ACTIVE ARRAY
        const newArray = archivedCalls.filter((filteredArchivedCalls) => {
          return filteredArchivedCalls.id !== callID;
        });
        setArchivedCalls([...newArray]);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  //GET ALL CALLS FROM GIVEN API
  useEffect(() => {
    setInitLoading(true);
    axios({
      method: "get",
      url: `https://charming-bat-singlet.cyclic.app/https://cerulean-marlin-wig.cyclic.app/activities`,
    })
      .then((response) => {
        response.data.map((call) => {
          if (call.is_archived === true) {
            const duplicateExists = archivedCalls.find(
              (duplicate) => duplicate.id === call.id
            );
            if (duplicateExists) return;
            setArchivedCalls((archivedCalls) => [...archivedCalls, call]);
          } else {
            const duplicateExists = activeCalls.find(
              (duplicate) => duplicate.id === call.id
            );
            if (duplicateExists) return;
            setActiveCalls((activeCalls) => [...activeCalls, call]);
          }
        });
        setInitLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setInitLoading(false);
      });
  }, []);

  return (
    <div>
      <div className="activityTabs d-flex flex-row">
        <Header />
        <ul
          className="activityTabs__tab-div nav nav-tabs"
          id="nav-tab"
          role="tablist"
        >
          <li className="activityTabs__tab nav-item">
            <button
              className="nav-link"
              id="nav-activeCalls-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-activeCalls"
              type="button"
              role="tab"
              aria-controls="nav-activeCalls"
              aria-selected="true"
              onClick={() => {
                setCallState(true);
              }}
            >
              All Calls
            </button>
          </li>
          <li className="activityTabs__tab nav-item">
            <button
              className="nav-link"
              id="nav-archivedCalls-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-archivedCalls"
              type="button"
              role="tab"
              aria-controls="nav-archivedCalls"
              aria-selected="false"
              onClick={() => {
                setCallState(false);
              }}
            >
              Archived Calls
            </button>
          </li>
        </ul>
      </div>
      {!initLoading ? (
        callState ? (
          activeCalls.map((activeCall, index) => {
            return loading ? (
              <span key={index} className="content-loader"></span>
            ) : (
              <ActivityDetail
                key={index}
                calls={activeCall}
                onClick={() => handleArchiveClick(activeCall.id)}
              />
            );
          })
        ) : (
          archivedCalls.map((archivedCall, index) => {
            return loading ? (
              <span key={index} className="content-loader"></span>
            ) : (
              <ActivityDetail
                key={index}
                calls={archivedCall}
                onClick={() => handleUnarchiveClick(archivedCall.id)}
              />
            );
          })
        )
      ) : (
        <div className="loader-wrapper">
          <span className="loader"></span>
        </div>
      )}
    </div>
  );
}
