import nodemailer from 'nodemailer';
import config from '../config/config.js';

export const mail_purchase_ticket = async(recipient, ticket) => {
	const transport = nodemailer.createTransport({
		service: 'gmail',
		port: 587,
		auth: {
			user: config.mailingUser,
			pass: config.mailingPass
		}
	})

	await transport.sendMail({
		from: `CoderBackend <${config.mailingUser}>`,
		to: recipient,
		subject: 'Coderhouse Backend LaptopShopping',
		html:
			`
			<div>
				<h1>Purchase successful!</h1>
				<p>Order ID: ${ticket._id}</p>
				<p>Total amount: $${ticket.amount}</p>

				<p>If any product was out of stock it was not purchased and it will still be in your cart</p>
				<p>To view details go to your cart and click on 'view orders' button</p>
			</div>
			`
	})

	return
}

export const mail_password_reset = async(recipient, token) => {
	const transport = nodemailer.createTransport({
		service: 'gmail',
		port: 587,
		auth: {
			user: config.mailingUser,
			pass: config.mailingPass
		}
	})

	await transport.sendMail({
		from: `CoderBackend <${config.mailingUser}>`,
		to: recipient,
		subject: 'Coderhouse Backend Password Reset',
		html:
			`
			<div>
				<h1>Password Reset Request</h1>
				<p>Click <a href='${config.frontendUrl}/pw/${token}/reset'>HERE</a> to reset password.</p>
				<p>Link is only valid for one hour</p>
				
				<p>If you did not request a password change call the FBI</p>
			</div>
			`
	})
	
	return
}

export const mail_account_deleted = async(email) => {
	const transport = nodemailer.createTransport({
		service: 'gmail',
		port: 587,
		auth: {
			user: config.mailingUser,
			pass: config.mailingPass
		}
	})

	await transport.sendMail({
		from: `CoderBackend <${config.mailingUser}>`,
		to: email,
		subject: 'Coderhouse Backend Account Deleted',
		html:
			`
			<div>
				<h1>Account Deleted</h1>
				<p>Your account has been deleted due to inactivity</p>
			</div>
			`
	})
	
	return
}