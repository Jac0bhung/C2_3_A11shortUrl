// generate_shorturl.js
// define sample function to randomly return a item in an array
function sample(array) {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
}

// define generateShortUrl function
function generateShortUrl(options) {
  // define things user might want
  const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
  const upperCaseLetters = lowerCaseLetters.toUpperCase();
  const numbers = "1234567890";

  let collection = [];

  collection = collection.concat(lowerCaseLetters.split(""));
  collection = collection.concat(upperCaseLetters.split(""));
  collection = collection.concat(numbers.split(""));

  // console.log("collection", collection);

  let shortUrl = "";
  for (let i = 1; i <= 5; i++) {
    shortUrl += sample(collection);
  }
  // console.log("Random Short Url is", shortUrl);
  // return the generated short url
  // console.log("This function will generate Short Url");
  // return the generated password
  return shortUrl;
}

// invoke generatePassword function
generateShortUrl();

// export generatePassword function for other files to use
module.exports = generateShortUrl;
