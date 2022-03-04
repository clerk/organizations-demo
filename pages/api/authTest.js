import { requireAuth } from "@clerk/nextjs/api";

export default requireAuth((req, res) => {
  res.statusCode = 200;
  res.json({
    userId: req.session.userId,
    role: req.sessionClaims.orgs[req.query.organizationId],
  });
});
