import { Box, Skeleton, Typography } from "@mui/material";

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
      fontSize={{ xs: 24, md: 28 }}
    >
      {children}
    </Typography>
  );
}

function Body({
  children,
  isLoading,
}: {
  children: React.ReactNode;
  isLoading?: boolean;
}) {
  return (
    <Box fontFamily="sans-serif" fontSize="18px">
      {isLoading ? (
        <Skeleton variant="rounded" width="100%" height={28} animation="wave" />
      ) : (
        children
      )}
    </Box>
  );
}

RoleDetails.Title = Title;
RoleDetails.Body = Body;

export default RoleDetails;
