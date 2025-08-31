"use client";
import { LuUndo2 } from "react-icons/lu";
import { CiStar } from "react-icons/ci";
import { IoIosSave } from "react-icons/io";

import {
  MdOutlineCheckBoxOutlineBlank,
  MdOutlineCheckBox,
} from "react-icons/md";
import { FaUserEdit, FaRegTrashAlt } from "react-icons/fa";
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
    const loggedInUser = await checkUserStatus(); // Vänta på att Promiset löser sig

    if (!loggedInUser.admin) {
      setAdmin(null); // Sätt det upplösta värdet i state
      redirect(new URL("/", window.location.origin)); // Redirect
    }
  };

  // jag behöver skicka med nya value för user
  const deletePass = (week, pass, user) => {
    const confirmed = confirm(
      `Vill du radera medarbetarens pass ${pass} vecka ${week}? Det går inte att ångra!`
    );
    if (confirmed) {
      // Användaren klickade på "Ok"
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
    } else {
      // Användaren klickade på "Avbryt"
      return;
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
        // Användaren klickade på "Ok"
        handleSave();
      } else {
        // Användaren klickade på "Avbryt"
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
    } else {
      return;
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
      <div className=" flex flex-col justify-center gap-5 text-xl mt-1 pb-10 w-screen">
        <NewUser setIsAdmin={setIsAdminCheckBox} isAdmin={isAdminCheckBox} />
        <div className=" text-center pt-2 font-bold text-2xl">Medarbetare</div>
        <Search />

        {users
          .slice() // gör en kopia av arrayen
          .sort((a, b) => {
            // 1. Sortera admin=true först
            if (a.admin && !b.admin) return -1;
            if (!a.admin && b.admin) return 1;
            // 2. Om båda har samma adminstatus, sortera efter namn
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
                  {item.weeks.map((week, i) => (
                    <div
                      key={i}
                      className=" flex flex-col gap-1 p-2 bg-black bg-opacity-80 text-white "
                    >
                      <p>V. {week.week}</p>
                      {week.pass.find((item) => item == 1) && (
                        <div
                          onClick={() => deletePass(week.week, 1, item)}
                          className="cursor-pointer p-1 bg-red-500 flex justify-between items-center px-3"
                        >
                          <p> Pass 1 </p>
                          <FaRegTrashAlt />
                        </div>
                      )}
                      {week.pass.find((item) => item == 2) && (
                        <div
                          onClick={() => deletePass(week.week, 2, item)}
                          className="cursor-pointer p-1 bg-red-500 flex justify-between items-center px-3"
                        >
                          <p> Pass 2 </p>
                          <FaRegTrashAlt />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap justify-between items-center px-3 py-2">
                  <p className="font-bold">Antal pass:</p>{" "}
                  <div className="relative  text-yellow-300">
                    <CiStar size={70} />
                    <input
                      className="no-spin bg-transparent absolute inset-0 flex items-center justify-center text-center text-black font-bold text-[15px] leading-none"
                      value={stars}
                      type="number"
                      onChange={(e) => setStars(e.target.value)}
                      placeholder={item.stars}
                    ></input>
                  </div>
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
                  {item.weeks.map((week, i) => (
                    <div
                      key={i}
                      className=" flex flex-col gap-1 p-2 bg-black text-white "
                    >
                      <p>V. {week.week}</p>
                      {week.pass.find((item) => item == 1) && (
                        <p className="p-1 bg-green-500">Pass 1</p>
                      )}
                      {week.pass.find((item) => item == 2) && (
                        <p className="p-1 bg-green-500">Pass 2</p>
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap justify-between items-center px-3 py-2">
                  <p className="font-bold">Antal pass:</p>{" "}
                  <div className="relative text-yellow-300">
                    <CiStar size={70} />
                    <p className="absolute inset-0 pt-[2px] flex items-center justify-center text-black font-bold text-[15px] leading-none">
                      {item.stars}
                    </p>
                  </div>
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
