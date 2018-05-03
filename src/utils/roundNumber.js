
export default function roundNumber(value, decimals) {
  const round = Math.round(`${value}e${decimals}`);
  return Number(`${round}e-${decimals}`);
}
