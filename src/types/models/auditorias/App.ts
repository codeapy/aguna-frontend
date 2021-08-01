export interface Entidad {
  id: number;
  nombre: string;
}

export interface Auditoria {
  id: number;
  nombre: string;
  fechaInicio: Date;
  fechaFin: Date;
  informe: string;
  informeCreatedAt: Date;
  informeUpdatedAt: Date;
  entidad: Entidad;
}
