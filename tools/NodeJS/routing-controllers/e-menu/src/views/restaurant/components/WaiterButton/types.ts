export type IWaiterCallType = "order" | "bill" | null;

interface IModal {
  isOpen: boolean;
  close: () => void;
}

export type IAcceptModalProps = IModal;

export interface ICallWaiterModalProps extends IModal {
  callType: IWaiterCallType;
  setCallType: (callType: IWaiterCallType) => void;
  onCall: () => void;
}
