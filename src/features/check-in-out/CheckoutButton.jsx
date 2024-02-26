/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import Button from "../../ui/Button";

import { useCheckout } from "../bookings/useCheckout";

function CheckoutButton({ bookingId }) {
  const { checkout, isCheckingOut } = useCheckout();

  return (
    <Button
      variation="primary"
      size="small"
      disabled={isCheckingOut}
      onClick={() => checkout(bookingId)}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
