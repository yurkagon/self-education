import React, { PureComponent } from "react";

import {
  CForm,
  CInput,
  CRow,
  CCol,
  CContainer,
  CFormGroup,
  CLabel,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
} from "@coreui/react";
import { RouteComponentProps } from "react-router-dom";

import { observer } from "mobx-react";

import Validators from "utils/validators";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import Configuration from "utils/Configuration";

import RestaurantService from "services/RestaurantService";
import RestaurantStore from "stores/RestaurantStore";

import UserStore from "stores/UserStore";

import { IRestaurantEditingForm } from "./types";

@observer
class MyRestaurant extends PureComponent<RouteComponentProps> {
  static schema = Yup.object().shape<IRestaurantEditingForm>({
    name_ua: Validators.names,
    name_en: Validators.names,
    slug: Validators.slug,
    table_count: Validators.table_count,
  });

  private config = new Configuration();

  private interceptFormData(
    values: IRestaurantEditingForm
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

  public onSubmit = async (
    values: IRestaurantEditingForm,
    { setErrors }: FormikHelpers<IRestaurantEditingForm>
  ) => {
    const { history } = this.props;

    try {
      const dto = this.interceptFormData(values);

      const restaurant = await RestaurantService.update(
        RestaurantStore.data._id,
        dto
      );
      RestaurantStore.setData(restaurant);

      history.push("/admin/dashboard");
    } catch (err) {
      const isSlugError = err?.response?.data?.message?.keyValue?.slug;

      if (isSlugError) {
        setErrors({ slug: "Такий слаг вже зайнятий" });
      }
    }
  };

  render() {
    const initialValues: IRestaurantEditingForm = {
      name_ua: RestaurantStore.data.name.ua,
      name_en: RestaurantStore.data.name.en,
      slug: RestaurantStore.data.slug,
      table_count: RestaurantStore.data.table_count,
    };

    return (
      <CCard>
        <CCardHeader>Редагування ресторану</CCardHeader>
        <CCardBody>
          <CContainer>
            <CRow>
              <CCol sm="12">
                <Formik
                  initialValues={initialValues}
                  onSubmit={this.onSubmit}
                  validationSchema={MyRestaurant.schema}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
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

                      <CButton color="primary" type="submit">
                        Зберегти
                      </CButton>
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

export default MyRestaurant;
