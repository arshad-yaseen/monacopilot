import EditorDemo from "@/components/editor-demo";
import { buttonVariants } from "@/components/ui/button";
import Snippet from "@/components/ui/snippet";
import { cn } from "@/utils/misc";
import { motion } from "framer-motion";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="w-full flex flex-col items-center container">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="md:text-6xl text-5xl font-semibold tracking-tighter text-center relative"
      >
        Github Copilot <br />
        for Web
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="text-muted-foreground mt-4 mb-6 text-center"
      >
        Extended Monaco Editor with AI auto-completion and new themes.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="flex gap-2"
      >
        <Link
          href="/docs"
          className={cn(
            buttonVariants({
              variant: "default",
            }),
            "rounded-full"
          )}
        >
          Get Started
        </Link>
        <Link
          href="/themes"
          className={cn(
            buttonVariants({
              variant: "outline",
            }),
            "rounded-full"
          )}
        >
          Explore Themes
        </Link>
      </motion.div>
      <EditorDemo />
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.8 }}
        className="w-full flex items-center justify-center"
      >
        <Snippet value="npm install monacopilot" className="sm:w-fit w-full" />
      </motion.div>
    </section>
  );
};

export default Hero;
