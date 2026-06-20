import React from "react";

import { Heading, Flex, Text, Button, Avatar, RevealFx, Column } from "@/once-ui/components";

import { baseURL, routes } from "@/app/resources";
import { home, about, person, newsletter } from "@/app/resources/content";
import { Mailchimp } from "@/components";
import { FeaturedWork } from "@/components/FeaturedWork";
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

      {/* Hero — text on the left, galaxy breathing on the right */}
      <Column fillWidth minHeight="0" paddingTop="l" paddingBottom="l" gap="m">
        <Column maxWidth="s">
          <RevealFx translateY="4" fillWidth horizontal="start" paddingBottom="m">
            <Heading
              wrap="balance"
              variant="display-strong-l"
              style={{ textShadow: "0 2px 24px rgba(0,0,0,0.7)" }}
            >
              <ScrambleText text={home.headline} delay={150} />
            </Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.2} fillWidth horizontal="start" paddingBottom="m">
            <Text
              wrap="balance"
              onBackground="neutral-weak"
              variant="heading-default-xl"
              style={{ textShadow: "0 1px 16px rgba(0,0,0,0.7)" }}
            >
              {home.subline}
            </Text>
          </RevealFx>
          <RevealFx translateY="12" delay={0.4} horizontal="start">
            <Button
              id="about"
              data-border="rounded"
              href="/about"
              variant="secondary"
              size="m"
              arrowIcon
            >
              <Flex gap="8" vertical="center">
                {about.avatar.display && (
                  <Avatar
                    style={{ marginLeft: "-0.75rem", marginRight: "0.25rem" }}
                    src={person.avatar}
                    size="m"
                  />
                )}
                {about.title}
              </Flex>
            </Button>
          </RevealFx>
        </Column>
      </Column>

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
