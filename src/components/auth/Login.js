import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseurl } from "../shared/baseUrl";
import Swal from "sweetalert2";

export default function Login() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: "",
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

        const apiData = {
            email: formData.email,
            password: formData.password,
        };
        try {
            fetch(`${baseurl}/admin/login`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(apiData)
            }).then(async (res) => {
                if (res.status === 200) {
                    const reply = await res.json()
                    console.log("reply", reply.data)
                    localStorage.setItem("adminData", JSON.stringify(reply.data));
                    navigate("/dashboard")
                }
                else {
                    Swal.fire({
                        title: "Error",
                        text: "Incorrect email or password!",
                        icon: "error"
                    });
                }
            })
        } catch (error) {
            // // console.error("Error:", error);
            // Handle error cases
        }
    };
    return (
        <section className=" ">
            <div className="flex flex-row items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-1/3 mr-16 ">
                    <img
                        src="/login.jpg"
                        className="w-full"
                        alt="Phone image"
                    />
                </div>
                <div className="w-full h-4/4  bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black text-center">
                            Sign in
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label
                                    for="Email"
                                    className="block mb-2 text-md font-medium text-gray-900 dark:text-black"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="border border-gray-300 text-gray-900 text-lg sm:text-md rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="abc@gmail.com"
                                    required=""
                                    value={formData.email}
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
                                Sign in
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}