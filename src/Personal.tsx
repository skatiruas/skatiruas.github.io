import { ReactElement } from "react";
import { Section } from "./Section";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Trans, useTranslation } from "react-i18next";

const Mp4Card = ({ title }: { title: string }) => {
  const { t } = useTranslation();
  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: "360px",
        margin: "10px",
        display: "grid",
      }}
    >
      <CardMedia
        sx={{
          width: "100%",
          maxHeight: "calc(100dvh - var(--header-offset) - 64px)",
          backgroundColor: "#000",
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
      <CardContent style={{ padding: 8 }}>
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
          {t(`personal.cards.${title.toLowerCase()}`)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export const Personal = (): ReactElement => {
  const { i18n } = useTranslation();

  return (
    <Section
      greetings={
        <div>
          <Trans i18n={i18n} i18nKey={"personal.title"} />
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
};
