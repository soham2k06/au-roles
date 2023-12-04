import { Box, useMediaQuery } from "@mui/material";
function Background() {
  const random = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min) + 1) + min;

  return (
    <Box
      sx={{
        position: "fixed",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      {Array.from({ length: 100 }, (_, i) => (
        <Box
          key={i}
          component="span"
          sx={{
            position: "absolute",
            width: 2,
            height: 2,
            bgcolor: "white",
            borderRadius: "50%",
            animation: "fly 25s linear infinite",
            animationDuration: random(80, 120) + "s",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            transformOrigin: "top left",
          }}
        />
      ))}
    </Box>
  );
}

export default Background;
