import pkg from 'mongoose';
const { Schema, model } = pkg;
import bcrypt from 'bcrypt';

const UserSchema = Schema({
  email: {type: String, required: true, unique:true},
  password: {type: String, required: true},
  avatar: {type: String, required: true},
  nombre:{type: String, required: true},
  direccion: {type: String, required: true},
  edad: {type: Number},
  telefono:{type: String, required: true},
  isAdmin: {type: Boolean, required: true, default: 'false'}
},
{
  timestamps: true,
  versionKey: false
});
/*
UserSchema.pre(
  'save',
  async function(next){
    const user = this;
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  }
);
*/
UserSchema.statics.encryptPassword = async(password) => {
  const salt = bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

UserSchema.statics.comparePassword = async(password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword)
};

/*
UserSchema.methods.isValidPassword = async function(password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
}
*/
export default model('User' , UserSchema);