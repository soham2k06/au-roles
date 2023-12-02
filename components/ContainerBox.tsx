import { Box } from "@mui/material";

function ContainerBox({ children }: { children: React.ReactNode }) {
  return (
    <Box
      bgcolor="#151920cc"
      sx={{
        backdropFilter: "blur(0.5px)",
      }}
      border={1}
      borderColor="#2f343b"
      borderRadius={2}
      p={{ xs: 1, md: 2 }}
    >
      {children}
    </Box>
  );
}

export default ContainerBox;
