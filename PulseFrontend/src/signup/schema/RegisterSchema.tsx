import * as yup from 'yup';

export const RegisterSchema = yup.object().shape({
     name: yup
     .string().required("Ad boş qala bilməz!")
     .min(3, "Adınız minimum 3 hərf olmalıdır")
     .max(20, "Adınız çox uzundur!")
     .matches(/^[a-zA-Z]*$/, "Adınızda özəl ifadələr işlədilə bilməz!"),

     lastname: yup
     .string().required("Soyad boş qala bilməz!")
     .min(3, "Soyadınız minimum 3 hərf olmalıdır!")
     .max(20, "Soyadınız çox uzundur!")
     .matches(/^[a-zA-Z]*$/, "Soyadınızda özəl ifadələr işlədilə bilməz!"),

     nickname: yup
     .string().required("İstifadəçi adı məcburidir!")
     .min(3, "İstifadəçi adınız çox qısadır! Maksimum 20, minimum 3 hərfdən ibarət olmalıdır.")
     .max(20, "İstifadəçi adınız çox uzundur! Maksimum 20, minimum 3 hərfdən ibarət olmalıdır.")
     .matches(/^[a-zA-Z0-9_\-]*$/, "İstifadəçi adınızda ' _, -, ., ' başqa özəl ifadələr işlədilə bilməz!"),

     email: yup
     .string().required("Email boş qala bilməz!")
     .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Email'də bu cür özəl ifadələr işlədilə bilməz!"),

     password: yup
     .string().required("Şifrəniz boşdur. Şifrə yazın.")
     .min(10, "Şifrə ən azı 10 simvoldan ibarət olmalıdır!")
     .matches(/^(?=.*\d)/, "Şifrənizdə ən azı bir rəqəm olmalıdır! Bu hesabınızın təhlükəsizliyi üçün önəmlidir.")
     .test("passwords-match", "Şifrələriniz uyğun gəlmir..", (value, context) => {
          return value === context.parent.rePassword;
     }),
     rePassword: yup
     .string().required("Yuxarıdakı şifrənin eynisini yazın..")
     .test("retry-passwords-match", "Şifrələriniz uyğun gəlmir..", (value, context) => {
          return value === context.parent.password;
     }),

})