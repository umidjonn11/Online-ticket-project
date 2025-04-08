import { createTransport } from "nodemailer";

const transporter = createTransport({
	service: "gmail",
	host: "smtp.gmail.com",
	port: 465,
	secure: true,
	auth: {
		user: process.env.MAIL_USER, 
		pass: process.env.MAIL_PASS,
	},
});

export function sendMail(userMail, message) {
	try {
		const mailOptions = {
			from: process.env.MAIL_USER,
			to: userMail,
			subject: "OTP manager",
			text: message,
			name: "Umid",
		};

		
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				console.log(error);
			} else {
				console.log("Mail Sent!");
			}
		});
	} catch (error) {
		console.log("ERROR:", error);
	}
}

