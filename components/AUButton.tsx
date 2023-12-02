"use client";

import { Button, ButtonProps } from "@mui/material";

interface AUButtonProps extends ButtonProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
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
        ...props.sx,
        border: 2,
        color: "white",
        px: 4,
        py: 1,
        lineHeight: 1,
        whiteSpace: "nowrap",
        overflow: "hidden",

        ":hover": {
          border: 2,
        },
        ":active": {
          borderColor: "lime",
        },
      }}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        props.onClick?.(e);
        audio.play();
      }}
      disableRipple
    >
      {children}
    </Button>
  );
}

export default AUButton;
