"use client";
import { redirect } from "next/navigation";
const RegistryForm = () => {
  return (
    <div className="text-[20px] z-40 w-full pl-5 flex flex-col justify-center items-start">
      <div className="flex flex-col items-center gap-2">
        {" "}
        <button
          type="submit"
          className="shadow-md shadow-black transition bg-white duration-500 ease-out text-black py-2 px-10 rounded-full hover:scale-105"
          onClick={() =>
            redirect(
              "https://l.facebook.com/l.php?u=https%3A%2F%2Fpolisen.se%2Ftjanster-tillstand%2Fbelastningsregistret%2Fbarn-annan-verksamhet%2F%3Ffbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBEwYnpOUDE1eDc2SExITTFrVAEeG4XbsJK8trvk2wkLSQrwP1J2xO5xXFppYXiJV5UIT4PrGx-ShRvY9Mm3cCg_aem_IHBYhizoL5YLBpG-hN8B2Q&h=AT33qCTsrmAuxisMobFicrVznGJsozHofl4xFLTWDA9tDf3ZtqrewYSEWHbe8vz5YtZA0-ytXNopWou-2gaMWcQkWguGSbBxJKfjguEYtJjaiXaOGCvkZLNKdATNQ1pJGERcgY4pW9J6RRtpC5Nd"
            )
          }
        >
          Belastningsutdrag
        </button>
        <button
          type="submit"
          className="shadow-md shadow-black transition bg-white duration-500 ease-out text-black py-2 px-10 rounded-full hover:scale-105"
          onClick={() => redirect("/kontakt")}
        >
          Kontakta oss här
        </button>
      </div>
    </div>
  );
};

export default RegistryForm;
