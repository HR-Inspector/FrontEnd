import { useCallback, useEffect, useState } from "react";
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
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { companyId, branchId } = useParams();
  const employees = useSelector((state: RootState) => state.employee.employees);
  const totalEmployees = useSelector((state: RootState) => state.employee.totalEmployees);
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

  const onPageChange = useCallback((page: number, pageSize: number) =>  {
    const newOffset = page * 10;
    if(pageSize !== limit) {
      setLimit(pageSize);
    }
    if(newOffset !== offset) {
      setOffset(newOffset);
    }
  }, [limit, offset]);

  useEffect(() => {
    if (companyId && branchId) {
      dispatch(getAllEmployees({ companyId, branchId, limit, offset }));
    }
  }, [dispatch, branchId, companyId, limit, offset]);

  return (
    <div>
      <h1>Employees page</h1>
      <EmployeeList
        employees={employees}
        totalRowCount={totalEmployees}
        onEmployeeSelect={onEmployeeSelect}
        onEmployeeUpdate={onEmployeeUpdate}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default Employees;
