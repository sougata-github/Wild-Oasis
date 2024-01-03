import supabase from "./supabase";
import { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("Cabin").select("*");

  if (error) {
    console.log("Cabins couldn't be loaded");
    throw error;
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.imageUrl?.startsWith?.(supabaseUrl); //to account for image while editing a cabin.

  let query = supabase.from("Cabin");

  const imageName = `${Math.random()}-${newCabin.imageUrl.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin.imageUrl
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //1.
  // Create Cabin
  if (!id) {
    query = query.insert([{ ...newCabin, imageUrl: imagePath }]);
  }

  //Edit Cabin
  if (id) {
    query = query.update({ ...newCabin, imageUrl: imagePath }).eq("id", id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw error;
  }

  //2. Upload image

  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.imageUrl);

  //3. Delete the cabin if there was an error uploading an image

  if (storageError) {
    await supabase.from("Cabin").delete().eq("id", data.id);
    console.log(storageError);
    throw storageError;
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
