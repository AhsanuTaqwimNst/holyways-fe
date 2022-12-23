import "../App.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { API } from "../config/api";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
function MakeRaiseFund() {
  const [fund, setFund] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  const [state] = useContext(UserContext);
  const [photoProduct, setPhotoAttache] = useState();
  const [preview, setPreview] = useState(null);

  let navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    image: "",
    goal: 0,
    description: "",
    user_id: state.user.id,
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
      setPhotoAttache();
    }
    console.log("ini datanya", form);
  };
  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.set("image", form.image[0], form.image[0].name);
      formData.set("title", form.title);
      formData.set("goal", form.goal);
      formData.set("description", form.description);
      formData.set("user_id", form.user_id);

      const data = await API.post("/fund", formData, {});// ke db

      navigate("/");

      // console.log("ini insert product", data);
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div>
      <div className="pt-5 ">
        <div className="container ml-lg-5 mb-2 row  justify-content-end">
          <div className="container ml-lg-5">
            <div className="container col-lg-12 ">
              <h2 className="font-weight-bold"> Make Raise Fund</h2>
            </div>
          </div>
        </div>

        <div className="col-lg-12  row  justify-content-center ">
          <form className="col-lg-8" onSubmit={(e) => handleSubmit.mutate(e)}>
            <input
              type="text"
              name="title"
              onChange={handleChange}
              className="form-control mb-2"
              placeholder="Title"
              autoFocus
            />
            <div className="col-12 mb-3">
              <input
                type="file"
                name="image"
                onChange={handleChange}
                id="upload"
                hidden
              ></input>
              <label for="upload" className=" btn btn-danger mt-3 ">
                Attache Thumbnail
              </label>
              {preview && (
                <img
                  style={{
                    width: "200px",
                    marginLeft: "40px",
                    marginRight: "40px",
                  }}
                  src={preview}
                  alt={preview}
                />
              )}
            </div>
            <input
              type="number"
              name="goal"
              onChange={handleChange}
              className="form-control mb-4"
              placeholder="Goals Donation"
            />
            <textarea
              className="form-control mb-2"
              name="description"
              onChange={handleChange}
              rows="8"
              placeholder="Description"
              style={{ resize: "none" }}
            ></textarea>
            <div className="row justify-content-end">
              <button
                type="submit"
                className="btn btn-danger pl-3 pr-3 mr-3 col-3 mt-4"
              >
                Public Fundraising
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default MakeRaiseFund;
