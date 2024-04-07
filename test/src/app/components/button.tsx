const Button = (props: React.ComponentPropsWithoutRef<'button'>) => {
  return (
    <button
      {...props}
      className={
        'px-4 py-2 bg-neutral-800 text-white dark:text-neutral-950 rounded-md shadow-sm active:bg-neutral-700 transition-colors hover:bg-neutral-950 focus:outline-none focus-visible:ring focus-visible:ring-neutral-500 focus-visible:ring-opacity-75 ring-offset-2'
      }
    />
  );
};

export default Button;
