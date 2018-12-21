import {Request, Response} from "express";
import { ModelControllerModule } from "../controllers/modelController";

export class Routes {
    public modelController: ModelControllerModule.ModelController = new ModelControllerModule.ModelController();

    public routes(app:any): void {
        app.route('/')
        .get((req: Request, res: Response) => {
            res.render( "app" );
        });
        app.route('/get-models')
        // Model get all
        .get(this.modelController.getAllModels);
        app.route('/model/:modelId')
        // Model get
        .get(this.modelController.getModelById)
        // Model change
        .post(this.modelController.modifyModel);
        // Model create
        app.route('/create-model')
        .post(this.modelController.createModel);
        app.route('/remove-model/:modelId')
        .delete(this.modelController.removeModelById);
    }
}
