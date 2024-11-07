export default function arrayContains (needle, arrayHaystack) {
  // console.log('arrayContains, needle:', needle, ', haystack: ', arrayHaystack);
  if (arrayHaystack && arrayHaystack.length > 0) {
    return arrayHaystack.indexOf(needle) > -1;
  } else {
    return false;
  }
}
