import React, { FC } from "react";
import { Card, CardText } from "reactstrap";

import { IFeedbackCardProps } from "./types";

const FeedbackCard: FC<IFeedbackCardProps> = ({
  img,
  name,
  business,
  comment,
}) => (
  <Card className="feedback-card shadow-lg mx-auto p-4 mb-3 bg-white rounded col-12 col-sm-8 col-lg-3 mx-1">
    <div className="d-flex">
      <img src={img} alt="user avatar" className="avatar" />
      <div>
        <h5>{name}</h5>
        <h6>
          <i>{business}</i>
        </h6>
      </div>
    </div>
    <CardText className="mt-2 mb-0">
      <p>{comment}</p>
    </CardText>
  </Card>
);
export default FeedbackCard;
