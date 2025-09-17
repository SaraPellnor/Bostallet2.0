"use client";
import { useUserContext } from "../../context/UserContext";
import { handleLogIn } from "../../functions/functions";
import { FaEye, FaEyeSlash  } from "react-icons/fa";
import { useState } from "react";

const LoginForm = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    message,
    setMessage,
    setUser,
    setAdmin,
  } = useUserContext();
  
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Stoppa standardformuläret från att skicka GET-request

    // Trigga vibration direkt vid klick på logga in (user gesture)
    if (navigator.vibrate) navigator.vibrate(20); // kort vibration som feedback

    handleLogIn(email.toLowerCase(), password, setMessage, setUser, setAdmin);
  };

  return (
    <div className="z-40 px-14 mx-auto w-full">
      <form
        className="text-[20px] flex flex-col justify-around gap-2"
        onSubmit={handleSubmit}
      >
        <input
          className="px-10 py-3 rounded-full"
          placeholder="e-post"
          type="email"
          value={email}
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="relative w-full">
          <input
            className="px-10 py-3 rounded-full w-full pr-12"
            placeholder="lösenord"
            type={showPassword ? "text" : "password"}
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
            tabIndex={-1}
          >
            {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
          </button>
        </div>

        <button
          type="submit"
          className="shadow-md shadow-black mt-2 transition duration-500 ease-out text-black bg-yellow_1 py-3 px-10 rounded-full hover:scale-105"
        >
          Logga in
        </button>

        {message && (
          <p className="bg-black bg-opacity-50 text-center text-red-500">{message}</p>
        )}
      </form>
    </div>
  );
};

export default LoginForm;
