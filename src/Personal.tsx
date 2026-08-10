import { ReactElement } from "react";
import { Section } from "./Section";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const Mp4Card = ({ title }: { title: string }) => (
  <Card
    sx={{
      width: "100%",
      maxWidth: "360px",
      maxHeight: "calc(100dvh - var(--header-offset) - 16px)",
      margin: "10px",
      display: "grid",
    }}
  >
    <CardMedia
      sx={{
        flex: "1 1 auto",
        minHeight: 0,
        overflow: "hidden",
        display: "flex",
      }}
    >
      <video
        src={`/video/${title}.mp4`}
        poster={`/video/${title}.png`}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          display: "block",
        }}
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
        onVolumeChange={({ target }) => {
          const current = target as HTMLVideoElement;
          document.querySelectorAll("video").forEach((videoElement) => {
            if (videoElement !== current) {
              videoElement.volume = current.volume;
              videoElement.muted = current.muted;
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
          margin: 0,
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
          <Mp4Card title={title} key={title} />
        )
      )}
    </div>
  </Section>
);
