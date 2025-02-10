export const joinWithAnd = (
    arr: string[] | readonly string[] | undefined,
): string => {
    if (!arr || arr.length === 0) {
        return '';
    }

    if (arr.length === 1) {
        return arr[0];
    }

    return `${arr.slice(0, -1).join(', ')} and ${arr.slice(-1)}`;
};
