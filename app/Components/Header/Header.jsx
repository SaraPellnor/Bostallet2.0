"use client";
import { usePathname, useRouter } from "next/navigation";
import { useUserContext } from "../../context/UserContext";
import { logOutUser } from "../../functions/functions";
import { AiOutlineLogout, AiOutlineLogin  } from "react-icons/ai";
import { GrUserAdmin } from "react-icons/gr";
import { FaRegCalendarAlt } from "react-icons/fa";




const Header = () => {
  const { admin, setUser, user } = useUserContext();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className=" text-2xl fixed top-6 right-0 flex gap-5 justify-end flex-col z-10">
      {admin && pathname === "/kalender" ? (
        <button
          onClick={() => router.push("/adminpanel")}
          className="text-white font-bold p-4 shadow-md shadow-black pl-6 rounded-s-full bg-green-500 hover:bg-green-600"
        >
          <GrUserAdmin />
        </button>
      ) : pathname === "/adminpanel" ? (
        <button
          onClick={() => router.push("/kalender")}
          className="text-white font-bold p-4 pl-6 shadow-md shadow-black rounded-s-full bg-green-500 hover:bg-green-600"
        >
          <FaRegCalendarAlt />
        </button>
      ): ("")}
      {user && (pathname === "/kalender" || pathname === "/adminpanel") ? (
      <button
        onClick={() => logOutUser(setUser)}
        className="text-white font-bold p-4 shadow-md shadow-black rounded-s-full bg-red-500 hover:bg-red-600"
      >
<AiOutlineLogout />      </button>): (<button
        onClick={() => logOutUser(setUser)}
        className="text-white font-bold p-4 shadow-md shadow-black rounded-s-full bg-green-500 hover:bg-green-600"
      >
<AiOutlineLogin  />      </button>)}
    </div>
  );
};

export default Header;
