import React from "react";
import { CCol, CContainer, CRow } from "@coreui/react";

const Page500 = () => (
  <div className="c-app c-default-layout flex-row align-items-center">
    <CContainer>
      <CRow className="justify-content-center">
        <CCol md="6">
          <span className="clearfix">
            <h1 className="float-left display-3 mr-4">500</h1>
            <h4 className="pt-3">Х'юстон, у нас проблеми!</h4>
            <p className="text-muted float-left">
              Сторінка, яка вам необхідна, тимчасово недосяжна.
            </p>
          </span>
        </CCol>
      </CRow>
    </CContainer>
  </div>
);

export default Page500;
