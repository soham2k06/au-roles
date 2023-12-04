import { Button, ButtonProps, Typography } from "@mui/material";

interface GlassButtonProps extends ButtonProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function GlassButton({ children, ...props }: GlassButtonProps) {
  let audio: HTMLAudioElement;

  try {
    audio = new Audio("/audio/button.mp3");
    audio.volume = 0.05;
  } catch (error) {
    console.error("Error creating Audio object:", error);
  }
  return (
    <Button
      variant="contained"
      sx={{
        ...props.sx,
        width: "100%",
        bgcolor: "#2deac5",
        lineHeight: 1,
        whiteSpace: "nowrap",
        overflow: "hidden",

        ":hover": {
          bgcolor: "#2deac5",
        },

        ":after": {
          content: "''",
          bgcolor: "#93f4e2",
          position: "absolute",
          width: 30,
          height: "100%",
          right: 35,
          transform: "skew(-30deg)",
          filter: "blur(2px)",
        },
        ":before": {
          content: "''",
          bgcolor: "#93f4e2",
          position: "absolute",
          width: 50,
          height: "100%",
          right: 70,
          transform: "skew(-30deg)",
          filter: "blur(1px)",
        },
      }}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        props.onClick?.(e);
        audio.play();
      }}
    >
      <Typography
        variant="button"
        sx={{ zIndex: 1, fontSize: { xs: "21px", md: "28px" } }}
      >
        {children}
      </Typography>
    </Button>
  );
}

export default GlassButton;
