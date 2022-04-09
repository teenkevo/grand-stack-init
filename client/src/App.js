import React from "react";
import { Switch, Route } from "react-router-dom";
import ProtectedRoute from "./auth/protected-route";
import HomePage from "./pages/HomePage/HomePage";
import "./App.css";


function App() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      {/* <ProtectedRoute path="/protected-layout" component={ProtectedLayoutPage} /> */}
    </Switch>
  );
}

export default App;
