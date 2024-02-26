import { Injectable, OnModuleInit, Query } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Expense } from './schemas/expense.schemas';
import { Model } from 'mongoose';
import { fa, faker } from '@faker-js/faker';
import { QueryDto } from './dto/query.dto';
import { costFilterDto } from './dto/costFilter.dto';

@Injectable()
export class ExpensesService implements OnModuleInit {
  async onModuleInit() {
    const count = await this.expenseModel.countDocuments();
    if (count === 0) {
      const expenses = [];
      for (let i = 0; i < 10_000; i++) {
        const expense: Expense = {
          name: faker.commerce.productName(),
          cost: faker.number.int({ max: 10_000, min: 1 }),
          createdAt: faker.date.past(),
        };
        expenses.push(expense);
      }
      this.expenseModel.insertMany(expenses);
    }
  }
  constructor(
    @InjectModel(Expense.name) private expenseModel: Model<Expense>,
  ) {}
  create(createExpenseDto: CreateExpenseDto) {
    return 'This action adds a new expense';
  }

  findAll(queruParams: QueryDto) {
    const page = queruParams.page ? parseInt(queruParams.page) : 1;
    const limit = queruParams.page ? parseInt(queruParams.limit) : 10;

    return this.expenseModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit);
  }

  findFilteredExpenses(queruParams: costFilterDto) {
    const greaterThen = queruParams.greaterThen
      ? parseInt(queruParams.greaterThen)
      : 0;
    const lessThen = queruParams.lessThen
      ? parseInt(queruParams.lessThen)
      : 10_000;
    return this.expenseModel
      .find({
        cost: { $gt: greaterThen, $lt: lessThen },
      })
      .explain();
  }

  findOne(id: number) {
    return `This action returns a #${id} expense`;
  }

  update(id: number, updateExpenseDto: UpdateExpenseDto) {
    return `This action updates a #${id} expense`;
  }

  remove(id: number) {
    return `This action removes a #${id} expense`;
  }
}
