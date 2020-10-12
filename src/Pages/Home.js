import React, { useState } from "react";
import PersonTable from "../Components/PersonTable.js";
import AddForm from "../Components/AddForm.js";

const Home = () => {
  const [page, setPage] = useState("home");
  const [numberIds, setNumberIds] = useState();
  const [personToEdit, setPersonToEdit] = useState();

  const changePage = (page) => {
    setPage(page);
  };

  const ultimoID = (number) => {
    setNumberIds(number);
  };

  const updatePaciente = (paciente) => {
    setPersonToEdit(paciente);
  };

  if (page === "add") {
    return (
      <div>
        <AddForm changePage={changePage} id={numberIds}></AddForm>
      </div>
    );
  } else if (page === "home") {
    return (
      <div>
        <PersonTable
          updatePaciente={updatePaciente}
          changePage={changePage}
          ultimoId={ultimoID}
        ></PersonTable>
      </div>
    );
  } else if (page === "update") {
    return (
      <div>
        <AddForm personToEdit={personToEdit} changePage={changePage} id={numberIds}></AddForm>
      </div>
    );
  }
};

export default Home;
