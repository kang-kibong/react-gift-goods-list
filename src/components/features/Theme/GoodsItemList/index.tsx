import React from 'react';
import styled from '@emotion/styled';
import { GoodsItem, Grid, CenteredContainer, StatusHandler } from '@components/common';
import { useParams } from 'react-router-dom';
import { ThemeProductsRequest } from '@/types/requestTypes';
import { ThemeProductsResponse } from '@/types/responseTypes';
import { getThemesProducts } from '@apis/themes';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const GRID_GAP = 14;
const GRID_COLUMNS = 4;
const MAX_RESULTS = 20;

export default function GoodsItemList() {
  const { themeKey } = useParams<{ themeKey: string }>();

  const { isLoading, isError, error, data } = useQuery<ThemeProductsResponse, AxiosError>({
    queryKey: ['themeProduct', themeKey, MAX_RESULTS],
    queryFn: () => getThemesProducts({ themeKey, maxResults: MAX_RESULTS } as ThemeProductsRequest),
  });

  const isEmpty = !data || data?.products.length === 0;

  return (
    <GoodsItemListContainer>
      <CenteredContainer maxWidth="md">
        <StatusHandler isLoading={isLoading} isError={isError} isEmpty={isEmpty} error={error}>
          <Grid gap={GRID_GAP} columns={GRID_COLUMNS}>
            {data?.products.map((product) => (
              <GoodsItem
                key={product.id}
                imageSrc={product.imageURL}
                amount={product.price.basicPrice}
                subtitle={product.brandInfo.name}
                title={product.name}
              />
            ))}
          </Grid>
        </StatusHandler>
      </CenteredContainer>
    </GoodsItemListContainer>
  );
}

const GoodsItemListContainer = styled.section`
  padding-top: 40px;
  padding-bottom: 360px;
`;
