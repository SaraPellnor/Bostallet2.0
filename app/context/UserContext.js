"use client"; // Behövs eftersom Context hanterar state
import { createContext, useContext, useState, useEffect, use } from "react";
import { checkUserStatus } from "../functions/functions";
import { addWeeks, format, getDay, getISOWeek, getWeekYear, nextFriday } from "date-fns";
const UserContext = createContext();

// Provider-komponenten som omger appen
export const UserProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentWeek, setCurrentWeek] = useState(
    getDay(new Date()) > 5 || getDay(new Date()) == 0
      ? getISOWeek(new Date()) + 1
      : getISOWeek(new Date())
  );
  const [currentYear, setCurrentYear] = useState(getWeekYear(new Date()));
  const [currentDay, setCurrentDay] = useState(getDay(new Date()));
  const [hollidays, setHollidays] = useState([]);
  const [admin, setAdmin] = useState(false);
  const [fridaysArray, setFridaysArray] = useState([]); // Ny state för fredagar

  function getNext30Fridays() {
    let currentFriday = nextFriday(new Date());
    let fridaysArray = [];
    for (let i = 0; i < 30; i++) {
      fridaysArray.push(format(currentFriday, "d/M"));
      currentFriday = addWeeks(currentFriday, 1);
    }

    return fridaysArray;
  }

  useEffect(() => {
    async function checkUser() {
      const logedinUser = await checkUserStatus(); // Exempel på async-funktion
      if (logedinUser) {
        setUser(logedinUser.username);
        setAdmin(logedinUser.admin);
      } else {
        console.log("Du har inte behörighet.");
      }
    }
    checkUser();
    setFridaysArray(getNext30Fridays());
  }, []);

  return (
    <UserContext.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
        message,
        setMessage,
        user,
        setUser,
        error,
        setError,
        userData,
        setUserData,
        loading,
        setLoading,
        currentWeek,
        setCurrentWeek,
        currentYear,
        setCurrentYear,
        hollidays,
        setHollidays,
        admin,
        setAdmin,
        currentDay,
        setCurrentDay,
        fridaysArray,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Hook för att använda Context
export const useUserContext = () => useContext(UserContext);
