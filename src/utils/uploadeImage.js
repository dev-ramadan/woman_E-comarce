import { v4 as uuidv4 } from 'uuid';
import { supabase } from "../supabasae/createclient";

export const uploadImage = async (file) => {
    const uniqueName = `${uuidv4()}-${file.name}`;
  const { data, error } = await supabase.storage
    .from('products')
    .upload(`public/${uniqueName}`, file);

  if (error) throw error;

  const { data: publicUrlData } = supabase
    .storage
    .from('products')
    .getPublicUrl(`public/${uniqueName}`);

  return publicUrlData.publicUrl;
};
