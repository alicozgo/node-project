import * as mongoose from 'mongoose';
import jsonpatch from 'json-patch';
import { ModelSchema } from '../models/model';
import { Request, Response } from 'express';

const Model = mongoose.model('Model', ModelSchema);

export module ModelControllerModule {
    export class ModelController {
        public createModel (req: Request, res: Response) {
            let newModel = new Model(req.body);
            newModel.save((err, model) => {
                if (err) {
                    res.send(err);
                }
                res.json(model);
            });   
        }
        public getAllModels (req: Request, res: Response) {
            Model.find((err, models) => {
                if (err) {
                    res.send(err);
                }
                res.json(models);
            })
        }
        public getModelById (req: Request, res: Response) {
            Model.findById(req.params.modelId, (err, model) => {
                if (err) {
                    res.send(err);
                }
                res.json(model);
            });
        }
        public modifyModel (req: Request, res: Response) {
            var query = Model.findById(req.params.modelId);
            query.then((doc) => {
                // apply the patch from request 
                let patchedModel = new Model(jsonpatch.apply(doc, req.body));
                Model.replaceOne(req.params.modelId, patchedModel);
                res.json(patchedModel);
            });
        }
    }
}
