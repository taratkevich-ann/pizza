import { useDispatch } from "react-redux";
import Button from "./Button";
import {
  decreaseItemQuanity,
  increaseItemQuanity,
} from "../features/cart/cartSlice";

function UpdateQuarencyButtons({ id, quantity }) {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-2">
      <Button type="rounded" onClick={() => dispatch(decreaseItemQuanity(id))}>
        -
      </Button>
      <span className="text-sm font-medium">{quantity}</span>
      <Button type="rounded" onClick={() => dispatch(increaseItemQuanity(id))}>
        +
      </Button>
    </div>
  );
}

export default UpdateQuarencyButtons;
