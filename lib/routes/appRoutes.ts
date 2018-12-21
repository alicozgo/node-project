import {Request, Response} from "express";
import { ModelControllerModule } from "../controllers/modelController";

export class Routes {
    public modelController: ModelControllerModule.ModelController = new ModelControllerModule.ModelController();

    public routes(app:any): void {
        // Model get all for the landing page 
        app.route('/')
        .get(this.modelController.getAllModels);
        app.route('/model/:modelId')
        // Model get
        .get(this.modelController.getModelById)
        // Model change
        .post(this.modelController.modifyModel);
        // Model create
        app.route('/create-model')
        .post(this.modelController.createModel);
    }
}
