import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import styled from "styled-components";
import api from "../api";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const AddButton = styled.div`
  background-color: withe;
  border: solid 1.5px black;
  color: black;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 10px;
  cursor: pointer;
  float: right;
`;

const Div4 = styled.div`
  padding: 15px;
  width: 2rem;
  border: solid 1px black;
`;

const DivMain = styled.div`
  margin-top: 10%;
  margin-top: 10%;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

const Div5 = styled.div`
  display: flex;
  justify-content: center;
`;

export default function AddForm(props) {

  const classes = useStyles();
  const [nome, setNome] = useState(
    props.personToEdit ? props.personToEdit.nome : ""
  );
  const [cpf, setCpf] = useState(
    props.personToEdit ? props.personToEdit.cpf : ""
  );
  const [sexo, setSexo] = useState(
    props.personToEdit ? props.personToEdit.sexo : ""
  );
  const [idade, setIdade] = useState(
    props.personToEdit ? props.personToEdit.idade : null
  );
  const [peso, setPeso] = useState(
    props.personToEdit ? props.personToEdit.peso : null
  );
  const [telefone, setTelefone] = useState(
    props.personToEdit ? props.personToEdit.telefone : ""
  );
  const [email, setEmail] = useState(
    props.personToEdit ? props.personToEdit.email : ""
  );
  const [endereco, setEndereco] = useState(
    props.personToEdit ? props.personToEdit.endereco : ""
  );

  const backHome = () => {
    props.changePage("home");
  };

  const addEdit = () => {
    const paciente = {
      id: props.personToEdit ? props.personToEdit.id : props.id + 1,
      nome: nome,
      cpf: cpf,
      sexo: sexo,
      idade: parseInt(idade),
      peso: parseInt(peso),
      telefone: telefone,
      email: email,
      endereco: endereco,
    };
    if (props.personToEdit) {
      api
        .put(`pacientes/${props.personToEdit.id}`, paciente)
        .then((response) => {
          console.log(response);
          props.changePage("home");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      api
        .post("pacientes", paciente)
        .then((response) => {
          console.log(response);
          props.changePage("home");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <DivMain>
      <Div4 onClick={() => backHome()}>
        <ArrowBackIosIcon></ArrowBackIosIcon>
      </Div4>
      <form className={classes.root}>
        <div>
          <TextField
            id="inputName"
            label="Nome"
            onChange={(e) => setNome(e.target.value)}
            defaultValue={nome}
          />
          <TextField
            id="inputCpf"
            label="CPF"
            onChange={(e) => setCpf(e.target.value)}
            defaultValue={cpf}
          />
          <TextField
            id="inputSex"
            label="Sexo"
            inputProps={{
              maxLength: 1,
            }}
            onChange={(e) => setSexo(e.target.value)}
            defaultValue={sexo}
          />
          <TextField
            id="inputIdade"
            label="Idade"
            type="number"
            inputProps={{
              maxLength: 3,
            }}
            onChange={(e) => setIdade(e.target.value)}
            defaultValue={idade}
          />
          <TextField
            id="inputPeso"
            label="Peso"
            type="number"
            onChange={(e) => setPeso(e.target.value)}
            defaultValue={peso}
          />
        </div>
        <div>
          <TextField
            id="inputTelefone"
            label="Telefone"
            onChange={(e) => setTelefone(e.target.value)}
            defaultValue={telefone}
          />
          <TextField
            id="inputEmail"
            label="E-mail"
            onChange={(e) => setEmail(e.target.value)}
            defaultValue={email}
          />
          <TextField
            id="inputEndereço"
            label="Endereço"
            onChange={(e) => setEndereco(e.target.value)}
            defaultValue={endereco}
          />
        </div>
        <Div5>
          <AddButton align="right" onClick={() => addEdit()}>
            <AddCircleIcon></AddCircleIcon>
          </AddButton>
        </Div5>
      </form>
    </DivMain>
  );
}
