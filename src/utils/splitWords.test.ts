import { describe, expect, it } from '@jest/globals';
import { splitWords } from './splitWords';

describe('splitWords', () => {
    it('splits simple string', () => {
        const text = 'Hello world';
        const expected = ['Hello', 'world'];
        const result = splitWords(text);
        expect(result).toEqual(expected);
    });

    it('splits a string into an array of words and punctuation marks', () => {
        const text = 'Hello, world! This is a test.';
        const expected = ['Hello', ',', 'world', '!', 'This', 'is', 'a', 'test', '.'];
        const result = splitWords(text);
        expect(result).toEqual(expected);
    });

    it('works with diacritics', () => {
        const text = 'Helló worlď';
        const expected = ['Helló', 'worlď'];
        const result = splitWords(text);
        expect(result).toEqual(expected);
    });

    it('preserves newlines in the text', () => {
        const text = 'Hello,\nworld!\nThis\nis a test.';
        const expected = ['Hello', ',', '\n', 'world', '!', '\n', 'This', '\n', 'is', 'a', 'test', '.'];
        const result = splitWords(text);
        expect(result).toEqual(expected);
    });

    it('preserves multiple newlines in the text', () => {
        const text = 'Hello,\n\n\nworld!\n\nThis\nis a test.';
        const expected = ['Hello', ',', '\n\n\n', 'world', '!', '\n\n', 'This', '\n', 'is', 'a', 'test', '.'];
        const result = splitWords(text);
        expect(result).toEqual(expected);
    });
});
