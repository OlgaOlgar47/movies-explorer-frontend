import React from "react";
import Form from "../Form/Form";

function Login(props) {
  const { onLogin, values, errors, onChange } = props;
  return (
    <section>
      <Form
        isRegister={false}
        title="Рады видеть!"
        email="pochta@yandex.ru"
        submitText="Войти"
        link="/signup"
        formText="Ещё не зарегистрированы?"
        linkText="Регистрация"
        submitButtonForLogin="form__submit-button_login"
        onSubmit={onLogin}
        values={values}
        errors={errors}
        onChange={onChange}
      />
    </section>
  );
}

export default Login;
