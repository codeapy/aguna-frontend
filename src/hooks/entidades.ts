import { gql, QueryResult, useMutation, useQuery } from '@apollo/client';
import { Entidad } from '@/types/models/auditorias/App';
import { useRequestLoader } from '@/hooks/utility';
import { QueryHookOptions } from '@apollo/client/react/types/types';

const GET_ENTIDADES = gql`
  query GetEntidades {
    entidades {
      id
      nombre
    }
  }
`;
const GET_ENTIDAD = gql`
  query GetEntidad($id: Int!) {
    entidad(input: { id: $id }) {
      id
      nombre
    }
  }
`;

const CREATE_ENTIDAD = gql`
  mutation CreateEntidad($nombre: String!) {
    createEntidad(input: { nombre: $nombre }) {
      id
      nombre
    }
  }
`;

const UPDATE_ENTIDAD = gql`
  mutation UpdateEntidad($id: Int!, $nombre: String!) {
    updateEntidad(input: { id: $id, nombre: $nombre }) {
      id
      nombre
    }
  }
`;

const emptyList: any[] = [];

export function useEntidades(): Omit<QueryResult, 'data'> & {
  data: Entidad[];
} {
  const query = useQuery<{ entidades: Entidad[] }>(GET_ENTIDADES);
  const { data, loading, error } = query;
  useRequestLoader(loading, error);

  const parsedData: Entidad[] = data?.entidades ?? emptyList;

  return { ...query, data: parsedData };
}
export function useEntidad(options?: QueryHookOptions): Omit<
  QueryResult,
  'data'
> & {
  data?: Entidad;
} {
  const query = useQuery<{ entidad: Entidad }>(GET_ENTIDAD, options);
  const { data, loading, error } = query;
  useRequestLoader(loading, error);

  return { ...query, data: data?.entidad };
}

export function useCreateEntidadMutation() {
  const [mutate, result] = useMutation<{ createEntidad: Entidad }>(
    CREATE_ENTIDAD,
    {
      update: (cache, mutationResult) => {
        const newEntidad = mutationResult.data?.createEntidad;
        const data =
          cache.readQuery<{ entidades: Entidad[] }>({
            query: GET_ENTIDADES,
          })?.entidades ?? [];

        cache.writeQuery({
          query: GET_ENTIDADES,
          data: { entidades: [...data, newEntidad] },
        });
      },
    },
  );
  const { loading, error } = result;
  useRequestLoader(loading, error);
  return [mutate];
}

export function useUpdateEntidadMutation() {
  const [mutate, result] = useMutation<{ updateEntidad: Entidad }>(
    UPDATE_ENTIDAD,
    {
      update: (cache, mutationResult) => {
        const newEntidad = mutationResult.data?.updateEntidad;
        const data =
          cache.readQuery<{ entidades: Entidad[] }>({
            query: GET_ENTIDADES,
          })?.entidades ?? [];

        cache.writeQuery({
          query: GET_ENTIDADES,
          data: {
            entidades: data.map((e) => {
              if (e.id === newEntidad?.id) return newEntidad;
              return e;
            }),
          },
        });
      },
    },
  );
  const { loading, error } = result;
  useRequestLoader(loading, error);
  return [mutate];
}

export function useUpsertEntidadMutation({ isEdit = false } = {}) {
  const [createMutation] = useCreateEntidadMutation();
  const [updateMutation] = useUpdateEntidadMutation();
  return isEdit ? [updateMutation] : [createMutation];
}
