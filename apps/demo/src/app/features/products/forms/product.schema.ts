import { ProductFormModel } from '@/features/products/models';
import { required, schema } from '@angular/forms/signals';

export default schema<ProductFormModel>(path => {
  required(path.name, { message: 'Name is required' });
  required(path.productType, { message: 'Product type is required' });
  required(path.genderId, { message: 'Gender is required' });
  required(path.price, { message: 'Price is required' });
});
