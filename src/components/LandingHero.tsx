import {
  Heading,
  Flex,
  Text,
  Button,
  Avatar,
  IconButton,
  RevealFx,
  Column,
} from "@/once-ui/components";
import { home, about, person, social } from "@/app/resources/content";
import { ScrambleText } from "@/components/ScrambleText";
import styles from "./LandingHero.module.scss";

const textShadow = "0 2px 24px rgba(0,0,0,0.7)";

/**
 * Landing hero: a full-height, left-aligned editorial intro layered over the
 * galaxy. A status eyebrow, decoding headline, social links and a scroll cue
 * give the left column presence without crowding the animation on the right.
 */
export function LandingHero() {
  return (
    <div className={styles.hero}>
      <Column maxWidth="s" gap="m">
        <RevealFx translateY="2" horizontal="start">
          <span className={styles.eyebrow}>
            <span className={styles.dot} />
            <ScrambleText text="Available · Dhaka, BD" delay={100} />
          </span>
        </RevealFx>

        <RevealFx translateY="4" delay={0.1} fillWidth horizontal="start">
          <Heading wrap="balance" variant="display-strong-l" style={{ textShadow }}>
            <ScrambleText text={home.headline} delay={300} />
          </Heading>
        </RevealFx>

        <RevealFx translateY="8" delay={0.25} fillWidth horizontal="start">
          <Text
            wrap="balance"
            onBackground="neutral-weak"
            variant="body-default-l"
            style={{ textShadow: "0 1px 16px rgba(0,0,0,0.7)" }}
          >
            {home.subline}
          </Text>
        </RevealFx>

        <RevealFx translateY="12" delay={0.4} horizontal="start" paddingTop="8">
          <Flex gap="20" vertical="center" wrap>
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

            <Flex gap="4" vertical="center" wrap>
              {social.map(
                (item) =>
                  item.link && (
                    <IconButton
                      key={item.name}
                      href={item.link}
                      icon={item.icon}
                      tooltip={item.name}
                      size="l"
                      variant="ghost"
                    />
                  ),
              )}
            </Flex>
          </Flex>
        </RevealFx>
      </Column>

      <span className={styles.scrollCue}>
        <span className={styles.scrollArrow}>↓</span>
        Scroll to explore
      </span>
    </div>
  );
}

export default LandingHero;
