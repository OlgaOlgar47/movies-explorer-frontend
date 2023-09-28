import React from "react";
import Form from "../Form/Form";

function Login() {
  return (
    <Form
      isRegister={false}
      title="Рады видеть!"
      email="pochta@yandex.ru"
      submitText="Войти"
      link="/signup"
      formText="Ещё не зарегистрированы?"
      linkText="Регистрация"
    />
  );
}

export default Login;