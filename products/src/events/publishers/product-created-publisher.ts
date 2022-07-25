import { Publisher, Subjects, ProductCreated } from '@apollxx_tcc/common';

export class ProductCreatedPublisher extends Publisher<ProductCreated>{
    subject: Subjects.ProductCreated = Subjects.ProductCreated;
}