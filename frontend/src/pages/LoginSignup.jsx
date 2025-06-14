import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const LoginSignup = () => {
  const { signup, login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(true);

  const handleSignup = async (e) => {
    e.preventDefault();
    await signup(name, email, password);
    resetForm();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
    resetForm();
    window.location.href = "/";
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="mt-[-120px]">
      <div className="container mx-auto flex flex-col pt-12 my-4 rounded-lg">
        <div className="flex justify-center w-full h-full my-auto xl:gap-14 md:gap-5">
          <div className="flex items-center justify-center w-full lg:p-12">
            <div className="flex items-center xl:p-10">
              <form
                onSubmit={isSignup ? handleSignup : handleLogin}
                className="w-full h-full flex flex-col pb-6 text-center rounded-3xl"
              >
                <h3 className="mb-3 text-4xl font-extrabold text-dark-grey-900">
                  {isSignup ? "Sign Up" : "Sign In"}
                </h3>
                <p className="mb-4 text-grey-700">
                  Enter your email and password
                </p>

                {isSignup && (
                  <>
                    <label
                      htmlFor="name"
                      className="mb-2 text-sm text-start text-grey-900"
                    >
                      Name*
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-5 py-4 mb-4 text-sm font-medium border bg-grey-200 text-dark-grey-900 rounded-2xl outline-none focus:bg-grey-400 placeholder:text-grey-700"
                      required
                    />
                  </>
                )}

                <label
                  htmlFor="email"
                  className="mb-2 text-sm text-start text-grey-900"
                >
                  Email*
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="johndoe@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-4 mb-4 text-sm font-medium border bg-grey-200 text-dark-grey-900 rounded-2xl outline-none focus:bg-grey-400 placeholder:text-grey-700"
                  required
                />

                <label
                  htmlFor="password"
                  className="mb-2 text-sm text-start text-grey-900"
                >
                  Password*
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-5 py-4 mb-6 text-sm font-medium bg-grey-200 border text-dark-grey-900 rounded-2xl outline-none focus:bg-grey-400 placeholder:text-grey-700"
                  required
                />

                <button
                  type="submit"
                  className="w-full px-6 py-5 mb-5 text-sm bg-base-300 font-bold text-white transition duration-300 rounded-2xl hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 bg-purple-blue-500 md:w-96"
                >
                  {isSignup ? "Sign Up" : "Sign In"}
                </button>

                <p className="text-sm text-grey-900 mb-5">
                  {isSignup ? "Already registered?" : "Not registered yet?"}{" "}
                  <span
                    onClick={() => setIsSignup(!isSignup)}
                    className="font-bold text-grey-700 cursor-pointer"
                  >
                    {isSignup ? "Login" : "Create an Account"}
                  </span>
                </p>

                <div className="flex items-center mb-5">
                  <hr className="h-0 border-b border-solid border-grey-500 grow" />
                  <span className="mx-4 text-grey-600">or</span>
                  <hr className="h-0 border-b border-solid border-grey-500 grow" />
                </div>

                <div className="flex gap-8 justify-center">
                  {/* Google OAuth */}
                  <a href="http://localhost:8080/oauth2/authorization/google">
                    <button
                      type="button"
                      className="flex items-center justify-center bg-base-300 p-4 mb-2 text-sm font-medium transition duration-300 rounded-2xl text-grey-900 bg-grey-300 hover:bg-grey-400 focus:ring-4 focus:ring-grey-300"
                    >
                      <img
                        src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png"
                        alt="Google"
                        className="h-5 mr-2"
                      />
                      Google
                    </button>
                  </a>

                  {/* GitHub OAuth */}
                  <a href="http://localhost:8080/oauth2/authorization/github">
                    <button
                      type="button"
                      className="flex items-center justify-center bg-base-300 p-4 mb-2 text-sm font-medium transition duration-300 rounded-2xl text-grey-900 bg-grey-300 hover:bg-grey-400 focus:ring-4 focus:ring-grey-300"
                    >
                      <img
                        src="https://www.svgrepo.com/show/303615/github-icon-1-logo.svg"
                        alt="GitHub"
                        className="h-5 mr-2 bg-gray-300 rounded-full"
                      />
                      GitHub
                    </button>
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
