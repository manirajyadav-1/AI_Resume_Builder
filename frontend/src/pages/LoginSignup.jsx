import React, { useState } from "react";

const LoginSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Keep me logged in:", keepLoggedIn);
  };

  return (
    <div className="py-[-10px]">
      <div className="container mx-auto flex flex-col pt-12 my-5 rounded-lg">
        <div className="flex justify-center w-full h-full my-auto xl:gap-14 md:gap-5">
          <div className="flex items-center justify-center w-full lg:p-12">
            <div className="flex items-center xl:p-10">
              <form
                onSubmit={handleSubmit}
                className="w-full h-full flex flex-col pb-6 text-center rounded-3xl"
              >
                <h3 className="mb-3 text-4xl font-extrabold text-dark-grey-900">Sign In</h3>
                <p className="mb-4 text-grey-700">Enter your email and password</p>

                {/* Email Field */}
                <label htmlFor="email" className="mb-2 text-sm text-start text-grey-900">
                  Email*
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="mail@loopple.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-4 mb-7 text-sm font-medium border bg-grey-200 text-dark-grey-900 rounded-2xl outline-none focus:bg-grey-400 placeholder:text-grey-700"
                  required
                />

                {/* Password Field */}
                <label htmlFor="password" className="mb-2 text-sm text-start text-grey-900">
                  Password*
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-5 py-4 mb-5 text-sm font-medium bg-grey-200 border text-dark-grey-900 rounded-2xl outline-none focus:bg-grey-400 placeholder:text-grey-700"
                  required
                />

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full px-6 py-5 mb-5 text-sm bg-base-300 font-bold text-white transition duration-300 rounded-2xl hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 bg-purple-blue-500 md:w-96"
                >
                  Sign In
                </button>

                {/* Footer Link */}
                <p className="text-sm text-grey-900 mb-5">
                  Not registered yet?{" "}
                  <a href="#" className="font-bold text-grey-700">
                    Create an Account
                  </a>
                </p>

                {/* Divider */}
                <div className="flex items-center mb-5">
                  <hr className="h-0 border-b border-solid border-grey-500 grow" />
                  <span className="mx-4 text-grey-600">or</span>
                  <hr className="h-0 border-b border-solid border-grey-500 grow" />
                </div>

                {/* Google Sign-In */}
                <button
                  type="button"
                  className="flex items-center justify-center bg-base-300  py-4 mb-2 text-sm font-medium transition duration-300 rounded-2xl text-grey-900 bg-grey-300 hover:bg-grey-400 focus:ring-4 focus:ring-grey-300"
                >
                  <img
                    src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png"
                    alt="Google"
                    className="h-5 mr-2"
                  />
                  Sign in with Google
                </button>

                {/* GitHub Sign-In */}
                <button
                  type="button"
                  className="flex items-center justify-center bg-base-300 py-4 mb- text-sm font-medium transition duration-300 rounded-2xl text-grey-900 bg-grey-300 hover:bg-grey-400 focus:ring-4 focus:ring-grey-300"
                >
                  <img
                    src="https://www.svgrepo.com/show/303615/github-icon-1-logo.svg"
                    alt="GitHub"
                    className="h-5 mr-2 bg-gray-100 rounded-full"
                  />
                  Sign in with GitHub
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
  </div>
  );
};

export default LoginSignup;
