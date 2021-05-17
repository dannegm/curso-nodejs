export const hookController = async (req, res) => {
  res.status(200).json({
    body: req.body,
    params: req.params,
    query: req.query,
    headers: req.headers,
  });
};
