import NextLink, {LinkProps} from 'next/link';

const Link = (props: React.ComponentPropsWithoutRef<'a'> & LinkProps) => {
  return (
    <NextLink
      {...props}
      className={
        'px-4 py-2 border border-neutral-500 rounded-md hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 focus-visible:ring-opacity-75 ring-offset-2 underline-offset-2 active:bg-neutral-100 flex items-center justify-center decoration-neutral-500 transition-colors'
      }
    />
  );
};

export default Link;
