import { describe, expect, it } from "vitest";

import type { CopilotOptions, CustomCopilotModel } from "../src/types/copilot";
import validator from "../src/validator";

describe("Validator", () => {
    describe("params validation", () => {
        it("should throw error if apiKey is missing", () => {
            expect(() => validator.params("", {} as CopilotOptions)).toThrow(
                "Please provide an API key.",
            );
        });

        it("should throw error if options are missing", () => {
            expect(() => validator.params("key", {} as CopilotOptions)).toThrow(
                'Please provide required Copilot options, such as "model" and "provider".',
            );
        });

        it("should not throw with valid params", () => {
            expect(() =>
                validator.params("key", {
                    provider: "mistral",
                    model: "codestral",
                }),
            ).not.toThrow();
        });
    });

    describe("inputs validation", () => {
        const customModel: CustomCopilotModel = () => ({
            text: "Hello, world!",
        });

        it("should throw if provider specified with custom model", () => {
            expect(() => validator.inputs(customModel, "mistral")).toThrow(
                "Provider should not be specified when using a custom model.",
            );
        });

        it("should throw if custom model missing required properties", () => {
            expect(() => validator.inputs({} as CustomCopilotModel)).toThrow(
                "Provider must be specified and supported when using built-in models. Please choose from: mistral",
            );
        });

        it("should throw if provider not specified for built-in model", () => {
            expect(() => validator.inputs("codestral")).toThrow(
                "Provider must be specified and supported",
            );
        });

        it("should throw if model not supported by provider", () => {
            // @ts-expect-error - model is not supported by the provider
            expect(() => validator.inputs("codestrals", "mistral")).toThrow(
                'Model "codestrals" is not supported by the "mistral" provider',
            );
        });

        it("should not throw with valid built-in model and provider", () => {
            expect(() =>
                validator.inputs("codestral", "mistral"),
            ).not.toThrow();
        });

        it("should not throw with valid custom model", () => {
            expect(() => validator.inputs(customModel)).not.toThrow();
        });
    });
});
