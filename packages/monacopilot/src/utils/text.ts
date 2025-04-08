export const joinWithAnd = (
    arr: string[] | readonly string[] | undefined,
): string => {
    if (!arr || arr.length === 0) {
        return "";
    }

    if (arr.length === 1) {
        return arr[0];
    }

    return `${arr.slice(0, -1).join(", ")} and ${arr.slice(-1)}`;
};

export const capitalizeFirstLetter = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export type TruncateTextToMaxLinesOptions = {
    truncateDirection?: "keepStart" | "keepEnd";
};

export const truncateTextToMaxLines = (
    text: string,
    maxLinesCount: number,
    options: {
        truncateDirection?: "keepStart" | "keepEnd";
    } = {},
): string => {
    if (maxLinesCount <= 0) {
        return "";
    }

    const lines = text.split("\n");
    const totalLines = lines.length;

    if (maxLinesCount >= totalLines) {
        return text;
    }

    if (options.truncateDirection === "keepEnd") {
        const linesToKeep = lines.slice(-maxLinesCount);
        if (linesToKeep.every((line) => line === "")) {
            return "\n".repeat(maxLinesCount);
        }
        return linesToKeep.join("\n");
    }

    const linesToKeep = lines.slice(0, maxLinesCount);

    if (linesToKeep.every((line) => line === "")) {
        return "\n".repeat(maxLinesCount);
    }
    return linesToKeep.join("\n");
};
