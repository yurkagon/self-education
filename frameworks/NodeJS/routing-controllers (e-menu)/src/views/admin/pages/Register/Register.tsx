import React, { PureComponent } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Button from "reactstrap-button-loader";
import {
  CCard,
  CCardBody,
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

import AuthService from "services/AuthService";

import Success from "./Success";

import { IRegisterFormFields } from "./types";

class Register extends PureComponent {
  private static initialValues: IRegisterFormFields = {
    email: "",
    first_name: "",
    last_name: "",
    phone: "",
    password: "",
    confirm_password: "",
  };

  private static schema = Yup.object().shape<IRegisterFormFields>({
    email: Validators.email,
    first_name: Validators.fistName,
    last_name: Validators.lastName,
    phone: Validators.phone,
    password: Validators.password,
    confirm_password: Validators.confirmPassword,
  });

  state = {
    isDone: false,
  };

  onSubmit = async (values: IRegisterFormFields) => {
    try {
      await AuthService.signUp(values);

      this.setState({ isDone: true });
    } catch (err) {
      console.error(values);
    }
  };

  render() {
    const { isDone } = this.state;

    return (
      <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="9" lg="7" xl="6">
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  {!isDone && (
                    <Formik
                      initialValues={Register.initialValues}
                      onSubmit={this.onSubmit}
                      validationSchema={Register.schema}
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
                          <h1>Реєстрація</h1>
                          <p className="text-muted">
                            Створіть ваш обліковий запис
                          </p>
                          <CInputGroup className="mt-3">
                            <CInputGroupPrepend>
                              <CInputGroupText>
                                <CIcon name="cil-at" />
                              </CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput
                              type="text"
                              name="email"
                              placeholder="Електронна адреса"
                              autoComplete="email"
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
                                <CIcon name="cil-user" />
                              </CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput
                              type="text"
                              name="first_name"
                              placeholder="Ім'я"
                              autoComplete="first_name"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.first_name}
                            />
                          </CInputGroup>
                          <div className="input-error">
                            {touched.first_name && errors?.first_name}
                          </div>
                          <CInputGroup className="mt-3">
                            <CInputGroupPrepend>
                              <CInputGroupText>
                                <CIcon name="cil-user" />
                              </CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput
                              type="text"
                              name="last_name"
                              placeholder="Прізвище"
                              autoComplete="last_name"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.last_name}
                            />
                          </CInputGroup>
                          <div className="input-error">
                            {touched.last_name && errors?.last_name}
                          </div>
                          <CInputGroup className="mt-3">
                            <CInputGroupPrepend>
                              <CInputGroupText>
                                <CIcon name="cil-phone" />
                              </CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput
                              type="text"
                              name="phone"
                              placeholder="Телефон"
                              autoComplete="phone"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.phone}
                            />
                          </CInputGroup>
                          <div className="input-error">
                            {touched.phone && errors?.phone}
                          </div>
                          <CInputGroup className="mt-3">
                            <CInputGroupPrepend>
                              <CInputGroupText>
                                <CIcon name="cil-lock-locked" />
                              </CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput
                              type="password"
                              name="password"
                              placeholder="Пароль"
                              autoComplete="new-password"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.password}
                            />
                          </CInputGroup>
                          <div className="input-error">
                            {touched.password && errors?.password}
                          </div>
                          <CInputGroup className="mt-3">
                            <CInputGroupPrepend>
                              <CInputGroupText>
                                <CIcon name="cil-lock-locked" />
                              </CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput
                              type="password"
                              name="confirm_password"
                              placeholder="Підтвердіть пароль"
                              autoComplete="new-password"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.confirm_password}
                            />
                          </CInputGroup>
                          <div className="input-error mb-4">
                            {touched.confirm_password &&
                              errors?.confirm_password}
                          </div>
                          <Button
                            disabled={isSubmitting}
                            loading={isSubmitting}
                            color="success"
                            type="submit"
                            block
                          >
                            Зареєструватися
                          </Button>
                        </CForm>
                      )}
                    </Formik>
                  )}

                  {isDone && <Success />}
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    );
  }
}

export default Register;
