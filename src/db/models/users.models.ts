// User model definition
import mongoose, { Schema, Document } from 'mongoose';

// Define the User interface
export interface UserModel extends Document {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  // Optional fields
  createdAt?: Date;
  updatedAt?: Date;
}
// Define the User schema   
const userSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

// Create the User model
const User = mongoose.models.Users || mongoose.model<UserModel>('Users', userSchema);

// Export the User model
export default User;

