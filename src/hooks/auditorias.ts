import { gql, QueryResult, useMutation, useQuery } from '@apollo/client';
import { Auditoria } from '@/types/models/auditorias/App';
import { useRequestLoader } from '@/hooks/utility';
import { QueryHookOptions } from '@apollo/client/react/types/types';

const GET_AUDITORIAS = gql`
  query GetAuditorias {
    auditorias {
      id
      nombre
      entidad {
        id
        nombre
      }
    }
  }
`;
const GET_AUDITORIA = gql`
  query GetAuditorias($id: Int!) {
    auditoria(input: { id: $id }) {
      id
      nombre
      entidad {
        id
        nombre
      }
    }
  }
`;

const CREATE_AUDITORIA = gql`
  mutation CreateAuditoria($nombre: String!, $entidadId: Int!) {
    createAuditoria(input: { nombre: $nombre, entidadId: $entidadId }) {
      id
      nombre
      entidad {
        id
        nombre
      }
    }
  }
`;

const UPDATE_AUDITORIA = gql`
  mutation UpdateAuditoria($id: Int!, $nombre: String!, $entidadId: Int!) {
    updateAuditoria(
      input: { id: $id, nombre: $nombre, entidadId: $entidadId }
    ) {
      id
      nombre
      entidad {
        id
        nombre
      }
    }
  }
`;

type QueryAuditorias = {
  auditorias: Auditoria[];
};

type CreateAuditoria = {
  createAuditoria: Auditoria;
};

type UpdateAuditoria = {
  updateAuditoria: Auditoria;
};

const emptyList: any[] = [];

export function useAuditorias(): Omit<QueryResult, 'data'> & {
  data: Auditoria[];
} {
  const query = useQuery<QueryAuditorias>(GET_AUDITORIAS);
  const { data, loading, error } = query;
  useRequestLoader(loading, error);

  const parsedData: Auditoria[] = data?.auditorias ?? emptyList;

  return { ...query, data: parsedData };
}
export function useAuditoria(options?: QueryHookOptions): Omit<
  QueryResult,
  'data'
> & {
  data?: Auditoria;
} {
  const query = useQuery<{ auditoria: Auditoria }>(GET_AUDITORIA, options);
  const { data, loading, error } = query;
  useRequestLoader(loading, error);

  return { ...query, data: data?.auditoria };
}

export function useCreateAuditoriaMutation() {
  const [mutate, result] = useMutation<CreateAuditoria>(CREATE_AUDITORIA, {
    update: (cache, mutationResult) => {
      const newEntidad = mutationResult.data?.createAuditoria;
      const data =
        cache.readQuery<QueryAuditorias>({
          query: GET_AUDITORIAS,
        })?.auditorias ?? [];

      cache.writeQuery({
        query: GET_AUDITORIAS,
        data: { auditorias: [...data, newEntidad] },
      });
    },
  });
  const { loading, error } = result;
  useRequestLoader(loading, error);
  return [mutate];
}

export function useUpdateAuditoriaMutation() {
  const [mutate, result] = useMutation<UpdateAuditoria>(UPDATE_AUDITORIA, {
    update: (cache, mutationResult) => {
      const newEntidad = mutationResult.data?.updateAuditoria;
      const data =
        cache.readQuery<QueryAuditorias>({
          query: GET_AUDITORIAS,
        })?.auditorias ?? [];

      cache.writeQuery({
        query: GET_AUDITORIAS,
        data: {
          auditorias: data.map((e) => {
            if (e.id === newEntidad?.id) return newEntidad;
            return e;
          }),
        },
      });
    },
  });
  const { loading, error } = result;
  useRequestLoader(loading, error);
  return [mutate];
}

export function useUpsertAuditoriaMutation({ isEdit = false } = {}) {
  const [createMutation] = useCreateAuditoriaMutation();
  const [updateMutation] = useUpdateAuditoriaMutation();
  return isEdit ? [updateMutation] : [createMutation];
}
