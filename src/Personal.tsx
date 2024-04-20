import { ReactElement } from "react";
import { Section } from "./Section";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const Mp4Card = ({ title }: { title: string }) => (
  <Card sx={{ maxWidth: "320px", margin: "10px" }}>
    <CardMedia>
      <video
        src={`/video/${title}.mp4`}
        poster={`/video/${title}.png`}
        width="320"
        style={{ maxWidth: "320px" }}
        controls
        controlsList="nodownload noplaybackrate nofullscreen"
        loop
        disablePictureInPicture
        disableRemotePlayback
        onContextMenu={(e) => e.preventDefault()}
        onPlay={({ target }) => {
          document.querySelectorAll("video").forEach((videoElement) => {
            if (videoElement !== target) {
              videoElement.pause();
            }
          });
        }}
      />
    </CardMedia>
    <CardContent>
      <Typography
        gutterBottom
        variant="h5"
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
      {["Snowboarding", "Wakeboarding", "Music", "Skateboarding"].map(
        (title) => (
          <div
            key={title}
            style={{
              flexBasis: "33%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Mp4Card title={title} />
          </div>
        )
      )}
    </div>
  </Section>
);
