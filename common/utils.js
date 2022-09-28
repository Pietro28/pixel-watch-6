// Add zero in front of numbers < 10
export function zeroPad(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

// Convert a number to a special monospace number
export function monoDigits(num, pad = true) {
  let monoNum = '';
  if (typeof num === 'number') {
    num |= 0;
    if (pad && num < 10) {
      monoNum = c0 + monoDigit(num);
    } else {
      while (num > 0) {
        monoNum = monoDigit(num % 10) + monoNum;
        num = (num / 10) | 0;
      }
    }
  } else {
    let text = num.toString();
    let textLen = text.length;
    for (let i = 0; i < textLen; i++) {
      monoNum += monoDigit(text.charAt(i));
    }
  }
  return monoNum;
}

const c0 = "0";
const c1 = "1";
const c2 = "2";
const c3 = "3";
const c4 = "4";
const c5 = "5";
const c6 = "6";
const c7 = "7";
const c8 = "8";
const c9 = "9";

export function monoDigit(digit) {
  switch (digit) {
    case 0: return c0;
    case 1: return c1;
    case 2: return c2;
    case 3: return c3;
    case 4: return c4;
    case 5: return c5;
    case 6: return c6;
    case 7: return c7;
    case 8: return c8;
    case 9: return c9;
    case '0': return c0;
    case '1': return c1;
    case '2': return c2;
    case '3': return c3;
    case '4': return c4;
    case '5': return c5;
    case '6': return c6;
    case '7': return c7;
    case '8': return c8;
    case '9': return c9;
    default: return digit;
  }
}


// Ease between two values
export function ease(t, b, c, d, type) {
  switch (type) {
    case "inOutQuart":
      if ((t/=d/2) < 1) return c/2 * Math.pow(t, 4) + b;
	    return -c/2 * (Math.pow(t-2, 4) - 2) + b;
      
    default: // outExpo
      return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
  }
}