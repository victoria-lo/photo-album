import React from "react";
import "./App.css";
import { AuthProvider } from "./Firebase/context";
import Upload from "./Upload";
import Home from "./Home";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <p>
            Welcome to Photo Album. This is a tutorial for Firebase Cloud
            Storage and Authentication. Still in Progress.
          </p>
          <Switch>
            <Route exact path="/photo-album/upload" component={Upload} />
            <Route exact path="/photo-album/" component={Home} />
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
