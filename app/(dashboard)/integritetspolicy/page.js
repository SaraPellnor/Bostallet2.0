import React from "react";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";

const Integritetspolicy = () => {
  return (
    <div className=" py-12 px-4 sm:px-6 lg:px-8 text-white">
      <Header />
      <div className="flex flex-col gap-6 max-w-3xl mx-auto gradiantBg p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center mb-8">
          Integritetspolicy
        </h1>

        <section>
          <h2 className="text-xl font-semibold">1. Inledning</h2>
          <p className="">
            Vi värnar om din integritet och eftersträvar att skydda dina
            personuppgifter i enlighet med gällande dataskyddslagstiftning,
            inklusive EU:s allmänna dataskyddsförordning (GDPR). Denna
            integritetspolicy förklarar hur vi samlar in, använder, lagrar och
            skyddar dina personuppgifter när du använder vår webbplats för att
            boka aktiviteter på fritidsgården.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">2. Personuppgiftsansvarig</h2>
          <p className="">
            <strong>Bostället2.0</strong>
            <br />
            Organisationsnummer: <strong>802550-4526</strong>
            <br />
            Adress: <strong>Boställets väg 28D, 43962 Frillesås</strong>
            <br />
            Telefonnummer: <strong>-</strong>
            <br />
            E-postadress: <strong>info@bostallet20.se</strong>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold ">3. Insamlade personuppgifter</h2>
          <ul className="list-disc pl-6 ">
            <li>För- och efternamn</li>
            <li>E-postadress</li>
            <li>Telefonnummer</li>
            <li>Information om du är administratör eller inte</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold ">4. Ändamål och rättslig grund för behandlingen</h2>
          <p className="">
            Vi behandlar dina personuppgifter för att:
          </p>
          <ul className="list-disc pl-6 ">
            <li>Möjliggöra inloggning och hantering av ditt konto</li>
            <li>Administrera bokningar av aktiviteter på fritidsgården</li>
            <li>Kommunicera med dig angående dina bokningar eller kontorelaterade ärenden</li>
            <li>Hantera administratörsbehörigheter (endast för administratörer)</li>
          </ul>
          <p className="">
            Den rättsliga grunden för behandlingen är att den är nödvändig för att
            fullgöra vårt avtal med dig och för att tillhandahålla de tjänster du
            efterfrågar.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold ">5. Lagring av personuppgifter</h2>
          <p className="">
            Vi lagrar dina personuppgifter så länge det är nödvändigt för att
            uppfylla de ändamål som anges i denna policy eller så länge det krävs
            enligt lag. När dina personuppgifter inte längre är nödvändiga kommer
            de att raderas eller anonymiseras.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold ">6. Delning av personuppgifter</h2>
          <p className="">
            Vi delar inte dina personuppgifter med tredje part, förutom i de fall
            där det är nödvändigt för att tillhandahålla våra tjänster eller om vi
            är skyldiga att göra det enligt lag.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold ">7. Dina rättigheter</h2>
          <p className="">
            Du har rätt att:
          </p>
          <ul className="list-disc pl-6 ">
            <li>Få tillgång till de personuppgifter vi har om dig</li>
            <li>Begära rättelse av felaktiga eller ofullständiga uppgifter</li>
            <li>Begära radering av dina personuppgifter</li>
            <li>Invända mot eller begära begränsning av behandlingen av dina personuppgifter</li>
            <li>Få ut dina personuppgifter i ett strukturerat, allmänt använt och maskinläsbart format</li>
          </ul>
          <p className="">
            För att utöva dina rättigheter, vänligen kontakta oss via kontaktuppgifterna ovan.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold ">8. Ändringar i denna policy</h2>
          <p className="">
            Vi förbehåller oss rätten att ändra denna integritetspolicy. Eventuella
            ändringar kommer att publiceras på vår webbplats, och vi rekommenderar att
            du regelbundet granskar policyn för att hålla dig informerad.
          </p>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Integritetspolicy;
