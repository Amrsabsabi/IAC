// export const createCampaign = async (req, res) => {
//   try {
//     const campaign = req.body;

//     if (!campaign.slug || !campaign.type || !campaign.title_ar || !campaign.title_en) {
//       return res.status(400).json({
//         success: false,
//         message: "slug, type, title_ar, and title_en are required",
//       });
//     }

//     const { data, error } = await req.supabase
//       .from("campaigns")
//       .insert([
//         {
//           slug: campaign.slug,
//           type: campaign.type,
//           title_ar: campaign.title_ar,
//           title_en: campaign.title_en,
//           description_ar: campaign.description_ar || null,
//           description_en: campaign.description_en || null,
//           hero_image: campaign.hero_image || null,
//           progress: campaign.progress ?? 0,
//           start_date_ar: campaign.start_date_ar || null,
//           start_date_en: campaign.start_date_en || null,
//           end_date_ar: campaign.end_date_ar || null,
//           end_date_en: campaign.end_date_en || null,
//           beneficiaries_ar: campaign.beneficiaries_ar || null,
//           beneficiaries_en: campaign.beneficiaries_en || null,
//           beneficiaries_number_ar: campaign.beneficiaries_number_ar || null,
//           beneficiaries_number_en: campaign.beneficiaries_number_en || null,
//           location_ar: campaign.location_ar || null,
//           location_en: campaign.location_en || null,
//         },
//       ])
//       .select()
//       .single();

//     if (error) {
//       return res.status(400).json({
//         success: false,
//         message: error.message,
//       });
//     }

//     return res.status(201).json({
//       success: true,
//       message: "Campaign created successfully",
//       campaign: data,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };


// export const getCampaigns = async (req, res) => {
//   try {
//     const { data, error } = await req.supabase
//       .from("campaigns")
//       .select("*")
//       .order("created_at", { ascending: false });

//     if (error) {
//       return res.status(400).json({
//         success: false,
//         message: error.message,
//       });
//     }

//     res.json({
//       success: true,
//       campaigns: data,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };

// export const getCampaignBySlug = async (req, res) => {
//   try {
//     const { slug } = req.params;

//     const { data, error } = await req.supabase
//       .from("campaigns")
//       .select("*")
//       .eq("slug", slug)
//       .single();

//     if (error) {
//       return res.status(404).json({
//         success: false,
//         message: "Campaign not found",
//       });
//     }

//     res.json({
//       success: true,
//       campaign: data,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };


// export const updateCampaign = async (req, res) => {
//   try {
//     const { slug } = req.params;
//     const updates = req.body;

//     const { data, error } = await req.supabase
//       .from("campaigns")
//       .update({
//         slug: updates.slug,
//         type: updates.type,
//         title_ar: updates.title_ar,
//         title_en: updates.title_en,
//         description_ar: updates.description_ar,
//         description_en: updates.description_en,
//         hero_image: updates.hero_image,
//         progress: updates.progress,
//         start_date_ar: updates.start_date_ar,
//         start_date_en: updates.start_date_en,
//         end_date_ar: updates.end_date_ar,
//         end_date_en: updates.end_date_en,
//         beneficiaries_ar: updates.beneficiaries_ar,
//         beneficiaries_en: updates.beneficiaries_en,
//         beneficiaries_number_ar: updates.beneficiaries_number_ar,
//         beneficiaries_number_en: updates.beneficiaries_number_en,
//         location_ar: updates.location_ar,
//         location_en: updates.location_en,
//       })
//       .eq("slug", slug)
//       .select()
//       .single();

//     if (error) {
//       return res.status(400).json({
//         success: false,
//         message: error.message,
//       });
//     }

//     res.json({
//       success: true,
//       message: "Campaign updated successfully",
//       campaign: data,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };

// export const deleteCampaign = async (req, res) => {
//   try {
//     const { slug } = req.params;

//     const { error } = await req.supabase
//       .from("campaigns")
//       .delete()
//       .eq("slug", slug);

//     if (error) {
//       return res.status(400).json({
//         success: false,
//         message: error.message,
//       });
//     }

//     res.json({
//       success: true,
//       message: "Campaign deleted successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };


export const createCampaign = async (req, res) => {
  try {
    const campaign = req.body;

    if (!campaign.slug || !campaign.type || !campaign.title_ar || !campaign.title_en) {
      return res.status(400).json({
        success: false,
        message: "slug, type, title_ar, and title_en are required",
      });
    }

    const targetAmount = Number(campaign.target_amount || 0);
    const raisedAmount = Number(campaign.raised_amount || 0);

    const calculatedProgress =
      targetAmount > 0 ? Math.min((raisedAmount / targetAmount) * 100, 100) : 0;

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
          hero_image: campaign.hero_image || null,

          progress: Math.round(calculatedProgress),
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

    return res.status(201).json({
      success: true,
      message: "Campaign created successfully",
      campaign: data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
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

    const { data, error } = await req.supabase
      .from("campaigns")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) {
      return res.status(404).json({
        success: false,
        message: "Campaign not found",
      });
    }

    res.json({
      success: true,
      campaign: data,
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

    const targetAmount = Number(updates.target_amount || 0);
    const raisedAmount = Number(updates.raised_amount || 0);

    const calculatedProgress =
      targetAmount > 0 ? Math.min((raisedAmount / targetAmount) * 100, 100) : 0;

    const { data, error } = await req.supabase
      .from("campaigns")
      .update({
        slug: updates.slug,
        type: updates.type,
        title_ar: updates.title_ar,
        title_en: updates.title_en,
        description_ar: updates.description_ar,
        description_en: updates.description_en,
        hero_image: updates.hero_image,

        progress: Math.round(calculatedProgress),
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

    res.json({
      success: true,
      message: "Campaign updated successfully",
      campaign: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const deleteCampaign = async (req, res) => {
  try {
    const { slug } = req.params;

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