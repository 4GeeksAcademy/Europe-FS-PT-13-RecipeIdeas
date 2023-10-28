import React from "react";
import "../../styles/profile.css";

export const Profile = () => {
  return (
    <div className="profile container-fluid border border-danger">
        <div className="user-data row d-flex justify-content-between border border-danger p-1">

            <div className="avatar col-sm-12 col-md-4 d-flex flex-column justify-content-center text-center border border-success">
                <img
                    className="avatar img-fluid img-thumbnail rounded-circle mx-auto"
                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flistimg.pinclipart.com%2Fpicdir%2Fs%2F351-3519728_png-file-svg-default-profile-picture-free-clipart.png&f=1&nofb=1&ipt=20c41a225bc465c20f51d2a0a087db917768fa1eca77d811c1f1832fdd60def0&ipo=images"
                    alt="Profile Picture"
                />
                <button className="change-picture btn btn-danger my-2 mx-auto p-2">Change profile picture.</button>
            </div>

            <div className="user-info col-sm-12 col-md-8 d-flex flex-column justify-content-center border border-primary">
                <div className="wrapper mx-auto w-50">
                    <h1 className="display-5">Afonso Bernardes</h1>

                    <div className="info-wrapper border border-3 py-4 px-4 d-flex flex-column">

                        <div className="container-fluid d-flex justify-content-between w-100 px-0">
                            <div className="w-50 me-1">
                                <label for="first-name"> First Name</label>
                                <div id="first-name" className="first-name-box border border-2 p-2 w-100">Afonso</div>
                            </div>

                            <div className="w-50 ms-3">
                                <label for="last-name"> Last Name</label>
                                <div id="last-name" className="last-name-box border border-2 p-2 w-100">Bernardes</div>
                            </div>
                        </div>

                        <div className="w-100 mt-2">
                                <label for="email"> Email </label>
                                <div id="email" className="email-box border border-2 p-2">afonso.bernardes@gmail.com</div>
                        </div>

                        <div className="change-info btn btn-danger p-2 mt-3">Change details.</div>
                    </div>

                </div>
                
            </div>
          </div>
    </div>
  );
};
