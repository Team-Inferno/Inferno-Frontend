import React from "react";
import LandingLayout from "./LandingLayout";
import Hero from "./Hero";

export default function Landing() {
  return (
    <LandingLayout>
      <Hero
        title="A place for streamers with plenty of room to talk"
        subtitle="Inferno servers are organized into topic-based channels where you can stream as well as collaborate, share, and just talk about your day without clogging up a group chat."
        image="/landing.svg"
        ctaText="Get Started"
        ctaLink="/register"
      />
    </LandingLayout>
  );
}
