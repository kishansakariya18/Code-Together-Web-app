// import mongoose from "mongoose";
import { Document, model, Schema } from "mongoose";
import { v4 as uuid_v4 } from "uuid";
import crypto from "crypto";

export interface UserSchema extends Document {
  _doc: UserSchema;
  authenticate(password: string): Boolean;
  _id: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  has_profile_picture: boolean;
  hashed_password: string;
  salt: string;
  passwordResetToken: string;
  passwordResetTokenExpiry: number;
  createdAt: string;
  updatedAt: string;
}

const userSchema: Schema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema
  .virtual("password")
  .set(function (
    this: { _password: string; salt: string; hashed_password: string },
    password: string
  ) {
    //create temporary variable called _password
    this._password = password;
    // this._password = password;
    //generate  a timestamp
    this.salt = uuid_v4();
    //encryptPassword()
    this.hashed_password = encryptPassword(password, this.salt);
  })
  .get(function (this: { _password: string }) {
    return this._password;
  });

// methods;
userSchema.methods = {
  authenticate: function (this: any, plainText) {
    return encryptPassword(plainText, this.salt) === this.hashed_password;
  },
};

const encryptPassword = (password: string, salt: string) => {
  if (!password) return "";
  try {
    return crypto.createHmac("sha1", salt).update(password).digest("hex");
  } catch (err) {
    return "";
  }
};

export default model<UserSchema>("User", userSchema);
// module.exports = mongoose.model('User', userSchema)