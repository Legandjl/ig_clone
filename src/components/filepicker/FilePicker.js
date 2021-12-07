import { useContext, useRef, useState } from "react";

import { FileContext } from "./FileContext";

const FilePicker = () => {
  const [icon, setIcon] = useState("ri-add-box-line");
  const { startCrop } = useContext(FileContext);
  const hiddenFileSelect = useRef(null);

  const handleFile = (e) => {
    const img = URL.createObjectURL(e.target.files[0]);
    const toCrop = new Image();
    toCrop.src = img;
    startCrop(img);
  };

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
