import React, { useEffect} from "react";
import Form from "../Form/Form";

function Login(props) {
  const { onLogin, values, errors, onChange, isValid, setServerError } = props;

  useEffect(() => {
    setServerError("");
  }, [setServerError]);

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
        submitButtonForLogin="form__submit-button-login"
        onSubmit={onLogin}
        values={values}
        errors={errors}
        onChange={onChange}
        isValid={isValid}
        setServerError={setServerError}
      />
    </section>
  );
}

export default Login;
