import React, { PureComponent } from "react";
import isEqual from "lodash/isEqual";
import { Formik } from "formik";
import { computed } from "mobx";
import { observer } from "mobx-react";
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

import AuthService from "services/AuthService";
import UserStore from "stores/UserStore";

import { IMyUserFormFields } from "./types";

@observer
class UserForm extends PureComponent {
  @computed get initialValues(): IMyUserFormFields {
    return {
      first_name: UserStore.data.first_name,
      last_name: UserStore.data.last_name,
      email: UserStore.data.email,
      phone: UserStore.data.phone,
    };
  }

  private static schema = Yup.object().shape<IMyUserFormFields>({
    first_name: Validators.fistName,
    last_name: Validators.lastName,
    email: Validators.email,
    phone: Validators.phone,
  });

  private onSubmit = async (values: IMyUserFormFields) => {
    try {
      const data = this.interceptData(values);

      const user = await AuthService.updateProfile(data);

      UserStore.setData(user);
    } catch {}
  };

  private interceptData(values: IMyUserFormFields): Partial<IUser> {
    const { email, ...data } = values;

    return data;
  }

  render() {
    return (
      <Formik
        initialValues={this.initialValues}
        onSubmit={this.onSubmit}
        validationSchema={UserForm.schema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => {
          const isSameValues = isEqual(this.initialValues, values);

          return (
            <CCard>
              <CCardHeader>Редагувати дані профілю</CCardHeader>

              <CCardBody className="p-4">
                <CForm onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <CInputGroup>
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
                  </div>
                  <div className="mb-3">
                    <CInputGroup>
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
                  </div>
                  <div className="mb-3">
                    <CInputGroup>
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-at" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        readOnly
                        type="text"
                        name="email"
                        placeholder="Електронна адреса"
                        autoComplete="email"
                        value={values.email}
                      />
                    </CInputGroup>
                  </div>
                  <div className="mb-3">
                    <CInputGroup>
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
                  </div>
                  <Button
                    disabled={isSubmitting || isSameValues}
                    loading={isSubmitting}
                    color="primary"
                    type="submit"
                    block
                  >
                    Оновити
                  </Button>
                </CForm>
              </CCardBody>
            </CCard>
          );
        }}
      </Formik>
    );
  }
}

export default UserForm;
