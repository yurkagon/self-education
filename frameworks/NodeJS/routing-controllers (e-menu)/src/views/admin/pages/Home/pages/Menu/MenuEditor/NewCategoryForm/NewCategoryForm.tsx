import React, { PureComponent } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { CForm, CInputGroup, CInput, CRow, CCol, CButton } from "@coreui/react";

import { INewCategoryFormProps, INewCategoryFormFields } from "./types";

class NewCategoryForm extends PureComponent<INewCategoryFormProps> {
  static schema = Yup.object().shape<INewCategoryFormFields>({
    name: null,
  });

  static initialValues: INewCategoryFormFields = {
    name: "",
  };

  onSubmitHandler = (result: INewCategoryFormFields): void => {
    const { onSubmit } = this.props;
    onSubmit(result);
  };

  render() {
    return (
      <Formik
        initialValues={NewCategoryForm.initialValues}
        onSubmit={this.onSubmitHandler}
        validationSchema={NewCategoryForm.schema}
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
            <CInputGroup>
              <CInput
                type="text"
                placeholder="Назва категорії"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
            </CInputGroup>
            <div className="input-error">{touched.name && errors?.name}</div>

            <CRow className="mt-4">
              <CCol xs="6">
                <CButton
                  disabled={isSubmitting}
                  color="primary"
                  className="px-4"
                  type="submit"
                >
                  Додати
                </CButton>
              </CCol>
            </CRow>
          </CForm>
        )}
      </Formik>
    );
  }
}

export default NewCategoryForm;
