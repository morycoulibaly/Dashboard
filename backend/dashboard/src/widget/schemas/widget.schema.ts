import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<Widget>;

@Schema({ timestamps: true })
export class Widget {
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  user_id!: Types.ObjectId;

  @Prop({ required: true })
  serviceName!: string;

  @Prop({ required: true })
  widgetName!: string;

  @Prop({ type: Object })
  config?: Record<string, any>;

  @Prop({ default: 60 })
  refreshRate?: number;
}

export const WidgetSchema = SchemaFactory.createForClass(Widget);
