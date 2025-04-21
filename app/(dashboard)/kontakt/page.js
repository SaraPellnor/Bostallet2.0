import React from "react";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";

const page = () => {
  return (
    <div className=" max-w-4xl min-w-[300px] w-2/3 mx-auto px-4 py-12">
      <Header />
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Kontakta oss
      </h1>

      <div className="gradiantBg text-white shadow-md rounded-lg p-6 space-y-6">
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
          <h2 className="text-xl font-semibold">
            Allmän kontakt
          </h2>
          <p>
            E-post:{" "}
            <a
              href="mailto:info@bostallet20.se"
              className="text-yellow_1 hover:underline"
            >
              info@bostallet20.se{" "}
            </a>
            <br />
            {/* Telefon:{" "}
            <a
              //   href="tel:+46340123456"
              className="text-blue-600 hover:underline"
            >
              -
            </a> */}
          </p>
        </div>

        {/* <div>
          <h2 className="text-xl font-semibold">Styrelse</h2>
          <ulspace-y-2">
            <li>
              <strong>Ordförande:</strong> Zandra Mardell
              <br />
              Tel:{" "}
              <a
                href="tel:+46701234567"
                className="text-blue-600 hover:underline"
              >
                070-123 45 67
              </a>
              <br />
              E-post:{" "}
              <a
                href="mailto:anna@fritidsgarden.se"
                className="text-blue-600 hover:underline"
              >
                anna@fritidsgarden.se
              </a>
            </li>
            <li>
              <strong>Sekreterare:</strong> Johan Johansson
              <br />
              Tel:{" "}
              <a
                href="tel:+46709876543"
                className="text-blue-600 hover:underline"
              >
                070-987 65 43
              </a>
              <br />
              E-post:{" "}
              <a
                href="mailto:johan@fritidsgarden.se"
                className="text-blue-600 hover:underline"
              >
                johan@fritidsgarden.se
              </a>
            </li>
          </ul>
        </div> */}
      </div>
      <Footer />
    </div>
  );
};

export default page;
