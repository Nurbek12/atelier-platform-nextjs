import { createTransport } from 'nodemailer'

export const sendMail = (to: string, subject: string, text: string) => createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAILUSER,
        pass: process.env.EMAILPASSWORD
    }
}).sendMail({
    from: process.env.EMAILUSER,
    to,
    subject,
    text
}, (err) => {
    if (err) return console.log('Error with sending')
    else return console.log('Successfully sended!')
})