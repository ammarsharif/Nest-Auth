import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false, timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  displayName: string;

  @Prop()
  photoURL: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
