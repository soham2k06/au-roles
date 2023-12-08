import { Box, Skeleton, Typography, useMediaQuery } from "@mui/material";

function RoleInfo({
  children,
  isLoading,
  icon,
}: {
  children: React.ReactNode;
  isLoading: boolean;
  icon: React.ReactElement;
}) {
  const isSmallScreen = useMediaQuery("(max-width:900px)");
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
      {isLoading ? (
        <Skeleton
          variant="rounded"
          width="100%"
          height={isSmallScreen ? 30 : 36}
          animation="wave"
        />
      ) : (
        <>
          {icon}
          <Typography variant="body1" fontSize={{ xs: 20, md: 24 }}>
            {children}
          </Typography>
        </>
      )}
    </Box>
  );
}

export default RoleInfo;
