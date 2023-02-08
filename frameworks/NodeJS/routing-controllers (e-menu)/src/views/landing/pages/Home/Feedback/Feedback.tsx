import React, { FC } from "react";

import FeedbackCard from "./FeedbackCard";

import ava1 from "../../../images/avatars/1.jpg";
import ava2 from "../../../images/avatars/2.jpg";
import ava3 from "../../../images/avatars/3.jpg";

import { IFeedbackCardProps } from "./types";

import "./styles.scss";

const Feedback: FC<{}> = () => {
  const data: IFeedbackCardProps[] = [
    {
      img: ava1,
      name: "MATHIAS ESS",
      business: "Sofitel Hotels & Resorts",
      comment:
        "FineDine has given us the liberty to make changes on our menus anytime. Our staff enjoys FineDine, it’s very easy to use and convenient for everyone. It’s great for our guests too, as they can see what they’re ordering in advance.",
    },
    {
      img: ava2,
      name: "DAVE LUIS",
      business: " L’Artisan du Burger",
      comment:
        "Phenomenal app – gives you such control over your menu for adding/removing items, amending prices, adding specials etc without having to go to the massive expense of a reprint each time.",
    },
    {
      img: ava3,
      name: "LAURA BENITEZ",
      business: "Imperio Restaurante",
      comment:
        "I can create multiple menus and use them based on seasons or special occasion like mother’s day. Doing something similar with paper menus would be time and money consuming because it requires reprinting for even small changes on the menu. Our customers are fascinated by the variety!",
    },
  ];

  return (
    <div className="feedbacks p-5 w-100 mx-auto">
      <div className="d-flex align-items-center flex-wrap justify-content-between">
        {data.map((el) => (
          <FeedbackCard
            img={el.img}
            name={el.name}
            business={el.business}
            comment={el.comment}
            key={el.name}
          />
        ))}
      </div>
    </div>
  );
};

export default Feedback;
