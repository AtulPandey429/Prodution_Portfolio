const nodemailer = require("nodemailer");
const sendinBlueTransport = require("nodemailer-sendinblue-transport");

// Create a SendinBlue transporter using your SendinBlue API key
const transporter = nodemailer.createTransport(
  new sendinBlueTransport({
    apiKey: process.env.API_SENDINBLUE,
  })
);

const sendEmailController = async (req, res) => {
  try {
    const { name, email, msg } = req.body;

    // Validation
    if (!name || !email || !msg) {
      return res.status(500).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }

    // Send an email
    const info = await transporter.sendMail({
      from: "pandeyatul429@email.com", // Sender email address (your SendinBlue verified email)
      to: "pandeyatul429@gmail.com", // Recipient email address
      subject: "Regarding Mern Portfolio App",
      html: `
        <h5>Detail Information</h5>
        <ul>
          <li><p>Name : ${name}</p></li>
          <li><p>Email : ${email}</p></li>
          <li><p>Message : ${msg}</p></li>
        </ul>
      `,
    });

    console.log("Email sent:", info);

    return res.status(200).send({
      success: true,
      message: "Your Message Send Successfully",
    });
  } catch (error) {
    console.error("Email sending error:", error);
    return res.status(500).send({
      success: false,
      message: "Email sending error",
      error: error.message,
    });
  }
};

module.exports = { sendEmailController };
