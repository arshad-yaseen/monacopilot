const EditorDemo = () => {
  return (
    <div className="aspect-video h-[500px] p-10 flex items-center justify-center">
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
