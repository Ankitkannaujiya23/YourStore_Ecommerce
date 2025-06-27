import * as yup from "yup";

export const LoginOrSignupSchema = (isUserSignup) =>
  yup.object({
    name: isUserSignup
      ? yup.string().required("*Please enter your name.").min(3)
      : yup.string(),
    password: yup.string().required("*Please enter password."),
    email: yup.string().email().required("*Please enter your email."),
    confirmPassword: isUserSignup
      ? yup
        .string()
        .required("*Please enter confirm password.")
        .oneOf([yup.ref("password"), null], "*Passwords must match.") // ✅ Match password
      : yup.string(),
  });

export const AddOrUpdateSchema = () =>
  yup.object({
    productTitle: yup.string().required("*Please enter product name.").min(3),
    productDescription: yup
      .string()
      .required("*Please enter description.")
      .min(10),
    category: yup.string().required("*Please choose category."),
    subCategory: yup.string(),
    quality: yup.string().required("*Please choose quality."),
    productImages: yup.string(),
    size: yup.string().required("*Please select size."),
    productDate: yup.string().required("*Select a date."),
    salesChanels: yup.string().required("*Select sales chanels."),
    price: yup.string().required("*Enter a price"),
  });

//address validation schema for adding address in checkout field

export const addressDetailsValidation = yup.object({
  fullName: yup.string().required("Enter you fullname."),
  email: yup.string().email().required("Enter your email."),
  streetAddress: yup.string().required("Enter your street and local address"),
  city: yup.string().required("Enter your city"),
  mobileNo: yup
    .string()
    .required("Enter your Mobile No")
    .matches(/^[6-9]\d{9}$/, "Enter valid mobile no")
    .min(10)
    .max(10),
  state: yup.string().required("Enter your state name"),
  pincode: yup.string().required("Enter your pincode"),
});



export const categoryValidationSchema = yup.object({
  name: yup.string().required("Category name is required"),
  image: yup.mixed()
    .required("Image is required")
    .test(
      "fileType",
      "Only JPG and PNG files are allowed",
      (value) =>
        value && ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
    ),
})


export const newPasswordFormSchema = yup.object({
  newPassword: yup.string().min(6, "At least 6 characters").required("Required"),
  confirmPassword: yup.string()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .required("Required"),
})