export default function sleep(msec) {
  return new Promise(resolve => {
    setTimeout(resolve, msec);
  });
}
