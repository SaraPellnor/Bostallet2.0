"use client";
import { redirect } from "next/navigation";

const Button = ({ label, url }) => {
  return (
    <button
      className="shadow-md shadow-black transition bg-white duration-500 ease-out text-black py-2 w-[155px] rounded-full hover:scale-105"
      type="submit"
      onClick={() => redirect(url)}
    >
      {label}
    </button>
  );
};

export default Button;
