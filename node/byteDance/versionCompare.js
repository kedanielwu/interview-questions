function compare(v1, v2) {
  if (!v1 || !v2) {
    throw Error('invalid input');
  } 
  const token1 = v1.split('.');
  const token2 = v2.split('.');
  const len = Math.max(token1.length, token2.length);

  for (let i=0; i<len; i++) {
    const c1 = Number(token1[i]) || 0;
    const c2 = Number(token2[i]) || 0;
    if (c1 < c2) {
      return `${v1} is lower version`;
    } else if (c1 > c2) {
      return `${v1} is higher version`;
    }
  }
  return `${v1} and ${v2} are equal`;
}

console.log(compare('1', '1.1'));
console.log(compare('1.1', '1.1.1'));
console.log(compare('2.0.0', '1.9.9'));
console.log(compare('1.0.0', '1'));