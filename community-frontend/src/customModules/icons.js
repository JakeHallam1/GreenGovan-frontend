export function getIconName(routeName) {
  switch (routeName) {
    case "Products":
      return "grid";
    case "Inventory":
      return "cube";
    case "Basket":
      return "basket";
    case "Staff":
      return "people";
    case "Promotions":
      return "pricetag";
    case "Sales":
      return "receipt";
    default:
      return null;
  }
}
