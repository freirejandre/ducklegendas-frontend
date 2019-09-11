import React from 'react';
import { 
    DataTable,
    DataTableContent, 
    DataTableHead, 
    DataTableRow, 
    DataTableCell, 
    DataTableHeadCell,
    DataTableBody,
    Fab
} from 'rmwc';
import ReactPaginate from 'react-paginate';
import {withRouter} from 'react-router-dom';

import './styles.css';
import {HeaderCard} from '../Form/styles';
import '@rmwc/data-table/data-table.css';

const dataTotal = [
    {cell1: 'Cookies', cell2: 25, cell3: '$2.90'},
    {cell1: 'Cookies', cell2: 25, cell3: '$2.90'},
    {cell1: 'Cookies', cell2: 25, cell3: '$2.90'},
    {cell1: 'Cookies', cell2: 25, cell3: '$2.90'},
    {cell1: 'Cookies', cell2: 25, cell3: '$2.90'},
    {cell1: 'Cookies', cell2: 25, cell3: '$2.90'},
    {cell1: 'Cookies', cell2: 25, cell3: '$2.90'},
    {cell1: 'Cookies', cell2: 25, cell3: '$2.90'},
    {cell1: 'Cake', cell2: 25, cell3: '$2.90'},
    {cell1: 'Cake', cell2: 25, cell3: '$2.90'},
    {cell1: 'Cake', cell2: 25, cell3: '$3.90'},
    {cell1: 'Cake', cell2: 25, cell3: '$2.90'},
    {cell1: 'Cookies', cell2: 25, cell3: '$2.90'},
    {cell1: 'Cookies', cell2: 25, cell3: '$2.90'},
    {cell1: 'Cookies', cell2: 25, cell3: '$2.90'},
    {cell1: 'Cookies', cell2: 25, cell3: '$2.90'},
    {cell1: 'Teste', cell2: 25, cell3: '$3.90'},
    {cell1: 'Teste', cell2: 25, cell3: '$2.90'},
    {cell1: 'Teste', cell2: 25, cell3: '$2.90'},
    {cell1: 'Teste', cell2: 25, cell3: '$3.90'},
    {cell1: 'Cookies', cell2: 25, cell3: '$2.90'},
    {cell1: 'Cookies', cell2: 25, cell3: '$2.90'},
    {cell1: 'Cookies', cell2: 25, cell3: '$2.90'},
    {cell1: 'Cookies', cell2: 25, cell3: '$2.90'},
    {cell1: 'Cookies', cell2: 25, cell3: '$2.90'},
    {cell1: 'Cookies', cell2: 25, cell3: '$2.90'},
    {cell1: 'Cookies', cell2: 25, cell3: '$2.90'},
    {cell1: 'Chicken', cell2: 25, cell3: '$2.90'},
    {cell1: 'Chicken', cell2: 25, cell3: '$2.90'},
    {cell1: 'Chicken', cell2: 25, cell3: '$2.90'},
    {cell1: 'Chicken', cell2: 25, cell3: '$3.90'},
    {cell1: 'Cookies', cell2: 25, cell3: '$2.90'},
    {cell1: 'Cookies', cell2: 25, cell3: '$2.90'},
    {cell1: 'Cookies', cell2: 25, cell3: '$2.90'},
    {cell1: 'Cookies', cell2: 25, cell3: '$2.90'},
    {cell1: 'Cookies', cell2: 25, cell3: '$2.90'},
    {cell1: 'Cookies', cell2: 25, cell3: '$3.90'},
    {cell1: 'Cookies', cell2: 25, cell3: '$2.90'},
    {cell1: 'Egg', cell2: 5, cell3: '$2.90'},
    {cell1: 'Egg', cell2: 5, cell3: '$3.90'},
    {cell1: 'Egg', cell2: 5, cell3: '$2.90'},
    {cell1: 'Egg', cell2: 5, cell3: '$2.90'},
    {cell1: 'Cookies', cell2: 25, cell3: '$2.90'},
    {cell1: 'Cookies', cell2: 25, cell3: '$2.90'},
    {cell1: 'Cookies', cell2: 25, cell3: '$2.90'},
    {cell1: 'Cookies', cell2: 25, cell3: '$2.90'},
    {cell1: 'Cookies', cell2: 25, cell3: '$2.90'},
    {cell1: 'Cookies', cell2: 25, cell3: '$2.90'},
    {cell1: 'Cookies', cell2: 25, cell3: '$2.90'},
    {cell1: 'Cookies', cell2: 25, cell3: '$2.90'},
    {cell1: 'Cookies', cell2: 25, cell3: '$3.90'},
    {cell1: 'Cookies', cell2: 25, cell3: '$2.90'},
    {cell1: 'Cookies', cell2: 25, cell3: '$2.90'},
    {cell1: 'Cookies', cell2: 25, cell3: '$2.90'},
    {cell1: 'kies', cell2: 25, cell3: '$2.90'},
    {cell1: 'kies', cell2: 25, cell3: '$2.90'},
    {cell1: 'kies', cell2: 25, cell3: '$3.90'},
    {cell1: 'kies', cell2: 25, cell3: '$2.90'},
    {cell1: 'Cookies', cell2: 25, cell3: '$2.90'},
    {cell1: 'Cookies', cell2: 25, cell3: '$3.90'},
    {cell1: 'Cookies', cell2: 25, cell3: '$2.90'},
    {cell1: 'Coos', cell2: 25, cell3: '$2.90'},
    {cell1: 'Coos', cell2: 25, cell3: '$2.90'},
    {cell1: 'Coos', cell2: 25, cell3: '$2.90'},
    {cell1: 'Coos', cell2: 25, cell3: '$2.90'},
    {cell1: 'Cookies', cell2: 25, cell3: '$2.90'},
    {cell1: 'Cookies', cell2: 25, cell3: '$2.90'},
    {cell1: 'Cookies', cell2: 25, cell3: '$2.90'},
    {cell1: 'Coies', cell2: 25, cell3: '$2.90'},
    {cell1: 'Coies', cell2: 25, cell3: '$2.90'},
    {cell1: 'Coies', cell2: 25, cell3: '$3.90'},
    {cell1: 'Coies', cell2: 25, cell3: '$2.90'},
    {cell1: 'Cookies', cell2: 25, cell3: '$2.90'},
    {cell1: 'Cookies', cell2: 25, cell3: '$2.90'},
    {cell1: 'Cookies', cell2: 25, cell3: '$2.90'},
    {cell1: 'Cookies', cell2: 25, cell3: '$2.90'},
    {cell1: 'Cookies', cell2: 25, cell3: '$3.90'},
    {cell1: 'Ckie', cell2: 25, cell3: '$2.90'},
    {cell1: 'Ckie', cell2: 25, cell3: '$2.90'},
    {cell1: 'Ckie', cell2: 25, cell3: '$3.90'},
    {cell1: 'Ckie', cell2: 25, cell3: '$2.90'},
    {cell1: 'Cookies', cell2: 25, cell3: '$2.90'},
    {cell1: 'Cookies', cell2: 25, cell3: '$2.90'},
    {cell1: 'Cookies', cell2: 25, cell3: '$2.90'},
    {cell1: 'Cookies', cell2: 25, cell3: '$2.90'},
    {cell1: 'Cookies', cell2: 25, cell3: '$2.90'},
    {cell1: 'Cookies', cell2: 25, cell3: '$2.90'},
    {cell1: 'Cookies', cell2: 25, cell3: '$2.90'},
    {cell1: 'Cookies', cell2: 25, cell3: '$2.90'},
    {cell1: 'Cookies', cell2: 25, cell3: '$2.90'},
    {cell1: 'ookes', cell2: 25, cell3: '$3.90'},
    {cell1: 'ookes', cell2: 25, cell3: '$2.90'},
    {cell1: 'ookes', cell2: 25, cell3: '$2.90'},
    {cell1: 'ookes', cell2: 25, cell3: '$2.90'},
    {cell1: 'Cookies', cell2: 25, cell3: '$2.90'},
    {cell1: 'Cookies', cell2: 25, cell3: '$2.90'},
    {cell1: 'okis', cell2: 25, cell3: '$3.90'},
    {cell1: 'okis', cell2: 25, cell3: '$2.90'},
    {cell1: 'okis', cell2: 25, cell3: '$2.90'},
    {cell1: 'okis', cell2: 25, cell3: '$3.90'}
];

const Paginator = (items, page, per_page) => {
 
    page = page || 0;
    per_page = per_page || 10;
    let offset = page * per_page,

    paginatedItems = items.slice(offset).slice(0, per_page),
    total_pages = Math.ceil(items.length / per_page);
    return {
    page: page,
    per_page: per_page,
    total: items.length,
    total_pages: total_pages,
    data: paginatedItems
    };
}

const List = (props) => {
    const [dataPaginada, setDataPaginada] = React.useState(Paginator(dataTotal));
    const [allData, setAllData] = React.useState(dataTotal);
    const tableParams = {
        headCells: [],
        formPath: '/form'
    };

    switch(props.table){
        case 1: //usuários
            tableParams.headCells.push('Usuário','Senha','E-mail');
            tableParams.formPath = 'usuarios'+tableParams.formPath;
            break;
        case 2: //legendas
            tableParams.headCells.push('Série','Autor','Número');
            tableParams.formPath = 'legendas'+tableParams.formPath;
            break;
        case 3: //categorias
            tableParams.headCells.push('Categoria','Classificação','Qtd');
            tableParams.formPath = 'categorias'+tableParams.formPath;
            break;
        case 4: //toplegendas
            tableParams.headCells.push('Legenda','Autor','Série');
            tableParams.formPath = 'toplegendas'+tableParams.formPath;
            break;
        default:  
    }

    const handlePageClick = data => {
        let selected = data.selected;
        console.log('pagina selecionada: ', selected);
        let dados = Paginator(allData, selected);
        console.log(dados);
        setDataPaginada(dados);
    };

    return(
        <>
        <HeaderCard>
            <h2>{props.title}</h2>
            <Fab icon="add" type="button" onClick={()=>{props.history.push(tableParams.formPath)}} />
        </HeaderCard>
        <div className="card-border"/>
        <DataTable style={{border:'none'}}>
        <DataTableContent style={{width: '100%'}}>
            <DataTableHead>
            <DataTableRow>
                { tableParams.headCells.map((cell, index) => (
                    <DataTableHeadCell style={{fontSize:'0.8rem',lineHeight:'1.8rem'}} key={index}>{cell}</DataTableHeadCell>
                ))}
                <DataTableHeadCell style={{fontSize:'0.8rem',lineHeight:'1.8rem'}}>Ação</DataTableHeadCell>
            </DataTableRow>
            </DataTableHead>
            <DataTableBody>
                { 
                dataPaginada.data.map((obj, index) => (
                <DataTableRow key={index}>
                    {
                    Object.keys(obj).map((item, i) => (
                        <DataTableCell key={i}>{obj[item]}</DataTableCell>
                    ))
                    }
                    <DataTableCell>
                        <Fab 
                        style={{marginRight: '5px', backgroundColor: 'var(--edit-button)'}}
                        mini 
                        icon="create" 
                        type="button" 
                        onClick={()=>{console.log('EDITANDO');}} />
                        <Fab 
                        style={{backgroundColor: 'var(--delete-button)'}} 
                        mini 
                        icon="delete" 
                        type="button" 
                        onClick={()=>{console.log('DELETANDO');}} />
                    </DataTableCell>
                </DataTableRow>
                ))
                }
            </DataTableBody>
        </DataTableContent>
        </DataTable>
        <ReactPaginate
            previousLabel={<i className="material-icons">keyboard_arrow_left</i>}
            nextLabel={<i className="material-icons">keyboard_arrow_right</i>}
            breakLabel={'...'}
            breakClassName={'break'}
            pageCount={dataPaginada.total_pages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={2}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            activeClassName={'active'}
            />
        </>
    )
};

export default withRouter(List);