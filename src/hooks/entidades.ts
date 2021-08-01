import { gql, QueryResult, useMutation, useQuery } from '@apollo/client';
import { Entidad } from '@/types/models/entidades/EntidadApp';
import { useRequestLoader } from '@/hooks/utility';

const GET_ENTIDADES_QUERY = gql`
  query GetEntidades {
    entidades {
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

const emptyList: any[] = [];

export function useEntidades(): Omit<QueryResult, 'data'> & {
  data: Entidad[];
} {
  const query = useQuery<{ entidades: Entidad[] }>(GET_ENTIDADES_QUERY);
  const { data, loading, error } = query;
  useRequestLoader(loading, error);

  const parsedData: Entidad[] = data?.entidades ?? emptyList;

  return { ...query, data: parsedData };
}

export function useUpsertEntidadMutation() {
  const [mutate, result] = useMutation<{ createEntidad: Entidad }>(
    CREATE_ENTIDAD,
    {
      update: (cache, mutationResult) => {
        const newEntidad = mutationResult.data?.createEntidad;
        const data =
          cache.readQuery<{ entidades: Entidad[] }>({
            query: GET_ENTIDADES_QUERY,
          })?.entidades ?? [];

        cache.writeQuery({
          query: GET_ENTIDADES_QUERY,
          data: { entidades: [...data, newEntidad] },
        });
      },
    },
  );
  const { loading, error } = result;
  useRequestLoader(loading, error);
  return [mutate];
}
