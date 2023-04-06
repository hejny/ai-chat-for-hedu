import { describe, expect, it } from '@jest/globals';
import { joinWords } from './joinWords';

describe('joinWords', () => {
    it('joins an array of words and punctuation marks into a string', () => {
        const words = ['Hello', ',', 'world', '!', 'This', 'is', 'a', 'test', '.'];
        const expected = 'Hello, world! This is a test.';
        const result = joinWords(words);
        expect(result).toEqual(expected);
    });

    it('works with diacritics', () => {
        const words = ['Helló', ',', 'world', '!', 'This', 'is', 'á', 'test', '.'];
        const expected = 'Helló, world! This is á test.';
        const result = joinWords(words);
        expect(result).toEqual(expected);
    });

    it('preserves newlines in the output text', () => {
        const words = ['Hello', ',', '\n', 'world', '!', '\n', 'This', '\n', 'is', 'a', 'test', '.'];
        const expected = 'Hello,\nworld!\nThis\nis a test.';
        const result = joinWords(words);
        expect(result).toEqual(expected);
    });

    it('preserves multiple newlines in the output text', () => {
        const words = ['Hello', ',', '\n\n', 'world', '!', '\n\n', 'This', '\n', 'is', 'a', 'test', '.'];
        const expected = 'Hello,\n\nworld!\n\nThis\nis a test.';
        const result = joinWords(words);
        expect(result).toEqual(expected);
    });
});
