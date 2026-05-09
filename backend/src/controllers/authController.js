const getOrCreateProfile = async (supabase, user, name = "") => {
  // 1) دور حسب user id
  const { data: existingById } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (existingById) return existingById;

  // 2) دور حسب email لتجنب duplicate email
  const { data: existingByEmail } = await supabase
    .from("profiles")
    .select("*")
    .eq("email", user.email)
    .maybeSingle();

  if (existingByEmail) return existingByEmail;

  // 3) إذا مو موجود، أنشئ profile جديد
  const profileName =
    name || user.user_metadata?.name || user.email?.split("@")[0] || "User";

  const { data: newProfile, error } = await supabase
    .from("profiles")
    .insert([
      {
        id: user.id,
        name: profileName,
        email: user.email,
        role: "user",
      },
    ])
    .select()
    .single();

  if (error) throw new Error(error.message);

  return newProfile;
};

export const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required",
      });
    }

    const { data, error } = await req.supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role: "user",
        },
      },
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    const user = data.user;

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Registration failed",
      });
    }

    const profile = await getOrCreateProfile(req.supabase, user, name);

    return res.status(201).json({
      success: true,
      message:
        "Account created successfully. Please check your email for the verification code.",
      user,
      profile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

export const sendOtp = async (req, res) => {
  try {
    const { email, name } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const { error } = await req.supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
        data: {
          name: name || email.split("@")[0],
          role: "user",
        },
      },
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.json({
      success: true,
      message: "Verification code sent to your email.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, token, name } = req.body;

    if (!email || !token) {
      return res.status(400).json({
        success: false,
        message: "Email and verification code are required",
      });
    }

    const { data, error } = await req.supabase.auth.verifyOtp({
      email,
      token,
      type: "email",
    });

    if (error) {
      return res.status(401).json({
        success: false,
        message: error.message,
      });
    }

    const profile = await getOrCreateProfile(req.supabase, data.user, name);

    return res.json({
      success: true,
      message: "Email verified successfully",
      user: data.user,
      profile,
      session: data.session,
      access_token: data.session.access_token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const { data, error } = await req.supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(401).json({
        success: false,
        message: error.message,
      });
    }

    if (!data.user.email_confirmed_at) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email before logging in.",
      });
    }

    const profile = await getOrCreateProfile(req.supabase, data.user);

    return res.json({
      success: true,
      message: "Login successful",
      user: data.user,
      profile,
      session: data.session,
      access_token: data.session.access_token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

export const makeAdmin = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required",
      });
    }

    const { data, error } = await req.supabase.auth.admin.updateUserById(
      userId,
      {
        user_metadata: {
          role: "admin",
        },
      }
    );

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    await req.supabase
      .from("profiles")
      .update({ role: "admin" })
      .eq("id", userId);

    res.json({
      success: true,
      message: "User is now admin",
      user: data.user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};