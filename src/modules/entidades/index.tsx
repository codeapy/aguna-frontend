import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { Hidden } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import AppsContainer from '@/@crema/core/AppsContainer';
import ButtonLink from '@/components/ButtonLink';
import { useEntidades } from '@/hooks/entidades';
import EntidadTable from './entidad-table';
import AppsHeader from '../../@crema/core/AppsContainer/AppsHeader';
import AppsContent from '../../@crema/core/AppsContainer/AppsContent';
import AppsPagination from '../../@crema/core/AppsPagination';
import AppAnimate from '../../@crema/core/AppAnimate';
import InfoView from '../../@crema/core/InfoView';

const Entidades = () => {
  const { messages } = useIntl();
  const [page, setPage] = useState<number>(0);
  const [search, setSearchQuery] = useState<string>(``);

  const { data } = useEntidades();

  const onPageChange = (
    event: React.ChangeEvent<unknown> | null,
    value: number,
  ) => {
    setPage(value);
  };

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
                    count={data.length}
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
            <EntidadTable entidadData={data} />
          </AppsContent>

          <Hidden smUp>
            <AppsPagination
              rowsPerPage={data.length}
              count={data.length}
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
