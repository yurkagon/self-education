import React, { PureComponent } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import Button from "reactstrap-button-loader";
import Validators from "utils/validators";

import { IMyPasswordFormFields } from "./types";

class PasswordForm extends PureComponent {
  private static schema = Yup.object().shape<IMyPasswordFormFields>({
    old_password: Validators.oldPassword,
    new_password: Validators.newPassword,
    confirm_password: Validators.confirmPassword,
  });

  render() {
    const initialValues: IMyPasswordFormFields = {
      old_password: "",
      new_password: "",
      confirm_password: "",
    };
    return (
      <Formik
        initialValues={initialValues}
        onSubmit={() => {
          console.error(initialValues);
        }}
        validationSchema={PasswordForm.schema}
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
          <div>
            <CCard>
              <CCardHeader>Редагувати пароль</CCardHeader>
              <CCardBody>
                <CForm onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <CInputGroup>
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="password"
                        name="old_password"
                        placeholder="Старий пароль"
                        autoComplete="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.old_password}
                      />
                    </CInputGroup>
                    <div className="input-error">
                      {touched.old_password && errors?.old_password}
                    </div>
                  </div>
                  <div className="mb-3">
                    <CInputGroup>
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="password"
                        name="new_password"
                        placeholder="Пароль"
                        autoComplete="new-password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.new_password}
                      />
                    </CInputGroup>
                    <div className="input-error">
                      {touched.new_password && errors?.new_password}
                    </div>
                  </div>
                  <div className="mb-3">
                    <CInputGroup>
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="password"
                        name="confirm_password"
                        placeholder="Підтвердь пароль"
                        autoComplete="new-password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.confirm_password}
                      />
                    </CInputGroup>
                    <div className="input-error ">
                      {touched.confirm_password && errors?.confirm_password}
                    </div>
                  </div>
                  <Button
                    className="mb-3"
                    disabled={isSubmitting}
                    loading={isSubmitting}
                    color="success"
                    type="submit"
                    block
                  >
                    Змінити пароль
                  </Button>
                </CForm>
              </CCardBody>
            </CCard>
          </div>
        )}
      </Formik>
    );
  }
}

export default PasswordForm;
