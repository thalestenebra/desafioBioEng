import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import styled, { css } from "styled-components";
import api from "../api";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const AddButton = styled.button`
  background-color: white;
  color: black;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 10px;
  cursor: pointer;
  float: right;
`;

const PersonTable = React.memo((props) => {
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await api.get("pacientes");
      setPacientes(response.data);
      props.ultimoId(response.data[response.data.length - 1].id)
    }
    fetchData();
  }, []);

  const update = (id) => {
    const paciente = pacientes.filter((curr) => {
        return curr.id == id;
    })

    props.updatePaciente(paciente[0]);
    props.changePage('update');
  }

  const classes = useStyles();
  
  return (
    <TableContainer component={Paper}>
      <h2>Pacientes</h2>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>CPF</TableCell>
            <TableCell>NOME</TableCell>
            <TableCell>EMAIL</TableCell>
            <TableCell>IDADE</TableCell>
            <TableCell>PESO</TableCell>
            <TableCell align="right">Editar</TableCell>
            <TableCell align="right">Exluir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pacientes.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.cpf}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.nome}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.email}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.idade}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.peso}
              </TableCell>
              <TableCell align="right">
                <button onClick={() => {update(row.id)}}>
                  <EditIcon></EditIcon>
                </button>
              </TableCell>
              <TableCell align="right">
                <DeleteIcon></DeleteIcon>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AddButton align="right" onClick={() => {props.changePage('add')}}>
        <AddCircleIcon></AddCircleIcon>
      </AddButton>
    </TableContainer>
  );
});

export default PersonTable;
