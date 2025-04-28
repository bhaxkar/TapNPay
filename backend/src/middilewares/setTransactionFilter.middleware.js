export const setTransactionFilter = (req, res, next) => {
  req.queryFilter = {
    $or: [
      { fromUser: req.userId, type: "DEBIT" },
      { toUser: req.userId, type: "CREDIT" },
    ],
  };
  next();
};
