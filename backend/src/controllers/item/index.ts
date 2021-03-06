import { Request, Response } from "express";
import ItemModel from "../../model/item.model";
import { MongoError } from "mongodb";
import responseBuilder, { ApiCode } from "../../common/response-builder";
import handleMongoError from "../../common/mongo-errors";

export default class ItemController {
	constructor() {}

	public handleCreate(req: Request, res: Response) {
		const body = req.body;
		const newItemRequest = new ItemModel({
			name: body.name,
			description: body.description,
			photo: body.photo,
			quantity: body.quantity,
			branch: body.branch,
			price: body.price
		} as any);

		newItemRequest.save((err: MongoError) => {
			if (err) {
				handleMongoError(err, res);
			} else {
				responseBuilder.buildSuccess(res, "Successfully added item");
			}
		});
	}

	public async handleReadSingle(req: Request, res: Response) {
		try {
			const item = await ItemModel.findOne({
				_id: req.params.itemId
			});
			responseBuilder.buildSuccess(res, item);
		} catch (err) {
			responseBuilder.buildAPIError(res, ApiCode.MongoNotFound);
		}
	}

	public async handleReadAll(req: Request, res: Response) {
		const allItems = await ItemModel.find({}).lean();
		responseBuilder.buildSuccess(res, allItems);
	}

	public async handleUpdate(req: Request, res: Response) {
		try {
			const id = req.params.itemId;
			const response: {
				n: number;
				nModified: number;
				ok: number;
			} = await ItemModel.update({ _id: id }, req.body);

			responseBuilder.buildSuccess(res, {
				msg: `Successfully updated item with id: ${id}`,
				updatedStats: response
			});
		} catch (err) {
			responseBuilder.buildAPIError(res, ApiCode.MongoNotFound);
		}
	}

	public async handleDestroy(req: Request, res: Response) {
		try {
			const id = req.params.itemId;
			const response: {
				n?: number;
				deletedCount?: number;
				ok?: number;
			} = await ItemModel.deleteOne({ _id: id }, req.body);

			responseBuilder.buildSuccess(res, {
				msg: `Successfully deleted item with id: ${id}`,
				deletedStats: response
			});
		} catch (err) {
			responseBuilder.buildAPIError(res, ApiCode.MongoNotFound);
		}
	}

	public async handleSearch(req: Request, res: Response) {
		try {
			const queryString = req.body.query;
			const response = await ItemModel.find({
				name: { $regex: `${queryString}`, $options: "i" }
			});
			responseBuilder.buildSuccess(res, response);
		} catch (err) {
			responseBuilder.buildAPIError(res, ApiCode.MongoNotFound);
		}
	}
}
