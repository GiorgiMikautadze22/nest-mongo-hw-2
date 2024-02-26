import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Expense {
  @Prop()
  name: string;
  @Prop({ index: true })
  cost: number;
  @Prop()
  createdAt: Date;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);
