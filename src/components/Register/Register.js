import React from "react";
import Form from "../Form/Form";

function Register() {
  return (
    <Form
      isRegister={true}
      title="Добро пожаловать!"
      name="Виталий"
      email="pochta@yandex.ru"
      submitText="Зарегистрироваться"
      link="/signin"
      formText="Уже зарегистрированы?"
      linkText="Войти"
    />
  );
}

export default Register;
