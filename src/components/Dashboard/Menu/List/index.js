import React, { useEffect } from "react";
import {
  DataTable,
  DataTableContent,
  DataTableHead,
  DataTableRow,
  DataTableCell,
  DataTableHeadCell,
  DataTableBody,
  Fab
} from "rmwc";
import ReactPaginate from "react-paginate";
import { withRouter } from "react-router-dom";

import "./styles.css";
import { HeaderCard } from "../Form/styles";
import "@rmwc/data-table/data-table.css";
import api from "../../../../services/api";

// 10  offset = 100 100%100 = 0
const Paginator = (items, page) => {
  page = page || 0;
  let per_page = 10;
  let offset = page * per_page;
  offset = offset >= 100 ? offset % 100 : offset;

  return items.slice(offset).slice(0, per_page);
};

const List = props => {
  const [entities, setEntities] = React.useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      pageSelected: 0,
      pageLevel: 1,
      dataPaginada: [],
      data: [],
      total: 0
    }
  );

  useEffect(() => {
    async function getUsers() {
      const res = await api.post(`/users?page=${entities.pageLevel}`);
      if(!res.error){
        setEntities({
          ...res,
          dataPaginada: Paginator(res.data, entities.pageSelected),
          total: Math.ceil(res.total / 10)
        });
      }
      console.log(res);
    }
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entities.pageLevel]);

  const tableParams = {
    headCells: [],
    headNames: [],
    formPath: "/form"
  };

  switch (props.table) {
    case 1: //usuários
      tableParams.headCells.push("ID", "Nome", "E-mail");
      tableParams.headNames.push("id", "name", "email");
      tableParams.formPath = "users" + tableParams.formPath;
      break;
    case 2: //legendas
      tableParams.headCells.push("ID", "Nome", "Categoria", "Autor");
      tableParams.formPath = "subtitles" + tableParams.formPath;
      break;
    case 3: //categorias
      tableParams.headCells.push("ID", "Nome", "Descrição", "Classificação");
      tableParams.formPath = "categories" + tableParams.formPath;
      break;
    case 4: //legendas em andamento
      tableParams.headCells.push("ID", "Legenda", "%", "Categoria");
      tableParams.formPath = "progress" + tableParams.formPath;
      break;
    case 5: //permissoes
      tableParams.headCells.push("ID", "Nome", "Descrição", "N° de usuários");
      tableParams.formPath = "permissions" + tableParams.formPath;
      break;
    case 6: //ranking
      tableParams.headCells.push(
        "Posição",
        "Usuario",
        "Qtd de Legendas",
        "Descrição"
      );
      tableParams.formPath = "ranking" + tableParams.formPath;
      break;
    case 7: //galeria
      tableParams.headCells.push("ID", "Nome", "Descrição", "Descrição2");
      tableParams.formPath = "gallery" + tableParams.formPath;
      break;
    default:
  }

  const handlePageClick = data => {
    let selected = data.selected;
    let newlevelpage = Math.floor(selected / 10 + 1);
    if (entities.pageLevel !== newlevelpage) {
      setEntities({
        pageSelected: selected,
        pageLevel: newlevelpage
      });
    } else {
      let dados = Paginator(entities.data, selected);
      console.log(dados);
      setEntities({ dataPaginada: dados });
    }
  };

  return (
    <>
      <HeaderCard>
        <h2>{props.title}</h2>
        {props.title !== "Ranking" && (
          <Fab
            icon="add"
            type="button"
            onClick={() => {
              props.history.push(tableParams.formPath);
            }}
          />
        )}
      </HeaderCard>
      <div className="card-border" />
      <DataTable style={{ height:'412px',border: "none" }}>
        <DataTableContent style={{ width: "100%" }}>
          <DataTableHead>
            <DataTableRow>
              {tableParams.headCells.map((cell, index) => (
                <DataTableHeadCell
                  style={{ fontSize: "0.8rem", lineHeight: "1.8rem" }}
                  key={index}
                >
                  {cell}
                </DataTableHeadCell>
              ))}
              <DataTableHeadCell
                style={{ fontSize: "0.8rem", lineHeight: "1.8rem" }}
              >
                Ação
              </DataTableHeadCell>
            </DataTableRow>
          </DataTableHead>
          <DataTableBody>
            {entities.dataPaginada &&
              entities.dataPaginada.map((obj, index) => (
                <DataTableRow key={index}>
                  {Object.keys(obj).map(
                    (item, i) =>
                      tableParams.headNames.includes(item) && (
                        <DataTableCell key={i}>{obj[item]}</DataTableCell>
                      )
                  )}
                  <DataTableCell>
                    <Fab
                      style={{
                        marginRight: "5px",
                        backgroundColor: "var(--edit-button)"
                      }}
                      mini
                      icon="create"
                      type="button"
                      onClick={() => {
                        props.history.push(`${tableParams.formPath}/${obj.id}`);
                      }}
                    />
                    <Fab
                      style={{ backgroundColor: "var(--delete-button)" }}
                      mini
                      icon="delete"
                      type="button"
                      onClick={() => {
                        console.log("DELETANDO");
                      }}
                    />
                  </DataTableCell>
                </DataTableRow>
              ))}
          </DataTableBody>
        </DataTableContent>
      </DataTable>
      <ReactPaginate
        previousLabel={<i className="material-icons">keyboard_arrow_left</i>}
        nextLabel={<i className="material-icons">keyboard_arrow_right</i>}
        breakLabel={"..."}
        breakClassName={"break"}
        pageCount={entities.total}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </>
  );
};

export default withRouter(List);
