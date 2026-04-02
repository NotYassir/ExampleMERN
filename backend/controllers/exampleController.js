const Example = require('../models/examplemodel');
const mongoose = require('mongoose');

// get all example data
const getExamples = async(req, res) => {
    const user_id = req.user._id;

    try {
        const examples = await Example.find({ user_id }).sort({ createdAt: -1 });
        res.status(200).json(examples);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// create new example data
const createExample = async(req, res) => {
    const { name, value } = req.body;

    let emptyFields = []

    if (!name) {
        emptyFields.push('name')
    }
    if (!value) {
        emptyFields.push('value')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }


    try {
        const user_id = req.user._id;
        const example = await Example.create({ name, value, user_id });
        res.status(200).json(example);
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

// get one example data
const getExample = async(req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such example data' });
    }
    try {
        const example = await Example.findById(id);
        if (!example) {
            return res.status(404).json({ error: 'Example data not found' });
        }
        res.status(200).json(example);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// delete example data
const deleteExample = async(req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such example data' });
    }
    try {
        const example = await Example.findByIdAndDelete(id);
        if (!example) {
            return res.status(404).json({ error: 'Example data not found' });
        }
        res.status(200).json(example);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// update example data
const updateExample = async(req, res) => {
    const { id } = req.params;
    const { name, value } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
       return res.status(400).json({error: 'No such workout'})
    }
    try {
        const example = await Example.findByIdAndUpdate(id, { name, value }, { new: true });
        if (!example) {
            return res.status(404).json({ error: 'Example data not found' });
        }
        res.status(200).json(example);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    createExample,
    getExamples,
    getExample,
    deleteExample,
    updateExample
};