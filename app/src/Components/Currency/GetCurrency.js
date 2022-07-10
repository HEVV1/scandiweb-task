import React, { Component, useState } from 'react';
import { useQuery } from '@apollo/client';
import { LOAD_CURRENCY_QUERY } from '../Queries/Queries';
import Currency from './Currency';

export const GetCurrency = (props) => {
  const { loading, error, data } = useQuery(LOAD_CURRENCY_QUERY);

  if (loading) {
    return 'Loading...';
  }
  if (error) {
    return 'Error', { error };
  }
  
  return (
    <nav>
      <ul>
        {data?.currencies?.map((val, index) => (
          <Currency
            clickme={() => props.propsfunctionSelectCurrency(val.symbol, index)}
            key={index}
            symbol={val.symbol}
            label={val.label}
          />
        ))}
      </ul>
    </nav>
  );
};
