export interface UserInfo{
    nombre: string;
    tipoDocumento?: string;
    dni: string;
    correo?: string;
    celular?: string;
    perfiles?: string;
    razonSocial?: string;
    ruc?: string;
}

export interface AccountInfo {
    numeroCuenta: string;
    cci: string;
    saldoDisponible: number;
    saldoRetenido: number;
    moneda: 'SOLES' | 'DÓLARES';
    estado: 'PENDIENTE' | 'ACTIVO' | 'RECHAZADO' | 'NUEVO' | 'APROBADO';
}