const Adoption = require("../models/Adoption");
const { buildPagination } = require("../utils/paginate");

async function myAdoptions(req, res, next) {
  try {
    const { limit, page, skip } = buildPagination(req.query);
    const filter = { adopter: req.user.id };
    const [items, total] = await Promise.all([
      Adoption.find(filter).populate("dog").skip(skip).limit(limit).sort("-createdAt"),
      Adoption.countDocuments(filter)
    ]);
    res.json({ items, total, page, pages: Math.ceil(total / limit) });
  } catch (e) { next(e); }
}

module.exports = { myAdoptions };
