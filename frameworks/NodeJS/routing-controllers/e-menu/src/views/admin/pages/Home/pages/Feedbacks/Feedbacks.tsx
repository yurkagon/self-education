import React, { Component } from "react";
import { observer } from "mobx-react";

import {
  CContainer,
  CCol,
  CRow,
  CCard,
  CCardBody,
  CCardHeader,
} from "@coreui/react";

import RestaurantStore from "stores/RestaurantStore";

import FeedbackService from "services/FeedbackService";

import Spinner from "../../../../components/Spinner";

import Feedback from "./Feedback";

@observer
class Feedbacks extends Component {
  state = {
    feedbacks: null,
  };

  async componentDidMount() {
    try {
      const feedbacks = await FeedbackService.getAllByRestaurantId(
        RestaurantStore.data?._id
      );
      this.setState({ feedbacks });
    } catch (err) {
      console.error(err);
    }
  }

  componentWillUnmount() {
    this.setState({ feedbacks: null });
  }

  render() {
    const { feedbacks } = this.state;
    return (
      <CCard>
        <CCardHeader>Відгуки</CCardHeader>

        <CCardBody>
          <CContainer>
            <CRow className="bg-secondary text-dark">
              <CCol xs="4" className="py-3">
                Оцінка
              </CCol>
              <CCol xs="4" className="py-3">
                Відгук
              </CCol>
              <CCol xs="4" className="py-3">
                Дата
              </CCol>
            </CRow>
            {!feedbacks && <Spinner />}
            {feedbacks &&
              feedbacks.map((items) => (
                <Feedback key={items._id} data={items} />
              ))}
            {feedbacks && feedbacks.length === 0 && (
              <p className="text-muted mt-4">Наразі відгуків немає :(</p>
            )}
          </CContainer>
        </CCardBody>
      </CCard>
    );
  }
}

export default Feedbacks;
