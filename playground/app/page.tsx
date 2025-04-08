import Editor from "@/components/editor";

export default function Home() {
    return (
        <div className="flex flex-col items-center min-h-screen pt-28 pb-20 gap-4">
            <h1 className="font-heading text-4xl font-medium tracking-tight">
                Monacopilot Playground
            </h1>
            <p className="text-muted-foreground text-lg mb-4">
                AI auto-completion plugin for monaco editor
            </p>
            <Editor />
        </div>
    );
}
