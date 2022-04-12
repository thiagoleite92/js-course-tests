const keyValuesToString = ([key, value]) => {
  if (typeof value === 'object' && !Array.isArray(value)) {
    throw new Error('Please check your params');
  }
  return `${key}=${value}`;
};

export function queryString(obj) {
  return Object.entries(obj).map(keyValuesToString).join('&');
}

// module.exports.parse = string => {
//   const firstSplit = string.split('&');

//   const secondSplit = firstSplit.map(item => item.split('='));

//   const obj = secondSplit.reduce((acc, curr) => {
//     if (curr[1].indexOf(',') > -1) {
//       curr[1] = curr[1].split(',');
//     }
//     acc[curr[0]] = curr[1];
//     return acc;
//   }, {});

//   return obj;
// }; my method w/o knowing all resources of JS

export function parse(string) {
  return Object.fromEntries(
    string.split('&').map(item => {
      let [key, value] = item.split('=');

      if (value.indexOf(',') > -1) {
        value = value.split(',');
      }

      return [key, value];
    }),
  );
}
