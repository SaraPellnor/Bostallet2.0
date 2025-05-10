import React from "react";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";

const page = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 pb-28 pt-12">
      <Header />{" "}
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Information inför pass på Bostället2.0
      </h1>
      <div className="gradiantBg text-white rounded-lg p-6 space-y-6">
        <section>
          <h2 className="text-2xl font-semibold  mb-2">Schema & Bokning</h2>
          <p className="">
            Försök att boka så att vi blir <strong>4 personer per pass</strong>.
            Du får gärna boka båda passen samma fredag.
          </p>
          <p className=" mt-2">
            Du måste ha uppvisat ett <strong>giltigt registerutdrag</strong>{" "}
            innan du bokar in dig på ett pass! Om utdraget är i pappersformat
            ska det lämnas in i <strong>sitt obrutna originalkuvert</strong>.
          </p>
          <p className=" mt-2">
            Är det ditt <strong>första pass</strong>, sätt gärna upp dig på ett{" "}
            <strong>tidigt pass</strong>!
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold  mb-2">Ordningsregler</h2>
          <p className="">
            Läs igenom ordningsreglerna <strong>innan ditt första pass</strong>{" "}
            – du hittar dem nedan på denna sida eller i pärmen på Bostället. Läs
            gärna igenom dem igen vid behov.
          </p>
        </section>

        <section className="border-t pt-4">
          <h2 className="text-xl font-bold text-yellow_1 mb-2">
            <a href="https://1drv.ms/w/c/aa816766417cf9fd/EURcS89aAyNKp6Pmf6ptpsQBMEg4XzktgaAMn7eAq7B5cQ?e=vGGuK4">
              REGLER
            </a>
          </h2>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default page;
