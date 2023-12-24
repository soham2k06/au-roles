"use client";

import { Box, Typography } from "@mui/material";

function FullPageLoader() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="calc(100svh - 64px)"
    >
      <Typography variant="h5">
        Loading
        {Array.from({ length: 3 }, (_, i) => (
          <Box
            key={i}
            component="span"
            fontFamily="sans-serif"
            sx={{
              animation: "blink 1.4s infinite",
              animationFillMode: "both",
              animationDelay: i * 0.2 + "s",
            }}
          >
            .
          </Box>
        ))}
      </Typography>
    </Box>
  );
}

export default FullPageLoader;
