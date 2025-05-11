import React from "react";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import { FaPhoneAlt } from "react-icons/fa";

const page = () => {
  return (
    <div className=" mx-auto mb-12 px-4 py-12">
      <Header />

      <div className="gradiantBg max-w-[700px] text-white shadow-md rounded-lg p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center mb-8">
          Kontaktinformation
        </h1>
        <div>
          <h2 className="text-xl font-semibold">Besöksadress</h2>
          <p>
            Bostället2.0
            <br />
            Frillesåsvägen 14
            <br />
            439 62 Frillesås
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Allmän kontakt</h2>
          <p>
            E-post:
            <a
              href="mailto:info@bostallet20.se"
              className="text-yellow_1 hover:underline"
            >
              info@bostallet20.se
            </a>
            <br />
          </p>
        </div>

        <section className="border-t pt-4">
          <h2 className="text-xl font-semibold  mb-2">
            Ring relevant person i styrgruppen vid{" "}
            <span className="text-red-300">akuta</span> tillfällen, t.ex.
            förseningar eller frånvaro!
          </h2>
          <ul className="text-blue-200 space-y-1 text-xl font-bold">
            <li className="flex gap-2 items-center hover:text-blue-300">
              <FaPhoneAlt />
              <a href="tel:0703864828">Zandra Mardell</a>
            </li>
            <li className="flex gap-2 items-center hover:text-blue-300">
              <FaPhoneAlt />
              <a href="tel:0761608485">Jennie Jungersten</a>
            </li>
            <li className="flex gap-2 items-center hover:text-blue-300">
              <FaPhoneAlt />
              <a href="tel:0730442444">Sara Pellnor</a>
            </li>
            <li className="flex gap-2 items-center hover:text-blue-300">
              <FaPhoneAlt />
              <a href="tel:0736631252">Carin Thapper</a>
            </li>
            <li className="flex gap-2 items-center hover:text-blue-300">
              <FaPhoneAlt />
              <a href="tel:0708613565">Daniel Lönnqvist</a>
            </li>
            <li className="flex gap-2 items-center hover:text-blue-300">
              <FaPhoneAlt />
              <a href="tel:0735043654">Sara Lyngsaa</a>
            </li>
            <li className="flex gap-2 items- hover:text-blue-300">
              <FaPhoneAlt />
              <a href="tel:0729919107">Marcus Schulz</a>
            </li>
          </ul>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default page;
