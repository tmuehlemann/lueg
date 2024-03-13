export function removeStartsWith(inputString, prefix) {
    if (inputString.startsWith(prefix)) {
        return inputString.substring(prefix.length);
    }
    return inputString;
}