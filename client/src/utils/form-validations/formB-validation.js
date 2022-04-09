import * as yup from "yup";

export const formBSchema = yup.object().shape({
  field1: yup.string().required("Required"),
  field1: yup.string()
});