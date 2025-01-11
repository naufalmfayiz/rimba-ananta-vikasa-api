const { User } = require("../models");

class UserController {
  static async addUser(req, res, next) {
    try {
      const { name, email, age } = req.body;
      const user = await User.create({ name, email, age });
      res.status(201).json({ user });
    } catch (error) {
      next(error);
    }
  }

  static async getUsers(req, res, next) {
    try {
      const users = await User.findAll();
      res.status(200).json({ users });
    } catch (error) {
      next(error);
    }
  }

  static async getUserById(req, res, next) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) {
        throw { name: "NotFound" };
      }

      res.status(200).json({ user });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const { name, email, age } = req.body;

      const update = await User.update({ name, email, age }, { where: { id } });
      if (!update) {
        throw { name: "NotFound" };
      }

      const user = await User.findByPk(id);
      if (!user) {
        throw { name: "NotFound" };
      }

      res.status(200).json({ user });
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) {
        throw { name: "NotFound" };
      }

      await User.destroy({ where: { id } });
      res.status(200).json({ user });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
