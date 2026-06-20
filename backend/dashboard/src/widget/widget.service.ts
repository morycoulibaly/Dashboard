import { Injectable } from '@nestjs/common';
import { CreateWidgetDto } from './dto/create-widget.dto';
import { UpdateWidgetDto } from './dto/update-widget.dto';
import { Widget } from './schemas/widget.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class WidgetService {
  constructor(@InjectModel(Widget.name) private widgetModel: Model<Widget>) {}

  create(createWidgetDto: CreateWidgetDto, userId: string) {
    const widget = new this.widgetModel({
      ...createWidgetDto,
      user_id: userId,
    });
    return widget.save();
  }

  findAll(userId: string) {
    return this.widgetModel.find({ user_id: userId });
  }

  findOne(id: string, userId: string) {
    return this.widgetModel.findOne({ _id: id, user_id: userId });
  }

  update(id: string, updateWidgetDto: UpdateWidgetDto, userId: string) {
    return this.widgetModel.findOneAndUpdate(
      { _id: id, user_id: userId },
      updateWidgetDto,
      { new: true },
    );
  }

  remove(id: string, userId: string) {
    return this.widgetModel.findOneAndDelete({ _id: id, user_id: userId });
  }
}
