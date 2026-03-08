const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  addPet,
  getAllPets,
  getPetById,
  updatePet,
  deletePet
} = require("../controllers/petController");


// Add new pet
router.post("/add", authMiddleware, addPet);

// Get all pets for logged in user
router.get("/all", authMiddleware, getAllPets);

// Public pet view for sitter
router.get("/view/:id", getPetById);

// Get single pet (owner access)
router.get("/:id", authMiddleware, getPetById);

// Update pet
router.put("/update/:id", authMiddleware, updatePet);

// Delete pet
router.delete("/delete/:id", authMiddleware, deletePet);


module.exports = router;