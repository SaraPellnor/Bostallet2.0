import { useState, useRef, useEffect } from "react";
import { FiMessageSquare } from "react-icons/fi";

const MessageIcon = ({ existingMessage }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  // Klick utanför stänger rutan
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!existingMessage) {
    // Om det inte finns meddelande, visa grå ikon utan popup
    return;
  }

  return (
    <div className="relative inline-block">
      <FiMessageSquare
        size={24}
        onClick={() => setOpen((prev) => !prev)}
        onMouseEnter={() => setOpen(true)}
        className="cursor-pointer text-pink-300"
        title="Meddelande"

      />

      {open && (
        <div
          ref={ref}
          className="cursor-pointer absolute top-0 right-0 z-10 bg-black border-pink-300 border p-2 rounded-2xl rounded-tr-none text-center shadow-lg shadow-stone-700 w-48"
        >
          <p         onMouseLeave={() => setOpen(false)}
 onClick={() => setOpen(false)} className="text-lg text-yellow-100">{existingMessage}</p>
        </div>
      )}
    </div>
  );
};

export default MessageIcon;
