import Product from "../model/product.model.js";

export const getProducts = async (req, res) => {
  try {
    const { search } = req.query;
    let products;

    if (search && search.trim() !== "") {
      // if search query exists, search by title or brand
      const regex = new RegExp(search, "i"); // case-insensitive
      products = await Product.find({
        $or: [{ title: regex }, { brand: regex }],
      })
    } else {
      // if no search query, return random products
      products = await Product.aggregate([{ $sample: { size: 11369 } }]);
    }

    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Server error" });
  }
};
