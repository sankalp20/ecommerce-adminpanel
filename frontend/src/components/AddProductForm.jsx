import React, { useState } from "react";  

import {                
  Checkbox,
  Button,
  TextField,
  Container,
  Grid,
  Paper,                
  Input,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";


const StandardFields = ({ fieldName, type, value, onChange }) => (
  <Grid item xs={12}>   
    {/* Toggle Variants */}
    {fieldName === "enableVariants" ? (
      <div style={{ display: "flex", alignItems: "center" }}>
        <Checkbox
          name={fieldName}
          checked={value}
          onChange={onChange}
          sx={{ marginRight: 1 }}
        />
        <span>{fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}</span>
      </div>
    ) : (
      <TextField
        fullWidth
        label={fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
        type={type === "enableVariants" ? "checkbox" : "text"}
        name={fieldName}
        value={value}
        onChange={onChange}
        sx={{ marginBottom: 2 }}
      />
    )}
  </Grid>
);

const FileUploadField = ({ label, onChange }) => (
  <Grid item xs={12}>
    <label className="form-label">
      {label}:
      <Input type="file" onChange={onChange} sx={{ marginLeft: 1 }} />
    </label>
  </Grid>
);

const VariantFields = ({
  variant,
  index,
  handleVariantChange,
  handleFileChange,
  addAnotherVariant,
  deleteVariant,
}) => (
  <Grid item xs={12} key={index}>
    <Paper elevation={2} sx={{ padding: 2, marginBottom: 2 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3>Variant {index + 1}</h3>
        <IconButton onClick={() => deleteVariant(index)} color="error">
          <DeleteIcon />
        </IconButton>
      </div>
      {Object.keys(variant).map((variantField) => (
        <React.Fragment key={variantField}>
          {(variantField !== "sliderPhoto" && variantField !== "thumbnailPhoto") && (
            <TextField
              fullWidth
              label={
                variantField.charAt(0).toUpperCase() + variantField.slice(1)
              }
              type="text"
              value={variant[variantField]}
              onChange={(e) =>
                handleVariantChange(index, variantField, e.target.value)
              }
              sx={{ marginBottom: 2 }}
            />
          )}
          {(variantField === "sliderPhoto" || variantField === "thumbnailPhoto") && (
            <FileUploadField
              label="Variant Photo"
              onChange={(e) => handleFileChange(e, index, variantField)}
            />
          )}
        </React.Fragment>
      ))}
    </Paper>
  </Grid>
);


const AddVariantDetails = ({
  variants,
  handleVariantChange,
  handleFileChange,
  deleteVariant,
}) => (
  <>
    {variants.map((variant, index) => (
      <VariantFields
        key={index}
        variant={variant}
        index={index}
        handleVariantChange={handleVariantChange}
        handleFileChange={handleFileChange}
        deleteVariant={deleteVariant}
      />
    ))}
  </>
);



const AddProductForm = () => {
  const initialFormData = {
    Product: "",
    category: "",
    tags: "",
    unitPrice: "",
    quantity: "",
    thumbnailPhoto: "",
    enableVariants: "",
    variants: [
      {
        color: "",
        size: "",
        quantity: "",
        price: "",
        sliderPhoto: "",
      },
    ],
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => {
      if (type === "checkbox") {
        return {
          ...prevData,
          [name]: checked,
        };
      }

      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const deleteVariant = (variantIndex) => {
    setFormData((prevData) => {
      const newVariants = [...prevData.variants];
      newVariants.splice(variantIndex, 1);
      return {
        ...prevData,
        variants: newVariants,
      };
    });
  };

  const handleVariantChange = (variantIndex, fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      variants: prevData.variants.map((variant, index) =>
        index === variantIndex
          ? {
              ...variant,
              [fieldName]: value,
            }
          : variant
      ),
    }));
  };

  const addAnotherVariant = () => {
    setFormData((prevData) => {
      const newVariants = [
        ...prevData.variants,
        { color: "", size: "", quantity: "", price: "", sliderPhoto: "" },
      ];
      return {
        ...prevData,
        variants: newVariants,
      };
    });
  };

  const handleFileChange = (e, variantIndex, fieldName) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData((prevData) => ({
        ...prevData,
        variants: prevData.variants.map((variant, index) =>
          index === variantIndex
            ? {
                ...variant,
                [fieldName]: reader.result,
              }
            : variant
        ),
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    console.log("form data:",  JSON.stringify(formData));
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/addProduct`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        console.log("Product added successfully");
        setFormData(initialFormData);
      } else {
        console.log("Error adding product:", response.statusText);
      }
    } catch (error) {
      console.log("Error adding product:", error);
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2>Product Details</h2>
        <form>
          <Grid container spacing={2}>
            {/* Standard fields */}
            {Object.keys(formData).map((fieldName) => (
              <React.Fragment key={fieldName}>
                {fieldName !== "variants" && fieldName !== "thumbnailPhoto" && (
                  <StandardFields
                    fieldName={fieldName}
                    type={fieldName}
                    value={formData[fieldName]}
                    onChange={handleInputChange}
                  />
                )}
                {fieldName === "thumbnailPhoto" && (
                  <FileUploadField
                    label="Thumbnail"
                    onChange={(e) =>
                      handleFileChange(e, null, "thumbnailPhoto")
                    }
                  />
                )}
                {fieldName === "sliderPhoto" && (
                  <FileUploadField
                    label="Thumbnail"
                    onChange={(e) =>
                      handleFileChange(e, null, "thumbnailPhoto")
                    }
                  />
                )}
              </React.Fragment>
            ))}

            {/* Conditionally render variant details */}
            {formData.enableVariants && (
              <AddVariantDetails
                variants={formData.variants}
                handleVariantChange={handleVariantChange}
                handleFileChange={handleFileChange}
                deleteVariant={deleteVariant}
              />
            )}

            {/* Submit button */}
            <Grid item xs={6}>
              {formData.enableVariants && (
                <Button variant="outlined" onClick={addAnotherVariant}>
                  Add Another Variant
                </Button>
              )}
            </Grid>
            <Grid item xs={6} style={{ textAlign: "right" }}> {/* Right side for "Add Product" button */}
              <Button variant="contained" onClick={handleSubmit}>
                Add Product
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default AddProductForm;
