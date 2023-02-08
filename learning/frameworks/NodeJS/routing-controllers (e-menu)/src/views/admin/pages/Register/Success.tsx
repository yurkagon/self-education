import React, { FC } from "react";
import { CContainer, CRow, CButton } from "@coreui/react";
import { Link } from "react-router-dom";

const Success: FC<{}> = () => (
  <CContainer className="align-items-center text-center">
    <CRow className="justify-content-center">
      <div className="clearfix">
        <h2>
          <b>Дякуємо за те що приєднались!</b>
        </h2>
        <h4 className="pt-3">
          Для активації аккаунту перейдіть на ваш <b>e-mail</b> та підтвердіть
          реєстрацію
        </h4>
      </div>
      <Link to="/admin/login">
        <CButton color="primary" className="px-4" type="submit">
          Увійти
        </CButton>
      </Link>
    </CRow>
  </CContainer>
);

export default Success;
