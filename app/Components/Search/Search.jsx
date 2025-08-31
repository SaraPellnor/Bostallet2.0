import { useState } from "react";
import { FiSearch } from "react-icons/fi";
const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    const target = searchTerm.trim().toLowerCase();

    if (!target) {
      alert("Skriv något att söka efter.");
      return;
    }

    // Hämta alla element med data-name
    const allElements = document.querySelectorAll("[data-name]");

    let found = false;

    for (const el of allElements) {
      const name = el.getAttribute("data-name").toLowerCase();
      if (name.includes(target)) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        found = true;
        break;
      }
    }

    if (!found) {
      alert(`Inget resultat för "${searchTerm}". Försök igen.`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex justify-center px-2 mr-20">
      <div className="flex items-center gap-2 bg-gray-100 border border-gray-300 rounded-full px-4 py-2 w-full max-w-md shadow-sm">
        <input
          type="text"
          placeholder="Sök"
          className="bg-transparent focus:outline-none w-full text-gray-700"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <FiSearch
          className="text-gray-500 text-xl cursor-pointer"
          onClick={handleSearch}
          title="Sök"
        />
      </div>
    </div>
  );
};

export default Search;
