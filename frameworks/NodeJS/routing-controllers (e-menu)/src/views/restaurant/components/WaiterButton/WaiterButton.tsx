import React, { FC, useState } from "react";

import RingButton from "../RingButton";

import CallWaiterModal from "./CallWaiterModal";
import AcceptModal from "./AcceptModal";

import { IWaiterCallType } from "./types";

import "./style.scss";

const WaiterButton: FC<{}> = () => {
  const [isCallWaiterModalOpen, setWaiterCallModal] = useState(false);
  const openWaiterModal = () => setWaiterCallModal(true);
  const closeWaiterModal = () => {
    setWaiterCallModal(false);
    setCallType(null);
  };

  const [callType, setCallType] = useState<IWaiterCallType>(null);

  const [isSuccessModalOpen, setSuccessModal] = useState(false);
  const openSuccessModal = () => setSuccessModal(true);
  const closeSuccessModal = () => setSuccessModal(false);

  return (
    <div className="waiter-button">
      <RingButton onClick={openWaiterModal} />

      <CallWaiterModal
        isOpen={isCallWaiterModalOpen}
        close={closeWaiterModal}
        onCall={() => {
          closeWaiterModal();
          openSuccessModal();
        }}
        callType={callType}
        setCallType={setCallType}
      />

      <AcceptModal isOpen={isSuccessModalOpen} close={closeSuccessModal} />
    </div>
  );
};

export default WaiterButton;
