"use client";
import React, { useEffect, useRef, useState } from "react";
import { MdOutlineInfo } from "react-icons/md";

const InfoHeader = () => {
  const [visible, setVisible] = useState(false);
  const [hapticsAllowed, setHapticsAllowed] = useState(false);
  const prevVisible = useRef(false);

  useEffect(() => {
    // återställ från localStorage (om användaren tidigare aktiverat haptics)
    try {
      setHapticsAllowed(localStorage.getItem("hapticsAllowed") === "1");
    } catch {}

    const handleScroll = () => {
      setVisible(window.scrollY > 100);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // trigga vibration endast när visible går från false -> true
    if (!prevVisible.current && visible) {
      if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
        if (hapticsAllowed) {
          try {
            navigator.vibrate(50); // lätt, kort vibration
            console.log("vibrate anropades");
          } catch (e) {
            console.warn("vibrate error", e);
          }
        } else {
          console.log("vibrate stöds men användaren har inte aktiverat haptics");
        }
      } else {
        console.log("vibrate inte stödd i denna browser/enhet");
      }
    }
    prevVisible.current = visible;
  }, [visible, hapticsAllowed]);

  const enableHaptics = () => {
    setHapticsAllowed(true);
    try { localStorage.setItem("hapticsAllowed", "1"); } catch {}
    // gör en kort test-vibration så browser "fångar" user gesture
    if (navigator.vibrate) navigator.vibrate(30);
  };

  return (
    <div
      className={`fixed flex items-center top-0 left-0 w-full bg-black/40 backdrop-blur-md z-10 p-4 font-medium text-white pr-20 mb-48 transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <p className="flex items-center">
        <MdOutlineInfo size={30} className="inline mb-1 mr-2 text-3xl" />
        Nyhet i appen: Pratbubblan låter dig lämna och läsa meddelanden för varje pass.
      </p>

      {!hapticsAllowed && (
        <button
          onClick={enableHaptics}
          className="ml-auto bg-white/10 px-3 py-1 rounded text-sm"
        >
          Aktivera lätt vibration
        </button>
      )}
    </div>
  );
};

export default InfoHeader;
