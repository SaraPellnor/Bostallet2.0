"use client";
import { useUserContext } from "../../context/UserContext";
import { handleLogIn } from "../../functions/functions";

const Login = () => {
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
    <div className="pb-32 p-5 w-full m-auto">
      <form
        className="flex flex-col justify-around gap-4"
        onSubmit={handleSubmit}
      >
        <input
          className="px-10 py-4"
          placeholder="e-post"
          type="email"
          value={email}
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="px-10 py-4"
          placeholder="lösenord"
          type="password"
          value={password}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="transition duration-500 ease-out text-font font-bold gradiantBg py-4 px-10 rounded-md hover:scale-105"
        >
          Verifiera dig
        </button>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </form>
    </div>
  );
};

export default Login;
