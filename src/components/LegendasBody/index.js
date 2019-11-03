import React from "react";
import { baseUrl } from "services/api";
import {LegendasContainer,Ordenar,SelectBusca,Box,Post} from "./styles";
import {Paginacao} from "pages/Front/Paginacao";
import { getRequest } from "services/api";
import { formatDate } from "utils/Utils";

const LegendasBody = (props) => {
  const { entities, setEntities } = props;

  const handlePageClick = page => {
    console.log("page selected", page)
      setEntities({
        page: page
      });
  };

  const addDownload = async (id) => {
    const res = await getRequest(
      `/subtitles/downloaded?id=${id}`
    );
    if(res.success){
      const updatedData = entities.dataPaginada.map((item) => {
        item.downloaded += 1;
        return item;
      });
      setEntities({
        dataPaginada: updatedData
      });
    }
  }

  return(
    <> 
      <LegendasContainer className="card card-shadow">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="header-card">
                <h2>{props.title}</h2>
                <SelectBusca>
                  <Ordenar>
                    <label id="ordernar">Ordernar:</label>
                    <select onChange={(e) => setEntities({order: e.target.value, page: 1})}>
                      <option defaultValue value="todas">Todas</option>
                      <option value="hoje">Hoje</option>
                      <option value="semana">Semana</option>
                      <option value="mes">Mês</option>
                      <option value="semestre">Semestre</option>
                      <option value="ano">Ano</option>
                      <option value="populares">Populares</option>
                    </select>
                  </Ordenar>

                  <input 
                    type="text" 
                    placeholder="Buscar.." 
                    value={entities.search}
                    onChange={(e) => setEntities({search:e.target.value})}
                  />
                </SelectBusca>
              </div>
            </div>
            <div className="card-border" />
            <Box>
              {entities.loading?
                <div style={{ color: 'black' }}>LOADING...</div>
                :
                entities.dataPaginada.length === 0 ? 
                <div style={{ color: 'black' }}>Legenda não encontrada !!!</div> 
                :
                entities.dataPaginada.map((item, key) => {
                  
                  let data = formatDate(item.created_at).substring(0,10);

                  return(
                    <Post 
                      key={key} 
                      lineclamp={item.type === 'SERIE'?1:2} 
                      className="card card-shadow"
                    >
                      <div className="topo-card">
                        <span>{item.type === 'FILME'? item.year
                            :
                            item.episode && `${item.episode.substring(
                              1,
                              item.episode.toLowerCase().indexOf('e')
                            )} TEMPORADA`
                        }
                        </span>
                      </div>
                      <a 
                        href={item.url} 
                        rel="noopener noreferrer" 
                        target="_blank" 
                        title="Fazer Download"
                        onClick={() => addDownload(item.id)}
                      >
                        <div className="card-media">
                          <img
                            src={item.image?`${baseUrl}storage/${item.image}`: "http://via.placeholder.com/160x240"}
                            className="img-fluid"
                            height="240"
                            alt=""
                          />
                        </div>
                        <div className="title-card">
                          <span>{item.name}</span>
                        </div>
                        {item.type === 'SERIE' &&
                          <div className="subtitle-card">
                            <span>{item.episode.toUpperCase()}</span>
                          </div>
                        }
                        <div className="info-card">
                          <span>{`by ${item.author.name} ${data}`}</span>
                        </div>
                      </a>
                    </Post>
                  )
                })
              }
            </Box>
          </div>
        </div>
      </LegendasContainer>
      <Paginacao 
        handle={handlePageClick} 
        page={entities.page} 
        lastPage={entities.lastPage} 
      />
    </>
  )
}

export default LegendasBody;