import { useState } from "react";
import { isFuture, isPast, isToday } from "date-fns";
import supabase from "../services/supabase";
import Button from "../ui/Button";
import { subtractDates } from "../utils/helpers";

import { bookings } from "./data-bookings";
import { cabins } from "./data-cabins";
import { guests } from "./data-guests";

// const originalSettings = {
//   minBookingLength: 3,
//   maxBookingLength: 30,
//   maxGuestsPerBooking: 10,
//   breakfastPrice: 15,
// };

async function deleteGuests() {
  const { error } = await supabase.from("Guest").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function deleteCabins() {
  const { error } = await supabase.from("Cabin").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function deleteBooking() {
  const { error } = await supabase.from("Booking").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function createGuests() {
  const { error } = await supabase.from("Guest").insert(guests);
  if (error) console.log(error.message);
}

async function createCabins() {
  const { error } = await supabase.from("Cabin").insert(cabins);
  if (error) console.log(error.message);
}

async function createBooking() {
  // Booking need a guestId and a cabinId. We can't tell Supabase IDs for each object, it will calculate them on its own. So it might be different for different people, especially after multiple uploads. Therefore, we need to first get all guestIds and cabinIds, and then replace the original IDs in the booking data with the actual ones from the DB
  const { data: guestsIds } = await supabase
    .from("Guest")
    .select("id")
    .order("id");
  const allGuestIds = guestsIds.map((cabin) => cabin.id);
  const { data: cabinsIds } = await supabase
    .from("Cabin")
    .select("id")
    .order("id");
  const allCabinIds = cabinsIds.map((cabin) => cabin.id);

  const finalBooking = bookings.map((booking) => {
    // Here relying on the order of cabins, as they don't have and ID yet
    const cabin = cabins.at(booking.cabinId - 1);
    const numNights = subtractDates(booking.endDate, booking.startDate);
    const cabinPrice = numNights * (cabin.regularPrice - cabin.discount);
    const extraPrice = booking.hasBreakfast
      ? numNights * 15 * booking.numGuests
      : 0; // hardcoded breakfast price
    const totalPrice = cabinPrice + extraPrice;

    let status;
    if (
      isPast(new Date(booking.endDate)) &&
      !isToday(new Date(booking.endDate))
    )
      status = "checked-out";
    if (
      isFuture(new Date(booking.startDate)) ||
      isToday(new Date(booking.startDate))
    )
      status = "unconfirmed";
    if (
      (isFuture(new Date(booking.endDate)) ||
        isToday(new Date(booking.endDate))) &&
      isPast(new Date(booking.startDate)) &&
      !isToday(new Date(booking.startDate))
    )
      status = "checked-in";

    return {
      ...booking,
      numNights,
      cabinPrice,
      extraPrice,
      totalPrice,
      guestId: allGuestIds.at(booking.guestId - 1),
      cabinId: allCabinIds.at(booking.cabinId - 1),
      status,
    };
  });

  console.log(finalBooking);

  const { error } = await supabase.from("Booking").insert(finalBooking);
  if (error) console.log(error.message);
}

function Uploader() {
  const [isLoading, setIsLoading] = useState(false);

  async function uploadAll() {
    setIsLoading(true);
    // Booking need to be deleted FIRST
    await deleteBooking();
    await deleteGuests();
    await deleteCabins();

    // Booking need to be created LAST
    await createGuests();
    await createCabins();
    await createBooking();

    setIsLoading(false);
  }

  async function uploadBooking() {
    setIsLoading(true);
    await deleteBooking();
    await createBooking();
    setIsLoading(false);
  }

  return (
    <div
      style={{
        marginTop: "auto",
        backgroundColor: "#e0e7ff",
        padding: "8px",
        borderRadius: "5px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <h3>SAMPLE DATA</h3>

      <Button onClick={uploadAll} disabled={isLoading}>
        Upload ALL
      </Button>

      <Button onClick={uploadBooking} disabled={isLoading}>
        Upload Booking ONLY
      </Button>
    </div>
  );
}

export default Uploader;
