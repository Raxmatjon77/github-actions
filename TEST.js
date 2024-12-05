'use strict';
var isPalindrome = function (x) {
  x = x.toString();

  if (x.length % 2 == 0) {
    for (let i = 0; i <= x.length / 2; i++) {

      if (x[i] !== x[x.length - i - 1]) {
        return false;
      }
    }
    return true;
  }
  if (x.length % 2 !== 0) {
    for (let i = 0; i <= (x.length + 1) / 2; i++) {
      if (x[i] !== x[x.length - i - 1]) {

        return false;
      }
    }
    return true;
  }
};

// console.log(isPalindrome(0));
// function salom(ism,callback) {
//   console.log(`salom ${ism}`);
 

//   callback(err)
// }

// salom('shakhboz', (err) => {
//     if(err)
//   console.log(err);
// });
