import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import LinkButton from "../../ui/LinkButton";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";
import { clearCart, getCart } from "./cartSlice";

function Cart() {
  const userName = useSelector((state) => state.user.userName);
  const cart = useSelector(getCart);
  const dispatch = useDispatch();

  if (!cart.length) {
    return <EmptyCart />;
  }

  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {userName}</h2>

      {cart.length > 0 && (
        <ul className="divide-y divide-stone-300">
          {cart.map((item) => (
            <CartItem key={item.pizzaId} item={item} />
          ))}
        </ul>
      )}

      <div className="mt-5 space-x-3">
        <Button to="/order/new">Order pizzas</Button>
        <Button type="secondary" onClick={() => dispatch(clearCart())}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
