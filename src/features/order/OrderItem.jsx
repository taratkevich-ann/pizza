import Loader from "../../ui/Loader";
import { formatCurrency } from "../../utils/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  if (isLoadingIngredients) {
    return <Loader />;
  }

  return (
    <li className="px-2 py-3">
      <div className="flex items-center justify-between">
        <p>
          <span className="font-semibold">{quantity}&times;</span> {name}
        </p>
        <p className="font-semibold">{formatCurrency(totalPrice)}</p>
      </div>

      <p className="text-sm capitalize italic text-stone-500">
        {ingredients?.join(", ")}
      </p>
    </li>
  );
}

export default OrderItem;
