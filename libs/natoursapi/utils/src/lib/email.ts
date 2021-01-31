import nodemailer from 'nodemailer';
// import { environment } from '@codebase/shared/environments';

export const sendEmail = async (options): Promise<void> => {
  const mailtrapConfig: any = {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  };

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport(mailtrapConfig);

  // define the email options
  const mailOptions = {
    from: 'John Doe <john@example.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html: options.markup,
  };

  // send email
  await transporter.sendMail(mailOptions);
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const email = () => {};
