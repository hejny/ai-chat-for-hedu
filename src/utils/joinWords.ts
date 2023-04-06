/**
 * Joins an array of words and punctuation marks into a string of text
 * @param {string[]} words - The words and punctuation marks to join
 * @returns {string} The joined text
 * @see https://sharegpt.com/c/7UB0ywu
 */
export function joinWords(words: string[]): string {
    const punctuation = ['.', ',', '!', '?', ';', ':'];
    let result = '';
    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const isPunctuation = punctuation.includes(word);
        const isLastWord = i === words.length - 1;
        const isNewline = word === '\n';
        const isNextNewline = !isLastWord && words[i + 1] === '\n';
        if (isNewline || isNextNewline) {
            result += '\n';
        } else if (!isPunctuation && !isLastWord) {
            result += ' ' + word;
        } else {
            result += word;
        }
    }
    return result.trim();
}
