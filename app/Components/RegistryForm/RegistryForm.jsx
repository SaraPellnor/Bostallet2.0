"use client";
import { redirect } from "next/navigation";
const RegistryForm = () => {
  return (
<div className="z-30 mb-10 flex flex-col items-center justify-center gap-2">
           <button
          type="submit"
          className="transition bg-white duration-500 ease-out text-black py-3 px-10 rounded-full hover:scale-105"
                onClick={() => redirect("https://digitaliseringsinitiativet.se/belastningsregistret")}

        >
          Belastningsutdrag
        </button>
           <button
          type="submit"
          className=" transition bg-white duration-500 ease-out text-black py-3 px-10 rounded-full hover:scale-105"
        onClick={() => redirect("/kontakt")}
        >
          Kontakta oss här
        </button>
      </div>  )
}

export default RegistryForm