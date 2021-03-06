import React from "react";
import { Card } from "semantic-ui-react";
import { ProductCard, EmptyProduct } from "components";

const ProductGrid = ({ products }) => {
  if (products && products.length < 1) {
    return <EmptyProduct />;
  } else {
    return (
      <Card.Group itemsPerRow={6}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Card.Group>
    );
  }
};

export default ProductGrid;
