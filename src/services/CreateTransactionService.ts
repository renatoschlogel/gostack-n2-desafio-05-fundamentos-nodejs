import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: Request): Transaction {
    if (type === 'outcome') {
      this.validarSaldoDisponivel(value);
    }

    const transaction = this.transactionsRepository.create({
      title,
      type,
      value,
    });

    return transaction;
  }

  private validarSaldoDisponivel(value: number): void {
    if (value > this.transactionsRepository.getBalance().total) {
      throw Error('This Appointment is already booked');
    }
  }
}

export default CreateTransactionService;
