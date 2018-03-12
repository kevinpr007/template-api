import nodemailer from "nodemailer";

const from = `"Template API" <${process.env.EMAIL_APP}>`;

function setup() {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
}

export function sendConfirmationEmailValidation(user) {
  const tranport = setup();
  const email = {
    from,
    to: user.email,
    subject: "Welcome to Template-API",
    text: `
    Welcome to Template-API. Please, confirm your email.
    ${user.generateConfirmationUrl()}
    `
  }

  tranport.sendMail(email);
};

  export function sendConfirmationEmail(user) {
    const tranport = setup();
    const email = {
      from,
      to: user.email,
      subject: "Template-API - Confirmation Email",
      text: `Welcome to Template-API. Your email has been confirmed. Thank you.`
    };

  //TODO: Send Email Async
  tranport.sendMail(email);
};

export function sendResetPasswordEmailValidation(user) {
  const tranport = setup();
  const email = {
    from,
    to: user.email,
    subject: "Template-API - Reset Password",
    text: `
    To reset password follow this link
    ${user.generateResetPasswordLink()}
    `
  };

  tranport.sendMail(email);
}

export function sendResetPasswordEmail(user) {
  const tranport = setup();
  const email = {
    from,
    to: user.email,
    subject: "Template-API - Reset Password Confirmation",
    text: `Your password has been reset. Thank you for use Template-API`
  };

  tranport.sendMail(email);
}
