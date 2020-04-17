import { format, startOfYear } from 'date-fns';
import { Raw } from 'typeorm';
import { Invoice } from '../entities/Invoice.entity';

export async function getInvoiceNumber() {
  const invoice = await Invoice.find({
    select: ['invoiceNumber'],
    where: {
      invoiceDate: Raw(
        (alias) =>
          `${alias} >= date("${format(
            startOfYear(new Date()),
            'yyyy-MM-dd',
          )}")`,
      ),
    },
    order: {
      invoiceNumber: 'DESC',
    },
    take: 1,
  });
  return invoice[0].invoiceNumber;
}
