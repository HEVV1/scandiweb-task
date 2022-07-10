import React, { Component, useState } from 'react';
import { useQuery } from '@apollo/client'
import { LOAD_CATEGORIES_QUERY } from '../../Queries/Queries';
import Categories from './Categories';

export const GetCategories = (props) => {
  const { loading, error, data } = useQuery(LOAD_CATEGORIES_QUERY);

  if (loading) {
    return 'Loading...';
  }
  if (error) {
    return 'Error', { error };
  }

  return (
    <ul>
      {data?.categories?.map((val, index) => (
        <Categories functionProductCategory={(e) => props.functionProductCategory(e, val.name)} key={val + '_' + index} propsCategoryName={val.name}></Categories>
      ))}
    </ul>
  );
}