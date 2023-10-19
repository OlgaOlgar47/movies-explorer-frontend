import React, { useEffect } from "react";
import Form from "../Form/Form";

function Register(props) {
  const { onRegister, values, errors, onChange, isValid, setIsError, serverError } = props;

  useEffect(() => {
    setIsError(false);
  }, [setIsError]);

  return (
    <section>
      <Form
        isRegister={true}
        title="Добро пожаловать!"
        submitText="Зарегистрироваться"
        submitButtonForLogin=""
        s
        link="/signin"
        formText="Уже зарегистрированы?"
        linkText="Войти"
        onSubmit={onRegister}
        values={values}
        errors={errors}
        onChange={onChange}
        isValid={isValid}
        serverError={serverError}
      />
    </section>
  );
}

export default Register;
