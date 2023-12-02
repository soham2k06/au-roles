import { Box, Typography } from "@mui/material";

function RoleDetails({ children }: { children: React.ReactNode }) {
  return (
    <Box
      pb={2}
      sx={{ border: 1, borderRadius: 1, p: 1, borderColor: "#2f343b" }}
    >
      {children}
    </Box>
  );
}

function Title({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      variant="h6"
      display="flex"
      gap={1}
      alignItems="center"
      borderBottom={1}
      width="fit-content"
      borderColor="#2f343b"
      pb={0.5}
      mb={1}
      sx={{ userSelect: "none" }}
    >
      {children}
    </Typography>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return (
    <Box fontFamily="monospace" fontSize={{ xs: "14px", md: "16px" }}>
      {children}
    </Box>
  );
}

RoleDetails.Title = Title;
RoleDetails.Body = Body;

export default RoleDetails;
