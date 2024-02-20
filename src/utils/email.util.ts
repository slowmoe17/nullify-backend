import * as nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  host: String(process.env.MAIL_HOST),
  port: Number(process.env.MAIL_PORT),
  secure: false,
  auth: {
    user: "aliomran11233@gmail.com",
    pass: "aliomran_11",
  },
  
});

export async function sendEmail(to: string, subject: string, text: string) {
    try { 
        console.log(to)
    const mailOptions = {
      from: process.env.EMAIL_SENDER,
            to: to,
            subject: subject,
            text: text,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
  }
}
