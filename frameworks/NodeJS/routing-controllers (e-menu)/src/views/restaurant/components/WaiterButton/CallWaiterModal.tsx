import React, { FC } from "react";
import { Modal } from "reactstrap";
import Ripples from "react-ripples";
import classnames from "classnames";

import CloseButton from "../CloseButton";
import PrimaryButton from "../PrimaryButton";

import { ICallWaiterModalProps } from "./types";

const CallWaiterModal: FC<ICallWaiterModalProps> = ({
  isOpen,
  onCall,
  callType,
  close,
  setCallType,
}) => (
  <Modal isOpen={isOpen} toggle={close} centered className="restaurant-view">
    <div className="position-relative">
      <CloseButton className="position-absolute close-btn" onClick={close} />

      <h1 className="call-waiter-header">Бажаєте викликати офіціанта?</h1>
      <div className="choice-buttons">
        <Ripples
          className={classnames("button", {
            active: callType === "order",
          })}
          onClick={() => setCallType("order")}
        >
          Замовлення
        </Ripples>
        <Ripples
          className={classnames("button", {
            active: callType === "bill",
          })}
          onClick={() => setCallType("bill")}
        >
          Рахунок
        </Ripples>
      </div>
      <div className="call-waiter-btn">
        <PrimaryButton
          onClick={() => {
            if (callType) onCall();
          }}
        >
          Викликати
        </PrimaryButton>
      </div>
    </div>
  </Modal>
);

export default CallWaiterModal;
