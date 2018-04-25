
export default function roundNumber(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}
