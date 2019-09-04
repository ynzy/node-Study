
var str = '1223 16 1016 1016 85965 15625 1568 22 3232 14753 1565 9856'

let r = str.split(" ").sort((a, b) => (a.slice(-3) - b.slice(-3))).join(" ")


console.log(r);
