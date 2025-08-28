import { LuMessageSquarePlus } from "react-icons/lu";
import { FiMessageSquare } from "react-icons/fi";

import { addMessage } from "../../functions/functions";

const AddMessageIcon = ({ name, week, passNumber, existingMessage }) => {

  const handleClick = async () => {
    // Visa prompt med befintligt meddelande som default
    const message = prompt(
      "Skriv ditt meddelande för passet:",
      existingMessage || ""
    );

    // Om användaren trycker "Avbryt" (null) gör vi inget
    if (message !== null) {
      const trimmedMessage = message.trim();

      // Skicka meddelandet till backend
      const result = await addMessage(week, passNumber, trimmedMessage, name);
      if (result.error) {
        alert("Kunde inte spara meddelandet: " + result.error);
      } else {
        console.log("Meddelandet sparat!");
        // ev. refresh state här för att uppdatera UI
        window.location.reload(); // <-- här lägger du reload
      }
    }
  };

  return (
    <div className=" pl-4">
     {existingMessage ? 
     <FiMessageSquare
        className="cursor-pointer text-pink-300"
        size={24}
        onClick={handleClick}
        title="Meddelande"
      />
      :
     <LuMessageSquarePlus
        className="cursor-pointer text-stone-400"
        size={24}
        onClick={handleClick}
        title="Lämna meddelande"
      />}
    </div>
    
  );
};

export default AddMessageIcon;
