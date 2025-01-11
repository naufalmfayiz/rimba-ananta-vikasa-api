const validateInput = (req, res, next) => {
  const { name, email, age } = req.body;
  let message = [];

  if (typeof name !== "string") {
    message.push("name must be a string");
  }
  if (typeof email !== "string") {
    message.push("email must be a string");
  }

  if (message.length > 0) {
    return res.status(400).json({ message });
  } else {
    next();
  }
};

module.exports = validateInput;
