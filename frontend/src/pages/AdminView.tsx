import React from "react";
import "../styles/App.css";

export default class AdminView extends React.Component

 {
	render() {
		return (
			<div >
  <div >
    <div >
      <div>
        <h5 >Account Info</h5>
        <p >For Admin only ,edit/add/delete accounts</p>
        <a href="/viewallaccount" >Admin</a>
      </div>
    </div>
  </div>
  <div >
    <div >
      <div >
        <h5 >Branch Info</h5>
        <p >Products management </p>
        <a href="/viewallaccountseller" >Branch</a>
      </div>
    </div>
  </div>
</div>
		);
	}
}
