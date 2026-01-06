import React, { FC, useState } from "react";
import { withRouter, RouteComponentProps, useParams } from "react-router-dom";
import BackButton from "../../components/BackButton";
import ToOrderDesk from "./ToOrderDesk";
import { ReactComponent as TextareaIcon } from "../../assets/icons/textarea_icon.svg";
import PrimaryButton from "../../components/PrimaryButton";

import "./style.scss";

const ToOrder: FC<RouteComponentProps> = ({ history }) => {
  const [inputValue, setInputValue] = useState();
  const handleValueChange = (e) => setInputValue(e.target.value);
  const { restaurant_slug } = useParams<{ restaurant_slug: string }>();
  const [dishes] = useState([
    {
      id: 1,
      image:
        "https://www.povarenok.ru/data/cache/2016aug/14/49/1675324_95318-710x550x.jpg",
      title: "Супчик",
      price: 120,
    },
    {
      id: 2,
      image:
        "https://www.flatironsquare.co.uk/content/_mobile/Food_Hero_Image.jpg",
      title: "Бульйончик",
      price: 120,
    },
    {
      id: 3,
      image:
        "https://www.flatironsquare.co.uk/content/_mobile/Food_Hero_Image.jpg",
      title: "Бульчик",
      price: 120,
    },
  ]);

  return (
    <div>
      <BackButton />
      <div className="to-order">
        <div>
          {dishes.map((category) => (
            <ToOrderDesk key={category.id} data={category} />
          ))}
        </div>
        <div className="textarea">
          <label className="text">
            <span className="label">Коментар до замовлення</span>
            <TextareaIcon />
          </label>
          <textarea
            value={inputValue}
            className="field"
            onChange={handleValueChange}
          />
        </div>
        <div className="to-order-container">
          <PrimaryButton
            onClick={() => history.push(`/r/${restaurant_slug}/cart`)}
          >
            Замовити
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default withRouter(ToOrder);
