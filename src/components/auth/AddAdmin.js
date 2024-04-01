import React, { useEffect, useState } from "react";
import { baseurl } from "../shared/baseUrl";
import Swal from "sweetalert2";

export default function AddAdmin() {
  const [formData, setFormData] = useState({
    name: '',
    email: "",
    contact: '',
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      console.log("formData", formData)
      fetch(`${baseurl}/admin/add`,
        {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        }).then((res) => {
          if (res.status === 200) {
            Swal.fire({
              title: "Success",
              text: "Admin created successfully!",
              icon: "success"
            });
            setFormData({
              name: '',
              email: "",
              contact: '',
              password: "",
            })
          }
          else {
            Swal.fire({
              title: "Error",
              text: "Something went wrong!",
              icon: "error"
            });
          }
        })
    } catch (error) {
      console.error("Error:", error);
      // Handle error cases
    }
  };
  return (
    <section className=" ">
      <div className="flex flex-row items-center justify-center mx-auto h-full lg:py-0 overflow-scroll">
        <div className="w-1/3 mr-16 ">
          <img
            src="/signup.jpg"
            className="w-full"
            alt="Phone image"
          />
        </div>
        <div className="w-full h-4/4  bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black text-center">
              Add Admin
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-md font-medium text-gray-900 dark:text-black"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="border border-gray-300 text-gray-900 text-lg sm:text-md rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="John"
                  required=""
                  value={formData.name}
                  onChange={handleInputChange}
                />

              </div>
              <div>
                <label
                  for="email"
                  className="block mb-2 text-md font-medium text-gray-900 dark:text-black"
                >
                  email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="border border-gray-300 text-gray-900 text-lg sm:text-md rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="name@company.com"
                  required=""
                  value={formData.email}
                  onChange={handleInputChange}
                />

              </div>

              <div>
                <label
                  htmlFor="contact"
                  className="block mb-2 text-md font-medium text-gray-900 dark:text-black"
                >
                  Contact
                </label>
                <input
                  type="number"
                  name="contact"
                  id="contact"
                  className="border border-gray-300 text-gray-900 text-lg sm:text-md rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="123456789"
                  required=""
                  value={formData.contact}
                  onChange={handleInputChange}
                />

              </div>
              <div>
                <label
                  for="password"
                  className="block mb-2 text-md font-medium text-gray-900 dark:text-black"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="border border-gray-300 text-gray-900 text-lg sm:text-md rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required=""
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>

              <button
                type="submit"
                className="w-full text-white rounded-lg text-md px-5 py-2.5 text-center bg-gray-600 hover:bg-gray-800 hover:text-white"
              >
                Create Admin
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}