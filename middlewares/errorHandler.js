function errorHandler(err, req, res, next) {
  let status = err.status;
  let message = err.message;

  switch (err.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      status = 400;
      message = err.errors.map((err) => err.message);
      break;
    case "SequelizeDatabaseError":
      status = 400;
      message = [err.message];
      break;
    case "AssertionError":
      status = 400;
      message = [err.message];
      break;
    case "NotFound":
      status = 404;
      message = ["user not found."];
      break;

    default:
      status = 500;
      message = "Internal Server Error";
      break;
  }

  return res.status(status).json({ message });
}

module.exports = errorHandler;
