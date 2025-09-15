"use client";

const Button = ({ label, url }) => {
  return (
    <button
      className="shadow-md shadow-black transition bg-white duration-500 ease-out text-black py-2 w-[155px] rounded-full hover:scale-105"
      type="button"
      onClick={() => (window.location.href = url)}
    >
      {label}
    </button>
  );
};

export default Button;
