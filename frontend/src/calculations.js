export const formateDate = (date) => {
    const formattedDate = new Date(date).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
    });
    return formattedDate;
}

export const calculateDiscount = (originalPrice, salePrice) => {
  if (!originalPrice || !salePrice || originalPrice <= salePrice) {
    return 0;
  }

  return Math.round(
    ((originalPrice - salePrice) / originalPrice) * 100
  );
};

export const getDiscountedProducts = (products = []) => {
    return products
        .map((product) => ({
            ...product,
            discount: calculateDiscount(
                product.comparePrice,
                product.price
            ),
        }))
        .filter((product) => product.discount > 0)
        .sort((a, b) => b.discount - a.discount);
};