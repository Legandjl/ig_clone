import { useCallback, useEffect, useRef, useContext, useState } from "react";
import Cropper from "react-easy-crop";
import { useNavigate } from "react-router";
import useMountCheck from "../../hooks/useMountCheck";
import { FileContext } from "../filepicker/FileContext";
import SubmitLoader from "../loaders/SubmitLoader";
import "./Cropper.css";

//css needs refactor

import CropImg from "./useImageCrop";

const CropTool = (props) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [cropFinal, setCropFinal] = useState(false);
  const [currentCrop, setCurrentCrop] = useState({});
  const { toggleCrop } = useContext(FileContext);
  const [attemptingUpload, setAttemptingUpload] = useState(false);
  const CONTAINER_MARGIN = "2.2em";

  const [loadImage] = CropImg();
  const nav = useNavigate();

  const [isMounted] = useMountCheck();

  useEffect(() => {
    const uploadFile = async () => {
      setAttemptingUpload(true);
      const ref = await loadImage(currentCrop, props.image);
      if (isMounted.current) {
        toggleCrop();
        nav(`/p/${ref}`, { replace: true });
      }
    };
    if (cropFinal && !attemptingUpload) {
      uploadFile();
    }
  }, [
    attemptingUpload,
    cropFinal,
    currentCrop,
    isMounted,
    loadImage,
    nav,
    props,
    toggleCrop,
  ]);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCurrentCrop(croppedAreaPixels);
  }, []);

  return (
    <div className={"backgroundCover"}>
      <div className={"cropContainer"}>
        <div className={"cropContainerHeader"}>
          <i className="ri-close-line" onClick={toggleCrop}></i>
        </div>{" "}
        <div className={"cropContainerInner"}>
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
