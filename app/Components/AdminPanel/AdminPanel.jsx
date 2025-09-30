"use client";
import { LuUndo2 } from "react-icons/lu";
import { CiStar } from "react-icons/ci";
import { IoIosSave } from "react-icons/io";
import {
  MdOutlineCheckBoxOutlineBlank,
  MdOutlineCheckBox,
} from "react-icons/md";
import { FaUserEdit, FaRegTrashAlt } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";

import { useUserContext } from "../../context/UserContext";
import React, { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import NewUser from "../NewUser/NewUser";
import {
  adminDeletePass,
  checkUserStatus,
  deleteUser,
} from "../../functions/functions";
import { redirect } from "next/navigation";
import Header from "../Header/Header";
import ScrollToTopButton from "../ScrollToTopButton/ScrollToTopButton";
import Search from "../Search/Search";

const AdminPanel = () => {
  const { setAdmin, loading, setLoading } = useUserContext();
  const [users, setUsers] = useState([]);
  const [edit, setEdit] = useState("");
  const [isAdminCheckBox, setIsAdminCheckBox] = useState(false);
  const [isAdminCheckBox2, setIsAdminCheckBox2] = useState(false);

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [stars, setStars] = useState(0);

  const [showNewUserModal, setShowNewUserModal] = useState(false);
const currentYear = new Date().getFullYear();
const currentWeek = (() => {
  const oneJan = new Date(new Date().getFullYear(), 0, 1);
  const numberOfDays = Math.floor(
    (new Date() - oneJan) / (24 * 60 * 60 * 1000)
  );
  return Math.ceil((numberOfDays + oneJan.getDay() + 1) / 7);
})();
console.log(currentWeek, currentYear);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/adminpanel/");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  const fetchUser = async () => {
    const loggedInUser = await checkUserStatus();

    if (!loggedInUser.admin) {
      setAdmin(null);
      redirect(new URL("/", window.location.origin));
    }
  };

  const deletePass = (week, pass, user) => {
    const confirmed = confirm(
      `Vill du radera medarbetarens pass ${pass} vecka ${week}? Det går inte att ångra!`
    );
    if (confirmed) {
      adminDeletePass(
        week,
        pass,
        user,
        name,
        mobile,
        email,
        isAdminCheckBox2,
        stars
      );
      window.location.reload();
    }
  };

  const handleEdit = (admin, name, mobile, email, stars) => {
    setName(name);
    setMobile(mobile);
    setEmail(email);
    setEdit(name);
    setIsAdminCheckBox2(admin);
    setStars(stars);

    if (edit.length > 0) {
      const confirmed = confirm("Vill du spara påbörjad först?");
      if (confirmed) {
        handleSave();
      } else {
        return;
      }
      setEdit(name);
    }
  };

  const handleSave = async (user, pass, week) => {
    setEdit("");
    adminDeletePass(
      week,
      pass,
      user,
      name,
      mobile,
      email,
      isAdminCheckBox2,
      stars
    );
    window.location.reload();
  };

  const handleDelete = (email) => {
    const confirmed = confirm("Vill du radera medarbetaren?");
    if (confirmed) {
      deleteUser(email);
      window.location.reload();
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchUser();
    fetchData();
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <>
      <Header />
      <div className="flex flex-col justify-center gap-5 text-xl mt-1 pb-10 w-screen">
        <div className="text-center pt-2 font-bold text-2xl">Medarbetare</div>

        <div className="text-center">
          <button
            onClick={() => setShowNewUserModal(true)}
            className="inline-flex items-center gap-1 text-sm text-purple-700 font-medium hover:text-purple-900 hover:underline transition"
          >
            <span className="text-lg">＋</span> Lägg till ny medarbetare
          </button>
        </div>

        {/* Modal */}
        {showNewUserModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-2xl shadow-lg w-[90%] max-w-lg p-6 relative">
              <button
                onClick={() => setShowNewUserModal(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-black"
              >
                <FaTimes size={24} />
              </button>

              <h2 className="text-xl font-bold mb-4">
                Lägg till ny medarbetare
              </h2>

              <NewUser
                setIsAdmin={setIsAdminCheckBox}
                isAdmin={isAdminCheckBox}
              />
            </div>
          </div>
        )}

        <Search />

        {users
          .slice()
          .sort((a, b) => {
            if (a.admin && !b.admin) return -1;
            if (!a.admin && b.admin) return 1;
            return a.name.localeCompare(b.name);
          })
          .map((item, i) =>
            edit == item.name ? (
              <div key={i} className="flex flex-col bg-white shadow-md">
                <div
                  className={` font-bold flex justify-between  ${
                    item.admin ? "bg-stone-800" : "bg-purple-900"
                  } text-white p-3`}
                >
                  <div className="flex items-center">
                    <p className="pr-2 ">{i + 1}.</p>
                    <input
                      className="w-[70%] bg-stone-800 border p-1"
                      placeholder={item.name}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    ></input>
                  </div>
                  <div className="flex gap-3 items-center justify-end">
                    <IoIosSave
                      size={30}
                      onClick={() => handleSave(item, false, false)}
                      className=" text-green-500 cursor-pointer"
                    />
                    <LuUndo2
                      size={30}
                      className=" cursor-pointer"
                      onClick={() => setEdit(false)}
                    />
                    <FaRegTrashAlt
                      size={30}
                      onClick={() => handleDelete(item.email)}
                      className="cursor-pointer text-red-500"
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-between px-3 py-2">
                  <p className="font-bold">Mobilnummer:</p>
                  <input
                    className="border rounded p-2"
                    placeholder={item.mobile}
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  ></input>
                </div>
                <div className="flex flex-col justify-between px-3 py-2">
                  <p className="font-bold">E-post:</p>
                  <input
                    className="p-2 border rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={item.email}
                  ></input>
                </div>
                <div className="flex justify-between px-3 py-2">
                  <p className="font-bold">Admin:</p>
                  <p>
                    {isAdminCheckBox2 ? (
                      <MdOutlineCheckBox
                        size={30}
                        onClick={() => setIsAdminCheckBox2(false)}
                        className="cursor-pointer text-2xl text-green-500"
                      />
                    ) : (
                      <MdOutlineCheckBoxOutlineBlank
                        size={30}
                        onClick={() => setIsAdminCheckBox2(true)}
                        className="text-2xl cursor-pointer"
                      />
                    )}
                  </p>
                </div>
                <p className="font-bold pl-3">Veckor:</p>
<div className="flex flex-col gap-3 justify-end px-3 py-2">
  {item.weeks.map((week, i) => {
    const year = week.year; // antar att varje week-objekt har year-property

    if (
      (week.week >= currentWeek && year === currentYear) ||
      (week.week < currentWeek && year === currentYear + 1)
    ) {
      return (
        <div
          key={i}
          className="flex flex-col gap-1 p-2 bg-black bg-opacity-80 text-white"
        >
          <p>V. {week.week}</p>
          {week.pass.includes(1) && (
            <div
              onClick={() => deletePass(week.week, 1, item)}
              className="cursor-pointer p-1 bg-red-500 flex justify-between items-center px-3"
            >
              <p> Pass 1 </p>
              <FaRegTrashAlt />
            </div>
          )}
          {week.pass.includes(2) && (
            <div
              onClick={() => deletePass(week.week, 2, item)}
              className="cursor-pointer p-1 bg-red-500 flex justify-between items-center px-3"
            >
              <p> Pass 2 </p>
              <FaRegTrashAlt />
            </div>
          )}
        </div>
      );
    }

    return null;
  })}
</div>

                <div className="flex justify-between items-center px-3 py-2">
                  <p className="font-bold">Antal pass:</p>
                  <input
                    className=" text-black font-bold text-right"
                    value={stars}
                    type="number"
                    onChange={(e) => setStars(e.target.value)}
                    placeholder={item.stars}
                  ></input>
                </div>
              </div>
            ) : (
              <div
                key={i}
                className=" flex flex-col bg-white shadow-md shadow-stone-700"
              >
                <div
                  className={` font-bold flex justify-between  ${
                    item.admin ? "bg-stone-800" : "bg-purple-900"
                  } text-white p-3`}
                >
                  <div className=" flex items-center">
                    <p className="pr-2 ">{i + 1}.</p>

                    <p data-name={item.name} className="">
                      {item.name}
                    </p>
                  </div>
                  <div className="flex gap-4 items-center">
                    <FaUserEdit
                      size={30}
                      onClick={() =>
                        handleEdit(
                          item.admin,
                          item.name,
                          item.mobile,
                          item.email,
                          item.stars
                        )
                      }
                      className=" cursor-pointer"
                    />
                    <FaRegTrashAlt
                      size={30}
                      onClick={() => handleDelete(item.email)}
                      className="text-red-500 cursor-pointer"
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-between px-3 py-2">
                  <p className="font-bold">Mobilnummer:</p>{" "}
                  <p className="p-2 w-full" data-name={item.mobile}>
                    {item.mobile}
                  </p>
                </div>

                <div className="flex flex-col justify-between px-3 py-2">
                  <p className="font-bold">E-post:</p>{" "}
                  <p data-name={item.email} className="p-2">
                    {item.email}
                  </p>
                </div>
                <div className="flex justify-between px-3 py-2">
                  <p className="font-bold">Admin:</p>
                  {item.admin ? (
                    <MdOutlineCheckBox size={30} className=" text-green-500" />
                  ) : (
                    <MdOutlineCheckBoxOutlineBlank size={30} />
                  )}
                </div>
                <p className="font-bold pl-3">Veckor:</p>
  <div className="flex flex-col gap-3 px-3 py-2">
  {item.weeks.map((week, i) => {
    const year = week.year; // anta att varje week-objekt har year-property

    if (
      (week.week >= currentWeek && year === currentYear) ||
      (week.week < currentWeek && year === currentYear + 1)
    ) {
      return (
        <div
          key={i}
          className="flex flex-col gap-1 p-2 bg-black text-white"
        >
          <p>V. {week.week}</p>
          {week.pass.includes(1) && (
            <p className="p-1 bg-green-500">Pass 1</p>
          )}
          {week.pass.includes(2) && (
            <p className="p-1 bg-green-500">Pass 2</p>
          )}
        </div>
      );
    }

    return null; // annars rendera inget
  })}
</div>

                <div className="flex flex-wrap justify-between items-center px-3 py-2">
                  <p className="font-bold">Antal pass:</p>{" "}
                  <p className=" flex items-center justify-center text-black font-bold">
                    {item.stars} st
                  </p>
                </div>
              </div>
            )
          )}
        <ScrollToTopButton />
      </div>
    </>
  );
};

export default AdminPanel;
