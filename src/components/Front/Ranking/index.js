import React from "react";
import {Ranking} from "./styles";


export default (props) => (
<Ranking className="card card-shadow">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="header-card">
            <h2>{props.title}</h2>
          </div>
        </div>
        <div className="card-border" />
       
      </div>
    </div>
  </Ranking>
)