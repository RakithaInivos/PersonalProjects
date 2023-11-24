import React, { useState, useEffect } from "react";
import "../customStyles.css";
import appImage from "../assets/profile-image.jpg";

function Profile(props) {
  const userData = JSON.parse(localStorage.getItem("userdata"));

  const token = userData.token;
  const userId = userData.userId;
  const [profileData, setprofileData] = useState([]);

  const url = `/api/v1/UserProfile/${userId}`;

  useEffect(() => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((resData) => {
        setprofileData(resData.userData);
      })
      .catch((error) => {
        window.location.href = "/UserProfile";
      });
  }, []);

  return (
    <>
      <div>
        <div style={{ marginLeft: "20%" }}>
          <section class="content">
            <div class="container-fluid">
              <div class="row">
                <div class="col-4" style={{ marginTop: "3vh" }}>
                  <div class="card card-primary card-outline">
                    <div class="card-body box-profile">
                      <div class="text-center">
                        <img
                          src={appImage}
                          alt="AdminLTE Logo"
                          className="brand-image img-circle elevation-3"
                          style={{ opacity: 0.8 }}
                        />
                      </div>

                      <h3 class="profile-username text-center">
                        {profileData.username}
                      </h3>

                      <p class="text-muted text-center">Software Engineer</p>
                      {/* 
                                <ul class="list-group list-group-unbordered mb-3">
                                <li class="list-group-item">
                                    <b>Followers</b> <a class="float-right">1,322</a>
                                </li>
                                <li class="list-group-item">
                                    <b>Following</b> <a class="float-right">543</a>
                                </li>
                                <li class="list-group-item">
                                    <b>Friends</b> <a class="float-right">13,287</a>
                                </li>
                                </ul>

                                <a href="#" class="btn btn-primary btn-block"><b>Follow</b></a> */}
                    </div>
                  </div>
                </div>

                <div class="col-8">
                  <div class="tab-pane" id="settings">
                  <div class="card-body">
                    {/* <form class="form-horizontal" style={{padding: '20px',backgroundColor:'#f8f9fa',border:'1px solid #ced4da',borderRadius:'5px'}}>
                      <div class="form-group row">
                        <label for="inputName" class="col-2 col-form-label">
                          Full Name
                        </label>
                        <div class="col-sm-10">{profileData.fullName}</div>
                      </div>
                      <div class="form-group row">
                        <label for="inputEmail" class="col-2 col-form-label">
                          Email
                        </label>
                        <div class="col-sm-10">
                          <div class="col-sm-10">{profileData.email}</div>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="inputName2" class="col-2 col-form-label">
                          Contact number
                        </label>
                        <div class="col-sm-10">{profileData.contactNumber}</div>
                      </div>

                      <div class="form-group row">
                        <label
                          for="inputSkills"
                          class="col-sm-2 col-form-label"
                        >
                          Address
                        </label>
                        <div class="col-sm-10">{profileData.address}</div>
                      </div>
                    </form> */}
                    <strong>
                      <i class="fas fa-book mr-1" ></i>
                       <p style={{fontSize:'3vh'}}>Full Name</p>
                    </strong>

                    <p class="text-muted">{profileData.fullName}</p>

                    <hr />

                    <strong>
                      <i class="fas fa-map-marker-alt mr-1"></i>
                      <p style={{fontSize:'3vh'}}>Email</p> 
                    </strong>

                    <p class="text-muted">{profileData.email}</p>

                    <hr />

                    <strong>
                      <i class="fas fa-pencil-alt mr-1"></i>
                      <p style={{fontSize:'3vh'}}>Contact number</p> 
                    </strong>

                    <p class="text-muted">{profileData.contactNumber}</p>

                    <hr />

                    <strong>
                      <i class="far fa-file-alt mr-1"></i>
                      <p style={{fontSize:'3vh'}}>Address</p>
                       
                    </strong>

                    <p class="text-muted">{profileData.address}</p>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </section>
         
        </div>
      </div>
    </>
  );
}
export default Profile;
