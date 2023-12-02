import { Box } from "@mui/material";

function Background() {
  return (
    <Box
      sx={{
        position: "fixed",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        // zIndex: -1,
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
            animation: "twinkle 2s infinite",
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
