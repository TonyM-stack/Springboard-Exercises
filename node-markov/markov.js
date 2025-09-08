/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

 makeChains() {
  let chains = new Map();             // adjacency list: word -> [possible next words]

  for (let i = 0; i < this.words.length; i += 1) {
    let word = this.words[i];         // current word
    let nextWord = this.words[i + 1] || null; // next word (or null if at the end)

    if (chains.has(word)) chains.get(word).push(nextWord); // seen before: add another follower
    else chains.set(word, [nextWord]);                     // first time: start its follower list
  }

  this.chains = chains;               // store on the instance
}
// Example with "the cat in the hat"

// this.words = ["the","cat","in","the","hat"]

// Iteration builds:

// “the” → [“cat”]

// “cat” → [“in”]

// “in” → [“the”]

// “the” (again) → [“cat”, “hat”]

// “hat” → [null]

  /** Pick random choice from array */

  static choice(ar) {
    return ar[Math.floor(Math.random() * ar.length)];
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    // pick a random key to begin
    let keys = Array.from(this.chains.keys());
    let key = MarkovMachine.choice(keys);
    let out = [];

    // produce markov chain until reaching termination word
    while (out.length < numWords && key !== null) {
      out.push(key);
      key = MarkovMachine.choice(this.chains.get(key));
    }

    return out.join(" ");
  }
}

module.exports = {
  MarkovMachine,
};
makeText.js