const EditorDemo = () => {
  return (
    <div className="aspect-video lg:h-[500px] w-fit lg:p-10 sm:py-10 py-6 flex items-center justify-center">
      <video
        autoPlay
        loop
        muted
        className="h-full rounded-xl border dark:border-neutral-800">
        <source src="/monacopilot-demo.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default EditorDemo;
