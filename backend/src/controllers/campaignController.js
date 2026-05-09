const BUCKET_NAME = "campaigns";

const uploadFileToSupabase = async (supabase, file, folder = "campaigns") => {
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

  if (error) {
    throw new Error(error.message);
  }

  const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(fileName);

  return data.publicUrl;
};

const calculateProgress = (targetAmount, raisedAmount) => {
  const target = Number(targetAmount || 0);
  const raised = Number(raisedAmount || 0);

  if (target <= 0) return 0;

  return Math.round(Math.min((raised / target) * 100, 100));
};

export const createCampaign = async (req, res) => {
  try {
    const campaign = req.body;

    if (!campaign.slug || !campaign.type || !campaign.title_ar || !campaign.title_en) {
      return res.status(400).json({
        success: false,
        message: "slug, type, title_ar, and title_en are required",
      });
    }

    let heroImageUrl = campaign.hero_image || null;

    if (req.files?.hero_image_file?.[0]) {
      heroImageUrl = await uploadFileToSupabase(
        req.supabase,
        req.files.hero_image_file[0],
        "hero"
      );
    }

    const targetAmount = Number(campaign.target_amount || 0);
    const raisedAmount = Number(campaign.raised_amount || 0);

    const { data, error } = await req.supabase
      .from("campaigns")
      .insert([
        {
          slug: campaign.slug,
          type: campaign.type,
          title_ar: campaign.title_ar,
          title_en: campaign.title_en,
          description_ar: campaign.description_ar || null,
          description_en: campaign.description_en || null,
          hero_image: heroImageUrl,

          progress: calculateProgress(targetAmount, raisedAmount),
          target_amount: targetAmount,
          raised_amount: raisedAmount,
          currency: campaign.currency || "USD",

          start_date_ar: campaign.start_date_ar || null,
          start_date_en: campaign.start_date_en || null,
          end_date_ar: campaign.end_date_ar || null,
          end_date_en: campaign.end_date_en || null,
          beneficiaries_ar: campaign.beneficiaries_ar || null,
          beneficiaries_en: campaign.beneficiaries_en || null,
          beneficiaries_number_ar: campaign.beneficiaries_number_ar || null,
          beneficiaries_number_en: campaign.beneficiaries_number_en || null,
          location_ar: campaign.location_ar || null,
          location_en: campaign.location_en || null,
        },
      ])
      .select()
      .single();

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    const galleryFiles = req.files?.gallery_images || [];

    if (galleryFiles.length > 0) {
      const imageRows = [];

      for (const file of galleryFiles) {
        const imageUrl = await uploadFileToSupabase(
          req.supabase,
          file,
          "gallery"
        );

        imageRows.push({
          campaign_id: data.id,
          image_url: imageUrl,
        });
      }

      const { error: galleryError } = await req.supabase
        .from("campaign_images")
        .insert(imageRows);

      if (galleryError) {
        return res.status(400).json({
          success: false,
          message: galleryError.message,
        });
      }
    }

    return res.status(201).json({
      success: true,
      message: "Campaign created successfully",
      campaign: data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

export const getCampaigns = async (req, res) => {
  try {
    const { data, error } = await req.supabase
      .from("campaigns")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.json({
      success: true,
      campaigns: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getCampaignBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const { data: campaign, error } = await req.supabase
      .from("campaigns")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error || !campaign) {
      return res.status(404).json({
        success: false,
        message: "Campaign not found",
      });
    }

    const { data: images, error: imagesError } = await req.supabase
      .from("campaign_images")
      .select("*")
      .eq("campaign_id", campaign.id)
      .order("created_at", { ascending: true });

    if (imagesError) {
      return res.status(400).json({
        success: false,
        message: imagesError.message,
      });
    }

    res.json({
      success: true,
      campaign: {
        ...campaign,
        gallery: images || [],
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const updateCampaign = async (req, res) => {
  try {
    const { slug } = req.params;
    const updates = req.body;

    const { data: oldCampaign, error: oldError } = await req.supabase
      .from("campaigns")
      .select("*")
      .eq("slug", slug)
      .single();

    if (oldError || !oldCampaign) {
      return res.status(404).json({
        success: false,
        message: "Campaign not found",
      });
    }

    let heroImageUrl = updates.hero_image || oldCampaign.hero_image || null;

    if (req.files?.hero_image_file?.[0]) {
      heroImageUrl = await uploadFileToSupabase(
        req.supabase,
        req.files.hero_image_file[0],
        "hero"
      );
    }

    const targetAmount = Number(updates.target_amount || 0);
    const raisedAmount = Number(updates.raised_amount || 0);

    const { data, error } = await req.supabase
      .from("campaigns")
      .update({
        slug: updates.slug,
        type: updates.type,
        title_ar: updates.title_ar,
        title_en: updates.title_en,
        description_ar: updates.description_ar,
        description_en: updates.description_en,
        hero_image: heroImageUrl,

        progress: calculateProgress(targetAmount, raisedAmount),
        target_amount: targetAmount,
        raised_amount: raisedAmount,
        currency: updates.currency || "USD",

        start_date_ar: updates.start_date_ar,
        start_date_en: updates.start_date_en,
        end_date_ar: updates.end_date_ar,
        end_date_en: updates.end_date_en,
        beneficiaries_ar: updates.beneficiaries_ar,
        beneficiaries_en: updates.beneficiaries_en,
        beneficiaries_number_ar: updates.beneficiaries_number_ar,
        beneficiaries_number_en: updates.beneficiaries_number_en,
        location_ar: updates.location_ar,
        location_en: updates.location_en,
      })
      .eq("slug", slug)
      .select()
      .single();

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    const galleryFiles = req.files?.gallery_images || [];

    if (galleryFiles.length > 0) {
      await req.supabase
        .from("campaign_images")
        .delete()
        .eq("campaign_id", data.id);

      const imageRows = [];

      for (const file of galleryFiles) {
        const imageUrl = await uploadFileToSupabase(
          req.supabase,
          file,
          "gallery"
        );

        imageRows.push({
          campaign_id: data.id,
          image_url: imageUrl,
        });
      }

      const { error: galleryError } = await req.supabase
        .from("campaign_images")
        .insert(imageRows);

      if (galleryError) {
        return res.status(400).json({
          success: false,
          message: galleryError.message,
        });
      }
    }

    res.json({
      success: true,
      message: "Campaign updated successfully",
      campaign: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

export const deleteCampaign = async (req, res) => {
  try {
    const { slug } = req.params;

    const { data: campaign } = await req.supabase
      .from("campaigns")
      .select("id")
      .eq("slug", slug)
      .single();

    if (campaign?.id) {
      await req.supabase
        .from("campaign_images")
        .delete()
        .eq("campaign_id", campaign.id);
    }

    const { error } = await req.supabase
      .from("campaigns")
      .delete()
      .eq("slug", slug);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.json({
      success: true,
      message: "Campaign deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};