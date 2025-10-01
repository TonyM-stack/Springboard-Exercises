// Accepts a Zod schema (or any object with .safeParse)
function validate(schema, property = "body") {
  return (req, res, next) => {
    const result = schema.safeParse(req[property]);
    if (!result.success) {
      const issues = result.error.issues.map(i => ({ path: i.path.join("."), message: i.message }));
      return res.status(400).json({ error: "ValidationError", issues });
    }
    req[property] = result.data;
    next();
  };
}

module.exports = { validate };
