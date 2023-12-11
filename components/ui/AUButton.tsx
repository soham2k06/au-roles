"use client";

import { Button, ButtonProps } from "@mui/material";

interface AUButtonProps extends ButtonProps {
  children: React.ReactNode;
}

function AUButton({ children, ...props }: AUButtonProps) {
  let audio: HTMLAudioElement;

  try {
    audio = new Audio("/audio/button.mp3");
    audio.volume = 0.05;
  } catch (error) {
    console.error("Error creating Audio object:", error);
  }
  return (
    <Button
      variant="outlined"
      sx={{
        border: 2,
        color: "white",
        px: { xs: 1, md: 4 },
        py: 1,
        lineHeight: 1,
        whiteSpace: "nowrap",
        overflow: "hidden",
        fontSize: { xs: 18, md: 20 },

        ":hover": {
          border: 2,
        },
        ":active": {
          borderColor: "lime",
        },

        ...props.sx,
      }}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        props.onClick?.(e);
        audio.play();
      }}
      disableRipple
      type={props.type}
      disabled={props.disabled}
    >
      {children}
    </Button>
  );
}

export default AUButton;
