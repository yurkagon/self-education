import React, { FC } from "react";
import { CContainer, CCol, CRow } from "@coreui/react";

import moment from "moment";

import { ReactComponent as VeryBad } from "../../../../../../../assets/icons/rates/very_bad.svg";
import { ReactComponent as Bad } from "../../../../../../../assets/icons/rates/bad.svg";
import { ReactComponent as Normal } from "../../../../../../../assets/icons/rates/normal.svg";
import { ReactComponent as Good } from "../../../../../../../assets/icons/rates/good.svg";
import { ReactComponent as VeryGood } from "../../../../../../../assets/icons/rates/very_good.svg";

import { IFeedbackProps } from "./types";

const Feedback: FC<IFeedbackProps> = ({ data }) => (
  <CContainer>
    <CRow>
      <CCol xs="4" className="py-3">
        {(() => {
          switch (data.mark) {
            case 1:
              return <VeryBad />;
            case 2:
              return <Bad />;
            case 3:
              return <Normal />;
            case 4:
              return <Good />;
            case 5:
              return <VeryGood />;
            default:
              return undefined;
          }
        })()}
      </CCol>
      <CCol xs="4" className="py-3">
        <span>{data.feedback}</span>
      </CCol>
      <CCol xs="4" className="py-3">
        <span>{moment(data.createdAt).fromNow()}</span>
      </CCol>
    </CRow>
  </CContainer>
);

export default Feedback;
