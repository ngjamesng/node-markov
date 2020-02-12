/** Textual markov chain generator */

class MarkovMachine {
	/** build markov machine; read in text.*/

	constructor(text) {
		let words = text.split(/[ \r\n]+/);
		this.words = words.filter((c) => c !== "");
		this.makeChains();
	}

	/** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

	makeChains() {
		// TODO
		let obj = {};

		for (let i = 0; i < this.words.length; i++) {
			let word = this.words[i];
			let wordAhead = this.words[i + 1];
			if (wordAhead === undefined) {
				wordAhead = null;
			}
			if (obj[word]) {
				obj[word].push(wordAhead);
			} else {
				obj[word] = [ wordAhead ];
			}
		}
		return obj;
	}

	/** return random text from chains */

	makeText(numWords = 50) {
		let wordsObj = this.makeChains(); //This is an object
		let arr = [];
		let wordsObjKeys = Object.keys(wordsObj);
		let startidx = Math.floor(Math.random() * wordsObjKeys.length);
		let pushWord = wordsObjKeys[startidx];
		arr.push(pushWord);
		while (numWords > arr.length) {
			let val = wordsObj[pushWord];
			let idx = Math.floor(Math.random() * val.length);
			if (val[idx] === null) {
				break;
			} else {
				arr.push(val[idx]);
				pushWord = val[idx];
			}
		}
		return arr.join(" ");
	}
}

let mm = new MarkovMachine("the cat in the hat");

// console.log(mm.makeChains());
console.log("MAKE TEXT!!!!", mm.makeText());

// let junk = {
// 	the : [ "cat", "hat" ],
// 	cat : [ "in" ],
// 	in  : [ "the" ],
// 	hat : [ null ]
// };
