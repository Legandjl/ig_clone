import { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../firebase/FirebaseContext";

const FilePicker = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const { uploadImage, user } = useContext(FirebaseContext);

  const handleFile = (e) => {
    setSelectedFile(() => {
      return e.target.files[0];
    });
  };

  useEffect(() => {
    if (selectedFile != null) {
      try {
        uploadImage(user, selectedFile);
      } catch (err) {
        //redirect to err page
      }
      setSelectedFile(null);
    }
  }, [selectedFile, uploadImage, user.uid]);

  return (
    <div>
      <input type="file" accept=".png, .jpg, .jpeg" onChange={handleFile} />
    </div>
  );
};

export default FilePicker;
