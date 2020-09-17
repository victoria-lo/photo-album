import React, { useContext } from "react";
import "./App.css";
import { AuthContext } from "./Firebase/context";
import { FirebaseAuth } from "react-firebaseui";
import { Redirect } from "react-router-dom";
import firebase from "firebase";

function Home() {
  const { user } = useContext(AuthContext);

  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    credentialHelper: "none",
    callbacks: {
      signInSuccessWithAuthResult: () => false,
    },
  };
  return (
    <header className="App-header">
      {!!user ? (
        <Redirect to={{ pathname: "/photo-album/upload" }} />
      ) : (
        <div>
          <h4
            style={{
              marginBottom: "2rem",
            }}
          >
            Please Sign In.
          </h4>

          <FirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </div>
      )}
    </header>
  );
}

export default Home;
