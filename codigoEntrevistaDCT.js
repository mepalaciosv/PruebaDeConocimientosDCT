// --------------------------------------
//          1st problem solution
// --------------------------------------

const https = require('https')

// Function to verify the three main conditions
function firstCheck(object){
    if (object === "N/A" || object === "" || object === "-"){
        return true        
    }
    return false
}

// Function that modifies the given object recursively
function modify(object){
    for (let key in object){   // Iterating over all elements in the object
        let item = object[key] // Reference to value

        // For simple items
        if (firstCheck(item)){
            delete object[key]
        } 
        // For arrays as items
        else if (Array.isArray(item)){ 
            let array = []
            for (elem of item){
                // Simple elements
                if (firstCheck(elem)){
                    continue
                }
                // Recursive use for object items
                if (typeof(elem === "object")){ 
                    elem = modify(elem)
                }
                array.push(elem)
            }
            object[key] = array
        }
        // For objects as items
        else if (typeof(item) === 'object') {
            item = modify(item)
        }
    }
    return object;
}

https.get('https://coderbyte.com/api/challenges/json/json-cleaning', (resp) => {
  resp.on("data", (a) => {
    let object = (JSON.parse(a.toString()))
    obj = modify(object)
    console.log("1st problem solution: \n" + JSON.stringify(object))
  })
});


// --------------------------------------
//          2nd problem solution
// --------------------------------------

let sentence = "Hello world123 567 SoyUnGatoMuyMicifuz123"

function longestWord(sen){
    let sentence = sen.split(" ");
    let candidate = sentence[0]

    // Linear search
    for (word of sentence){
        if (word.length > candidate.length){
            candidate = word
        }
    }
    return candidate
}

console.log("2nd problem solution:")
console.log(longestWord(sentence) + "\n")

// --------------------------------------
//          3rd problem solution
// --------------------------------------

// Verifies if every element in k belongs to n
function isContained(str, needle) {
    let arr = str.split("");
    for (let i = 0; i < needle.length; i++) {
      let place = arr.indexOf(needle[i]);
      if (place === -1) {
        return false;
      } else {
        arr.splice(place, 1);
      }
    }
    return true;
  }
  

  function minWindowSubstring(strArr) {
    const str = strArr[0];
    const needle = strArr[1];
    for (let i = needle.length; i <= str.length; i++) {
      for (let j = 0; j <= str.length - i; j++) {
        const slice = str.substring(j, j + i);
        if (isContained(slice, needle)) return slice;
      }
    }
    return "Not in string";
  }
  

console.log("3rd problem solution:")
console.log(minWindowSubstring(["aaabaaddae", "aed"])); // dae
console.log(minWindowSubstring(["aabdccdbcacd", "aad"])); // aabd
console.log("\n")