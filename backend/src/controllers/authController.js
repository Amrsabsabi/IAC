// export const register = async (req, res) => {
//   try {
//     const { email, password, name } = req.body;

//     if (!email || !password || !name) {
//       return res.status(400).json({
//         success: false,
//         message: "Name, email, and password are required",
//       });
//     }

//     const { data, error } = await req.supabase.auth.admin.createUser({
//       email,
//       password,
//       email_confirm: true,
//       user_metadata: {
//         name,
//         role: "user",
//       },
//     });

//     if (error) {
//       return res.status(400).json({
//         success: false,
//         message: error.message,
//       });
//     }

//     return res.status(201).json({
//       success: true,
//       message: "User registered successfully",
//       user: data.user,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };

// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Email and password are required",
//       });
//     }

//     const { data, error } = await req.supabase.auth.signInWithPassword({
//       email,
//       password,
//     });

//     if (error) {
//       return res.status(401).json({
//         success: false,
//         message: error.message,
//       });
//     }

//     return res.json({
//       success: true,
//       message: "Login successful",
//       user: data.user,
//       session: data.session,
//       access_token: data.session.access_token,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };


// export const makeAdmin = async (req, res) => {
//   try {
//     const { userId } = req.body;

//     if (!userId) {
//       return res.status(400).json({
//         success: false,
//         message: "userId is required",
//       });
//     }

//     const { data, error } = await req.supabase.auth.admin.updateUserById(
//       userId,
//       {
//         user_metadata: {
//           role: "admin",
//         },
//       }
//     );

//     if (error) {
//       return res.status(400).json({
//         success: false,
//         message: error.message,
//       });
//     }

//     res.json({
//       success: true,
//       message: "User is now admin",
//       user: data.user,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };

export const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required",
      });
    }

    const { data, error } = await req.supabase.auth.admin.createUser({
      email,
      password,

      // حالياً للتجريب نخليه true
      // لاحقاً إذا بدك email verification حقيقي منخليها false أو منستخدم signUp
      email_confirm: true,

      user_metadata: {
        name,
        role: "user",
      },
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    const user = data.user;

    const { error: profileError } = await req.supabase
      .from("profiles")
      .insert([
        {
          id: user.id,
          name,
          email,
          role: "user",
        },
      ]);

    if (profileError) {
      return res.status(400).json({
        success: false,
        message: profileError.message,
      });
    }

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
      profile: {
        id: user.id,
        name,
        email,
        role: "user",
      },
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

    const { data: profile, error: profileError } = await req.supabase
      .from("profiles")
      .select("*")
      .eq("id", data.user.id)
      .single();

    if (profileError) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

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