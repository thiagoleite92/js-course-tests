import { screen, render } from '@testing-library/react';
import ProductList from '../pages';

describe('ProductList', () => {
  it('should render Product List', () => {
    render(<ProductList />);

    expect(screen.getByTestId('product-list')).toBeInTheDocument();
  });
});
