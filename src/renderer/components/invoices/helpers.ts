interface Items {
  name: string;
  value: string;
}
export function calculateNet(items: Items[]) {
  return items.reduce((acc, val) => acc + parseFloat(val.value), 0) || 0;
}

export function calculateVat(items: Items[], vat: number) {
  return (
    (
      (items.reduce((acc, val) => acc + parseFloat(val.value), 0) * vat) /
      100
    ).toFixed(2) || 0
  );
}

export function calculateTotal(items: Items[], vat: number) {
  return (
    (
      (items.reduce((acc, val) => acc + parseFloat(val.value), 0) *
        (100 + vat)) /
      100
    ).toFixed(2) || 0
  );
}
