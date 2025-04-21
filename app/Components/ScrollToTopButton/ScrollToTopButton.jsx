import React, { useState, useEffect } from 'react';
import { IoIosArrowUp } from "react-icons/io";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    isVisible && (
      <button
      onClick={scrollToTop} className="fixed bottom-6 right-6 cursor-pointer flex justify-center items-center rounded-full w-12 h-12 shadow-sm text-white text-3xl shadow-black hover:scale-110 transition-all duration-300 ease-in-out gradiantBg">
        <IoIosArrowUp />
      </button>
    )
  );
};

export default ScrollToTopButton;
