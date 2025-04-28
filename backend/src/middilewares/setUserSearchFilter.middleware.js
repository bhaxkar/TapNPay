export const setUserSearchFilter = (req, res, next) => {
  const filter = req.query.filter || "";

  req.queryFilter = {
    _id: { $ne: req.userId },
    $or: [
      { firstName: { $regex: filter, $options: "i" } },
      { lastName: { $regex: filter, $options: "i" } },
    ],
  };

  next();
};
