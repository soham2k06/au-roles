import Link from "next/link";
import { Typography, Container, Box } from "@mui/material";
import { AUButton } from "@/components";

function Hero() {
  return (
    <Box
      sx={{
        height: "calc(100svh - 64px)",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="xl">
        <Typography variant="h3" fontWeight={700} align="center" gutterBottom>
          Unleash the Impossibilities
        </Typography>
        <Typography variant="h6" paragraph>
          Explore the fascinating world of Among Us mod roles and enhance your
          gaming experience.
        </Typography>
        <Box
          sx={{
            marginTop: 4,
          }}
        >
          <Link href="crewmate">
            <AUButton>Start from crewmates</AUButton>
          </Link>
        </Box>
      </Container>
    </Box>
  );
}

export default Hero;
