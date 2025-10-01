const Dog = require("../models/Dog");
const Adoption = require("../models/Adoption");
const { buildPagination } = require("../utils/paginate");

async function registerDog(req, res, next) {
  try {
    const { name, description } = req.body;
    const dog = await Dog.create({ name, description, owner: req.user.id });
    res.status(201).json(dog);
  } catch (e) { next(e); }
}

async function removeDog(req, res, next) {
  try {
    const { id } = req.params;
    const dog = await Dog.findById(id);
    if (!dog) return res.status(404).json({ error: "Dog not found" });
    if (dog.owner.toString() !== req.user.id)
      return res.status(403).json({ error: "Only owner can remove this dog" });
    if (dog.status === "adopted")
      return res.status(400).json({ error: "Cannot remove—dog already adopted" });

    await dog.deleteOne();
    res.json({ success: true });
  } catch (e) { next(e); }
}

async function listRegisteredDogs(req, res, next) {
  try {
    const { status, ownerId, q, sort = "-createdAt" } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (ownerId) filter.owner = ownerId;
    if (q) filter.$text = { $search: q };

    const { limit, page, skip } = buildPagination(req.query);
    const [items, total] = await Promise.all([
      Dog.find(filter).sort(sort).skip(skip).limit(limit),
      Dog.countDocuments(filter)
    ]);
    res.json({ items, total, page, pages: Math.ceil(total / limit) });
  } catch (e) { next(e); }
}

async function adoptDog(req, res, next) {
  try {
    const { id } = req.params;
    const { message = "" } = req.body;
    const dog = await Dog.findById(id);
    if (!dog) return res.status(404).json({ error: "Dog not found" });
    if (dog.status === "adopted") return res.status(400).json({ error: "Dog already adopted" });
    if (dog.owner.toString() === req.user.id)
      return res.status(400).json({ error: "Cannot adopt your own dog" });

    dog.status = "adopted";
    dog.adoptedBy = req.user.id;
    dog.thankYouMessage = message ?? "";
    await dog.save();

    const adoption = await Adoption.create({ dog: dog._id, adopter: req.user.id, message });
    res.status(201).json({ dog, adoption });
  } catch (e) { next(e); }
}

async function listAdoptedDogs(req, res, next) {
  try {
    const { sort = "-createdAt" } = req.query;
    const { limit, page, skip } = buildPagination(req.query);
    const filter = { adoptedBy: req.user.id };
    const [items, total] = await Promise.all([
      Dog.find(filter).sort(sort).skip(skip).limit(limit),
      Dog.countDocuments(filter)
    ]);
    res.json({ items, total, page, pages: Math.ceil(total / limit) });
  } catch (e) { next(e); }
}

module.exports = {
  registerDog,
  removeDog,
  listRegisteredDogs,
  adoptDog,
  listAdoptedDogs
};
