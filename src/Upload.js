import React, { useState, useContext } from "react";
import "./App.css";
import app, { storage } from "./Firebase/config";
import { AuthContext } from "./Firebase/context";
import { Redirect } from "react-router-dom";

function Upload() {
  const [image, setImage] = useState(null);
  const { user } = useContext(AuthContext);

  const onImageChange = (e) => {
    const reader = new FileReader();
    let file = e.target.files[0];
    if (file) {
      reader.onload = () => {
        if (reader.readyState === 2) {
          console.log(file);
          setImage(file);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setImage(null);
    }
  };

  const uploadToFirebase = () => {
    if (image) {
      const storageRef = storage.ref(user.email);
      const imageRef = storageRef.child(image.name);
      imageRef.put(image).then(() => {
        alert("Image uploaded successfully to Firebase.");
      });
    } else {
      alert("Please upload an image first.");
    }
  };
  return (
    <div>
      {!user ? (
        <Redirect to={{ pathname: "/" }} />
      ) : (
        <header className="App-header">
          <p>Upload a Photo</p>
          <input
            type="file"
            accept="image/x-png,image/jpeg"
            onChange={(e) => {
              onImageChange(e);
            }}
          />
          <button onClick={() => uploadToFirebase()}>Upload to Firebase</button>
          <div>
            <button onClick={() => app.auth().signOut()}>Sign Out</button>
          </div>
        </header>
      )}
    </div>
  );
}

export default Upload;
