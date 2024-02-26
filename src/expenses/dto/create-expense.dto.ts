import { IsInt, IsString } from 'class-validator';

export class CreateExpenseDto {
  @IsString()
  name: string;
  @IsInt()
  cost: number;
  @IsString()
  createdAt: string;
}
