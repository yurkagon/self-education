import React, { PureComponent } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { CForm, CInputGroup, CInput, CRow, CCol, CButton } from "@coreui/react";

import { INewDishFormFields, INewDishFormProps } from "./types";

class NewDishForm extends PureComponent<INewDishFormProps> {
  static schema = Yup.object().shape<INewDishFormFields>({
    name: null,
    description: null,
    price: null,
  });

  static initialValues: INewDishFormFields = {
    name: { ua: "" },
    description: "",
    price: 0,
  };

  onSubmitHandler = (result: INewDishFormFields): void => {
    const { onSubmit } = this.props;
    onSubmit(result);
  };

  render() {
    return (
      <Formik
        initialValues={NewDishForm.initialValues}
        onSubmit={this.onSubmitHandler}
        validationSchema={NewDishForm.schema}
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
          <CForm onSubmit={handleSubmit} className="m-4">
            <CInputGroup>
              <CInput
                type="text"
                placeholder="Назва страви"
                name="name.ua"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name.ua}
              />
            </CInputGroup>
            <div className="input-error">{touched.name && errors?.name}</div>

            <CInputGroup className="mt-3">
              <CInput
                type="text"
                placeholder="Опис"
                name="description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
              />
            </CInputGroup>
            <div className="input-error">
              {touched.description && errors?.description}
            </div>

            <CInputGroup className="mt-3">
              <CInput
                type="number"
                placeholder="Ціна"
                name="price"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.price}
              />
            </CInputGroup>
            <div className="input-error">{touched.price && errors?.price}</div>

            <CRow className="mt-4">
              <CCol xs="6">
                <CButton
                  disabled={isSubmitting}
                  color="primary"
                  className="px-4"
                  type="submit"
                >
                  Додати страву
                </CButton>
              </CCol>
            </CRow>
          </CForm>
        )}
      </Formik>
    );
  }
}

export default NewDishForm;
