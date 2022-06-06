const Stock = require("../models/stock");
const Overview = require("../models/stock");

// Create
const createItem = async (req, res) => {
  try {
    const stock = await new Stock(req.body);
    await stock.save();
    return res.status(201).json({
      stock,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Read
const getAllItems = async (req, res) => {
  try {
    const stocks = await Stock.find();
    return res.status(200).json({ stocks });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

// getonebyID
const getItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const stock = await Stock.findById(id);
    if (stock) {
      return res.status(200).json({ stock });
    }
    return res.status(404).send("Stock with the specified ID does not exist");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

// updating any item we desire
const updateItem = (req, res) => {
  try {
    const { id } = req.params;
    Stock.findByIdAndUpdate(id, req.body, { new: true }, (err, stock) => {
      if (err) {
        res.status(500).send(err);
      }
      if (!stock) {
        res.status(500).send("Stock not found");
      }
      return res.status(200).json(stock);
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
// deletedItem
const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Stock.findByIdAndDelete(id);
    if (deleted) {
      return res.status(200).send("Item deleted");
    }
    throw new Error("item not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

// Read
const getAllOverview = async (req, res) => {
  try {
    const overview = await Overview.find();
    return res.status(200).json({ overview });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

// getonebyID
const getOverviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const overview = await Overview.findById(id);
    if (overview) {
      return res.status(200).json({ overview });
    }
    // return res.status(404).send("Stock with the specified ID does not exist");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

// updating any item we desire
const updateOverview = (req, res) => {
  try {
    const { id } = req.params;
    Overview.findByIdAndUpdate(id, req.body, { new: true }, (err, overview) => {
      if (err) {
        res.status(500).send(err);
      }
      if (!overview) {
        // res.status(500).send("Stock not found");
      }
      return res.status(200).json(overview);
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
  getAllOverview,
  getOverviewById,
  updateOverview,
};
