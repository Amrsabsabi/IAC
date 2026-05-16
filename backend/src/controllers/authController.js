const getOrCreateClerkProfile = async (supabase, user) => {
  const clerkUserId = user.clerk_user_id;
  const email = user.email;
  const name = user.name || email?.split("@")[0] || "User";
  const role = user.role || "donor";

  // 1) search by clerk_user_id
  const { data: existingByClerkId, error: clerkSearchError } = await supabase
    .from("profiles")
    .select("*")
    .eq("clerk_user_id", clerkUserId)
    .maybeSingle();

  if (clerkSearchError) throw new Error(clerkSearchError.message);
  if (existingByClerkId) return existingByClerkId;

  // 2) search by email
  const { data: existingByEmail, error: emailSearchError } = await supabase
    .from("profiles")
    .select("*")
    .eq("email", email)
    .maybeSingle();

  if (emailSearchError) throw new Error(emailSearchError.message);

  // 3) If profile exists by email, attach clerk_user_id and update role/name
  if (existingByEmail) {
    const { data: updatedProfile, error: updateError } = await supabase
      .from("profiles")
      .update({
        clerk_user_id: clerkUserId,
        name: existingByEmail.name || name,
        role,
      })
      .eq("id", existingByEmail.id)
      .select()
      .single();

    if (updateError) throw new Error(updateError.message);

    return updatedProfile;
  }

  // 4) Create new profile
  const { data: newProfile, error: insertError } = await supabase
    .from("profiles")
    .insert([
      {
        clerk_user_id: clerkUserId,
        name,
        email,
        role,
      },
    ])
    .select()
    .single();

  if (insertError) throw new Error(insertError.message);

  return newProfile;
};

export const syncProfile = async (req, res) => {
  try {
    const profile = await getOrCreateClerkProfile(req.supabase, req.user);

    return res.json({
      success: true,
      message: "Profile synced successfully",
      user: req.user,
      profile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const profile = await getOrCreateClerkProfile(req.supabase, req.user);

    return res.json({
      success: true,
      user: req.user,
      profile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};