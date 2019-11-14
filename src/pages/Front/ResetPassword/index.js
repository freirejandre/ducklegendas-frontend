import React, { useState, useReducer } from "react";
import { Container,Error,FormContainer } from "components/Generic";
import { withRouter } from "react-router-dom";
import { InputPersonalizado } from "../Contato";
import {postRequest} from "services/api";
import { ROUTES } from "utils/RoutePaths";
import HeadHelmet from "services/HeadHelmet";

const ResetPassword = props => {
  const [errors, setErrors] = useState(null);
  const [input, setInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      email: "",
      password: "",
      password_confirmation: ""
    }
  );
  const { token } = props.match.params;

  async function resetPassword(e) {
    setErrors(['Aguarde um momento...']);
    e.preventDefault();
    const values = { email: input.email };
    if (token) {
      values.token = token;
      values.password = input.password;
      values.password_confirmation = input.password_confirmation;
    } else {
      values.urlFront = window.location.href;
    }

    const uriApi = token ? "/password/reset" : "/password/create";
    const res = await postRequest(uriApi, values);
    setErrors(res.success || res.error);
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setInput({ [name]: value });
    console.log(input);
  }

  return (
    <Container>
      <HeadHelmet 
        title={props.title}
        uri={ROUTES.RESETPASSWORD}
        description={`${props.title} - painel`}
      />
      <FormContainer className="card card-shadow">
        <div className="header-card">
            <h2>{props.title}</h2>
        </div>
        <div className="card-border" />
        <form className="formulario">
          <InputPersonalizado
            title="E-mail"
            name="email"
            type="email"
            value={input.email}
            onChange={handleInputChange}
          />
          {token && (
            <>
              <InputPersonalizado
                title="Senha"
                name="password"
                type="password"
                value={input.password}
                onChange={handleInputChange}
              />
              <InputPersonalizado
                title="Confirmação de senha"
                name="password_confirmation"
                type="password"
                value={input.password_confirmation}
                onChange={handleInputChange}
              />
            </>
          )}

          <InputPersonalizado
            type="submit"
            value="Resetar"
            onClick={e => resetPassword(e)}
          />
          <Error>
            {errors &&
              Object.keys(errors).map(key => (
                <span key={key}>{errors[key]}</span>
              ))}
          </Error>
        </form>
      </FormContainer>
    </Container>
  );
};

export default withRouter(ResetPassword);