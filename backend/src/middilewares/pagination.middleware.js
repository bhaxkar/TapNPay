export const paginate = (model) => {
  return async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 7;
    const skip = (page - 1) * limit;

    const result = {
      currentPage: page,
      itemsPerPage: limit,
      totalItems: 0,
      totalPages: 0,
    };

    try {
      const queryFilter = req.queryFilter || {};

      const totalDocuments = await model.countDocuments(queryFilter).exec();
      const totalPages = Math.ceil(totalDocuments / limit);

      if (page < totalPages) {
        result.hasNextPage = {
          page: page + 1,
          limit: limit,
        };
      }

      if (page > 1) {
        result.hasPreviousPage = {
          page: page - 1,
          limit: limit,
        };
      }

      req.pagination = { limit, skip };
      req.pageInfo = result;

      next();
    } catch (error) {
      console.error("Pagination middleware error:", error);
      res.status(500).json({ message: "Pagination error" });
    }
  };
};
