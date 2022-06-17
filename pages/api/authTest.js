import { requireAuth } from "@clerk/nextjs/api";

export default requireAuth((req, res) => {
  res.statusCode = 200;
  res.json({
    userId: req.auth.userId,
    role: req.auth.claims.org_role,
  });
});
