"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __importStar(require("mongoose"));
const Schema = mongoose.Schema;
exports.AttributeSchema = new Schema({
    name: String,
    type: String
});
exports.EntitySchema = new Schema({
    name: String,
    attributes: [exports.AttributeSchema]
});
exports.AssociationSchema = new Schema({
    name: String,
    source: Object,
    target: Object
});
exports.ModelSchema = new Schema({
    name: {
        type: String,
        required: 'Enter a name'
    },
    entities: [exports.EntitySchema],
    associations: [exports.AssociationSchema]
});
//# sourceMappingURL=model.js.map