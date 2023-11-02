const items = [
  {
    user_id: 260,
    username: "VCHar",
    password: "********",
    email: "vchar@example.com",
    user_level_id: 1,
    created_at: "2020-09-12T06:56:41.000Z",
  },
  {
    user_id: 305,
    username: "Donatello",
    password: "********",
    email: "dona@example.com",
    user_level_id: 1,
    created_at: "2021-12-11T06:00:41.000Z",
  },
  {
    user_id: 3609,
    username: "Anon5468",
    password: "********",
    email: "x58df@example.com",
    user_level_id: 3,
    created_at: "2023-04-02T05:56:41.000Z",
  },
];

/**
 *
 * @param {*} req
 * @param {*} res
 */

const getUsers = (req, res) => {
  const limit = req.query.limit;
  // TODO: check that the param value is int before using it
  if (limit) {
    res.json(items.slice(0, limit));
  } else {
    res.json(items);
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 */

const getUsersById = (req, res) => {
  // TODO: if item whit id exists send it, otherwise send 404
  console.log("getUsersById", req.params);
  const item = items.find((element) => element.user_id == req.params.id);
  if (item) {
    res.json(item);
  } else {
    res.status(404);
    res.json({ message: "User not found" });
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 */

// TODO: create postItem function, it creates a new item and adds it to items
const postUser = (req, res) => {
  const item = {
    user_id: 0,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    user_level_id: req.body.user_id,
    created_at: req.body.created_at,
  };
  items.push(item);
  res.sendStatus(201);
};

/**
 *
 * @param {*} req
 * @param {*} res
 */

// TODO: create putItem function, it gets media_id and the updates it
const putUser = (req, res) => {
  const item = items.find((element) => element.user_id == req.params.id);
  if (item) {
    items.splice(items.indexOf(item), 1, {
      user_id: item.user_id,
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      user_level_id: req.body.user_level_id,
      created_at: req.body.created_at,
    });
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 */

// TODO: create deleteItem function, it should delete existing item with id
const deleteUser = (req, res) => {
  const item = items.find((element) => element.user_id == req.params.id);
  if (item) {
    items.splice(items.indexOf(item), 1);
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
};

export { getUsers, getUsersById, postUser, putUser, deleteUser };
