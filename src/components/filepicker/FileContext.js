import React, { useState, useEffect } from "react";
const FileContext = React.createContext();

const FileContextProvider = (props) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [isCropping, setCropping] = useState(false);
  const [fileName, setFileName] = useState("");

  const setCroppingImage = (src) => {
    setImageSrc(src);
    setCropping(true);
  };

  return (
    <FileContext.Provider value={{ imageSrc, isCropping, setCroppingImage }}>
      {props.children}
    </FileContext.Provider>
  );
};

export { FileContext, FileContextProvider };
