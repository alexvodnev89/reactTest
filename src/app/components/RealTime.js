import React from "react";
import { browserHistory } from "react-router"

import Request from "superagent";
import _ from "lodash"

export class RealTime extends React.Component {

  constructor(){
    super();
    this.state = {};
  }

  componentWillMount(){
    this.getBusDetails();
  }


  updateBusResults(){
    this.getBusDetails(this.refs.userStopInput.value);
  }

  getBusDetails(userStopInput = "1712"){
    var url=`https://data.dublinked.ie/cgi-bin/rtpi/realtimebusinformation?stopid=${userStopInput}&format=json`;
    Request.get(url).then((response) => {
      this.setState({
        dbResults: response.body.results
      });
    });
  }


  render(){
    var busResults = _.map(this.state.dbResults, (result) => {
      return <li key={result.arrivaldatetime}>{"Bus No : " + result.route + " Full expected time : " + result.arrivaldatetime + " DUE in " + result.duetime + " min"}</li>;
    });

    return(
      <div className="orangeColor">
        <h3>Real time Page</h3>
          <div>
            <input ref="userStopInput" type="text" onChange={(e) => {this.updateBusResults();}}/>
          </div>
            <div>
              <ul className="apiUl">{busResults}</ul>
            </div>
          <hr/>

      </div>
    );
  }
}
