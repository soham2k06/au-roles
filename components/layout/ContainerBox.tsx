import { Box, BoxProps } from "@mui/material";

interface ContainerBoxProps extends BoxProps {
  children: React.ReactNode;
}

function ContainerBox({ children, ...props }: ContainerBoxProps) {
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
      {...props}
    >
      {children}
    </Box>
  );
}

export default ContainerBox;
