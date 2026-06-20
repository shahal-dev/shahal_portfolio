import { getPosts } from "@/app/utils/utils";
import { Column, Flex, Heading, Text, RevealFx, SmartLink } from "@/once-ui/components";
import { ScrambleText } from "@/components/ScrambleText";
import styles from "./FeaturedWork.module.scss";

/**
 * Text-forward listing of work as numbered editorial rows — no large carousel
 * images, so the galaxy backdrop stays visible. Each title decodes in with the
 * scramble effect as it scrolls into view, and rows reveal in sequence.
 */
export function FeaturedWork() {
  const projects = getPosts(["src", "app", "work", "projects"]).sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime(),
  );

  if (projects.length === 0) return null;

  return (
    <Column fillWidth maxWidth="s" gap="0">
      {projects.map((post, index) => (
        <RevealFx
          key={post.slug}
          translateY="12"
          delay={0.08 * index}
          fillWidth
        >
          <div className={styles.row}>
            <span className={styles.index}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <Column gap="8" fillWidth>
              {post.metadata.publishedAt && (
                <span className={styles.eyebrow}>{post.metadata.publishedAt}</span>
              )}
              <Heading
                as="h3"
                variant="heading-strong-l"
                wrap="balance"
                className={styles.title}
              >
                <ScrambleText text={post.metadata.title} trigger="view" />
              </Heading>
              {post.metadata.summary && (
                <Text
                  variant="body-default-m"
                  onBackground="neutral-weak"
                  wrap="balance"
                >
                  {post.metadata.summary}
                </Text>
              )}
              <Flex gap="24" wrap paddingTop="4">
                <SmartLink href={`/work/${post.slug}`} suffixIcon="arrowRight">
                  <Text variant="body-default-s">Read case study</Text>
                </SmartLink>
                {post.metadata.link && (
                  <SmartLink
                    href={post.metadata.link}
                    suffixIcon="arrowUpRightFromSquare"
                  >
                    <Text variant="body-default-s">View project</Text>
                  </SmartLink>
                )}
              </Flex>
            </Column>
          </div>
        </RevealFx>
      ))}
    </Column>
  );
}

export default FeaturedWork;
