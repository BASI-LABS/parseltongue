

type LeetDictionary = {
    [key: string]: string;
};

/**
 * Converts English text to leetspeak.
 * 
 * This function replaces certain letters with numbers or symbols
 * to create a "leetspeak" version of the input text.
 * 
 * Basic Leetspeak conversions:
 * a -> 4, e -> 3, g -> 6, i -> 1, o -> 0,
 * s -> 5, t -> 7, b -> 8, l -> 1
 * 
 * TODO:
 * - More Advance Leet-speak
 * - Sample to switch
 * 
 * @param {string} text - The input text to convert.
 * @returns {string} The leetspeak version of the input text.
 */
export function toLeetspeak(text : string) {
    const leetDict : LeetDictionary = {
        'a': '4', 'e': '3', 'g': '6', 'i': '1',
        'o': '0', 's': '5', 't': '7', 'b': '8', 'l': '1'
    };
    
    return text.toLowerCase().split('').map(char => leetDict[char as keyof LeetDictionary] || char).join('');
}

/**
 * Converts English text to Base64 encoding.
 * 
 * This function uses the built-in 'btoa' function to encode
 * the input text into a Base64 string. Base64 encoding represents
 * binary data in an ASCII string format by translating it into
 * a radix-64 representation.
 * 
 * Note: This function works with ASCII text. For Unicode strings,
 * additional steps would be needed to handle encoding properly.
 * 
 * @param {string} text - The input text to convert to Base64.
 * @returns {string} The Base64 encoded version of the input text.
 */
export function toBase64(text : string) {
    return btoa(text);
}