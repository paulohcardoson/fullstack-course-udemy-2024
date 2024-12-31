import * as inquirer from "@inquirer/prompts";
import qrcode from "qrcode";

inquirer
	.input({
		message: "Please enter an URL",
		required: true,
		validate: (url) => URL.parse(url) !== null || "Insert a valid URL",
	})
	.then(async (value) => {
		console.log("✨ QR Code generated successfully");
		console.log(await qrcode.toString(value, { type: "terminal" }));
	});
