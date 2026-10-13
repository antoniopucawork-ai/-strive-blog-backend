import express from "express";
import { login, me } from "../controllers/auth.js";
import { authenticate } from "../middleware/authenticate.js";
import passport from "passport";

const Authrouter = express.Router();

Authrouter.post("/login", login);

Authrouter.get("/me", authenticate, me);
Authrouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
);
Authrouter.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    res.redirect(`${process.env.FRONTEND_URL}/login?token=${req.user.token}`);
  },
);
export default Authrouter;
