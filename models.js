const mongoose = require("mongoose");
// Attribute model
const AttributeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 3,
      max: 20,
      unique: true,
    },
    dataType: {
      type: String,
      required: true,
    },
    isPrimaryKey: {
      type: Boolean,
      default: false,
    },
    isMultiValued: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Attribute = mongoose.model("Attribute", AttributeSchema);

// Entity model
const EntitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 3,
      max: 50,
    },
    attributes: {
      type: [AttributeSchema],
      required: true,
    },
  },
  { timestamps: true }
);

const Entity = mongoose.model("Entity", EntitySchema);

// Relationship model
const RelationshipSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 3,
      max: 50,
    },
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Entity",
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Entity",
    },
    // type should be one of the following: one-to-one, one-to-many, many-to-one, many-to-many

    type: {
      type: String,
      required: true,
    },
    attributes: {
      type: [AttributeSchema],
      required: false,
    },
  });

const Relationship = mongoose.model("Relationship", RelationshipSchema);

// ER Diagram model

const erDiagramSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default : "Untitled ERD",
    min: 3,
    max: 50,
  },
  entities: [EntitySchema],
  relationships: [RelationshipSchema],
});


const ErDiagram = mongoose.model('ErDiagram', erDiagramSchema);

module.exports = { Attribute, Entity, ErDiagram, Relationship };