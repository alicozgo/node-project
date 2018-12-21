"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __importStar(require("mongoose"));
const json_patch_1 = __importDefault(require("json-patch"));
const model_1 = require("../models/model");
const Model = mongoose.model('Model', model_1.ModelSchema);
var ModelControllerModule;
(function (ModelControllerModule) {
    class ModelController {
        createModel(req, res) {
            let newModel = new Model(req.body);
            newModel.save((err, model) => {
                if (err) {
                    res.send(err);
                }
                res.json(model);
            });
        }
        getAllModels(req, res) {
            Model.find((err, models) => {
                if (err) {
                    res.send(err);
                }
                res.json(models);
            });
        }
        getModelById(req, res) {
            Model.findById(req.params.modelId, (err, model) => {
                if (err) {
                    res.send(err);
                }
                res.json(model);
            });
        }
        modifyModel(req, res) {
            var query = Model.findById(req.params.modelId);
            query.then((doc) => {
                // apply the patch from request 
                let patchedModel = new Model(json_patch_1.default.apply(doc, req.body));
                Model.replaceOne(req.params.modelId, patchedModel);
                res.json(patchedModel);
            });
        }
    }
    ModelControllerModule.ModelController = ModelController;
})(ModelControllerModule = exports.ModelControllerModule || (exports.ModelControllerModule = {}));
//# sourceMappingURL=modelController.js.map