"use client";
import { useUserContext } from "../../context/UserContext";
import { handleLogIn } from "../../functions/functions";

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

  const handleSubmit = async (e) => {
    e.preventDefault(); // Stoppa standardformuläret från att skicka GET-request
    handleLogIn(email, password, setMessage, setUser, setAdmin); // Din funktion som redan funkar
  };

  return (
    <div className="z-30 px-14 mx-auto w-full">
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
        <input
          className="px-10 py-3 rounded-full"
          placeholder="lösenord"
          type="password"
          value={password}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="mt-2 transition duration-500 ease-out text-black bg-yellow_1 py-3 px-10 rounded-full hover:scale-105"
        >
          Logga in
        </button>
        {message && <p className="bg-black bg-opacity-50 text-center text-red-500">{message}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
