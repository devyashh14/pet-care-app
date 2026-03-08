const Pet = require("../models/Pet");


// ADD PET
const addPet = async (req, res) => {

  try {

    const pet = new Pet({
      ...req.body,
      user: req.user.id
    });

    await pet.save();

    res.status(201).json(pet);

  } catch (error) {

    console.log(error);

    res.status(500).json({ error: error.message });

  }

};


// GET ALL PETS (ONLY USER PETS)
const getAllPets = async (req, res) => {

  try {

    const pets = await Pet.find({ user: req.user.id });

    res.json(pets);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};


// GET SINGLE PET (PUBLIC ACCESS FOR PET SITTER)
const getPetById = async (req, res) => {

  try {

    const pet = await Pet.findById(req.params.id).populate("user", "name email");

    if (!pet) {
      return res.status(404).json({
        message: "Pet not found"
      });
    }

    res.json(pet);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};


// UPDATE PET (ONLY OWNER CAN UPDATE)
const updatePet = async (req, res) => {

  try {

    const pet = await Pet.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );

    if (!pet) {
      return res.status(404).json({
        message: "Pet not found or not authorized"
      });
    }

    res.json({
      message: "Pet updated successfully",
      pet
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};


// DELETE PET (ONLY OWNER CAN DELETE)
const deletePet = async (req, res) => {

  try {

    const pet = await Pet.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!pet) {
      return res.status(404).json({
        message: "Pet not found or not authorized"
      });
    }

    res.json({
      message: "Pet deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};


module.exports = {
  addPet,
  getAllPets,
  getPetById,
  updatePet,
  deletePet
};