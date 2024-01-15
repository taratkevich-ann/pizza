import { Form, redirect, useNavigation, useActionData } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const dispatch = useDispatch();
  const cart = useSelector(getCart);
  const formErrors = useActionData();
  const {
    userName,
    status: addressStatus,
    address,
    position,
    error: addressError,
  } = useSelector((state) => state.user);
  const isLoadingAddress = addressStatus === "loading";
  const { latitude: positionLatitude, longitude: positionLongtitude } =
    position;

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  if (!cart.length) {
    return <EmptyCart />;
  }

  return (
    <div className="px-4 py-6">
      <h2 className="mb-5 text-xl font-semibold">
        Ready to order? Let&apos;s go!
      </h2>

      <Form method="POST">
        <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="text-sm sm:shrink-0 sm:basis-36">First Name</label>
          <input
            type="text"
            name="customer"
            defaultValue={userName}
            className="input"
            required
          />
        </div>

        <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="text-sm sm:shrink-0 sm:basis-36">
            Phone number
          </label>
          <div className="grow">
            <input type="tel" name="phone" className="input" required />
          </div>
          {formErrors?.phone && (
            <p className="mt-2 bg-red-100 p-2 text-xs text-red-700">
              {formErrors.phone}
            </p>
          )}
        </div>

        <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="text-sm sm:shrink-0 sm:basis-36">Address</label>
          <div className="relative grow">
            <input
              type="text"
              name="address"
              className="input"
              required
              disabled={isLoadingAddress}
              defaultValue={address}
            />

            {!positionLatitude && !positionLongtitude && (
              <div className="absolute right-1 top-0.5">
                <Button
                  type="small"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(fetchAddress());
                  }}
                  disabled={isLoadingAddress}
                >
                  Get position
                </Button>
              </div>
            )}
            {addressStatus === "error" && (
              <p className="mt-2 bg-red-100 p-2 text-xs text-red-700">
                {addressError}
              </p>
            )}
          </div>
        </div>

        <div className="mb-6 flex items-center gap-2 font-medium">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
          />
          <label htmlFor="priority">
            Want to you give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              positionLatitude && positionLongtitude
                ? `${positionLatitude}, ${positionLongtitude}`
                : ""
            }
          />
          <Button disabled={isSubmitting || isLoadingAddress}>
            {isSubmitting ? "Placing order..." : "Order now"}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "on",
  };

  const errors = {};

  if (!isValidPhone(order.phone)) {
    errors.phone =
      "Please give us correct phone number. We might need to contact you.";
  }

  if (Object.keys(errors).length > 0) {
    return errors;
  }

  const newOrder = await createOrder(order);

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
