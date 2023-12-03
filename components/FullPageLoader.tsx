import { Box, CircularProgress } from "@mui/material";

function FullPageLoader() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="calc(100vh - 64px)"
    >
      <CircularProgress sx={{ color: "white" }} />
    </Box>
  );
}

export default FullPageLoader;
