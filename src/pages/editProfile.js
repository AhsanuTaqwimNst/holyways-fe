import React, { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import "../components/assets/css/editProfile.css";
import { API } from "../config/api";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router";
import { useQuery } from "react-query";

function EditProfile() {
  let navigate = useNavigate();
  const [state] = useContext(UserContext);
  const id = state.user.id;
  const [preview, setPreview] = useState(null);

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    phone: "",
    image: "",
  });

  const { data: profile } = useQuery("editProfileCache", async () => {
    const response = await API.get(`/user/${id}`);
    console.log(response);
    return response.data.data;
  });
  useEffect(() => {
    if (profile) {
      setForm({
        ...form,
        fullname: profile.fullname,
        email: profile.email,
        phone: profile.phone,
        image: profile.image,
      });
    }
  }, [profile]);

  // this preview
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files[0] : e.target.value,
    });

    if (e.target.type === "file") {
      const url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // Store data with FormData as object
      const formData = new FormData();
      if (preview) {
        formData.set("image", form?.image, form?.image.name);
      }
      formData.set("fullname", form.fullname);
      formData.set("email", form.email);
      formData.set("phone", form.phone);

      // Insert product data
      const response = await API.patch("/user/" + profile.id, formData);

      console.log("ini data updated user", response.data);

      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5 p-5 ">
      <h1>Edit Profile</h1>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <div style={{ width: "50%" }}>
          <Form.Group className="mb-3" controlId="formBasicFullName">
            <Form.Control
              type="text"
              name="fullname"
              onChange={handleChange}
              Value={form?.fullname}
              placeholder="FullName"
              autoFocus
            />
          </Form.Group>
        </div>
        <div style={{ width: "50%" }}>
          <Form.Group className="mb-3 " controlId="formBasicEmail">
            <Form.Control
              type="email"
              name="email"
              value={form?.email}
              onChange={handleChange}
              placeholder="Email"
            />
          </Form.Group>
        </div>
        <div style={{ width: "50%" }}>
          <Form.Group className="mb-3 " controlId="formBasicPhone">
            <Form.Control
              type="number"
              name="phone"
              value={form?.phone}
              onChange={handleChange}
              placeholder="Phone"
            />
          </Form.Group>
        </div>
        <input
          type="file"
          name="image"
          onChange={handleChange}
          id="upload"
          hidden
        ></input>
        <label for="upload" className=" btn btn-info mt-3 ">
          Attache File
        </label>
        {preview && (
          <img
            style={{ width: "200px", marginLeft: "40px", marginRight: "40px" }}
            src={preview}
            alt={preview}
          />
        )}
        <div>
          <button
            className="bg-secondary text-white mt-3 border-0"
            type="submit"
          >
            Save
          </button>
        </div>
      </Form>
    </div>
  );
}

export default EditProfile;
