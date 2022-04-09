import * as yup from "yup";

export const formASchema = yup.object().shape({
  field1: yup.string().required("Required"),
  field1: yup.string()
});