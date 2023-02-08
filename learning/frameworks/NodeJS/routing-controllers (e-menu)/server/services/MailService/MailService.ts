import nodemailer, { Transporter, SendMailOptions } from "nodemailer";

import Configuration from "../../Configuration";

import TemplateGenerator from "./TemplateGenerator";

class MailService {
  private transporter: Transporter;
  private config = new Configuration();
  private templateGenerator = new TemplateGenerator();

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: this.config.mailer.user,
        pass: this.config.mailer.password,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  public sendEmailVerification(user: IUser, token: string): Promise<any> {
    const mailOptions: SendMailOptions = {
      from: this.config.mailer.user,
      to: user.email,
      subject: "Confirm your email",
      html: this.templateGenerator.generateEmailVerificationTemplate(
        user,
        token
      ),
    };
    return this.send(mailOptions);
  }

  private async send(mailOptions: SendMailOptions): Promise<any> {
    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error("Failed to send email: ", error);
    }
  }
}

export default MailService;
