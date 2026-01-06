import React, { PureComponent } from "react";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Link, RouteComponentProps } from "react-router-dom";
import Button from "reactstrap-button-loader";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import Validators from "utils/validators";

import UserStore from "stores/UserStore";
import RestaurantStore from "stores/RestaurantStore";

import AuthService from "services/AuthService";

class Login extends PureComponent<RouteComponentProps> {
  static initialValues: ISignInData = {
    email: "",
    password: "",
  };

  static schema = Yup.object().shape<ISignInData>({
    email: Validators.email,
    password: Validators.password,
  });

  onSubmit = async (
    values: ISignInData,
    { setErrors }: FormikHelpers<ISignInData>
  ) => {
    const { history } = this.props;

    try {
      const user = await AuthService.signIn(values);

      await this.loadRestaurant(user);
      UserStore.setData(user);

      history.replace("/admin/dashboard");
    } catch (err) {
      setErrors({ error: "Хибна електронна адреса або пароль" } as any);
    }
  };

  private async loadRestaurant(user: IUser) {
    try {
      await RestaurantStore.loadByOwnerId(user._id);
    } catch {}
  }

  render() {
    return (
      <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="8">
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <Formik
                      initialValues={Login.initialValues}
                      onSubmit={this.onSubmit}
                      validationSchema={Login.schema}
                    >
                      {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                      }) => (
                        <CForm onSubmit={handleSubmit}>
                          <h1>Увійти</h1>
                          <p className="text-muted">
                            Введіть дані вашого облікового запису
                          </p>
                          <CInputGroup>
                            <CInputGroupPrepend>
                              <CInputGroupText>
                                <CIcon name="cil-user" />
                              </CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput
                              type="text"
                              placeholder="Електронна адреса"
                              autoComplete="email"
                              name="email"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.email}
                            />
                          </CInputGroup>
                          <div className="input-error">
                            {touched.email && errors?.email}
                          </div>

                          <CInputGroup className="mt-3">
                            <CInputGroupPrepend>
                              <CInputGroupText>
                                <CIcon name="cil-lock-locked" />
                              </CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput
                              type="password"
                              placeholder="Пароль"
                              name="password"
                              autoComplete="current-password"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.password}
                            />
                          </CInputGroup>
                          <div className="input-error">
                            {touched.password && errors?.password}
                          </div>
                          <div className="login-input-incorrect">
                            {errors["error"]}
                          </div>
                          <CRow className="mt-4">
                            <CCol xs="6">
                              <Button
                                disabled={isSubmitting}
                                color="primary"
                                className="px-4"
                                type="submit"
                                loading={isSubmitting}
                              >
                                Увійти
                              </Button>
                            </CCol>
                            <CCol xs="6" className="text-right register-btn">
                              <Link to="/admin/register">
                                <Button
                                  color="link"
                                  className="px-0"
                                  loading={isSubmitting}
                                >
                                  Зареєструватись
                                </Button>
                              </Link>
                            </CCol>
                          </CRow>
                        </CForm>
                      )}
                    </Formik>
                  </CCardBody>
                </CCard>
                <CCard
                  className="text-white bg-primary py-5 d-md-down-none"
                  style={{ width: "44%" }}
                >
                  <CCardBody className="text-center">
                    <div>
                      <h2>Новий користувач?</h2>
                      <p>
                        Створіть обліковий запис в нашій системі для того, щоб
                        почати створювати онлайн меню та приймати замовлення по
                        QR коду
                      </p>
                      <Link to="/admin/register">
                        <CButton
                          color="primary"
                          className="mt-3"
                          active
                          tabIndex={-1}
                        >
                          Зареєструватись!
                        </CButton>
                      </Link>
                    </div>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    );
  }
}

export default Login;
