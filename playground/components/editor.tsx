'use client'

import { useEffect, useRef } from 'react'

import { DEFAULT_MONACO_EDITOR_OPTIONS } from '@/constants/editor'
import MonacoEditor from '@monaco-editor/react'
import {
	type CompletionRegistration,
	type Monaco,
	type StandaloneCodeEditor,
	registerCompletion,
} from 'monacopilot'

const Editor = () => {
	const completionRef = useRef<CompletionRegistration | null>(null)

	const handleMount = (editor: StandaloneCodeEditor, monaco: Monaco) => {
		completionRef.current = registerCompletion(monaco, editor, {
			endpoint: '/api/code-completion',
			language: 'javascript',
		})
	}

	useEffect(() => {
		return () => {
			completionRef.current?.deregister()
		}
	}, [])

	return (
		<MonacoEditor
			height="400px"
			width="800px"
			language="javascript"
			className="rounded-lg border border-slate-200 dark:border-slate-800"
			options={DEFAULT_MONACO_EDITOR_OPTIONS}
			onMount={handleMount}
		/>
	)
}

export default Editor
