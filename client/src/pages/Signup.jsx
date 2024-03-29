import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { OAuth } from "../components/OAuth";

const Signup = () => {
  const [formData, setFormData] = useState({});
  const [Error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      //right now request is being processed so loading dikhega
      setLoading(true);

      //fetching data from the form using proxy url
      const res = await fetch("/api/auth/signup", {
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
        setError(data.message);
        setLoading(false);
        return;
      }

      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div>
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-semibold my-7">Signup</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="username"
            className="border p-3 rounded-lg"
            id="username"
            onChange={handleChange}
          />

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
            {loading ? "Loading ...." : "Sign Up"}
          </button>
          <OAuth />
        </form>

        <div className="flex gap-2 mt-5">
          <p>Have an account?</p>
          <Link to={"/sign-in"}>
            <span className="text-blue-700">sign in</span>
          </Link>
        </div>
        {Error && <p className="text-red-500 mt-5">{Error}</p>}
      </div>
    </div>
  );
};

export default Signup;
