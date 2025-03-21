import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema({ _id: false, timestamps: true })
export class User {
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

export interface RequestWithUser {
  user: UserDocument;
}
