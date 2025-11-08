import "@/once-ui/styles/index.scss";
import "@/once-ui/tokens/index.scss";

import classNames from "classnames";

import { Footer, Header, RouteGuard } from "@/components";
import { baseURL, effects, style } from "@/app/resources";

import { Inter, Source_Code_Pro } from "next/font/google";

import { person, home } from "@/app/resources/content";
import { Background, Column, Flex, ToastProvider } from "@/once-ui/components";

export async function generateMetadata() {
  return {
    metadataBase: new URL(`https://${baseURL}`),
    title: home.title,
    description: home.description,
    openGraph: {
      title: `${person.firstName}'s Portfolio`,
      description: "Portfolio website showcasing my work.",
      url: baseURL,
      siteName: `${person.firstName}'s Portfolio`,
      locale: "en_US",
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "zDi2OFFJW4nJeSjniuk0AXS-_fy9UbNXFo4K4zQHGAI", // ✅ Google site verification
    },
  };
}

const primary = Inter({
  variable: "--font-primary",
  subsets: ["latin"],
  display: "swap",
});

const code = Source_Code_Pro({
  variable: "--font-code",
  subsets: ["latin"],
  display: "swap",
});

const secondary: any = undefined;
const tertiary: any = undefined;

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <Flex
      as="html"
      lang="en"
      background="page"
      data-neutral={style.neutral}
      data-brand={style.brand}
      data-accent={style.accent}
      data-solid={style.solid}
      data-solid-style={style.solidStyle}
      data-theme={style.theme}
      data-border={style.border}
      data-surface={style.surface}
      data-transition={style.transition}
      className={classNames(
        primary.variable,
        secondary ? secondary.variable : "",
        tertiary ? tertiary.variable : "",
        code.variable
      )}
    >
      <head>
        {/* ✅ Google verification (redundant-safe, okay with generateMetadata) */}
        <meta
          name="google-site-verification"
          content="zDi2OFFJW4nJeSjniuk0AXS-_fy9UbNXFo4K4zQHGAI"
        />

        {/* 🧠 Identity linking and keywords */}
        <meta
          name="author"
          content="Md. Shahadat Hossain Shahal (also known as M. S. H. Shahal)"
        />
        <meta
          name="keywords"
          content="Md. Shahadat Hossain Shahal, M. S. H. Shahal, astrophysics, AI, radio astronomy, bent tail galaxies, researcher, machine learning, deep learning, radio AGN"
        />

        {/* 🔗 Link to your Google Scholar */}
        <link
          rel="me"
          href="https://scholar.google.com/citations?user=YOUR_SCHOLAR_ID"
        />

        {/* 🧾 Structured Data (helps Google associate both names) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Md. Shahadat Hossain Shahal",
              alternateName: "M. S. H. Shahal",
              jobTitle: "Research Assistant in Astrophysics & AI",
              affiliation: "Center for Astronomy, Space Science and Astrophysics (CASSA)",
              url: "https://shahadathshahal.vercel.app/",
              sameAs: [
                "https://scholar.google.com/citations?hl=en&user=NewZCTsAAAAJ&view_op=list_works",
                "https://orcid.org/my-orcid?orcid=0009-0001-5495-2619",
                "https://www.researchgate.net/profile/Md-Shahadat-Hossain-Shahal",
              ],
            }),
          }}
        />
      </head>

      <ToastProvider>
        <Column
          style={{ minHeight: "100vh" }}
          as="body"
          fillWidth
          margin="0"
          padding="0"
        >
          <Background
            mask={{
              cursor: effects.mask.cursor,
              x: effects.mask.x,
              y: effects.mask.y,
              radius: effects.mask.radius,
            }}
            gradient={{
              display: effects.gradient.display,
              x: effects.gradient.x,
              y: effects.gradient.y,
              width: effects.gradient.width,
              height: effects.gradient.height,
              tilt: effects.gradient.tilt,
              colorStart: effects.gradient.colorStart,
              colorEnd: effects.gradient.colorEnd,
              opacity: effects.gradient.opacity as
                | 0
                | 10
                | 20
                | 30
                | 40
                | 50
                | 60
                | 70
                | 80
                | 90
                | 100,
            }}
            dots={{
              display: effects.dots.display,
              color: effects.dots.color,
              size: effects.dots.size as any,
              opacity: effects.dots.opacity as any,
            }}
            grid={{
              display: effects.grid.display,
              color: effects.grid.color,
              width: effects.grid.width as any,
              height: effects.grid.height as any,
              opacity: effects.grid.opacity as any,
            }}
            lines={{
              display: effects.lines.display,
              opacity: effects.lines.opacity as any,
            }}
          />
          <Flex fillWidth minHeight="16" />
          <Header />
          <Flex
            position="relative"
            zIndex={0}
            fillWidth
            paddingY="l"
            paddingX="l"
            horizontal="center"
            flex={1}
          >
            <Flex horizontal="center" fillWidth minHeight="0">
              <RouteGuard>{children}</RouteGuard>
            </Flex>
          </Flex>
          <Footer />
        </Column>
      </ToastProvider>
    </Flex>
  );
}
