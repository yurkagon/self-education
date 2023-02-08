import React, { Fragment, FC } from "react";
import { CardImg, Card, CardText } from "reactstrap";
import SecondaryButton from "../SecondaryButton";

const Solution: FC<{}> = () => (
  <Fragment>
    <Card className="solutions col-md-5 col-12 p-5 my-3 shadow p-3 mb-5 bg-white rounded">
      <CardImg
        top
        width="100%"
        src="https://www.finedinemenu.com/wp-content/uploads/2019/11/tablet.jpg"
        alt="client app"
      />
      <CardText>
        <h4 className="mb-3">FineDine Tablet Menu</h4>
        <p>Increase sales up to 50-60% with tablet menu</p>
        <p>Update your menu with one click</p>
        <p>Perfect images & videos for menu items</p>
        <p>Fast, error-free ordering process</p>
        <p>Promote items, track customer behavior</p>
        <p>Collect feedback easily</p>
      </CardText>
      <SecondaryButton>Learn more →</SecondaryButton>
    </Card>
  </Fragment>
);

export default Solution;
