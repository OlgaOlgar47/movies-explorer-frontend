import React from "react";
import Form from "../Form/Form";

function Register(props) {
  const { onRegister, values, errors, onChange } = props;
  return (
    <section>
      <Form
        isRegister={true}
        title="Добро пожаловать!"
        submitText="Зарегистрироваться"
        submitButtonForLogin=''s
        link="/signin"
        formText="Уже зарегистрированы?"
        linkText="Войти"
        onSubmit={onRegister}
        values={values}
        errors={errors}
        onChange={onChange}
      />
    </section>
  );
}

export default Register;
