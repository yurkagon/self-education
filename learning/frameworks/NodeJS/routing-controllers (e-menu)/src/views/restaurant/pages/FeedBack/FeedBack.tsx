import React, { FC, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Ripples from "react-ripples";
import { Modal } from "reactstrap";

import { observer } from "mobx-react";

import { Form, Formik, Field } from "formik";

import BackButton from "views/restaurant/components/BackButton";
import PrimaryButton from "views/restaurant/components/PrimaryButton";

import FeedbackService from "services/FeedbackService";

import RestaurantStore from "stores/RestaurantStore";

import { ReactComponent as VeryBad } from "../../../../assets/icons/rates/very_bad.svg";
import { ReactComponent as Bad } from "../../../../assets/icons/rates/bad.svg";
import { ReactComponent as Normal } from "../../../../assets/icons/rates/normal.svg";
import { ReactComponent as Good } from "../../../../assets/icons/rates/good.svg";
import { ReactComponent as VeryGood } from "../../../../assets/icons/rates/very_good.svg";

import { ReactComponent as ModalHeartIcon } from "../../assets/icons/hands_with_heart.svg";

import { IMark } from "./types";

import "./style.scss";

const FeedBack: FC<{}> = () => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const onSubmit = async (values: Partial<IFeedback>) => {
    try {
      await FeedbackService.create({
        mark: values.mark,
        feedback: values.feedback,
        restaurantId: RestaurantStore.data._id,
      });

      toggle();
    } catch (err) {
      console.error(err);
    }
  };

  const { restaurant_slug } = useParams<{ restaurant_slug: string }>();
  const history = useHistory();

  const initialValues: Partial<IFeedback> = {
    mark: null,
    feedback: "",
  };

  return (
    <div>
      <BackButton />
      <div className="feedback-page">
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({
            values,
            handleChange,
            handleSubmit,
            isSubmitting,
            setFieldValue,
          }) => {
            return (
              <Form onSubmit={handleSubmit}>
                <div className="rateboard">
                  <p className="text">залишити відгук</p>
                  <div className="rates">
                    {marks.map((el) => (
                      <Ripples key={el.value} className="ripple-wrapper">
                        <div
                          className="rate"
                          onClick={() => setFieldValue("mark", el.value)}
                          style={{
                            backgroundColor:
                              values.mark === el.value ? el.color : null,
                          }}
                        >
                          <el.icon />
                        </div>
                      </Ripples>
                    ))}
                  </div>
                </div>
                <div className="textarea">
                  <Field
                    as="textarea"
                    name="feedback"
                    placeholder="Додаткові побажання"
                    className="field"
                    onChange={handleChange}
                    value={values.feedback}
                  />
                </div>
                <PrimaryButton
                  type="submit"
                  className="send"
                  disabled={isSubmitting}
                >
                  Надіслати
                </PrimaryButton>
              </Form>
            );
          }}
        </Formik>
      </div>
      <Modal
        className="restaurant-view"
        isOpen={modal}
        toggle={toggle}
        centered
      >
        <div className="feedback-modal">
          <ModalHeartIcon />
          <p className="main-text text-center">Дякуємо за відгук!</p>
          <p className="second-text text-center">Ми стаємо краще для вас</p>
          <PrimaryButton
            className="accept"
            onClick={() => history.push(`/r/${restaurant_slug}`)}
          >
            Прийняти
          </PrimaryButton>
        </div>
      </Modal>
    </div>
  );
};

const marks: IMark[] = [
  { value: 1, color: "#a9141466", icon: VeryBad },
  { value: 2, color: "#c2431966", icon: Bad },
  { value: 3, color: "#dbbb1a66", icon: Normal },
  { value: 4, color: "#7cac1666", icon: Good },
  { value: 5, color: "#28813666", icon: VeryGood },
];

export default observer(FeedBack);
