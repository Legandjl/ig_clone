import React, { useState } from "react";
const FileContext = React.createContext();

const FileContextProvider = (props) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [isCropping, setCropping] = useState(false);

  const toggleCrop = () => {
    setCropping((prev) => {
      return !prev;
    });
  };

  const startCrop = (src) => {
    setImageSrc(src);
    toggleCrop();
  };

  return (
    <FileContext.Provider
      value={{ imageSrc, isCropping, toggleCrop, startCrop }}
    >
      {props.children}
    </FileContext.Provider>
  );
};

export { FileContext, FileContextProvider };
