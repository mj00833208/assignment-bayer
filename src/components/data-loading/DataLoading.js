import React, { useState } from "react";
import "./DataLoading.css";
import Input from "../../global/Input/Input";
import dataService from "../../services/data";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";

// Allowed extensions for input file
const allowedExtensions = ["csv"];

export default function DataLoading() {
  const navigate = useNavigate();

  // It state will contain the error when
  // correct file extension is not used
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  // This function will be called when
  // the file input changes
  const handleFileChange = (e) => {
    setError("");

    // Check if user has entered the file
    if (e.target.files.length) {
      const inputFile = e.target.files[0];

      // Check the file extensions, if it not
      // included in the allowed extensions
      // we show the error
      const fileExtension = inputFile?.type.split("/")[1];
      if (!allowedExtensions.includes(fileExtension)) {
        setError("Please input a csv file");
        return;
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (event.target[0].value !== "") {
      setLoading(true);
      const data = new FormData(event.currentTarget);

      let res = await dataService.import({
        file: data.get("file"),
      });

      if (res) {
        setLoading(false);
        if (res.status) {
          alert(res.data.message);
        } else {
          alert(res.data.error);
        }
        navigate("/data-visualization");
      }
    } else {
      setError("Please input a csv file");
    }
  };

  return (
    <div>
      <h2>Upload CSV</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12">
            <div className="col-6">
              <Input
                type="file"
                name="file"
                id="file"
                accept=".csv"
                onChange={handleFileChange}
              />
            </div>

            <div className="col-6">
              {loading ? (
                <LoadingButton
                  color="secondary"
                  loading={loading}
                  loadingPosition="start"
                  startIcon={<SaveIcon />}
                  variant="contained"
                >
                  <span>Submit</span>
                </LoadingButton>
              ) : (
                <Button variant="contained" size="small" type="submit">
                  Submit
                </Button>
              )}
            </div>
          </div>

          {/* <Button variant="contained" size="small" type='submit' >Submit</Button>
                        <button type='submit' disabled={loading ? true : false}>Submit</button> */}
        </div>

        <div>{error ? error : ""}</div>
      </form>
    </div>
  );
}
