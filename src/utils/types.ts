import { number, string } from "yup";

export interface SendLogin {


    email: string;
    password: string;


}

export interface erros {
    [index: string]: any
}

export interface options {
    label: string
}
export interface pessoas {

    id: number;
    CEP: string,
    COMPLEMENTO: string,
    EMAIL_PRINCIPAL: string,
    EMAIL_SECUNDARIO?: string,
    NUMERO: string,
    Nome: string,
    RUA: string,
    TEL_PRINCIPAL: string,
    TEL_SECUNDARIO?: string,
    bairro: string,
    cidade: string,
    data: string,
    documentoCpf: string,
    documentoRg: string,
    estado: string,
    genero: string | { label?: string | any },
    tipoDocumento: string | { label?: string | any }

}

export interface empresas {
    CEP: string
    CNPJ: string
    COMPLEMENTO: string
    EMAIL_PRINCIPAL: string
    EMAIL_SECUNDARIO: string
    Estabelecimento: string
    NUMERO: string
    NomeFantasia: string
    RUA: string
    TEL_PRINCIPAL: string
    TEL_SECUNDARIO: string
    bairro: string
    cidade: string
    estado: string
    grauRisco: string
    rasãoSocial: string
    tipoDocumento: string
    cargo?: cargo[]
}

export interface cargo {
    // data(data: any, id: string | undefined): unknown;
    AMBIENTES: string
    APTIDÕES: string
    ATIVIDADES: string
    cbo: string
    corCargo: string
    gargahoraria: string
    nomecargo: string
}

export interface empresasResponsApi {

    data: {

        CEP: string
        CNPJ: string
        COMPLEMENTO: string
        EMAIL_PRINCIPAL: string
        EMAIL_SECUNDARIO: string
        Estabelecimento: string
        NUMERO: string
        NomeFantasia: string
        RUA: string
        TEL_PRINCIPAL: string
        TEL_SECUNDARIO: string
        bairro: string
        cidade: string
        estado: string
        grauRisco: string
        rasãoSocial: string
        tipoDocumento: string
    }
    id: number;



}
export interface pessoasLintResponsApi {

    data: {

        CEP: string,
        COMPLEMENTO: string,
        EMAIL_PRINCIPAL: string,
        EMAIL_SECUNDARIO?: string,
        NUMERO: string,
        Nome: string,
        RUA: string,
        TEL_PRINCIPAL: string,
        TEL_SECUNDARIO?: string,
        bairro: string,
        cidade: string,
        data: string,
        documentoCpf: string,
        documentoRg: string,
        estado: string,
        genero: string | { label?: string | any },
        tipoDocumento: string | { label?: string | any }

    }
    id: number;



}


// types para input de document
export interface State {
    textmask: string;
    numberformat: string;
}
export interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}