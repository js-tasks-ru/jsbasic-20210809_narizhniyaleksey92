function getMinMax(str) {
  let arr = str.split(' ').filter( a => !isNaN(+a) && isFinite(+a) && typeof +a === 'number' ? +a:false);
  let obj = {};

  obj.min = Math.min(...arr);
  obj.max = Math.max(...arr);

  return obj;
}
