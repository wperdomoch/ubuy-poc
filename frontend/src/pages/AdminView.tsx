import React from "react";
import "../styles/App.css";
import {Container} from "react-bootstrap"
import { Row, Col ,Button ,
  FormGroup as Group,
	FormControl as Input,
	FormLabel as Label } from "react-bootstrap";
import  {User} from "../../../backend/src/model/user.model";
import PageContent from "../PageContent";
import axios from "axios";

export default class AdminView extends React.Component

 {
	render() {
		return (
			<div >
  <div >
    <div >
      <div>
        <h5 >Account Info</h5>
        <p >For Admin only ,edit/add/delete accounts and products</p>
        <a href="/accountm" >Admin</a>
      </div>
    </div>
  </div>
  <div >
    <div >
      <div >
        <h5 >Branch Info</h5>
        <p >Products management </p>
        <a href="/brm" >Branch</a>
      </div>
    </div>
  </div>
</div>
		);
	}
}
