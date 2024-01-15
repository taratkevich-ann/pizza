import { useSelector } from "react-redux";
import DeleteItemButton from "../../ui/DeleteItemButton";
import UpdateQuarencyButtons from "../../ui/updateQuarencyButtons";
import { formatCurrency } from "../../utils/helpers";
import { getCurrentQuantityById } from "./cartSlice";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));

  return (
    <li className="py-2 last-of-type:pb-0 sm:flex sm:items-center sm:justify-between sm:gap-2">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between gap-2">
        <p>{formatCurrency(totalPrice)}</p>
        <UpdateQuarencyButtons id={pizzaId} quantity={currentQuantity} />
        <DeleteItemButton id={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
