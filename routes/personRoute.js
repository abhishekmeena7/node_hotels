const express = require('express'); 
const router = express.Router();
const person = require("./../models/person");

// POST route to add a person
router.post("/", async (req, res) => {
    try {
        const data = req.body; // Assuming the request body contains the person data
  
        // Create a new person document using the mongoose model
        const newPerson = new person(data);

        // Save the new person to the database
        const response = await newPerson.save();
        console.log("Data saved");
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET method to fetch all persons
router.get("/", async (req, res) => {
    try {
        const data = await person.find();
        console.log("Data fetched successfully");
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET method to fetch persons by work type
router.get("/:work", async (req, res) => {
    try {
        const work = req.params.work; // Extract the work type from the URL parameter
        if (["chef", "waiter", "manager","developer"].includes(work)) {
            const response = await person.find({ work });
            console.log("Data fetched successfully");
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: "Invalid work type" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// PUT method to update a person by ID
router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id; // Extract the ID from the URL parameter
        const updatedPersonData = req.body; // Updated data for the person 

        const response = await person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true, // Return the updated document
            runValidators: true, // Run mongoose validation
        });

        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }

        console.log("Data updated");
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// DELETE method to delete a person by ID
router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id; // Extract the ID from the URL parameter

        // Delete the person document
        const response = await person.findByIdAndDelete(personId);

        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }

        console.log("Data deleted");
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
