import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Hidden } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import AppsContainer from '@/@crema/core/AppsContainer';
import { AppState } from '@/redux/store';
import { getEntidades } from '@/redux/actions/Entidad';
import Link from 'next/link';
import ButtonLink from '@/components/ButtonLink';
import EntidadTable from './entidad-table';
import AppsHeader from '../../@crema/core/AppsContainer/AppsHeader';
import AppsContent from '../../@crema/core/AppsContainer/AppsContent';
import AppsPagination from '../../@crema/core/AppsPagination';
import AppAnimate from '../../@crema/core/AppAnimate';
import InfoView from '../../@crema/core/InfoView';

const Entidades = () => {
  const { messages } = useIntl();
  const dispatch = useDispatch();
  const { entidades, entidadCount } = useSelector<
    AppState,
    AppState['entidad']
  >(({ entidad }) => entidad);
  const [page, setPage] = useState<number>(0);
  const [search, setSearchQuery] = useState<string>(``);
  const onPageChange = (
    event: React.ChangeEvent<unknown> | null,
    value: number,
  ) => {
    setPage(value);
  };
  useEffect(() => {
    dispatch(getEntidades());
  }, [dispatch, search, page]);

  const onSearchOrder = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(0);
  };
  return (
    <>
      <AppAnimate animation="transition.slideUpIn" delay={200}>
        <AppsContainer title="Entidades" fullView>
          <AppsHeader>
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              width={1}
              justifyContent="space-between"
            >
              <TextField
                style={{ maxWidth: 150 }}
                margin="dense"
                id="user-name"
                placeholder="Buscar"
                type="search"
                variant="outlined"
                onChange={onSearchOrder}
              />
              <Box display="flex" flexDirection="row" alignItems="center">
                <ButtonLink
                  href="/entidades/add"
                  variant="contained"
                  color="primary"
                >
                  Agregar Entidad
                </ButtonLink>

                <Hidden xsDown>
                  <AppsPagination
                    rowsPerPage={10}
                    count={entidadCount}
                    page={page}
                    onPageChange={onPageChange}
                  />
                </Hidden>
              </Box>
            </Box>
          </AppsHeader>

          <AppsContent
            style={{
              paddingTop: 10,
              paddingBottom: 10,
            }}
          >
            <EntidadTable entidadData={entidades} />
          </AppsContent>

          <Hidden smUp>
            <AppsPagination
              rowsPerPage={10}
              count={entidadCount}
              page={page}
              onPageChange={onPageChange}
            />
          </Hidden>
        </AppsContainer>
      </AppAnimate>
      <InfoView />
    </>
  );
};

export default Entidades;
