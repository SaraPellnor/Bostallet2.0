"use client";
import React, { useState, useEffect, useRef } from "react";
import { MdOutlineInfo } from "react-icons/md";

const InfoHeader = () => {
  const [visible, setVisible] = useState(false);
  const [hapticsReady, setHapticsReady] = useState(false);
  const prevVisible = useRef(false);

  // första drag/touch på skärmen – låser upp vibration
  useEffect(() => {
    const unlockHaptics = () => {
      if (navigator.vibrate) {
        navigator.vibrate(20); // liten test-vibration
        setHapticsReady(true);
      }
      // ta bort listenern så det bara körs en gång
      document.removeEventListener("touchstart", unlockHaptics);
    };

    document.addEventListener("touchstart", unlockHaptics, { once: true });

    return () => document.removeEventListener("touchstart", unlockHaptics);
  }, []);

  // kolla scrollposition
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 100);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // trigga vibration när baren blir synlig
  useEffect(() => {
    if (visible && !prevVisible.current && hapticsReady) {
      if (navigator.vibrate) navigator.vibrate(50); // lätt vibration när den dyker upp
    }
    prevVisible.current = visible;
  }, [visible, hapticsReady]);

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
