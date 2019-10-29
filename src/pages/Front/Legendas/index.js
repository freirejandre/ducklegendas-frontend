import React, {useEffect, useReducer} from "react";
import { getRequest, baseUrl } from "services/api";
import {LegendasContainer,Ordenar,SelectBusca,Box,Post} from "./styles";
import {Paginacao} from "../Paginacao";

const Legendas = (props) => {
  const [entities, setEntities] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      page: 1, // PÁGINA SELECIONADA NO COMPONENTE DE PAGINAÇÃO DO FRONT
      dataPaginada: [], // DADOS VINDOS DO BACK PAGINADOS DE 12 EM 12
      loading: true,
      search: "", // PESQUISA
      lastPage: 1 // ÚLTIMA PÁGINA PARA BLOQUEAR BOTÃO PRÓXIMO
    }
  );
  let type = window.location.pathname.replace('/','');

  switch(type){
    case 'series':
      type = 'SERIE';
      break;
    case 'filmes':
      type = 'FILME';
      break;
    default:
      type = "";
  }

  useEffect(() => {
    async function getItens() {
      const res = await getRequest(
        `/subtitles/list?page=${entities.page}&search=${entities.search}&type=${type}`
      );
      console.log('RES FRONT: ', res);
      if(res.success){
        setEntities({
          dataPaginada: res.success.data,
          lastPage: Math.ceil(res.success.total/12),
          loading: false
        });
      }
    }
    getItens();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[entities.page, entities.search]);
  const handlePageClick = data => {
    console.log("data selected", data)
      setEntities({
        page: data
      });
  };
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
                    <select>
                      <option defaultValue>Selecione</option>
                      <option value="series">Series</option>
                      <option value="filmes">Filmes</option>
                     
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
                  let data = new Date(item.created_at)
                  data = data.getDate().toString().padStart(2, '0')
                    +'/'+(data.getMonth()+1).toString().padStart(2, '0')
                    +'/'+data.getFullYear();

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
                      <a href={item.url} rel="noopener noreferrer" target="_blank" title="Fazer Download">
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
              
               {/* <Post className="card card-shadow">
                  <div className="topo-card">
                    <span>2 TEMPORADA</span>
                  </div>
                  <a href="{null}" title="Fazer Download">
                    <div className="card-media">
                      <img
                        src="http://via.placeholder.com/160x240"
                        className="img-fluid"
                        height="240"
                        alt=""
                      />
                    </div>
                    <div className="title-card">
                      <span>Supernatural</span>
                    </div>
                    <div className="subtitle-card">
                      <span>S10E21</span>
                    </div>
                    <div className="info-card">
                      <span>by Admin 6 april, 2019</span>
                    </div>
                  </a>
              </Post>
               */}
            
            
             
              
             
             
             
              
      
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

export default Legendas;