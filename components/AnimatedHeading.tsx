"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type HeadingTag = "h1" | "h2" | "h3";

type AnimatedHeadingProps = {
  text: string;
  as?: HeadingTag;
  className?: string;
};

export default function AnimatedHeading({
  text,
  as = "h2",
  className
}: AnimatedHeadingProps) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  if (reducedMotion) {
    const Tag = as;
    return <Tag className={className}>{text}</Tag>;
  }

  const MotionTag = (motion as any)[as] || motion.h2;

  return (
    <MotionTag
      className={className}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.04 }
        }
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {text.split(" ").map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          className="inline-block pr-1"
          variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
        >
          {word}
        </motion.span>
      ))}
    </MotionTag>
  );
}
