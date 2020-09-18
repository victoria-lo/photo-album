import React, { useState, useContext, useEffect } from "react";
import "./App.css";
import app, { storage } from "./Firebase/config";
import { AuthContext } from "./Firebase/context";
import { Redirect } from "react-router-dom";

function Upload() {
  const [image, setImage] = useState(null);
  const [allImages, setImages] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getFromFirebase();
  }, []);
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
        storage
          .ref(user.email)
          .child(image.name)
          .getDownloadURL()

          .then((url) => {
            if (allImages.indexOf(url) < 0) {
              setImages((allImages) => [...allImages, url]);
            }
            console.log(allImages);
            alert("Image uploaded successfully to Firebase.");
          });
      });
    } else {
      alert("Please upload an image first.");
    }
  };

  const getFromFirebase = () => {
    let storageRef = storage.ref(user.email);
    console.log(allImages);
    storageRef
      .listAll()
      .then(function (res) {
        res.items.forEach((imageRef) => {
          imageRef.getDownloadURL().then((url) => {
            if (allImages.indexOf(url) === -1) {
              setImages((allImages) => [...allImages, url]);
            }
          });
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const deleteFromFirebase = (url) => {
    let pictureRef = storage.refFromURL(url);
    pictureRef
      .delete()
      .then(() => {
        setImages(allImages.filter((image) => image !== url));
        alert("Picture is deleted successfully!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {!user ? (
        <Redirect to={{ pathname: "/photo-album/" }} />
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
          <button onClick={() => getFromFirebase()}>
            Get Images from Firebase
          </button>
          <button onClick={() => app.auth().signOut()}>Sign Out</button>
          <div id="photos">
            {allImages.map((image) => {
              return (
                <div key={image} className="image">
                  <img src={image} alt="" />
                  <button onClick={() => deleteFromFirebase(image)}>
                    Delete
                  </button>
                </div>
              );
            })}
          </div>
        </header>
      )}
    </div>
  );
}

export default Upload;
