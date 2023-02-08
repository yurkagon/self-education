import React, { Component, createRef } from "react";
import { observer } from "mobx-react";
import { Button } from "reactstrap";
import JSZip from "jszip";
import { saveAs } from "file-saver";

import RestaurantStore from "stores/RestaurantStore";

import { CCardFooter, CCol, CRow, CCard, CCardBody } from "@coreui/react";

import QRcard from "./QRcard";

@observer
class TableQRcodes extends Component {
  private codesWrapper = createRef<HTMLDivElement>();

  private downloadZip = async () => {
    const dataList = this.getCanvasDataList();

    const zip = new JSZip();

    dataList.forEach((tableData) => {
      const filename = `${RestaurantStore.data.slug}-table-${tableData.number}.png`;

      zip.file(filename, tableData.data, { base64: true });
    });

    const blob = await zip.generateAsync({ type: "blob" });

    saveAs(blob, `qr-codes-${RestaurantStore.data.slug}.zip`);
  };

  private getCanvasDataList(): {
    data: string;
    number: string;
  }[] {
    const canvasList = Array.from(
      this.codesWrapper.current.querySelectorAll(".hidden canvas")
    ) as HTMLCanvasElement[];

    const dataList = canvasList.map((canvas) => ({
      data: canvas.toDataURL().split(";base64,")[1],
      number: canvas.getAttribute("table-number"),
    }));

    return dataList;
  }

  render() {
    return (
      <CCard>
        <CCardBody>
          <CRow>
            <CCol>
              <h4 className="card-title mb-0">QR-коди для столиків</h4>
              <div className="small text-muted">
                Завантажте їх та наклейте або покладіть на столик вашого
                ресторану
              </div>
            </CCol>
          </CRow>
        </CCardBody>

        <CCardFooter>
          <Button onClick={this.downloadZip} color="success">
            Завантажити архівом .zip
          </Button>

          <CRow className="text-center">
            <div
              ref={this.codesWrapper}
              className="d-flex justify-content-between flex-wrap"
            >
              {Array.from({
                length: RestaurantStore.data.table_count,
              }).map((_, index) => (
                <QRcard
                  number={index + 1}
                  url={`${index + 1}`}
                  // eslint-disable-next-line
                  key={index}
                />
              ))}
            </div>
          </CRow>
        </CCardFooter>
      </CCard>
    );
  }
}
export default TableQRcodes;
