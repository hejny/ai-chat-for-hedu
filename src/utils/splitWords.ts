/**
 * Splits a string of text into an array of words and punctuation marks
 * @param {string} text - The text to split
 * @returns {string[]} An array of words and punctuation marks
 * @see https://sharegpt.com/c/7UB0ywu
 */
export function splitWords(text: string): string[] {
    const words = [];
    let currentWord = '';

    for (let i = 0; i < text.length; i++) {
        const char = text[i];

        if (/\s/.test(char) || /[^\w']/.test(char)) {
            if (currentWord !== '') {
                words.push(currentWord);
                currentWord = '';
            }

            if (/\s/.test(char)) {
                words.push(char);
            } else {
                words.push(char);
            }
        } else {
            currentWord += char;
        }
    }

    if (currentWord !== '') {
        words.push(currentWord);
    }

    return words;
}

/* 

TODO: !!! Use or remove
 const words = text
        //.split('\n')
        //.join('█')
        .match(/[\w']+|[^\w\s]+/g)!;

    //words.flat((word)=>word.split())

    // TODO: !!! Fix it better

    return words;

    */
