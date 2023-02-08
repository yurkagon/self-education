import React, { useState, useEffect, FC } from "react";
import { Link, withRouter } from "react-router-dom";
import AuthService from "services/AuthService";

// @ts-ignore
import ReactLoading from "react-loading";

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CRow,
} from "@coreui/react";

import { IStatus, IAccountConfirmProps } from "./types";

const AccountConfirm: FC<IAccountConfirmProps> = ({ match }) => {
  const [state, setState] = useState<IStatus>("pending");
  const { token } = match.params;

  useEffect(() => {
    (async () => {
      try {
        await AuthService.confirmEmail(token);
        setState("success");
      } catch (err) {
        setState("failed");
      }
    })();
  }, [token]);

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              {state === "pending" && (
                <ReactLoading
                  className="mx-auto"
                  type="bubbles"
                  color="blue"
                  height={100}
                  width={100}
                />
              )}
              {state === "success" && (
                <CCard className="p-4">
                  <CCardBody>
                    <h1>Ваш аккаунт активовано.</h1>
                    <p>Тепер ви можете увійти в систему.</p>
                    <Link to="/admin/login">
                      <CButton color="primary" className="px-4" type="submit">
                        Увійти
                      </CButton>
                    </Link>
                  </CCardBody>
                </CCard>
              )}
              {state === "failed" && (
                <CCard className="p-4">
                  <CCardBody>
                    <h1>Упс! Щось пішло не так.</h1>
                    <Link to="/admin/login">
                      <CButton color="link">
                        Повернутись на сторінку входу в систему
                      </CButton>
                    </Link>
                  </CCardBody>
                </CCard>
              )}
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};
export default withRouter(AccountConfirm);
