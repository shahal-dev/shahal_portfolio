import React from "react";

import { Heading, RevealFx, Column } from "@/once-ui/components";

import { baseURL, routes } from "@/app/resources";
import { home, person, newsletter } from "@/app/resources/content";
import { Mailchimp } from "@/components";
import { FeaturedWork } from "@/components/FeaturedWork";
import { LandingHero } from "@/components/LandingHero";
import { ScrambleText } from "@/components/ScrambleText";
import { Posts } from "@/components/blog/Posts";

export async function generateMetadata() {
  const title = home.title;
  const description = home.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}`,
      images: [
        {
          url: ogImage,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function Home() {
  return (
    <Column fillWidth horizontal="start" gap="xl">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: home.title,
            description: home.description,
            url: `https://${baseURL}`,
            image: `${baseURL}/og?title=${encodeURIComponent(home.title)}`,
            publisher: {
              "@type": "Person",
              name: person.name,
              image: {
                "@type": "ImageObject",
                url: `${baseURL}${person.avatar}`,
              },
            },
          }),
        }}
      />

      {/* Hero — full-height editorial intro on the left, galaxy on the right */}
      <LandingHero />

      {/* Selected work — numbered, text-forward, no big images */}
      <Column fillWidth maxWidth="s" gap="l">
        <RevealFx translateY="8" fillWidth horizontal="start">
          <Heading as="h2" variant="display-strong-xs" wrap="balance">
            <ScrambleText text="Selected work" trigger="view" />
          </Heading>
        </RevealFx>
        <FeaturedWork />
      </Column>

      {/* Blog */}
      {routes["/blog"] && (
        <Column fillWidth maxWidth="s" gap="m">
          <RevealFx translateY="8" fillWidth horizontal="start">
            <Heading as="h2" variant="display-strong-xs" wrap="balance">
              <ScrambleText text="Latest from the blog" trigger="view" />
            </Heading>
          </RevealFx>
          <Posts range={[1, 2]} columns="1" />
        </Column>
      )}

      {newsletter.display && <Mailchimp newsletter={newsletter} />}
    </Column>
  );
}
