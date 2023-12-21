import supabase from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("Cabin").select("*");

  if (error) {
    console.log("Cabins couldn't be loaded");
    throw error;
  }
  return data;
}
