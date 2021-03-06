import { Express } from "express";
import { customerAuth } from "../middlewear/auth-middlewear";
import CartController from "../controllers/cart";

export const CartRoute = (app: Express, controller: CartController) => {
	app.get("/cart", customerAuth, controller.getCart);
	app.put("/cart/:itemId", customerAuth, controller.putItem);
	app.delete("/cart/remove/:itemId", customerAuth, controller.deleteItem);
	app.delete("/cart/empty", customerAuth, controller.emptyCart);
};
