import * as yup from 'yup';

export const LoginSchema = yup.object().shape({
     nickname: yup
     .string()
     .required("İstifadəçi adı vacibdir!"),
     password: yup
     .string()
     .required("Şifrə vacibdir!"),
})