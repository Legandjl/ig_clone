import { useContext, useEffect, useRef, useState } from "react";

import { FirebaseContext } from "../firebase/FirebaseContext";
import { ImageContext } from "../firebase/ImageContext";
import { FileContext } from "./FileContext";

const FilePicker = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [icon, setIcon] = useState("ri-add-box-line");
  const { uploadImage } = useContext(ImageContext);
  const { user } = useContext(FirebaseContext);

  const [image, setImage] = useState(null);
  const { isCropping, setCroppingImage } = useContext(FileContext);
  /*

    const img = URL.createObjectURL(e.target.files[0]);
    const toCrop = new Image();
    toCrop.src = img;
    setImage(toCrop);

  */
  const hiddenFileSelect = useRef(null);

  const handleFile = (e) => {
    setSelectedFile(() => {
      const img = URL.createObjectURL(e.target.files[0]);
      const toCrop = new Image();
      toCrop.src = img;
      setCroppingImage(img);
      return e.target.files[0];
    });
  };

  useEffect(() => {
    const startUpload = async () => {
      await uploadImage(user, selectedFile);
    };
    if (selectedFile != null && user != null) {
      try {
        startUpload();
      } catch (err) {
        //redirect to err page
      }
      setSelectedFile(null);
    }
  }, [selectedFile, uploadImage, user]);

  return (
    <div>
      <i
        className={icon}
        onClick={() => hiddenFileSelect.current.click()}
        onMouseOver={() => setIcon("ri-add-box-fill")}
        onMouseLeave={() => setIcon("ri-add-box-line")}
      >
        <input
          ref={hiddenFileSelect}
          type="file"
          accept=".png, .jpg, .jpeg"
          onChange={handleFile}
          style={{ display: "none" }}
        />
      </i>
    </div>
  );
};

export default FilePicker;
