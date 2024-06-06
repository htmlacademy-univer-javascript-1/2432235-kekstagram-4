function checkLength(text, maxLen) {
  if (text.length <= maxLen) {
    return true;
  }
  else {
    return false;
  }
}
checkLength('чашка',5);

function findPalindrome (text) {
  let abc = text.replaceAll(' ');
  abc = text.toUpperCase();
  let bca = '';
  for (let i = abc.length-1; i === 0; i--) {
    bca += abc[i];
    if (bca === abc) {
      return true;
    }
    else {
      return false;
    }
  }
}
findPalindrome('довод');
