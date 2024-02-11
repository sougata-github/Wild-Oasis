import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useBooking() {
  const { bookingId } = useParams();

  const {
    isLoading,
    data: booking = { data: null },
    error,
  } = useQuery({
    queryKey: ["Booking"],
    queryFn: () => getBooking(bookingId),
  });

  return { isLoading, booking, error };
}
