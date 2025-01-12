const request = require("supertest");
const { sequelize } = require("../models");
const app = require("../app");

// BEFORE
beforeAll(async () => {
  try {
    const users = await sequelize.queryInterface.bulkInsert("Users", [
      {
        id: "cf6ea938-5b07-46cb-9f79-c247929f8cf6",
        name: "John Doe",
        email: "john@mail.com",
        age: 30,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "cf6ea938-5b07-46cb-9f79-c247929f8cf7",
        name: "Jane Doe",
        email: "jane@mail.com",
        age: 25,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  } catch (error) {
    console.log(error.message);
  }
});

//  <<<<< TEST CASES >>>>>

// GET ALL USERS
describe("GET /users", () => {
  test("should return array of users", async () => {
    const response = await request(app).get("/users");
    const { body, status } = response;
    // console.log(body);

    expect(status).toBe(200);
    expect(body).toEqual({
      users: expect.any(Array),
    });
  });
});

// GET USER BY ID
describe("GET /users/:id", () => {
  test("should return a user", async () => {
    const response = await request(app).get(
      "/users/cf6ea938-5b07-46cb-9f79-c247929f8cf6"
    );
    const { body, status } = response;
    // console.log(body);

    expect(status).toBe(200);
    expect(body).toEqual({
      user: {
        id: "cf6ea938-5b07-46cb-9f79-c247929f8cf6",
        name: "John Doe",
        email: "john@mail.com",
        age: 30,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
    });
  });

  test("should return error when user not found", async () => {
    const response = await request(app).get(
      "/users/cf6ea938-5b07-46cb-9f79-c247929f8cf8"
    );
    const { body, status } = response;
    // console.log(body);

    expect(status).toBe(404);
    expect(body).toEqual({
      message: ["user not found."],
    });
  });
});

// CREATE USER
describe("POST /users", () => {
  test("should return a user", async () => {
    const response = await request(app).post("/users").send({
      name: "Alice Doe",
      email: "alice@mail.com",
      age: 20,
    });
    const { body, status } = response;
    console.log(body);

    expect(status).toBe(201);
    expect(body).toEqual({
      user: {
        id: expect.any(String),
        name: "Alice Doe",
        email: "alice@mail.com",
        age: 20,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
    });
  });

  test("should return error when invalid input", async () => {
    const response = await request(app).post("/users").send({
      name: "",
      email: "",
      age: "s",
    });
    const { body, status } = response;
    // console.log(body);

    expect(status).toBe(400);
    expect(body).toEqual({
      message: [
        "name is required",
        "email is required",
        "Invalid email format",
        "age must be an integer",
      ],
    });
  });

  test("should return error when name and email is not a string", async () => {
    const response = await request(app).post("/users").send({
      name: 123,
      email: 321,
      age: 20,
    });
    const { body, status } = response;
    // console.log(body);

    expect(status).toBe(400);
    expect(body).toEqual({
      message: ["name must be a string", "email must be a string"],
    });
  });
});

// UPDATE USER
describe("PUT /users/:id", () => {
  test("should return a user", async () => {
    const response = await request(app)
      .put("/users/cf6ea938-5b07-46cb-9f79-c247929f8cf6")
      .send({
        name: "John Doe Update",
        email: "john@mail.com",
        age: 30,
      });
    const { body, status } = response;
    // console.log(body);

    expect(status).toBe(200);
    expect(body).toEqual({
      user: {
        id: "cf6ea938-5b07-46cb-9f79-c247929f8cf6",
        name: "John Doe Update",
        email: "john@mail.com",
        age: 30,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
    });
  });

  test("should return error when user not found", async () => {
    const response = await request(app)
      .put("/users/cf6ea938-5b07-46cb-9f79-c247929f8cf8")
      .send({
        name: "John Doe Update",
        email: "john@mail.com",
        age: 30,
      });
    const { body, status } = response;
    // console.log(body);

    expect(status).toBe(404);
    expect(body).toEqual({
      message: ["user not found."],
    });
  });

  test("should return error when invalid input", async () => {
    const response = await request(app)
      .put("/users/cf6ea938-5b07-46cb-9f79-c247929f8cf6")
      .send({
        name: "",
        email: "",
        age: "s",
      });
    const { body, status } = response;
    // console.log(body);

    expect(status).toBe(400);
    expect(body).toEqual({
      message: [
        "name is required",
        "email is required",
        "Invalid email format",
        "age must be an integer",
      ],
    });
  });

  test("should return error when name and email is not a string", async () => {
    const response = await request(app)
      .put("/users/cf6ea938-5b07-46cb-9f79-c247929f8cf6")
      .send({
        name: 123,
        email: 321,
        age: 20,
      });
    const { body, status } = response;
    // console.log(body);

    expect(status).toBe(400);
    expect(body).toEqual({
      message: ["name must be a string", "email must be a string"],
    });
  });
});

// DELETE USER
describe("DELETE /users/:id", () => {
  test("should return a user", async () => {
    const response = await request(app).delete(
      "/users/cf6ea938-5b07-46cb-9f79-c247929f8cf6"
    );
    const { body, status } = response;
    // console.log(body);

    expect(status).toBe(200);
    expect(body).toEqual({
      user: {
        id: "cf6ea938-5b07-46cb-9f79-c247929f8cf6",
        name: "John Doe Update",
        email: "john@mail.com",
        age: 30,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
    });
  });

  test("should return error when user not found", async () => {
    const response = await request(app).delete(
      "/users/cf6ea938-5b07-46cb-9f79-c247929f8cf8"
    );
    const { body, status } = response;
    // console.log(body);

    expect(status).toBe(404);
    expect(body).toEqual({
      message: ["user not found."],
    });
  });
});

// AFTER
afterAll(async () => {
  try {
    await sequelize.queryInterface.bulkDelete("Users", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  } catch (error) {
    console.log(error.message);
  }
});
