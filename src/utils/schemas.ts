
import * as Yup from 'yup';


// function parseDateString(value: any, originalValue: any) {

//   console.log(originalValue)

//   console.log(isDate(new Date(originalValue)))
//   const parsedDate = isDate(new Date(originalValue))
//     ? 
//     new Date(originalValue)
//     :
//     null;

//   return parsedDate;
// }

const phoneRegExp = /^\((?:[14689][1-9]|2[12478]|3[1234578]|5[1345]|7[134579])\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/;

const regexTypeEvent = /NIVER|CASAMENTO/

const regexImgUrl = /(data:image\/png;base64[^"]+)/


export const PhoneNuberSiginup = Yup.object().shape({
    phoneNumber: Yup.string().required().matches(phoneRegExp, "Numero inválido")
})

export const schemaFormCreateConvite = Yup.object().shape({
    // name: Yup.string().required(),
    // dataTime: Yup.string().required(),
    // local: Yup.array().required().of(
    //     Yup.object().shape({
    //         name: Yup.string().required(),
    //         horario: Yup.string().required(),
    //         link: Yup.string().required(),
    //     })
    // ),
    // fraseHome: Yup.string().required(),
    // fraseCapa: Yup.string().required(),
    // person1: Yup.string().required(),
    // person2: Yup.string(),
    // photoConviteURL: Yup.string().required("selecione uma imagem para seu convite!!").url(),


    cep: Yup.string().required("nenhum cep disponibilizado"),
    complemento: Yup.string(),
    email: Yup.string().required("nenhum email disponibilizado"),
    email_sec: Yup.string(),
    numero: Yup.string().required("nenhum numero disponibilizado"),
    nome: Yup.string().required("nenhum nome disponibilizado"),
    rua: Yup.string().required("nenhuma rua disponibilizada"),
    tel: Yup.string().required("nenhum telefone disponibilizado"),
    tel_sec: Yup.string(),
    bairro: Yup.string().required("nenhum bairro disponibilizado"),
    cidade: Yup.string().required("nenhuma cidade disponibilizado"),
    nascimento: Yup.string().required("nenhuma data disponibilizado"),
    numero_doc: Yup.string().required("nenhum Cpf disponibilizado"),
    rg: Yup.string().required("nenhum Rg disponibilizado"),
    rg_emissor: Yup.string().required("nenhum Rg disponibilizado"),
    estado: Yup.string().required("nenhum estado disponibilizado"),
    genero: Yup.string().required("nenhum genero disponibilizado"),
    tipo_doc: Yup.string().required("nenhum Documento disponibilizado")
});

export const schemaFormCreateEmpresa = Yup.object().shape({


    cep: Yup.string().required("nenhum cep disponibilizado"),
    complemento: Yup.string(),
    email: Yup.string().required("nenhum email disponibilizado"),
    email_sec: Yup.string(),
    numero: Yup.string().required("nenhum numero disponibilizado"),
    estabelecimento: Yup.string().required("nenhum nome disponibilizado"),
    nome_fantasia: Yup.string().required("nenhum nome disponibilizado"),
    // grauRisco: Yup.string().required("nenhum nome disponibilizado"),
    data_registro: Yup.string().required("nenhuma data informada"),
    rasao_social: Yup.string().required("nenhum nome disponibilizado"),
    rua: Yup.string().required("nenhuma rua disponibilizada"),
    tel: Yup.string().required("nenhum telefone disponibilizado"),
    tel_sec: Yup.string(),
    bairro: Yup.string().required("nenhum bairro disponibilizado"),
    cidade: Yup.string().required("nenhuma cidade disponibilizado"),
    // data: Yup.string().required("nenhuma data disponibilizado"),
    numero_doc: Yup.string().required("nenhum Cpf disponibilizado"),
    // documentoRg: Yup.string().required("nenhum Rg disponibilizado"),
    estado: Yup.string().required("nenhum estado disponibilizado"),
    // genero: Yup.string().required("nenhum genero disponibilizado"),
    tipo_doc: Yup.string().required("nenhum Documento disponibilizado")
});

export const schemaFormCreateCargo = Yup.object().shape({


    nome: Yup.string().required("nenhum nome disponibilizado"),
    cor: Yup.string(),
    cbo: Yup.string().required("nenhum cbo disponibilizado"),

    aptidao: Yup.string().required("nenhuma aptidao disponibilizada"),
    ambiente: Yup.string().required("nenhum ambiente disponibilizado"),
    informacao: Yup.string().required("nenhuma informacao disponibilizada"),

    atividade: Yup.string().required("nenhuma atividade informada"),
    carga_horaria: Yup.string().required("nenhuma carga_horaria disponibilizada"),

});

export const schemaFormLinkType = Yup.object().shape({
    titulo: Yup.string().required("  Nenhum Título adicionado"),
    Link: Yup.string().required("  Nenhum Link adicionado").url("url invalida"),

});


export const schemaForLogin = Yup.object().shape({
    email: Yup.string().email("  Nenhum email fornecido ").required("  Nenhum email adicionado"),
    password: Yup.string().required("  Nenhum Link adicionado"),

});




// export const schemaFormCreateInvitModal = Yup.object().shape({
//   type: Yup.string().required("Escolha um tipo para o evento").matches(regexTypeEvent, "errorRegex"),
//   name: Yup.string().required("Escolha um nome para o evento"),
//   dataTime: Yup.date().transform(parseDateString).required()

// });