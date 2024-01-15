import { useDispatch } from "react-redux";
import { deleteItem } from "../features/cart/cartSlice";
import Button from "./Button";

function DeleteItemButton({ id }) {
  const dispatch = useDispatch();
  return (
    <Button
      type="small"
      className="sm:ml-auto"
      onClick={() => dispatch(deleteItem(id))}
    >
      Delete
    </Button>
  );
}

export default DeleteItemButton;
