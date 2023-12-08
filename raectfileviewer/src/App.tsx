import React from "react";
import logo from "./logo.svg";
import "./App.css";
import PageContainer from "./PageContainer";
import FileViewer from "./FileViewer";
import { Box, Container } from "@mui/material";

function App() {
  const fileName: string[] = ["FileA.pdf", "FileB.png"];

  return (
    <Box mt={2}>
      <Container>
        <FileViewer fileName={fileName} />
      </Container>
    </Box>
  );
}

export default App;
