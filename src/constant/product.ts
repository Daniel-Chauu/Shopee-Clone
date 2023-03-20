const sortBy = {
  createdAt: "createdAt",
  view: "view",
  sold: "sold",
  price: "price",
} as const;

const order = {
  asc: "asc",
  desc: "desc",
} as const;

export { sortBy, order };
