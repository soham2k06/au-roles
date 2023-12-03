import { Box, Typography } from "@mui/material";

function RoleInfo({
  icon,
  children,
}: {
  icon: React.ReactElement;
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        border: 1,
        borderRadius: 1,
        borderColor: "#2f343b",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 1,
        gap: 2,
        flex: 1,
      }}
    >
      {icon}
      <Typography variant="body1" fontSize={{ xs: 20, md: 24 }}>
        {children}
      </Typography>
    </Box>
  );
}

export default RoleInfo;
