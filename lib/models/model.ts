import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const AttributeSchema = new Schema({
    name: String,
    type: String
})

export const EntitySchema = new Schema({
    name: String,
    attributes: [AttributeSchema]
})

export const AssociationSchema = new Schema({
    name: String,
    source: Object,
    target: Object
})

export const ModelSchema = new Schema({
    name: {
        type: String
    },
    entities: [EntitySchema], 
    associations: [AssociationSchema]
})
