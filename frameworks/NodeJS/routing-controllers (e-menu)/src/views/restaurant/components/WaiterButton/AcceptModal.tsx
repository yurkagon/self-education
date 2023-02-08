import React, { FC } from "react";
import { Modal } from "reactstrap";

import CloseButton from "../CloseButton";
import PrimaryButton from "../PrimaryButton";

import { ReactComponent as ThanksImage } from "../../assets/images/thanksForOrder.svg";

import { IAcceptModalProps } from "./types";

const AcceptModal: FC<IAcceptModalProps> = ({ isOpen, close }) => (
  <Modal isOpen={isOpen} toggle={close} centered className="restaurant-view">
    <div className="position-relative">
      <CloseButton className="position-absolute close-btn" onClick={close} />

      <div className="waiter-comming">
        <ThanksImage className="waiter-image" />
      </div>

      <h4 className="wait-waiter">
        Почекайте будь ласка: зараз до вас підійде офіціант.
      </h4>

      <div className="call-waiter-btn">
        <PrimaryButton onClick={close}>Прийняти</PrimaryButton>
      </div>
    </div>
  </Modal>
);

export default AcceptModal;
