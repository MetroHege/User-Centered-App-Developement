const items = [
  {
    media_id: 9632,
    filename: "ffd8.jpg",
    filesize: 887574,
    title: "Favorite drink",
    description: "",
    user_id: 1606,
    media_type: "image/jpeg",
    created_at: "2023-10-16T19:00:09.000Z",
  },
  {
    media_id: 9626,
    filename: "dbbd.jpg",
    filesize: 60703,
    title: "Miika",
    description: "My Photo",
    user_id: 3671,
    media_type: "image/jpeg",
    created_at: "2023-10-13T12:14:26.000Z",
  },
  {
    media_id: 9625,
    filename: "2f9b.jpg",
    filesize: 30635,
    title: "Aksux",
    description: "friends",
    user_id: 260,
    media_type: "image/jpeg",
    created_at: "2023-10-12T20:03:08.000Z",
  },
  {
    media_id: 9592,
    filename: "f504.jpg",
    filesize: 48975,
    title: "Desert",
    description: "",
    user_id: 3609,
    media_type: "image/jpeg",
    created_at: "2023-10-12T06:59:05.000Z",
  },
  {
    media_id: 9590,
    filename: "60ac.jpg",
    filesize: 23829,
    title: "Basement",
    description: "Light setup in basement",
    user_id: 305,
    media_type: "image/jpeg",
    created_at: "2023-10-12T06:56:41.000Z",
  },
];

/**
 *
 * @param {*} req
 * @param {*} res
 */

const getItems = (req, res) => {
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

const getItemsById = (req, res) => {
  // TODO: if item whit id exists send it, otherwise send 404
  console.log("getItemsById", req.params);
  const item = items.find((element) => element.media_id == req.params.id);
  if (item) {
    res.json(item);
  } else {
    res.status(404);
    res.json({ message: "Item not found" });
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 */

// TODO: create postItem function, it creates a new item and adds it to items
const postItem = (req, res) => {
  const item = {
    media_id: 0,
    filename: req.body.filename,
    filesize: req.body.filesize,
    title: req.body.title,
    description: req.body.description,
    user_id: req.body.user_id,
    media_type: req.body.media_type,
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
const putItem = (req, res) => {
  const item = items.find((element) => element.media_id == req.params.id);
  if (item) {
    items.splice(items.indexOf(item), 1, {
      media_id: item.media_id,
      filename: req.body.filename,
      filesize: req.body.filesize,
      title: req.body.title,
      description: req.body.description,
      user_id: req.body.user_id,
      media_type: req.body.media_type,
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
const deleteItem = (req, res) => {
  const item = items.find((element) => element.media_id == req.params.id);
  if (item) {
    items.splice(items.indexOf(item), 1);
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
};

export { getItems, getItemsById, postItem, putItem, deleteItem };
