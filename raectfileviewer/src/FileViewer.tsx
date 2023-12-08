import React, { ReactNode, useState, useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

interface FileViewerProps {
  fileName: string[];
}

const FileViewer: React.FC<FileViewerProps> = (props) => {
  const [fileData, setFileData] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFile = async (fileName: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://localhost:7093/api/FileViewer/GetFile?fileName=${fileName}`
      );
      const data = await response.blob();
      setFileData(URL.createObjectURL(data));
    } catch (error) {
      console.error("Error fetching file:", error);
      setError("Error fetching file");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (fileName) {
      fetchFile(fileName);
    }
  }, [fileName]);

  const handleChangeFileName = (
    event: SelectChangeEvent<string>,
    child: ReactNode
  ) => {
    setFileName(event.target.value.toString());
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid xs={12} sm={12} md={8} lg={4}>
          <FormControl fullWidth>
            <InputLabel id="filename-label">Attachment</InputLabel>
            <Select
              labelId="filename-label"
              value={fileName}
              label="Attachment"
              onChange={handleChangeFileName}
            >
              {props.fileName.map((filename: string) => (
                <MenuItem key={filename} value={filename}>
                  {filename}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid xs={12} sm={12}>
          <div>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {fileData && (
              <iframe
                src={fileData}
                title="File Viewer"
                style={{ width: "100%", height: "800px" }}
              />
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default FileViewer;
