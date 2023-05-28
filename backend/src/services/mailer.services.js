import nodemailer from 'nodemailer';
import config from '../config/config.js';

async function mail(recipient, ticket) {
    const transport = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        auth: {
            user: config.mailingUser,
            pass: config.mailingPass
        }
    })

    const send_mail = async() => {
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
    }

    await send_mail()
    return
}

export default mail;