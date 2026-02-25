export interface GenericResponse<T = any> {
    codigo: number;
    mensaje: string;
    data: T | null;
}

export interface AccessTokenData {
    refresh_token_expires_in: string;
    role: string;
    issued_at: string;
    opciones: string; // JSON string
    refresh_token_issued_at: string;
    expires_in: string;
    access_token: string;
    refresh_token: string;
    codEmpresa?: string;
    nomEmpresa?: string;
}

export interface RequestLogin {
    tipoDocumento: string;
    dni: string;
    contrasenia: string;
    totp?: string;
}

export interface RequestVerifyIdentity {
    codDocumento: string;
    numDocumento: string;
    numCelular: string;
}

export interface RequestChangePassword {
    nuevaContrasenia: string;
    confirmarContrasenia: string;
    codigoOtp: string;
    tokenDigital?: string;
    totp?: string;
}

export interface UserCompany {
    codEmpresa: string;
    nomEmpresa: string;
}

export interface UserProfile {
    idUsuario: string;
    nombres: string;
    apellidos: string;
    correo: string;
    celular: string;
    codEmpresa: string;
    empresas: UserCompany[];
}

export interface ResponseAccessTokenWrapper extends GenericResponse<AccessTokenData> { }
export interface ResponseUserProfile extends GenericResponse<UserProfile> { }
