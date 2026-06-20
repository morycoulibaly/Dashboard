import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateWidgetDto {
  @IsString()
  @IsNotEmpty()
  serviceName!: string;

  @IsString()
  @IsNotEmpty()
  widgetName!: string;

  @IsOptional()
  config?: Record<string, any>;

  @IsOptional()
  @IsNumber()
  refreshRate?: number;
}
