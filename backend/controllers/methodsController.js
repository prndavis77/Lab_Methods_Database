const { HPLCMethod, GCMethod, sequelize } = require("../models");
const { Op } = require("sequelize");

// Helper function to get the correct model based on instrument type
const getModelByInstrumentType = (instrumentType) => {
  if (instrumentType === "HPLC") return HPLCMethod;
  if (instrumentType === "GC") return GCMethod;
  throw new Error("Invalid instrument type");
};

exports.getAllMethods = async (req, res) => {
  try {
    let allMethods = [];

    // Fetch all HPLC methods
    const hplcMethods = await HPLCMethod.findAll();
    allMethods.push(
      ...hplcMethods.map((method) => ({
        ...method.toJSON(),
        instrumentType: "HPLC",
      }))
    );

    // Fetch all GC methods
    const gcMethods = await GCMethod.findAll();
    allMethods.push(
      ...gcMethods.map((method) => ({
        ...method.toJSON(),
        instrumentType: "GC",
      }))
    );

    res.json({ methods: allMethods });
  } catch (error) {
    console.error("Error fetching all methods:", error);
    res.status(500).json({ error: "Error fetching all methods" });
  }
};

// Get all methods (paginated, sorted, filtered by search term)
exports.searchMethods = async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page, 10) : null;
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : null;
    const offset = page && limit ? (page - 1) * limit : null;
    const sortBy = req.query.sortBy || "name";
    const sortOrder = req.query.sortOrder === "DESC" ? "DESC" : "ASC";
    const query = req.query.query ? `%${req.query.query}%` : null;
    const instrumentType = req.query.instrumentType || "All";

    // Ensure valid fields for sorting
    const validSortFields = ["name", "createdAt", "updatedAt"];
    if (!validSortFields.includes(sortBy)) {
      return res.status(400).json({ error: "Invalid sort field" });
    }

    // Helper function to get filtered methods based on model, sort, and optional pagination
    const getFilteredMethods = (Model) =>
      Model.findAll({
        where: query
          ? {
              [Op.or]: [
                { name: { [Op.iLike]: query } },
                { detector: { [Op.iLike]: query } },
              ],
            }
          : undefined,
        order: [[sequelize.literal(`"${sortBy}"`), sortOrder]],
        limit,
        offset,
      });

    let allMethods = [];

    // Fetch HPLC methods if the instrument type is "All" or "HPLC"
    if (instrumentType === "All" || instrumentType === "HPLC") {
      const hplcMethods = await getFilteredMethods(HPLCMethod);
      allMethods.push(
        ...hplcMethods.map((method) => ({
          ...method.toJSON(),
          instrumentType: "HPLC",
        }))
      );
    }

    // Fetch GC methods if the instrument type is "All" or "GC"
    if (instrumentType === "All" || instrumentType === "GC") {
      const gcMethods = await getFilteredMethods(GCMethod);
      allMethods.push(
        ...gcMethods.map((method) => ({
          ...method.toJSON(),
          instrumentType: "GC",
        }))
      );
    }

    // Apply sorting on combined data by sortBy field and instrumentType in JavaScript if needed
    allMethods.sort((a, b) => {
      let compareValue;

      // Handle sorting differently based on field type
      if (sortBy === "createdAt" || sortBy === "updatedAt") {
        // Sort by date fields
        const dateA = new Date(a[sortBy]);
        const dateB = new Date(b[sortBy]);
        compareValue = dateA - dateB;
      } else {
        // Default to localeCompare for string fields
        compareValue = a[sortBy].localeCompare(b[sortBy], undefined, {
          numeric: true,
        });
      }

      // Apply sort order (ascending or descending)
      if (compareValue !== 0) {
        return sortOrder === "ASC" ? compareValue : -compareValue;
      }

      // Secondary sort by instrumentType if primary sort values are identical
      return a.instrumentType.localeCompare(b.instrumentType);
    });

    // If pagination is requested, slice results for the requested page
    const methods =
      limit && page ? allMethods.slice(offset, offset + limit) : allMethods;

    res.json({
      methods,
      totalCount: allMethods.length, // Total count for paginated requests
    });
  } catch (error) {
    console.error("Error fetching methods:", error.message || error);
    res.status(500).json({
      error: "Error fetching methods",
      details: error.message || error,
    });
  }
};

// Get a single method by ID and instrument type
exports.getMethodById = async (req, res) => {
  try {
    const { id, instrumentType } = req.params;
    const Model = getModelByInstrumentType(instrumentType);
    const method = await Model.findByPk(id);

    if (!method) {
      return res.status(404).json({ error: "Method not found" });
    }
    res.json({ ...method.toJSON(), instrumentType });
  } catch (error) {
    console.error("Error fetching method:", error);
    res.status(500).json({ error: "Error fetching method" });
  }
};

// Create a new method with instrument type validation
exports.createMethod = async (req, res) => {
  try {
    const { instrumentType, ...methodData } = req.body;
    const Model = getModelByInstrumentType(instrumentType);

    if (!Model) {
      return res.status(400).json({ error: "Invalid instrument type" });
    }

    const newMethod = await Model.create(methodData);
    res.status(201).json({ ...newMethod.toJSON(), instrumentType });
  } catch (error) {
    console.error("Error creating method:", error);
    res.status(500).json({ error: "Error creating method" });
  }
};

// Update an existing method by ID and instrument type
exports.updateMethod = async (req, res) => {
  try {
    const { id, instrumentType } = req.params;
    const Model = getModelByInstrumentType(instrumentType);
    const method = await Model.findByPk(id);

    if (!method) {
      return res.status(404).json({ error: "Method not found" });
    }

    await method.update(req.body);
    res.json({ ...method.toJSON(), instrumentType });
  } catch (error) {
    console.error("Error updating method:", error);
    res.status(500).json({ error: "Error updating method" });
  }
};

// Delete a method by ID and instrument type
exports.deleteMethod = async (req, res) => {
  try {
    const { id, instrumentType } = req.params;
    const Model = getModelByInstrumentType(instrumentType);
    const method = await Model.findByPk(id);

    if (!method) {
      return res.status(404).json({ error: "Method not found" });
    }

    await method.destroy();
    res.json({ message: "Method deleted successfully" });
  } catch (error) {
    console.error("Error deleting method:", error);
    res.status(500).json({ error: "Error deleting method" });
  }
};
