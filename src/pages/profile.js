import Vespa from "../components/assets/vespa.png";
import "../components/assets/css/navbar.css";
import Icon from "../components/assets/holywaysicon.png";
import Finish from "../components/assets/Finsihed.png";
import "../components/assets/css/profile.css";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { API } from "../config/api";
import { useQuery } from "react-query";

function Profile() {
  const navigate = useNavigate();
  const convertRupiah = require("rupiah-format");
  const [state] = useContext(UserContext);
  const [isLoading, setisLoading] = useState(false);
  const id = state.user.id;
  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  const { data: profile } = useQuery("profileCache", async () => {
    const response = await API.get(`/user/${id}`);
    return response.data.data;
  });

  const { data: transaction } = useQuery("transactionCache", async () => {
    const response = await API.get(`/transaction/${state.user.id}`);
    console.log(response.data.data); // nmplin mlalui map
    return response.data.data;
  });


  return (
    <div className="container">
      {isLoading ? (
        <></>
      ) : (
        <>
          <div className="row">
            <div className="justify-content-start ml-5 mr-5 mt-5 col-lg-6">
              <h3>My Profile</h3>
              <div className="d-md-flex">
                <div className="justify-content-start">
                  <img
                    width={250}
                    style={{ borderRadius: "15px" }}
                    src={profile?.image ? profile?.image : "-"}
                  />
                </div>
                <div className="justify-content-end ml-3">
                  <div className="mb-3">
                    <h5 className="subtitle-edit text-danger">FullName</h5>
                    <span className="isiProfile-edit">
                      {profile?.fullname ? profile?.fullname : "-"}
                    </span>
                  </div>
                  <div className="mb-3">
                    <h5 className="subtitle-edit text-danger">Email</h5>
                    <span className="isiProfile-edit">
                      {profile?.email ? profile?.email : "-"}
                    </span>
                  </div>
                  <div>
                    <h1 className="subtitle-edit text-danger">Phone</h1>
                    <span className="isiProfile-edit">
                      {profile?.phone ? profile?.phone : "-"}
                    </span>
                  </div>

                  <button
                    className="mt-5 border-0 px-5 py-2 bg-secondary text-white"
                    onClick={handleEditProfile}
                  >
                    update profile
                  </button>
                </div>
              </div>
            </div>
            <div className=" mt-5 ml-auto hidenscroll col-lg-4">
              <h3>History Donation</h3>
              <div style={{ overflowY: "scroll", height: "70vh" }}>
                {/* from db to prof*/}
                {transaction?.map((item) => (
                  <div className="row p-3 bg-secondary">
                    <div className="justify-content-start col-lg-8 ">
                      <h5 className="text-white  ">{item?.fund?.title}</h5>
                      <p>
                        <span className="fs-5 mt-3 text-white">
                          {milisToDate(item?.create_at)}
                        </span>
                      </p>
                      <span className="text-white">
                        Total :{convertRupiah.convert(item?.donate_amount)}
                      </span>
                    </div>
                    <div className="justify-content-end col-lg-4">
                      <img src={Icon} alt=""></img>
                      <div className="pr-5">
                        {item?.status === "success" ? (
                          <img src={Finish} alt=""></img>
                        ) : (
                          <h5 className="text-danger mt-2">{item?.status}</h5>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
export default Profile;

function milisToDate(milis) {
  let date = new Date(milis);
  let convertMonth = (month) => {
    switch (month) {
      case 0:
        return "Januari";
      case 1:
        return "Februari";
      case 2:
        return "Maret";
      case 3:
        return "April";
      case 4:
        return "Mei";
      case 5:
        return "Juni";
      case 6:
        return "Juli";
      case 7:
        return "Agustus";
      case 8:
        return "September";
      case 9:
        return "Oktober";
      case 10:
        return "November";
      case 11:
        return "Desember";
      default:
        return "Unknown";
    }
  };

  let dateNumber = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();

  return `${dateNumber} ${convertMonth(date.getMonth())} ${date.getFullYear()}`;
}
