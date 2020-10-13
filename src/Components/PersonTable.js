import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@material-ui/icons/Edit";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import styled from "styled-components";
import api from "../api";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
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
      props.ultimoId(response.data[response.data.length - 1].id);
    }
    fetchData();
  }, []);

  const update = (id) => {
    const paciente = pacientes.filter((curr) => {
      return curr.id == id;
    });

    props.updatePaciente(paciente[0]);
    props.changePage("update");
  };

  const classes = useStyles();

  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    return (
      <React.Fragment>
        <TableRow className={classes.root}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.nome}
          </TableCell>
          <TableCell align="right">
            <EditIcon onClick={() => {update(row.id)}}></EditIcon>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell><b>CPF</b></TableCell>
                      <TableCell><b>SEXO</b></TableCell>
                      <TableCell><b>IDADE</b></TableCell>
                      <TableCell><b>PESO</b></TableCell>
                      <TableCell><b>TELEFONE</b></TableCell>
                      <TableCell><b>E-MAIL</b></TableCell>
                      <TableCell><b>ENDEREÇO</b></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>{row.cpf}</TableCell>
                      <TableCell>{row.sexo}</TableCell>
                      <TableCell>{row.idade}</TableCell>
                      <TableCell>{row.peso}</TableCell>
                      <TableCell>{row.telefone}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.endereco}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  return (
    <TableContainer component={Paper}>
      <h1>Pacientes</h1>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="left"><b>NOME</b></TableCell>
            <TableCell align="right"><b>EDITAR</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pacientes.map((row) => (
            <Row key={row.nome} row={row} />
          ))}
        </TableBody>
      </Table>
      <AddButton
        align="right"
        onClick={() => {
          props.changePage("add");
        }}
      >
        <AddCircleIcon></AddCircleIcon>
      </AddButton>
    </TableContainer>
  );
});

export default PersonTable;
