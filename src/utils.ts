type LeetDictionary = {
    [key: string]: string;
};

const VOWELS = ["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"];
const PUNCTUATION = [".", ",", ";", ":", "!", "?", "'", "\"", "-", "—", "(", ")", "[", "]", "{", "}", "/", "\\", "|", "<", ">", "#", "@", "&", "*", "^", "~", "`", "_", "+", "=", "%", "$"]

/**
 * A simple in-memory key-value cache. 
 *
 * This class stores entries in a Map<K, V>, with methods
 * to get, set, and delete entries.
 */
class KeyValueCache<K, V> {
    private store: Map<K, V>;
  
    constructor() {
      this.store = new Map<K, V>();
    }
  
    /**
     * Stores a value in the cache.
     * @param key   The key under which to store the value.
     * @param value The value to be stored.
     */
    public set(key: K, value: V): void {
      this.store.set(key, value);
    }
  
    /**
     * Retrieves a value from the cache.
     * @param key The key of the value to retrieve.
     * @returns   The value, or undefined if no entry is found.
     */
    public get(key: K): V | undefined {
      return this.store.get(key);
    }
  
    /**
     * Returns whether the cache contains an entry for the key.
     * @param key The key to check.
     * @returns   A boolean indicating if the key exists in the cache.
     */
    public has(key: K): boolean {
      return this.store.has(key);
    }
  
    /**
     * Removes an entry from the cache.
     * @param key The key to remove.
     * @returns   A boolean indicating whether the key was deleted.
     */
    public delete(key: K): boolean {
      return this.store.delete(key);
    }
  
    /**
     * Clears all entries from the cache.
     */
    public clear(): void {
      this.store.clear();
    }
  
    /**
     * Returns the number of items in the cache.
     */
    public size(): number {
      return this.store.size;
    }
}

function removePunctation(word: string): string {
    let result = "";
    for (const char of word) {
      if (!PUNCTUATION.includes(char)) { result += char }
    }
    return result;
}

function extractSuffixPunctation(word: string): [string, string] {
    return PUNCTUATION.includes(word[word.length - 1])
    ? [word.slice(0, -1), word[word.length - 1]]
    : [word, ""];
}

const scrambleCache = new KeyValueCache<string, string>();

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
 * @param {string} text - The input text to convert.
 * @returns {string} The leetspeak version of the input text.
 */
export function toLeetspeak(text: string): string {
    const leetDict: LeetDictionary = {
        'a': '4', 'e': '3', 'g': '6', 'i': '1',
        'o': '0', 's': '5', 't': '7', 'b': '8', 'l': '1'
    };
    
    return text.toLowerCase().split('').map(char => leetDict[char as keyof LeetDictionary] || char).join('');
}

/**
 * Converts English text to Pig Latin encoding.
 * 
 * This function uses the heuristic rules of pig latin to encode
 * the input text into a pig latin string.
 * 
 * NOTE: Avoid using regex for this. Memory reclamation eligibility
 * from dereferenced regex objects can trigger garbage collection. That
 * interruption can really fuck up performance when mapping large arrays.
 * 
 * @param {string} text - The input text to convert to Pig Latin.
 * @returns {string} The Pig Latin encoded version of the input text.
 */
export function toPigLatin(text: string): string {
    const findFirstVowel = (word: string): number => [...word].findIndex(char => VOWELS.includes(char))

    if (!text || typeof text !== "string") {
        throw new Error("Input must be a non-empty string");
    }

    const words = text.split(" ").filter(word => word.trim() !== "");
    return words.map((word) => {
        let [newWord, punctuation] = extractSuffixPunctation(word)
        if (VOWELS.includes(newWord[0])) {
            return newWord + "way" + punctuation;
        } else {
            const firstVowel = findFirstVowel(newWord)
            const prefix = firstVowel === -1 ? newWord : newWord.slice(firstVowel) + newWord.slice(0, firstVowel)
            return prefix + "ay" + punctuation;
        }
    }).join(" ")
}

/**
 * Converts English text to scramble encoding.
 * 
 * This function takes each word in a sentence and randomly scrambles
 * the interior characters of the word. The first and last characters
 * are preserved.
 * 
 * @param {string} text - The input text to convert to Pig Latin.
 * @returns {string} The scramble encoded version of the input text.
 */
export function toScramble(text: string): string {
    if (!text || typeof text !== "string") {
        throw new Error("Input must be a non-empty string");
    }

    const words = text.split(" ").filter(word => word.trim() !== "");
    return words.map((word) => {
        if (word.length <= 3) return word;
        if (word[1] === word[2] && word.length === 4) return word;  // e.g. "food", "keen"
        
        const [sanitizedWord, punctuation] = extractSuffixPunctation(word)
        if (scrambleCache.has(sanitizedWord)) return scrambleCache.get(sanitizedWord) as string + punctuation;

        const interior = removePunctation(sanitizedWord.slice(1, -1));
        const scrambledInterior = interior.split('').sort(() => Math.random() - 0.5).join('');
        const scrambledWord =
            sanitizedWord[0] +
            scrambledInterior +
            sanitizedWord[sanitizedWord.length - 1]
        scrambleCache.set(sanitizedWord, scrambledWord);
        return scrambledWord + punctuation;
    }).join(" ");
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
export function toBase64(text: string): string {
    return btoa(text);
}

type EmojiDictionary = {
    [key: string]: string[];
};

const circleEmojis: EmojiDictionary = {
    'a': ['🅐', '🅰️'], 'b': ['🅑', '🅱️'], 'c': ['🅒', '🅲'], 'd': ['🅓', '🅳'], 'e': ['🅔', '🅴'], 
    'f': ['🅕', '🅵'], 'g': ['🅖', '🅶'], 'h': ['🅗', '🅷'], 'i': ['🅘', '🅸'], 'j': ['🅙', '🅹'], 
    'k': ['🅚', '🅺'], 'l': ['🅛', '🅻'], 'm': ['🅜', '🅼'], 'n': ['🅝', '🅽'], 'o': ['🅞', '🅾️'], 
    'p': ['🅟', '🅿️'], 'q': ['🅠', '🆀'], 'r': ['🅡', '🆁'], 's': ['🅢', '🆂'], 't': ['🅣', '🆃'], 
    'u': ['🅤', '🆄'], 'v': ['🅥', '🆅'], 'w': ['🅦', '🆆'], 'x': ['🅧', '🆇'], 'y': ['🅨', '🆈'], 
    'z': ['🅩', '🆉']
};

const squareEmojis: EmojiDictionary = {
    'a': ['🄰'], 'b': ['🄱'], 'c': ['🄲'], 'd': ['🄳'], 'e': ['🄴'], 
    'f': ['🄵'], 'g': ['🄶'], 'h': ['🄷'], 'i': ['🄸'], 'j': ['🄹'], 
    'k': ['🄺'], 'l': ['🄻'], 'm': ['🄼'], 'n': ['🄽'], 'o': ['🄾'], 
    'p': ['🄿'], 'q': ['🅀'], 'r': ['🅁'], 's': ['🅂'], 't': ['🅃'], 
    'u': ['🅄'], 'v': ['🅅'], 'w': ['🅆'], 'x': ['🅇'], 'y': ['🅈'], 
    'z': ['🅉']
};

/**
 * Helper function to get a random item from an array.
 * 
 * @param {T[]} arr - The array to sample from.
 * @returns {T} A random item from the array.
 */
function getRandomItem<T>(arr: T[]): T {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

/**
 * Converts English text to circle character emojis.
 * 
 * This function replaces certain letters with circle character emojis
 * to create a fun and visually appealing version of the input text.
 * 
 * @param {string} text - The input text to convert.
 * @returns {string} The circle character emoji version of the input text.
 */
export function toCircleEmoji(text: string): string {
    return text.toLowerCase().split('').map(char => {
        if (circleEmojis[char]) {
            return getRandomItem(circleEmojis[char]);
        }
        return char;
    }).join('');
}

/**
 * Converts English text to square character emojis.
 * 
 * This function replaces certain letters with square character emojis
 * to create a fun and visually appealing version of the input text.
 * 
 * @param {string} text - The input text to convert.
 * @returns {string} The square character emoji version of the input text.
 */
export function toSquareEmoji(text: string): string {
    return text.toLowerCase().split('').map(char => {
        if (squareEmojis[char]) {
            return getRandomItem(squareEmojis[char]);
        }
        return char;
    }).join('');
}

/**
 * Converts English text to randomly chosen circle or square character emojis.
 * 
 * This function replaces certain letters with either circle or square character emojis,
 * randomly choosing between the two for each character.
 * 
 * @param {string} text - The input text to convert.
 * @returns {string} The mixed emoji version of the input text.
 */
export function toRandomEmoji(text: string): string {
    return text.toLowerCase().split('').map(char => {
        const useCircle = Math.random() < 0.5;
        const emojiDict = useCircle ? circleEmojis : squareEmojis;
        if (emojiDict[char]) {
            return getRandomItem(emojiDict[char]);
        }
        return char;
    }).join('');
}


/**
 * Converts English text to its binary representation.
 * 
 * This function converts each character of the input text to its ASCII
 * binary representation.
 * 
 * @param {string} text - The input text to convert to binary.
 * @returns {string} The binary encoded version of the input text.
 */
export function toBinary(text: string): string {
    return text.split('')
        .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
        .join(' ');
}
