const express = require("express");
const router = express.Router();
const methodsController = require("../controllers/methodsController");
const authMiddleware = require("../middleware/authMiddleware"); // Import the auth middleware

// Public Routes
router.get("/", methodsController.getAllMethods); // No auth required to list methods
router.get("/search", methodsController.searchMethods);

// Protected Routes (Require Auth)
router.get(
  "/:instrumentType/:id",
  authMiddleware,
  methodsController.getMethodById // Auth required to view method details
);
router.post("/", authMiddleware, methodsController.createMethod); // Auth required to create a new method
router.put(
  "/:instrumentType/:id",
  authMiddleware,
  methodsController.updateMethod
); // Auth required to edit a method
router.delete(
  "/:instrumentType/:id",
  authMiddleware,
  methodsController.deleteMethod
); // Auth required to delete a method

module.exports = router;
