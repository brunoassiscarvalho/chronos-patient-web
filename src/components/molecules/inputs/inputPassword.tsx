import { TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { IFormItem } from "../../organisms/form/FormItem";

interface IInputText extends IFormItem {
  format?: any,
  onBlur?: any,
  id?: string,
  style?: any,
  shrink?: boolean
}

export default function InputPassword({ inputRef, errorMessage, name = "password" }: IInputText) {
  // const [errorMessage, setErrorMessage] = useState<string>(!!errors && errors[name])

  // useEffect(() => {
  //   setErrorMessage(errors[name]?.message)
  // }, [errors[name]])

  return (
    <TextField
      label="Senha"
      type="password"
      inputRef={inputRef}
      name="password"
      autoComplete="current-password"
    />
  )
}