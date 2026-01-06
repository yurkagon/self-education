import Mailgen from "mailgen";

import Configuration from "../../Configuration";

class TemplateGenerator {
  private mailGenerator: Mailgen;
  private config = new Configuration();

  constructor() {
    this.mailGenerator = new Mailgen({
      theme: "salted",
      product: {
        name: "E-menu",
        link: `${this.config.baseUrl}/`,
        logo: `${this.config.baseUrl}/emenue-logo.png`,
      },
    });
  }

  public generateEmailVerificationTemplate(user: IUser, token: string): string {
    return this.mailGenerator.generate({
      body: {
        greeting: "Привіт!",
        name: user.first_name,
        intro: "Дуже раді бачити що ви доєднались до системи E-menu!",
        action: {
          instructions:
            "Для того щоб підтвердити свій аккаунт, натисніть на кнопку нижче:",
          button: {
            color: "#22BC66",
            text: "Підтвердити аккаунт",
            link: `${this.config.baseUrl}/admin/account/confirm/${token}`,
          },
        },
        outro:
          "Необхідна допомога? Напишіть зворотнього листа - ми будемо дуже раді допомогти!",
      },
    });
  }
}

export default TemplateGenerator;
