"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modelController_1 = require("../controllers/modelController");
class Routes {
    constructor() {
        this.modelController = new modelController_1.ModelControllerModule.ModelController();
    }
    routes(app) {
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
exports.Routes = Routes;
//# sourceMappingURL=appRoutes.js.map