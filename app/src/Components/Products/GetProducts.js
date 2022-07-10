import React, { Component, useState } from 'react';
import { useQuery } from '@apollo/client';
import { LOAD_PRODUCTS_QUERY } from '../Queries/Queries';
import Product from './Product';

const GetProducts = (props) => {
  const { data, loading, error } = useQuery(LOAD_PRODUCTS_QUERY, {
    variables: { id: props.productId },
  });

  if (loading) {
    return 'Loading...';
  }
  if (error) {
    return 'Error', { error };
  }

  return (
    <Product
      clickFunction={() => props.clickFunction(data.product)}
      selectedCurrency={props.selectedCurrency}
      propsCurrentCurrencyIndex={props.propsCurrentCurrencyIndex}
      productData={data.product}
      propsProductCategory={props.propsProductCategory}
    />
  );
};

export default GetProducts;
