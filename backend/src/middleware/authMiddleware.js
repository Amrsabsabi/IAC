// import { getAuth, clerkClient } from "@clerk/express";

// export const requireAuth = async (req, res, next) => {
//   try {
//     const auth = getAuth(req);

//     if (!auth?.userId) {
//       return res.status(401).json({
//         success: false,
//         message: "Unauthorized. No Clerk session found.",
//       });
//     }

//     const user = await clerkClient.users.getUser(auth.userId);

//     const email = user.primaryEmailAddress?.emailAddress || "";

//     req.user = {
//       id: user.id,
//       clerk_user_id: user.id,
//       email,
//       name:
//         user.fullName ||
//         user.username ||
//         email.split("@")[0] ||
//         "User",
//       role: user.publicMetadata?.role || "donor",
//       clerk: user,
//     };

//     next();
//   } catch (error) {
//     return res.status(401).json({
//       success: false,
//       message: error.message || "Auth middleware error",
//     });
//   }
// };

import { getAuth, clerkClient } from "@clerk/express";

export const requireAuth = async (req, res, next) => {
  try {
    const auth = getAuth(req);

    if (!auth?.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. No Clerk session found.",
      });
    }

    const clerkUser = await clerkClient.users.getUser(auth.userId);
    const email = clerkUser.primaryEmailAddress?.emailAddress || "";

    req.user = {
      id: clerkUser.id,
      clerk_user_id: clerkUser.id,
      email,
      name: clerkUser.fullName || clerkUser.username || email.split("@")[0],
      role: clerkUser.publicMetadata?.role || "donor",
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message || "Auth middleware error",
    });
  }
};