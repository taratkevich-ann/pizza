import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button";
import { addItem, getCurrentQuantityById } from "../cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import DeleteItemButton from "../../ui/DeleteItemButton";
import UpdateQuarencyButtons from "../../ui/updateQuarencyButtons";

function MenuItem({ pizza }) {
  const dispatch = useDispatch();
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const currentQuantity = useSelector(getCurrentQuantityById(id));
  const isInCart = currentQuantity > 0;

  function handleAddToCart() {
    const newPizza = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice,
    };

    dispatch(addItem(newPizza));
  }

  return (
    <li className="flex gap-4 py-3 last-of-type:pb-0">
      <img
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
        src={imageUrl}
        alt={name}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div
          className={`mt-auto ${
            soldOut ? "" : "flex items-center justify-between gap-2"
          }`}
        >
          {!soldOut ? (
            <>
              <p className="grow text-sm">{formatCurrency(unitPrice)}</p>
              {isInCart ? (
                <div className="flex items-center gap-3">
                  <UpdateQuarencyButtons id={id} quantity={currentQuantity} />
                  <DeleteItemButton id={id} />
                </div>
              ) : (
                <Button type="small" onClick={handleAddToCart}>
                  Add to cart
                </Button>
              )}
            </>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
