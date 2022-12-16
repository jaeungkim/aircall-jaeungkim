import React from "react";
import ReactDOM from "react-dom/client";

import Header from "./Header.jsx";
import ActivityFeed from "./components/ActivityFeed/ActivityFeed.jsx";

const App = () => {
  return (
    <div className="container">
      <Header />
      <div className="call-log">
        <ActivityFeed />
      </div>
      {/* <ActivityFeed /> */}
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("app")).render(<App />);

export default App;
