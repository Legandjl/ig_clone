import { useContext, useEffect, useRef, useState } from "react";
import { FirebaseContext } from "../firebase/FirebaseContext";

const FilePicker = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [icon, setIcon] = useState("ri-add-box-line");
  const { uploadImage, user } = useContext(FirebaseContext);

  const hiddenFileSelect = useRef(null);

  const handleFile = (e) => {
    setSelectedFile(() => {
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
        {" "}
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
