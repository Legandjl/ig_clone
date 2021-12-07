import { useCallback, useEffect } from "react";
import Cropper from "react-easy-crop";
import { useContext, useState } from "react/cjs/react.development";
import { FileContext } from "../filepicker/FileContext";
import SubmitLoader from "../loaders/SubmitLoader";
import "./Cropper.css";

//css needs refactor

import CropImg from "./ImageCropper";

const CropTool = (props) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [cropFinal, setCropFinal] = useState(false);
  const [currentCrop, setCurrentCrop] = useState({});
  const { toggleCrop } = useContext(FileContext);
  const [attemptingUpload, setAttemptingUpload] = useState(false);
  const CONTAINER_MARGIN = "2.2em";

  const [loadImage] = CropImg();

  useEffect(() => {
    const uploadFile = async () => {
      setAttemptingUpload(true);
      await loadImage(currentCrop, props.image);
      toggleCrop();
    };
    if (cropFinal && !attemptingUpload) {
      uploadFile();
    }
  }, [
    attemptingUpload,
    cropFinal,
    currentCrop,
    loadImage,
    props.image,
    toggleCrop,
  ]);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCurrentCrop(croppedAreaPixels);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        backgroundColor: "black",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgb(0,0,0, 0.6)",
      }}
    >
      <div
        style={{
          width: 500,
          minHeight: 500,
          position: "fixed",
          left: "50%",
          transform: "translate(-50%, 0)",
          top: "15%",
          display: "grid",
          gridTemplateRows: "auto 1fr auto",
          backgroundColor: "#FAFAFA",
          borderLeft: "none",
          borderRight: "none",
          boxShadow: "box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}
      >
        <div
          style={{
            height: CONTAINER_MARGIN,
            gridRow: 1,
            textAlign: "center",
            marginBottom: 5,
            display: "grid",
            alignItems: "center",
            backgroundColor: "#D2D2CF",
            gridTemplateColumns: "1fr auto 1fr",
          }}
        >
          <p
            style={{
              fontWeight: "bold",
              fontSize: "1.4em",
              gridColumn: 2,
              justifySelf: "center",
              color: " #0095f6",
            }}
          ></p>
          <i
            style={{
              alignSelf: "start",
              fontSize: "1.6em",
              marginRight: 4,
              marginTop: 4,
              gridColumn: 3,
              justifySelf: "end",
            }}
            className="ri-close-line"
            onClick={toggleCrop}
          ></i>
        </div>{" "}
        <div
          style={{
            position: "relative",
            gridRow: 2,
            width: "100%",
            display: "grid",
          }}
        >
          {attemptingUpload ? (
            <SubmitLoader />
          ) : (
            <Cropper
              image={props.image}
              crop={crop}
              zoom={zoom}
              aspect={1 / 1}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              style={{ cropAreaStyle: { boxShadow: "none" } }}
            />
          )}
        </div>
        <div
          style={{
            gridRow: 3,
            height: CONTAINER_MARGIN,
            backgroundColor: "#D2D2CF",
            marginTop: 5,

            display: "grid",
          }}
        >
          <i
            style={{
              fontSize: "1.6em",
              justifySelf: "end",
              alignSelf: "center",
              marginRight: 6,
              color: cropFinal && "#E0E0E2",
            }}
            className="ri-arrow-right-circle-fill"
            onClick={() => {
              if (cropFinal) {
                return;
              }
              setCropFinal(true);
            }}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default CropTool;
