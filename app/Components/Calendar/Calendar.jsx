"use client";
import { IoIosPersonAdd } from "react-icons/io";
import confetti from "../../images/confetti.gif";
import Image from "next/image";

import { TiDelete } from "react-icons/ti";
import React, { useEffect, useState } from "react";
import { getISOWeek } from "date-fns";
import Loading from "../Loading/Loading";
import childrenHolidayWeeks from "../../utils/getHolidaysWeek";
import { useUserContext } from "../../context/UserContext";
import {
  handleSchema,
  fetchData,
  removeOldWeeks,
} from "../../functions/functions";
import Header from "../Header/Header";
import ScrollToTopButton from "../ScrollToTopButton/ScrollToTopButton";
import Search from "../Search/Search";
import AddMessageIcon from "../AddMessageIcon/AddMessageIcon";
import MessageIcon from "../MessageIcon/MessageIcon";
import InfoHeader from "../InfoHeader/InfoHeader";
const Calendar = () => {
  const {
    user,
    userData,
    setUserData,
    loading,
    setLoading,
    message,
    setMessage,
    currentWeek,
    fridaysArray,
    currentYear,
    hollidays,
    currentDay,
    setHollidays,
  } = useUserContext();
  // Hämta schemat från API
  useEffect(() => {
    removeOldWeeks(getISOWeek(new Date()));
    setHollidays(childrenHolidayWeeks);
    fetchData(setLoading, setUserData);
  }, [message]);
  const [showconfetti, setshowConfetti] = useState(false);
  const handleAdd = (
    passCount,
    setMessage,
    weekNumber,
    passNumber,
    userIn,
    user
  ) => {
    passCount > 2 && setshowConfetti(true);
    const timer = setTimeout(() => {
      setshowConfetti(false);
    }, 2000);

    handleSchema(
      setMessage,
      weekNumber,
      passNumber,
      userIn ? "remove" : "add",
      user
    );
    timer();
  };

  // Rendera en cell för ett specifikt pass
  const renderPassCell = (weekNumber, passNumber) => {
    let passCount = 0;
    let userIn = false;

    const participants = userData.flatMap((element) => {
      return element.weeks
        .filter(
          (week) => week.week === weekNumber && week.pass.includes(passNumber)
        )
        .map((week) => {
          if (element.name === user) userIn = true;
          passCount++;

          // Hämta meddelandet för aktuell vecka + pass
          const messageObj = week.messages
            ? week.messages.find((msg) => msg.pass === passNumber)
            : null;

          return {
            name: element.name,
            stars: element.stars,
            message: messageObj ? messageObj.message : null, // skicka bara texten
          };
        });
    });

    return (
      <div
        className={`relative pb-5 px-5 py-3 ${
          (passNumber === 1 && passCount > 3) ||
          (passNumber === 2 && passCount > 3)
            ? "opacity-35"
            : ""
        } pb-5 px-5 py-3`}
      >
        <div className="bg-purple_2 rounded-lg w-full px-2 py-1 flex justify-between">
          {passNumber == 1 ? (
            <>
              <p>PASS 1</p>
              <p>18.00-20.00</p>
            </>
          ) : (
            <>
              <p>PASS 2</p>
              <p>20.00-22.00</p>
            </>
          )}
        </div>
        {!userIn &&
          ((passNumber == 1 && passCount < 4) ||
            (passNumber == 2 && passCount < 4)) && (
            <button
              onClick={() =>
                handleAdd(
                  passCount,
                  setMessage,
                  weekNumber,
                  passNumber,
                  userIn,
                  user
                )
              }
              className=" w-full flex items-center h-12 p-1 border-b-2 border-gray-700"
            >
              <p className="text-green-400 sm:text-[20px] text-[15px]">
                Lägg till mig
              </p>
              <IoIosPersonAdd
                title="Klicka här för att lägga till dig på passet"
                className="text-green-400 text-3xl"
              />
            </button>
          )}
        {participants.map((participant, index) => (
          <div
            className={`flex items-center py-1 border-b-2 border-gray-700 ${
              participant.name === user ? "text-green-400" : ""
            }`}
            key={index}
          >
            <p data-name={participant.name} className="w-full">
              {participant.name}
            </p>

            {participant.message && participant.name != user && (
              <MessageIcon existingMessage={participant.message} />
            )}
            {participant.name === user && (
              <div
                title="Klicka här för att ta bort dig ifrån passet"
                onClick={() =>
                  handleSchema(
                    setMessage,
                    weekNumber,
                    passNumber,
                    userIn ? "remove" : "add",
                    user
                  )
                }
                className="cursor-pointer flex justify-end items-center h-12"
              >
                <p className="text-red-400 sm:text-[20px] text-[15px] whitespace-nowrap overflow-hidden text-ellipsis">
                  Ta bort mig
                </p>
                <TiDelete className="text-red-400 text-3xl" />
              </div>
            )}
            {participant.name == user && (
              <AddMessageIcon
                name={participant.name}
                week={weekNumber}
                passNumber={passNumber}
                existingMessage={participant.message}
              />
            )}
          </div>
        ))}

        {((passNumber === 1 && passCount > 3) ||
          (passNumber === 2 && passCount > 3)) && (
          <div className="flex justify-end items-center h-12 w-full">
            <p className="self-center m-auto text-yellow-400 font-bold">
              Full styrka!
            </p>
          </div>
        )}
      </div>
    );
  };

  // Generera rader för tabellen
  const generateRows = () => {
    return Array.from({ length: 26 }, (_, i) => {
      const weekNumber = ((currentWeek + i - 1) % 52) + 1;
      return (
        <div className="mb-6" key={weekNumber}>
          {weekNumber == 1 && i > 0 && (
            <p className="gradiantBg p-4 text-white text-2xl">
              {currentYear + 1}
            </p>
          )}

          <div
            className={`text-white text-xl bg-black shadow-xl shadow-black/70 rounded-b-md ${
              i === 0 || weekNumber === 1 ? "" : " rounded-t-md"
            }`}
            key={weekNumber}
          >
            <div className="text-2xl font-bold">
              {hollidays.some(
                (item) =>
                  item.fact.week == weekNumber && item.fact.year == currentYear
              ) ? (
                hollidays
                  .filter(
                    (item) =>
                      item.fact.week == weekNumber &&
                      item.fact.year == currentYear
                  )
                  .map((item, index) => (
                    <div className="p-3" key={index}>
                      <div className="flex gap-2 items-end">
                        {" "}
                        <p data-name={weekNumber}> Fredag V. {weekNumber}</p>
                        <p
                          data-name={fridaysArray[i]}
                          className="text-lg text-blue-200"
                        >
                          {fridaysArray[i]}
                        </p>
                      </div>
                      <p
                        data-name={item.holiday}
                        className="text-blue-400 font-thin"
                      >
                        {item.holiday}
                      </p>
                    </div>
                  ))
              ) : (
                <div className="p-3 flex gap-2 items-end">
                  <p data-name={weekNumber}>Fredag V. {weekNumber}</p>
                  <p
                    data-name={fridaysArray[i]}
                    className="text-lg text-green-200"
                  >
                    {fridaysArray[i]}
                  </p>
                </div>
              )}
            </div>

            {renderPassCell(weekNumber, 1)}
            {renderPassCell(weekNumber, 2)}
          </div>
        </div>
      );
    });
  };

  return loading ? (
    <Loading />
  ) : (
    <div className="relative w-full max-w-[800px] h-full flex flex-col">
      <div
        className={`fixed inset-0 flex items-center justify-center w-full h-full z-[1] ${
          showconfetti ? "" : "hidden"
        }`}
      >
        <Image
          src={showconfetti && confetti}
          alt="Confetti"
          className="w-2/3 h-2/3 object-contain"
        />
      </div>
      <InfoHeader />

      <Header />
      {currentWeek != 52 && (
        <div className=" gradiantBg py-4">
          <p className="text-white text-2xl pl-3">{currentYear}</p>{" "}
          <div className="flex justify-start mr-16 text-xl pt-2">
            <Search />
          </div>
        </div>
      )}
      {/* <div className="flex justify-start my-4 mx-6">
        
        <Search />
      </div> */}
      {generateRows()}
      <ScrollToTopButton />
    </div>
  );
};

export default Calendar;
