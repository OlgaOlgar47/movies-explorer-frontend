import { useState, useEffect } from "react";

export default function useValidation() {
    console.log('validation works')
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    console.log('Values:', values);
    console.log('Errors:', errors);
    // остальной код
  }, [values, errors]);
  

  useEffect(() => {
    const isValid = Object.values(errors).every((error) => error === "");
    setIsValid(isValid);
  }, [errors]);

  const onChange = (e) => {
    console.log("onChange is called");
    const { name, value } = e.target;
    setValues((values) => ({ ...values, [name]: value }));
    setErrors((error) => ({ ...error, [name]: e.target.validationMessage }));
  };

  const resetValidation = (values = {}, errors = {}) => {
    setValues(values);
    setErrors(errors);
  };

  return {
    values,
    errors,
    isValid,
    onChange,
    setValues,
    resetValidation,
  };
}
