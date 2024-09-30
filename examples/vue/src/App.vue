<template>
  <main>
    <VueMonacoEditor
      v-model:value="code"
      theme="vs-dark"
      language="javascript"
      height="100vh"
      width="100%"
      @mount="handleMount"
    />
  </main>
</template>

<script lang="ts" setup>
import { VueMonacoEditor } from "@guolao/vue-monaco-editor";
import {
  registerCompletion,
  type Monaco,
  type StandaloneCodeEditor,
} from "monacopilot";
import { onWatcherCleanup, ref, shallowRef, watch } from "vue";

const code = ref("// Start coding to see AI completions as you type...");
const editor = shallowRef<StandaloneCodeEditor>();
const monaco = shallowRef<Monaco>();
const handleMount = (
  editorInstance: StandaloneCodeEditor,
  monacoInstance: Monaco
) => {
  editor.value = editorInstance;
  monaco.value = monacoInstance;
};

watch(
  [editor, monaco],
  ([newEditor, newMonaco]) => {
    if (newEditor && newMonaco) {
      const completion = registerCompletion(newMonaco, newEditor, {
        // This is the endpoint where you set up the monacopilot API handler
        // https://github.com/arshad-yaseen/monacopilot?tab=readme-ov-file#api-handler
        endpoint: "https://api.example.com/complete",
        language: "javascript",
      });

      onWatcherCleanup(() => {
        completion.deregister();
      });
    }
  },
  { immediate: true }
);
</script>
