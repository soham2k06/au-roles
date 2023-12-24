import { Box, Typography, TypographyProps } from "@mui/material";

interface TitleProps extends TypographyProps {
  children: React.ReactNode;
}

function Section({ children }: { children: React.ReactNode }) {
  return <Box my={2}>{children}</Box>;
}

function Title({ children, ...typographyProps }: TitleProps) {
  return (
    <Typography
      variant="h3"
      display="flex"
      alignItems="center"
      fontSize={{ xs: 28, sm: 40 }}
      textAlign={{ xs: "center", sm: "left" }}
      gutterBottom
      textTransform="capitalize"
      {...typographyProps}
    >
      {children}
    </Typography>
  );
}

Section.Title = Title;

export default Section;
