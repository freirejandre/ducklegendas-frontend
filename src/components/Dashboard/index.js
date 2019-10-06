import React, { useState, useRef } from "react";
import {
  Header,
  HeaderDashboard,
  Container,
  ContainerDashboard,
  NavLinks,
  Logo,
  Nav,
  MenuLogout
} from "./styles";
import { Avatar } from "@rmwc/avatar";
import { Ripple } from "@rmwc/ripple";
import { NavLink, withRouter } from "react-router-dom";
import {baseUrl, getRequest,decryptLogin} from 'services/api';
import logo from "assets/img/duck-128.png";
import userImg from "assets/img/man.png";
import "@rmwc/avatar/avatar.css";


const dashboardPath = "/dashboard";

const Dashboard = props => {
  const {history} = props;
  const [open, setOpen] = useState(true);
  const refMenu = useRef(null);

  // const decrypt = CryptoJS.AES.decrypt(localStorage.getItem("user"),'senha secreta')
  // console.log("decrypt:",decrypt)
  // const decryptedData = JSON.parse(decrypt.toString(CryptoJS.enc.Utf8));
  // console.log("decrypt data:",decryptedData)
  const [data,setData] = useState(decryptLogin());

  async function logout(e) {
    e.preventDefault();
    
    //const res = await api.post('/logout')
    const res = await getRequest('/logout');
    if(res.success){
      console.log(res.success);

      localStorage.clear();

      history.push('/painel');
    }else if(res.error){
      console.log('Problema no logout: ',res.error);
      localStorage.clear();
    }
    
  }

  function handlerMenuLateral() {
    setOpen(!open);

    if (open) refMenu.current.style = "margin-left: -220px";
    else refMenu.current.style = "margin-left: 0";
  }
  return (
    <Container>
      <Header ref={refMenu}>
        <Nav>
          <NavLinks>
            <Logo>
              <img alt="img logo" src={logo} />
            </Logo>
            <li>
              <NavLink
                activeClassName="is-active"
                exact
                to={dashboardPath}
                alt="Home"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                activeClassName="is-active"
                to={`${dashboardPath}/rankings`}
                alt="Ranking"
              >
                Ranking
              </NavLink>
            </li>

            <li>
              <NavLink
                activeClassName="is-active"
                to={`${dashboardPath}/subtitles`}
                alt="Legendas"
              >
                Legendas
              </NavLink>
            </li>
            <li>
              <NavLink
                activeClassName="is-active"
                to={`${dashboardPath}/progress`}
                alt="Legendas em andamento"
              >
                Em andamento
              </NavLink>
            </li>

            <li>
              <NavLink
                activeClassName="is-active"
                to={`${dashboardPath}/categories`}
                alt="Categorias"
              >
                Categorias
              </NavLink>
            </li>
            <li>
              <NavLink
                activeClassName="is-active"
                to={`${dashboardPath}/gallery`}
                alt="Galeria"
              >
                Galeria
              </NavLink>
            </li>
            <li>
              <NavLink
                activeClassName="is-active"
                to={`${dashboardPath}/users`}
                alt="Usuarios"
              >
                Usuários
              </NavLink>
            </li>
          </NavLinks>
          <MenuLogout onClick={e => logout(e)}>Sair</MenuLogout>
        </Nav>
      </Header>

      <Container style={{ height: "100%", flexWrap: "wrap" }}>
        <HeaderDashboard
          title={props.title}
          navigationIcon={{ onClick: () => handlerMenuLateral() }}
          actionItems={[
            {
              icon: "notifications",
              onClick: () => console.log("Do Something")
            }
          ]}
          endContent={
            <Ripple onClick={()=> props.history.push({
                pathname: `/dashboard/users/user/${data.user.id}`,
                state: { item: data.user , islogin : true }
              })}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "200px",
                  height: "100%",
                  cursor: "pointer",
                  marginLeft: ".8rem",
                  borderLeft: "1px solid rgba(255,255,255,0.1)",
                  padding: "0 1.3rem"
                }}
              >
                <span style={{ fontSize: ".9rem",paddingLeft:'.5rem' }}>{data.user.name}</span>
                <Avatar
                style={{height:'48px'}}
                  src={data.user.image? baseUrl+data.user.image: false || userImg}
                  size="xlarge"
                  name="Tony Stark"
                />
              </div>
            </Ripple>
          }
        />

        <ContainerDashboard>
          <div className="card card-shadow">{props.children}</div>
        </ContainerDashboard>
      </Container>
    </Container>
  );
};

export default withRouter(Dashboard);