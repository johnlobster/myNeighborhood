import React, { Component } from "react";
import "./style.scss";

require('dotenv').config();

class Photos extends Component {

  state = {
    username: "",
    photo: "",
    firstName: "Diego",
    url: ""
  };
  showWidget = () => {
    console.log(process.env.REACT_APP_CLOUDINARY_CLOUD_NAME)
    console.log("env", process.env)
    let widget = window.cloudinary.createUploadWidget(
      {
        cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
        uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET,

        sources: ["local", "camera"]
      },
      (error, result) => {
        if (result.event === "success") {

          const file = result.info.url;
          console.log(file);
          // axios call to the api/route that update the user document  (id and pass the photo url )
          this.setState({ photo: file, url: file });
        }
      }
    );
    widget.open();
  };

  render() {
    const photoShown = this.state.photo;
    let imgDisplay;

    if (photoShown) {
      imgDisplay= <img className='photo-img' src={photoShown}/>
    }
    else {
    };
    return (
      <div className="photo-container">
          <h1>Photo</h1>
        <div className="photo-wrapper">
        <div className="photo-box">
          <p>Name: {this.state.firstName} </p>
          <button id="photoButton" onClick={this.showWidget}>Upload picture</button>
          <br />
          {imgDisplay}
          
          <br />
          
        </div>
        <a href={this.state.url}>This is the image URL: {this.state.url}</a>
</div>
      </div>
    );
  }
}
export default Photos;