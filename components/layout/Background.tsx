import { Box } from "@mui/material";
function Background() {
  const random = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min) + 1) + min;

  return (
    <Box
      sx={{
        position: "fixed",
        display: "block",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        zIndex: -1,
      }}
    >
      {Array.from({ length: 20 }, (_, i) => (
        <Box
          key={i}
          component="span"
          sx={{
            width: random(1, 3),
            height: random(1, 3),
            top: random(0, 100) + "vh",
            borderRadius: "50%",
            background: "white",
            position: "absolute",
            animation: "fly linear infinite",
            animationDuration: random(40, 60) + "s",
            animationDelay: random(-40, 0) + "s",
          }}
        />
      ))}
    </Box>
  );
}

export default Background;
