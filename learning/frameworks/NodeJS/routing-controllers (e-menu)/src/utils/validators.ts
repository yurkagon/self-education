import * as Yup from "yup";
import { phoneRegExp } from "./regExp";

export default class Validator {
  static fistName = Yup.string()
    .min(2, "Ім'я надто коротке.")
    .max(50, "Ім'я надто довге.")
    .required("Порібно вказати ім'я");

  static lastName = Yup.string()
    .min(2, "Прізвище надто коротке.")
    .max(50, "Прізвище надто довге.")
    .required("Порібно вказати прізвище.");

  static email = Yup.string()
    .email("Введіть дійсну адресу електронної пошти.")
    .required("Потрібно вказати адресу електронної пошти.");

  static phone = Yup.string()
    .matches(phoneRegExp, "Номер телефону не вірний")
    .min(9, "Номер телефону занадто короткий.")
    .max(15, "Номер телефону занадто довгий.")
    .required("Потрібно вказати номер телефону.");

  static password = Yup.string()
    .min(8, "Ваш пароль має містити щонайменше 8 символів. Спробуйте ще раз.")
    // TODO: дати коректний текст помилки, зробити аналогічну валідацію на бекенді
    // .matches(passwordRegExp, "Введено неправильний пароль. Спробуйте ще раз.")
    .required("Потрібно вказати пароль.");

  static oldPassword = Yup.string()
    .min(8, "Не вірний пароль.")
    .required("Потрібно вказати попередній пароль");

  static newPassword = Yup.string()
    .min(8, "Ваш пароль має містити щонайменше 8 символів. Спробуйте ще раз.")
    .required("Потрібно вказати пароль.");

  static confirmPassword = Yup.string()
    .required("Пароль має збігатись")
    .test("passwords-match", "Пароль не збігається", function matcher(value) {
      return this.parent.password === value;
    });

  static names = Yup.string()
    .min(2, "Назва ресторану занадто коротка.")
    .max(30, "Назва ресторану занадто довга.")
    .required("Потрібно вказати назву ресторану.");

  static slug = Yup.string().required("Потрібно вказати слаг.");

  static table_count = Yup.number()
    .required("Потрібно вказати кількість столиків.")
    .min(2, "Столиків надто мало.");
}
