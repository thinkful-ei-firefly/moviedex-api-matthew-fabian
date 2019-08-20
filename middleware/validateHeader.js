module.exports = function(req, res, next) {
  if (!req.get("Authorization")) {
    return res
      .status(403)
      .json({ error: "you are not permitted to view this resource" });
  }
  const token = req.get("Authorization").split(" ")[1];

  const apiToken = process.env.API_TOKEN;

  if (token !== apiToken) {
    return res
      .status(403)
      .json({ error: "you are not permitted to view this resource" });
  }
  next();
};
