export function formatNumber(num: number) {
  return "₱" + num.toLocaleString("en-US");
}

export function formatContactNumber(num: string) {
  num = num.replace(/\D/g, "");
  num = num.slice(0, 11);
  return num.replace(/(\d{4})(\d{3})(\d{4})/, "$1-$2-$3");
}
