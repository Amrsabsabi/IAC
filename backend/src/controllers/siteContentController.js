const BUCKET_NAME = "site";

const uploadFileToSupabase = async (supabase, file, folder = "site") => {
  const fileExt = file.originalname.split(".").pop();
  const fileName = `${folder}/${Date.now()}-${Math.round(
    Math.random() * 1e9
  )}.${fileExt}`;

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(fileName, file.buffer, {
      contentType: file.mimetype,
      upsert: false,
    });

  if (error) throw new Error(error.message);

  const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(fileName);

  return data.publicUrl;
};

export const getSiteContent = async (req, res) => {
  try {
    const { data, error } = await req.supabase.from("site_content").select("*");

    if (error) {
      return res.status(400).json({ success: false, message: error.message });
    }

    const content = {};
    data.forEach((item) => {
      content[item.key] = item.value;
    });

    res.json({ success: true, content });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateSiteContent = async (req, res) => {
  try {
    const updates = { ...req.body };

    if (req.file) {
      const imageUrl = await uploadFileToSupabase(
        req.supabase,
        req.file,
        "home"
      );

      updates.home_hero_image = imageUrl;
    }

    const rows = Object.entries(updates).map(([key, value]) => ({
      key,
      value,
    }));

    const { error } = await req.supabase
      .from("site_content")
      .upsert(rows, { onConflict: "key" });

    if (error) {
      return res.status(400).json({ success: false, message: error.message });
    }

    res.json({ success: true, message: "Home content updated successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};