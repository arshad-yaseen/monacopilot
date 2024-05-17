import Link from 'next/link';

import {GITHUB_REPO_URL} from '@/constants';
import {GitHubLogoIcon} from '@radix-ui/react-icons';

const ProudlyOpenSource = () => {
  return (
    <div className="container gap-4 flex flex-col items-center justify-center w-full py-24">
      <h2 className="md:text-5xl text-4xl font-semibold text-center ">
        Proudly Open Source
      </h2>
      <p className="text-center mt-4 text-muted-foreground">
        We are proud to be open source and our code is available on GitHub.{' '}
        <br /> We are always looking for contributors to help us fix bugs, build
        new features, or help us improve the project.
      </p>
      <Link
        href={GITHUB_REPO_URL}
        target="_blank"
        className="flex cursor-pointer hover:border-primary transition-colors justify-center items-center py-[0.4rem] gap-3 mt-8 pr-4 pl-2 w-fit rounded-full border">
        <div className="size-8 bg-neutral-900 flex items-center justify-center text-white dark:bg-neutral-100 dark:text-neutral-950 rounded-full">
          <GitHubLogoIcon className="size-5" />
        </div>
        3500+ Stars on GitHub
      </Link>
    </div>
  );
};

export default ProudlyOpenSource;
