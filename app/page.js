import LoginForm from "./Components/Login/LoginForm";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
 import Bostallet20 from "./images/Bostallet20.png";
import circle from "./images/circle.png";
import snap from "./images/snap.png";
import Image from "next/image";
import Footer from "./Components/Footer/Footer";
import RegistryForm from "./Components/RegistryForm/RegistryForm";
const page = async () => {
   
  const cookieStore = await cookies();
  const user = cookieStore.get("user");

  user && redirect("/kalender"); // Skicka tillbaka till startsidan om det inte finns en token

  return (
    <div className="league-gothic overflow-hidden max-w-[700px] bg-background w-full flex gap-5 flex-col min-h-[600px] h-[100vh] place-content-end pb-[100px]">
         <Image
        className="z-40 fixed left-1/2 transform -translate-x-1/2 -top-14  w-[450px]"
        alt="Bostallet20"
        src={Bostallet20}
      />
      <Image
        className="z-20 fixed left-1/2 -bottom-1/2 transform -translate-x-1/2 min-w-[800px] max-w-[800px]"
        alt="circle"
        src={circle}
      />
      <Image
        className="z-30 fixed -right-16 -bottom-10  h-[100vh] w-auto"
        alt="snap-person"
        src={snap}
      />
    
      <div className="z-30 text-[16px] md:text-[28px] w-4/5 max-w-[800px] pl-5 pr-10 pt-10 font-bold fixed top-16">
        Vill du vara med och skapa en trygg och meningsfull plats för unga? Här
        kan du enkelt boka in dig och vara en aktiv vuxen i Frillesås. För att
        bli godkänd behöver du lämna in ett giltigt utdrag ur
        belastningsregistret från Polisen.
      </div>
      <RegistryForm />
      <LoginForm />
      <Footer />
    </div>
  );
};

export default page;
