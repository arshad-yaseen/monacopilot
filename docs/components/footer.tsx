"use client";

import React from "react";
import Link from "next/link";

import ThemeToggle from "@/components/theme-toggle";
import {
  CREATOR_NAME,
  CREATOR_TWITTER_URL,
  GROQ_HOMEPAGE_URL,
} from "@/constants";

const Footer = () => {
  return (
    <footer className="w-full border-t">
      <div className="flex container flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose md:text-left">
            Built with ❤️ by{" "}
            <Link
              href={CREATOR_TWITTER_URL}
              target="_blank"
              rel="noreferrer"
              className="font-normal underline underline-offset-4"
            >
              {CREATOR_NAME}
            </Link>
          </p>
        </div>
        <ThemeToggle />
      </div>
    </footer>
  );
};

export default Footer;
