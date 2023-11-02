//mock items data
const items = [
  { id: 5, name: "porkkana" },
  { id: 6, name: "peruna" },
  { id: 67, name: "sipuli" },
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
 * Gets all items
 *
 * @param {object} req - http request
 * @param {object} res  - http response
 */

const getItemsById = (req, res) => {
  // TODO: if item whit id exists send it, otherwise send 404
  console.log("getItemsById", req.params);
  const item = items.find((element) => element.id == req.params.id);
  if (item) {
    res.json(item);
  } else {
    res.status(404);
    res.json({ message: "Item not found" });
  }
};

const postItem = (req, res) => {
  console.groupCollapsed("New item posted", req.body);
  if (req.body.name) {
    items.push({ id: 0, name: req.body });
    res.sendStatus(201);
  } else {
    res.sendStatus(400);
  }
};

const putItem = (req, res, id) => {
  let body = [];
  req
    .on("error", (err) => {
      console.error(err);
    })
    .on("data", (chunk) => {
      body.push(chunk);
    })
    .on("end", () => {
      body = Buffer.concat(body).toString();
      console.log("req body", body);
      body = JSON.parse(body);

      // check if body is valid
      if (!body.name) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end('{"message": "Missing data"}');
        return;
      }

      // check if item with id exists
      const item = items.find((element) => element.id == id);
      if (!item) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end('{ "message": "Item not found" }');
        return;
      }

      // get item by id and update it with new data
      console.log(body);
      item.name = body.name;
      console.log(item);

      // replace item with updated one
      items.splice(items.indexOf(item), 1, item);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(`{"message": "Updated item"}`);
    });
};

const deleteItem = (req, res) => {
  // get element by it's id and remove it from items
  const id = req.url.split("/").pop();
  const item = items.find((element) => element.id == id);
  if (!item) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end('{ "message": "Item not found" }');
    return;
  }
  items.splice(items.indexOf(item), 1);
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(`{"message": "Deleted item"}`);
};

export { getItems, getItemsById, postItem, putItem, deleteItem };
