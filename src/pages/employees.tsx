import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAllEmployees,
  updateEmployee,
  selectEmployee,
} from "../store/slices/employee";
import EmployeeList from "../components/employeeList";
import { IEmployee, IUpdateEmployee } from "../types/employee";

const Employees = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { companyId, branchId } = useParams();
  const employees = useSelector((state: RootState) => state.employee.employees);
  const navigate = useNavigate();

  const onEmployeeSelect = (employee: IEmployee) => {
    dispatch(selectEmployee(employee));
    navigate(`${employee.id}/timeTracking/`);
  };

  const onEmployeeUpdate = (id: string, updatedEmployee: IUpdateEmployee) => {
    if (companyId && branchId) {
      dispatch(
        updateEmployee({ id, companyId, branchId, body: updatedEmployee })
      );
    }
  };

  useEffect(() => {
    if (companyId && branchId) {
      dispatch(getAllEmployees({ companyId, branchId }));
    }
  }, [branchId, companyId, dispatch]);

  return (
    <div>
      <h1>Employees page</h1>
      <EmployeeList
        employees={employees}
        onEmployeeSelect={onEmployeeSelect}
        onEmployeeUpdate={onEmployeeUpdate}
      />
    </div>
  );
};

export default Employees;
