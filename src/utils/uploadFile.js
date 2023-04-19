import { supabase } from "../config/Supabase";

function getFileURL(key, storage = "uploads", ...rest) {
  const { data } = supabase.storage.from(storage).getPublicUrl(key);
  console.log("datapublicurl", data?.publicUrl);
  return data?.publicUrl;
}

export default async function uploadFile({
  file,
  storageName = "uploads",
  rest,
}) {
  const fileName = file.name.split(".");
  const fileExt = fileName.pop();

  const filePath = `${fileName.join("")}-${new Date().getTime()}.${fileExt}`;
  const filePathWithoutSpaces = filePath.replace(/\s/g, "");

  const { error } = await supabase.storage
    .from(storageName)
    .upload(filePathWithoutSpaces, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type,
    });
  console.log("filepath", filePath);
  console.log("filepathwithoutspace", filePathWithoutSpaces);
  if (error) throw error;

  return getFileURL(filePathWithoutSpaces, storageName, rest);
}
