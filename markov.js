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
    let chains = new Map ();

    for (let i = 0; i < this.words.length; i +=1){
      let word = this.words[i];
      let nextWord = this.words[i+1] || null;

      if (chains.has(word)){
        chains.get(word).push(nextWord);
      }else{
        chains.set(word, [nextWord])
      }
    }
    this.chains = chains;
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    let keys = Array.from(this.chains.keys());
    let rdmIdx = Math.floor(Math.random()* keys.length)
    let key = keys[rdmIdx];
    let out = [];

    while (out.length < numWords && key !== null) {
      out.push(key);
      let nextWordsArr = this.chains.get(key);
      if (!nextWordsArr) {
        break;
      }
      let randomIdx = Math.floor(Math.random() * nextWordsArr.length);
      key = nextWordsArr[randomIdx];
    }
    return out.join(" ");
  }
}

module.exports = {
  MarkovMachine
};

