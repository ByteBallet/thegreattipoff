import React, { useRef, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const ImageUploader = (props) => {
  const { reset, onInput, loading, subTitle, existingURL } = props;
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(true);

  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  useEffect(() => {
    setFile(null);
    setPreviewUrl("");
  }, [reset]);

  const pickedHandler = (event) => {
    let pickedFile;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      onInput(event.target.files[0]);
      setFile(pickedFile);
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <Box sx={{ paddingTop: "10px", paddingBottom: "30px" }}>
      <input
        id={"image"}
        ref={filePickerRef}
        style={{ display: "none" }}
        type="file"
        accept=".jpg"
        onChange={pickedHandler}
      />
      <div className="image-upload__preview">
        {(previewUrl || existingURL) && (
          <img
            src={previewUrl || existingURL}
            alt="Preview"
            className="img-uploader-preview-image"
            width={90}
            height={90}
          />
        )}
      </div>
      <Button
        disabled={loading}
        type="button"
        variant="contained"
        onClick={pickImageHandler}
        style={{ color: "black", margin: 10 }}

      >
        Upload
      </Button>
      <p className="img-uploader-title">{subTitle[0]}</p>
      <p className="img-uploader-sub-title">{subTitle[1]}</p>

      {!isValid && (
        <p className="img-uploader-error">{"Please pick an image."}</p>
      )}
    </Box>
  );
};

export default ImageUploader;
