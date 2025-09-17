import React, { useState, useEffect } from "react";
import { MdOutlineInfo } from "react-icons/md";

const InfoHeader = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Visa header om man scrollat mer än 100px
      if (window.scrollY > 100) {
        // bara vibrera om vi går från false till true
        setVisible((prev) => {
          if (!prev) {
            // vibrera en kort stund när den blir synlig
            if (navigator.vibrate) {
              navigator.vibrate(50); // 50 ms “lätt” vibration
            }
          }
          return true;
        });
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed flex items-center top-0 left-0 w-full bg-black/40 backdrop-blur-md z-10 p-4 font-medium text-white pr-20 mb-48 transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <p>
        <MdOutlineInfo size={30} className="inline mb-1 mr-2 text-3xl" />
        Nyhet i appen: Pratbubblan låter dig lämna och läsa meddelanden för varje pass.
      </p>
    </div>
  );
};

export default InfoHeader;
