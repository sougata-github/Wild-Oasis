import supabase from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("Cabin").select("*");

  if (error) {
    console.log("Cabins couldn't be loaded");
    throw error;
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("Cabin").delete().eq("id", id);

  if (error) {
    console.log("Cabin couldn't be deleted");
    throw error;
  }

  return data;
}
