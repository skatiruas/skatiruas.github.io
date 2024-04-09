import { ReactElement } from "react";
import { Section } from "./Section";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  styled,
} from "@mui/material";

interface Embed {
  title: string;
  href: string;
}

const embeds: Embed[] = [
  { title: "Snowboarding", href: "CleGgPGAwFq" },
  { title: "Skateboarding", href: "BIQToGXABVI" },
  { title: "Wakeboarding", href: "CiC3lM8gHPR" },
  { title: "Music", href: "CWyVzFegxMt" },
];

const InstagramBlockquote = styled("blockquote")(({ theme }) => ({
  background: "inherit",
  border: 0,
  borderRadius: "3px",
  boxShadow: theme.shadows["1"],
  margin: "1px",
  maxWidth: "540px",
  minWidth: "326px",
  padding: 0,
  width: "calc(100% - 2px)",
}));

const InstagramEmbed = ({ href, title }: Embed) => (
  <Card sx={{ maxWidth: "400px", margin: "10px", width: "100%" }}>
    <CardMedia>
      <InstagramBlockquote
        className={"instagram-media"}
        data-instgrm-permalink={`https://www.instagram.com/p/${href}`}
        data-instgrm-version="14"
      />
    </CardMedia>
    <CardContent>
      <Typography
        gutterBottom
        variant="h5"
        component="div"
        sx={{
          fontFamily: "Gunny Rewritten, Open Sans, serif",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {title}
      </Typography>
    </CardContent>
  </Card>
);

export const Personal = (): ReactElement => (
  <Section
    greetings={
      <div>
        Also I&apos;m a <b>Skateboarder</b> who loves <b>Photography</b>,{" "}
        <b>Music</b> and to <b>learn new skills</b>.
      </div>
    }
  >
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        alignItems: "baseline",
      }}
    >
      {embeds.map(({ href, title }) => (
        <InstagramEmbed key={href} href={href} title={title} />
      ))}
    </div>
  </Section>
);
