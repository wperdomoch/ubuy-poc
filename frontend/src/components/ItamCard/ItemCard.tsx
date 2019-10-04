import React from "react";
import "../../styles/App.css";
import "./styles/ItemCard.css"
import {  Card, Button } from "react-bootstrap";
import {Link} from "react-router-dom";

export interface ItemProp {
	item: {
		name: string;
		price: string;
		desc: string;
		img: string;
	};
}

export default class ItemCard extends React.Component<ItemProp, {}> {
	render() {
		return (
			<Card className="card">
					<Card.Img
						variant="top"
						src={`./images/placeholder_assets/${this.props.item.img}`}
					/>
					<Card.Body>
						<Link to="item/view" className="link">
							<Card.Title>{this.props.item.name}</Card.Title>
							<Card.Subtitle>${this.props.item.price}</Card.Subtitle>
							<Card.Text>{this.props.item.desc}</Card.Text>
						</Link>
					</Card.Body>
					<Button className="button-card" variant="info">
						Add to cart
					</Button>
			</Card>
		);
	}
}
