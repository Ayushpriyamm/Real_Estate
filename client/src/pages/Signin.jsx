import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { OAuth } from "../components/oAuth";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../redux/user/userSlice";

const Signin = () => {
  const [formData, setFormData] = useState({});

  //redux store
  const { error, loading } = useSelector((state) => state.user);

  const navigate = useNavigate();

  //dispatch is a function provided by Redux that is used to dispatch actions to the Redux store.
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      //spred operator to save the current data of input feild
      ...formData,

      [e.target.id]: e.target.value,
    });
  };

  //defining behavior of submit button
  const handleSubmit = async (e) => {
    //to prevent refreshing the page on clicking submit function
    e.preventDefault();

    try {
      dispatch(signInStart());

      //fetching data from the form using proxy url
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      //<<<<ab yaha p aate hi request process ho chuki h>>>>

      //changing strigify data again into json
      const data = await res.json();

      console.log(data);

      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }

      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div>
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-semibold my-7">Signin</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="email"
            className="border p-3 rounded-lg"
            id="email"
            onChange={handleChange}
          />

          <input
            type="password"
            placeholder="password"
            className="border p-3 rounded-lg"
            id="password"
            onChange={handleChange}
          />

          <button
            disabled={loading}
            className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Loading ...." : "Sign In"}
          </button>
          <OAuth />
        </form>

        <div className="flex gap-2 mt-5">
          <p>Dont have an account?</p>
          <Link to={"/sign-up"}>
            <span className="text-blue-700">sign up</span>
          </Link>
        </div>
        {error && <p className="text-red-500 mt-5">{error}</p>}
      </div>
    </div>
  );
};

export default Signin;
