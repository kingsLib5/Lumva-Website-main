const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/formData', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Define schema for form submissions
const formSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, required: true }, // Email is required for the newsletter
    message: String,
    formType: String, // Differentiates between contact, modal (get in touch), and newsletter forms
    date: { type: Date, default: Date.now } // Automatically set the date when the entry is created
});

const FormData = mongoose.model('FormData', formSchema);

// Route for handling form submissions
app.post('/submit-form', (req, res) => {
    const { firstName, lastName, email, message, formType } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required for newsletter submissions.' });
    }

    const newFormSubmission = new FormData({
        firstName: firstName || '', // In case it's a newsletter, firstName will be empty
        lastName: lastName || '',  // In case it's a newsletter, lastName will be empty
        email,
        message: message || '',  // No message for newsletter, so it will be empty
        formType
    });

    newFormSubmission.save()
        .then(() => res.json({ message: 'Form data saved successfully' }))
        .catch(err => res.status(400).json({ error: err.message }));
});

// Fetch submissions based on form type
app.get('/submissions/:formType', (req, res) => {
    FormData.find({ formType: req.params.formType })
        .then(data => res.json(data))
        .catch(err => res.status(400).json({ error: err.message }));
});

// Delete submission by ID
app.delete('/delete-submission/:id', (req, res) => {
    const submissionId = req.params.id;
    FormData.findByIdAndDelete(submissionId)
        .then(() => res.json({ message: 'Form data deleted successfully' }))
        .catch(err => res.status(400).json({ error: err.message }));
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
