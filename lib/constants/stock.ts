export const LOW_STOCK_THRESHOLD = 5;

export const isLowStock = (stock: number): boolean =>
  stock > 0 && stock <= LOW_STOCK_THRESHOLD;

export const isOutOfStock = (stock: number): boolean => stock <= 0;

export const getStockStatus = (
  stock: number | null | undefined,
): "out_of_stock" | "low_stock" | "in_stock" | "unknown" => {
  if (stock === null || stock === undefined) return "unknown";
  if (stock <= 0) return "out_of_stock";
  if (stock <= LOW_STOCK_THRESHOLD) return "low_stock";
  return "in_stock";
};

export const getStockMessage = (stock: number | null | undefined): string => {
  const status = getStockStatus(stock);
  switch (status) {
    case "out_of_stock":
      return "OUT OF STOCK - Currently unavailable";
    case "low_stock":
      return `LOW STOCK - Only ${stock} left`;
    case "in_stock":
      return `In stock (${stock} available)`;
    default:
      return "Stock status unknown";
  }
};
