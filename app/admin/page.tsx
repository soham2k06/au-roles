import { Typography, Container, Box } from "@mui/material";
import { CreateRole } from "@/components";

async function Hero() {
  return (
    <Box
      sx={{
        height: "calc(100vh - 64px)",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="xl">
        <Typography variant="h3" fontWeight={700} align="center" gutterBottom>
          Welcome, Admin.
        </Typography>
        <Typography variant="h6" align="center" paragraph>
          Your task is to create, update and delete roles. Same view as normal
          but can do extra interacitivty.
        </Typography>
        <CreateRole />
      </Container>
    </Box>
  );
}

export default Hero;
