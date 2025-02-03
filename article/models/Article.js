
import { Schema, model } from 'mongoose';
import { genSalt, hash, compare } from 'bcrypt';

const articleScema = new Schema(
  {
title:{
  type:String,
  required:true
},
content:{
  type:String,
  required:true
}
  },
  { timestamps: true },
);


export const Article = model('Article', articleScema);