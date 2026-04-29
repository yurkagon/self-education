import React, { FC } from "react";

const url =
  "https://www.finedinemenu.com/wp-content/uploads/2020/04/finedine-steps-desktop-2-1.jpg";

const HowItWorks: FC<{}> = () => (
  <div className="pb-5 mx-auto d-flex align-items-center flex-column">
    <h1 className="mt-5 text-center">Як працює e-menue?</h1>
    <img className="w-75" src={url} alt="How it works" />
  </div>
);

export default HowItWorks;
