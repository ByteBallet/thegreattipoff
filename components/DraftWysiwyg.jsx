import React from "react";
import dynamic from "next/dynamic";
import { useFormikContext } from "formik";
import { Typography } from "@mui/material";
import "react-quill/dist/quill.snow.css"; 

const ReactQuill = dynamic(import("react-quill"), { ssr: false });  

const DraftWysiwyg = ({ name, label }) => {
  const { handleChange, values, errors, touched } = useFormikContext();

  return (
    <>
      <Typography variant="p">{label}</Typography>
      {touched[name] && errors[name] && (
        <p style={{ color: "red" }}>{errors[name]}</p>
      )}
     <ReactQuill onChange={handleChange(name)} value={values[name]} /> 
    </>
  );
};

export default DraftWysiwyg;
