const express = require('express');
const Item = require('./model');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/items', (req, res) => {
  return res.json({ items: global.items });
});

app.post('/items', (req, res) => {
  let newItem = new Item(req.body.name, req.body.price);
  return res.json({ items: newItem });
});

app.get('/items/:name', (req, res) => {
  let foundItem = global.items.find(x => x.name === req.params.name)
  return res.json({ items: foundItem });
});

app.patch('/items/:name', (req, res) => {
  let foundItem = global.items.find(x => x.name === req.params.name)
  foundItem.name = req.body.name;
  foundItem.price = req.body.price;
  return res.json({ items: foundItem });
});

app.delete('/items/:name', (req, res) => {
  let foundidx = global.items.findIndex(x => x.name === req.params.name)
  global.items.splice(foundidx,1);
  return res.json({ message: 'Deleted' });
});

app.listen(3000, () => {
  console.log("Server running on port 3000")
});
