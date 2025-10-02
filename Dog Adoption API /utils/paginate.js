function buildPagination({ page = 1, limit = 10 }) {
  const p = Math.max(parseInt(page, 10) || 1, 1);
  const l = Math.min(Math.max(parseInt(limit, 10) || 10, 1), 100);
  return { page: p, limit: l, skip: (p - 1) * l };
}

module.exports = { buildPagination };
