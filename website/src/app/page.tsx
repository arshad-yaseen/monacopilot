"use client";

import { Button } from "@/components/ui/button";
import { Editor } from "monacopilot";
import { Card } from "@/components/ui/card";
import CopyButton from "@/components/copy-button";
import { motion } from "framer-motion";

const EDITOR_DEFAULT_VALUE = `// Try editing this code to see the AI auto-completion in action
const reverse = (str) => {
  return str.split("").reverse().join("");
}

const isPalindrome = (str) => {}`;
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-10 py-16">
      <section className="w-full flex flex-col items-center container">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-5xl font-semibold tracking-tighter text-center leading-tight relative"
        >
          Monaco Editor <br />
          Redefined
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-muted-foreground mt-4 mb-6"
        >
          Extended Monaco Editor with AI auto-completion and new themes.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="flex gap-2"
        >
          <Button>Documentation</Button>
          <Button variant="outline">GitHub</Button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="rounded-xl my-6 overflow-hidden bg-background border shadow-md shadow-neutral-50 dark:shadow-neutral-900 w-[700px] h-[400px]"
        >
          <Editor
            language="javascript"
            theme="github-light"
            completionEndpoint="/api/autocomplete"
            className="w-full"
            defaultValue={EDITOR_DEFAULT_VALUE}
            options={{
              padding: { top: 16, bottom: 16 },
              overviewRulerBorder: false,
              overviewRulerLanes: 0,
              scrollBeyondLastLine: false,
              fontFamily: "var(--font-mono)",
              fontSize: 15,
            }}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.8 }}
        >
          <Card className="px-4 h-12 border rounded-lg bg-background flex items-center gap-2 shadow-neutral-50 dark:shadow-neutral-900">
            <span className="font-mono">$ npm install monacopilot</span>
            <CopyButton value="npm install monacopilot" />
          </Card>
        </motion.div>
      </section>
    </main>
  );
}
