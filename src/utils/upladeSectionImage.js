import { v4 as uuidv4 } from "uuid";
import { supabase } from "../supabasae/createclient";

export const uploadSectionImage = async (file) => {
  if (!file) throw new Error("لا يوجد ملف مرفوع");

  const uniqueName = `${uuidv4()}-${file.name}`;

  const { data, error } = await supabase.storage
    .from("section") // ← تأكد من اسم الباكيت
    .upload(uniqueName, file, {
      cacheControl: "3600",
      upsert: true,
      contentType: file.type, // ← مهم
    });

  if (error) throw error;

  const { data: publicUrlData } = supabase
    .storage
    .from("section")
    .getPublicUrl(uniqueName);

  return publicUrlData.publicUrl;
};
