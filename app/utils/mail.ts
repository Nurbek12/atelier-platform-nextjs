import { createTransport } from 'nodemailer'

const emailTemplate = (orderNum: number, client: string) => {
    return `
    Dear ${client},
    
    I hope this email finds you well. I am writing to provide you with an update on your recent order with us, ${orderNum}.
    
    As of today, the status of your order is: Finish

    Please feel free to reply to this email or contact our customer service team at [Customer Service Email/Phone Number] if you have any questions or need further assistance.
    
    Thank you for choosing us for your [product/service] needs. We appreciate your business and look forward to serving you again in the future.
    
    Best Regards,
    
    [Your Name]
    [Your Position]
    [Your Contact Information]
    [Company Name]`
}

export const sendMail = (email: string, order: number, client: string) => createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAILUSER,
        pass: process.env.EMAILPASSWORD
    }
}).sendMail({
    from: process.env.EMAILUSER,
    to: email,
    subject: 'Order Status Finished',
    text: emailTemplate(order, client)
}, (err) => {
    if (err) return console.log('Error with sending')
    else return console.log('Successfully sended!')
})