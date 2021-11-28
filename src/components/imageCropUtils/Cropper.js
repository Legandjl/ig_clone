import { useCallback } from "react";
import Cropper from "react-easy-crop";
import { useContext, useState } from "react/cjs/react.development";
import { FileContext } from "../filepicker/FileContext";
import { FirebaseContext } from "../firebase/FirebaseContext";
import CropImg from "./ImageCropper";

const CropTool = (props) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [cropFinal, setCropFinal] = useState(false);
  const { user } = useContext(FirebaseContext);
  const { isCropping, imageSrc } = useContext(FileContext);

  const [url, loadImage] = CropImg();

  const onCropComplete = useCallback(
    (croppedArea, croppedAreaPixels) => {
      console.log(croppedArea, croppedAreaPixels);

      if (setCropFinal) {
        loadImage(croppedArea, croppedAreaPixels, props.image).then(
          setCropFinal(false)
        );
      }
    },
    [loadImage, props.image]
  );

  return (
    <div
      style={{
        width: 500,
        height: 500,
        position: "fixed",
        backgroundColor: "black",
        top: "10%",
        left: "30%",
        display: "grid",
        gridTemplateRows: "1fr auto",
        border: "solid red 20px",
      }}
    >
      {" "}
      <div style={{ position: "relative", gridRow: 1 }}>
        <Cropper
          image={props.image}
          crop={crop}
          zoom={zoom}
          aspect={1 / 1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      <button
        style={{ gridRow: 2, height: 20, width: 20 }}
        onClick={() => {
          console.log("done");
          setCropFinal(true);
        }}
      ></button>
    </div>
  );
};

export default CropTool;
