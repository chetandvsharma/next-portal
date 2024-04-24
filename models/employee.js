import { Schema, model, models } from "mongoose";

const EmployeeSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, "Email already exist!"],
      required: [true, "Email is required!"],
    },

    password: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);

const Employee = models.Employee || model("Employee", EmployeeSchema);

export default Employee;
