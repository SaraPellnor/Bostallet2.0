
import Button from "../Button/Button";
const RegistryForm = () => {
  return (
    <div className="text-[20px] z-50 w-full pl-5 flex flex-col justify-center items-start">
      <div className="flex flex-col items-center gap-2">
        <Button
          url={
            "https://l.facebook.com/l.php?u=https%3A%2F%2Fpolisen.se%2Ftjanster-tillstand%2Fbelastningsregistret%2Fbarn-annan-verksamhet%2F%3Ffbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBEwYnpOUDE1eDc2SExITTFrVAEeG4XbsJK8trvk2wkLSQrwP1J2xO5xXFppYXiJV5UIT4PrGx-ShRvY9Mm3cCg_aem_IHBYhizoL5YLBpG-hN8B2Q&h=AT33qCTsrmAuxisMobFicrVznGJsozHofl4xFLTWDA9tDf3ZtqrewYSEWHbe8vz5YtZA0-ytXNopWou-2gaMWcQkWguGSbBxJKfjguEYtJjaiXaOGCvkZLNKdATNQ1pJGERcgY4pW9J6RRtpC5Nd"
          }
        label="Belastningsutdrag"
      />

      <Button
        url={
          "https://docs.google.com/forms/d/e/1FAIpQLSd5BczvLkAg96kPEfCRNlMyLUycnxroDoj9kIk-nymK_on8NQ/viewform"
        }
        label="Registrera dig"
      />

      <Button
        url={
          "https://www.canva.com/design/DAGf1OqQx1s/w-7FfdUbWH-3x6CRZKGFeQ/view?utm_content=DAGf1OqQx1s&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h66fd9427e5#1"
        }
        label="Bli sponsor"
      />
    </div>
  </div>
  )
};

export default RegistryForm;

