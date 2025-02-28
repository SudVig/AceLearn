import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function RegistrationForm() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phno: "",
    password: "",
    dob: "",
    gender: "",
    location: "",
    profession: "",
    linkedin_url: "",
    github_url: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/users/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.status === 200) {
        navigate("/login");
      } else {
        const data = await response.json();
        setError(data.error);
      }
    } catch (error) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      <Navbar />
      <div className="bg-white shadow-md rounded-lg p-8 mt-6 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">User Registration</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: "Name", name: "username", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Phone No", name: "phno", type: "tel" },
            { label: "Password", name: "password", type: "password" },
            { label: "Date of Birth", name: "dob", type: "text" },
            { label: "Gender", name: "gender", type: "text" },
            { label: "Location", name: "location", type: "text" },
            { label: "Profession", name: "profession", type: "text" },
            { label: "LinkedIn URL", name: "linkedin_url", type: "text" },
            { label: "GitHub URL", name: "github_url", type: "text" },
          ].map(({ label, name, type }) => (
            <div key={name}>
              <label className="block text-gray-700 font-medium">{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
              />
            </div>
          ))}
          {error && <span className="text-red-500 text-sm">{error}</span>}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
          >
            Register
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default RegistrationForm;
