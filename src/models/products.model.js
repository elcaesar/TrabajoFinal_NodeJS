import pkg from 'mongoose';
const { Schema, model } = pkg;

const ProductSchema = Schema({
  codigo      : { type: String, required: true},
  nombre      : { type: String, required: true},
  descripcion : { type: String, required: true},
  categoria   : { type: String, required: true},
  imgURL      : { type: String, required: true},
  precio      : { type: Number, required: true},
  stock       : { type: Number, required: true}
},
{
  timestamps: true,
  versionKey: false
})

export default model('Product', ProductSchema);