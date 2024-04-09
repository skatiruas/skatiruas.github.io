import { ReactElement, ReactNode } from "react";
import { styled } from "@mui/material";

const Wrapper = styled("div")(({ theme }) => ({
  fontFamily: "Open Sans",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  flexWrap: "wrap",
  paddingTop: 30,
  fill: theme.palette.text.primary,
}));

const Greetings = styled("div")(() => ({
  font: "1.5em 'Open Sans', serif",
  display: "flex",
  textAlign: "center",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  margin: "20px 0",
}));

export const Section = ({
  greetings,
  children,
}: {
  greetings: ReactNode;
  children: ReactNode;
}): ReactElement => (
  <Wrapper>
    <Greetings>{greetings}</Greetings>
    {children}
  </Wrapper>
);
