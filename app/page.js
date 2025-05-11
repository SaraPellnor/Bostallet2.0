import Login from "./Components/Login/Login";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import hero from "./images/hero.png";
import Image from "next/image";
import Footer from "./Components/Footer/Footer";
const page = async () => {
  const cookieStore = await cookies();
  const user = cookieStore.get("user");

  user && redirect("/kalender"); // Skicka tillbaka till startsidan om det inte finns en token

  return (
    <div className=" max-w-[700px] bg-background w-full flex flex-col h-[100vh] justify-around">
      <Image className=" w-full mx-auto" alt="hero image" src={hero} />

      <Login />
      <Footer />
    </div>
  );
};

export default page;
