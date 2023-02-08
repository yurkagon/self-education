import React, { createRef, Component } from "react";
import { QRCode, IProps as IQRCodeProps } from "react-qrcode-logo";
import { Button } from "reactstrap";
import { saveAs } from "file-saver";

import RestaurantStore from "stores/RestaurantStore";

import { IQRcodesProps } from "./types";

class QRcard extends Component<IQRcodesProps> {
  private wrapper = createRef<HTMLDivElement>();
  private hiddenLargeCanvas: HTMLCanvasElement;

  componentDidMount() {
    const { number } = this.props;

    this.hiddenLargeCanvas = this.wrapper.current.querySelector("canvas");

    this.hiddenLargeCanvas.setAttribute("table-number", number.toString());
  }

  private downloadImage = () => {
    const { number } = this.props;

    const filename = `${RestaurantStore.data.slug}-table-${number}.png`;

    saveAs(this.hiddenLargeCanvas.toDataURL(), filename);
  };

  render() {
    const { url, number } = this.props;

    const qrProps: IQRCodeProps = {
      value: url,
      logoImage: "/logo512.png",
      qrStyle: "squares",
    };

    return (
      <div className="d-flex flex-column m-2">
        <QRCode {...qrProps} />

        <p className="font-weight-bold display-4">{number}</p>

        <Button color="primary" className="m-2" onClick={this.downloadImage}>
          Завантажити
        </Button>

        <div className="hidden d-none" ref={this.wrapper}>
          <QRCode {...qrProps} size={2000} />
        </div>
      </div>
    );
  }
}

export default QRcard;
