const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); // To parse form data
const nodemailer = require('nodemailer');  // For sending emails

const app = express();
const PORT = 34578;

// Middleware to parse JSON and form-encoded data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve index.html for the root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API endpoint to handle form submissions
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    // Create a transporter object using your Gmail account
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sundereshp@gmail.com',    // Your Gmail address
            pass: 'wskn guaa tvjx huuq'      // Your Gmail password or App Password
        }
    });

    // Define the email options for your notification
    const mailOptionsToYou = {
        from: email,
        to: 'sundereshp@gmail.com',  // Your email to receive the form submissions
        subject: `Portfolio Contact Form: ${name}`,
        text: `You have a new message from ${name} (${email}):\n\n${message}`
    };

    // Define the email options for the automated reply
    const mailOptionsToUser = {
        from: 'sundereshp@gmail.com',  // Your email address
        to: email,                     // Send to the user's email
        subject: 'Thank you for contacting us!',
        text: `Hi ${name},\n\nThank you for reaching out! We have received your message:\n\n"${message}"\n\nWe will get back to you shortly.\n\nBest regards,\nYour Company Name`
    };

    // Send the email to you first
    transporter.sendMail(mailOptionsToYou, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: 'Failed to send message.' });
        } else {
            console.log('Email sent to you: ' + info.response);

            // Now send the automated email to the user
            transporter.sendMail(mailOptionsToUser, (error, info) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json({ success: false, message: 'Failed to send automated reply.' });
                } else {
                    console.log('Automated email sent to user: ' + info.response);
                    return res.status(200).json({ success: true, message: 'Message sent successfully!' });
                }
            });
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
