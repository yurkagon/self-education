import React, { PureComponent } from "react";
import {
  CForm,
  CInput,
  CRow,
  CCol,
  CContainer,
  CFormGroup,
  CLabel,
  CCard,
  CCardBody,
  CCardHeader,
} from "@coreui/react";

import Button from "reactstrap-button-loader";
import { RouteComponentProps } from "react-router-dom";
import Validators from "utils/validators";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import Configuration from "utils/Configuration";

import RestaurantService from "services/RestaurantService";
import RestaurantStore from "stores/RestaurantStore";

import UserStore from "stores/UserStore";

import { IRestaurantCreatingForm } from "./types";

class AddRestaurant extends PureComponent<RouteComponentProps> {
  static initialValues: IRestaurantCreatingForm = {
    name_ua: "",
    name_en: "",
    slug: "",
    table_count: 3,
  };

  static schema = Yup.object().shape<IRestaurantCreatingForm>({
    name_ua: Validators.names,
    name_en: Validators.names,
    slug: Validators.slug,
    table_count: Validators.table_count,
  });

  private config = new Configuration();

  public onSubmit = async (
    values: IRestaurantCreatingForm,
    { setErrors }: FormikHelpers<IRestaurantCreatingForm>
  ) => {
    const { history } = this.props;

    try {
      const dto = this.interceptFormData(values);

      const restaurant = await RestaurantService.create(dto);
      RestaurantStore.setData(restaurant);

      history.push("/admin/dashboard");
    } catch (err) {
      const isSlugError = err?.response?.data?.message?.keyValue?.slug;

      if (isSlugError) {
        setErrors({ slug: "Такий слаг вже зайнятий" });
      }
    }
  };

  private interceptFormData(
    values: IRestaurantCreatingForm
  ): Partial<IRestaurant> {
    return {
      name: {
        ua: values.name_ua,
        en: values.name_en,
      },
      ownerId: UserStore.data._id,
      ...values,
    };
  }

  render() {
    return (
      <CCard>
        <CCardHeader>Створення ресторану</CCardHeader>

        <CCardBody>
          <CContainer>
            <CRow>
              <CCol sm="12">
                <Formik
                  initialValues={AddRestaurant.initialValues}
                  onSubmit={this.onSubmit}
                  validationSchema={AddRestaurant.schema}
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
                      <CFormGroup>
                        <CLabel>Введіть назву українською</CLabel>
                        <CInput
                          type="text"
                          id="nf-name-ua"
                          name="name_ua"
                          placeholder="Гарний ресторан"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name_ua}
                        />
                      </CFormGroup>
                      <div className="input-error">
                        {touched.name_ua && errors?.name_ua}
                      </div>

                      <CFormGroup>
                        <CLabel>Введіть назву англійською</CLabel>
                        <CInput
                          type="text"
                          id="nf-name-en"
                          name="name_en"
                          placeholder="A good restaurant"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name_en}
                        />
                      </CFormGroup>
                      <div className="input-error">
                        {touched.name_en && errors?.name_en}
                      </div>

                      <CFormGroup>
                        <CLabel htmlFor="nf-slug">Slug ресторану</CLabel>
                        <CInput
                          type="textarea"
                          id="nf-slug"
                          name="slug"
                          placeholder="Введіть slug ресторану"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.slug}
                        />
                        {!values.slug && (
                          <small className="text-muted">
                            Вказує як буде виглядати посилання на ваш ресторан:
                            <p>{this.config.baseUrl}r/awesome_restaurant</p>
                          </small>
                        )}

                        {Boolean(values.slug) && (
                          <small className="text-muted">
                            Посилання на ваш ресторан виглядатиме ось так:
                            <p>
                              {this.config.baseUrl}r/{values.slug}
                            </p>
                          </small>
                        )}
                      </CFormGroup>
                      <div className="input-error">
                        {touched.slug && errors?.slug}
                      </div>

                      <CFormGroup>
                        <CLabel htmlFor="nf-table-count">
                          Кількість столиків
                        </CLabel>
                        <CInput
                          type="number"
                          id="nf-table-count"
                          name="table_count"
                          placeholder="Введіть кількість столів"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.table_count}
                        />
                      </CFormGroup>
                      <div className="input-error">
                        {touched.table_count && errors?.table_count}
                      </div>

                      <Button
                        disabled={isSubmitting}
                        color="primary"
                        className="px-4"
                        type="submit"
                        loading={isSubmitting}
                      >
                        Створити
                      </Button>
                    </CForm>
                  )}
                </Formik>
              </CCol>
            </CRow>
          </CContainer>
        </CCardBody>
      </CCard>
    );
  }
}

export default AddRestaurant;
