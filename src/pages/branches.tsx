import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import Button from "@mui/material/Button";
import { RootState } from "../store";
import BranchList from "../components/branchList";
import {
  addBranch,
  getAllBranches,
  selectBranch,
} from "../store/slices/branch";
import { IAddBranchBody, IBranch } from "../types/branch";
import AddBranch from "../components/addBranch";
import { useNavigate, useParams } from "react-router-dom";

const Branches = () => {
  const [createMode, setCreateMode] = useState(false);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const branches = useSelector((state: RootState) => state.branch.branches);
  const selectedCompany = useSelector(
    (state: RootState) => state.company.selectedCompany
  );
  const { companyId } = useParams();
  const navigate = useNavigate();

  const onAddBranch = (data: IAddBranchBody) => {
    dispatch(addBranch(data))
      .unwrap()
      .then(() => {
        return true;
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const handleAddBranchClick = () => {
    setCreateMode(true);
  };

  const onBranchSelect = (branch: IBranch) => {
    dispatch(selectBranch(branch));
    navigate(`${branch.id}/employees`);
  };

  useEffect(() => {
    setCreateMode(false);
  }, [branches]);

  useEffect(() => {
    if (selectedCompany) {
      dispatch(getAllBranches(selectedCompany.id));
    } else if (companyId) {
      dispatch(getAllBranches(companyId));
    }
  }, [dispatch, companyId, selectedCompany]);

  return (
    <div>
      <h1>Branches page</h1>
      {createMode ? (
        <AddBranch onSubmit={onAddBranch} onBack={() => setCreateMode(false)} />
      ) : (
        <>
          <Button
            variant="contained"
            onClick={handleAddBranchClick}
            sx={{ mb: 3 }}
          >
            Add branch
          </Button>
          <BranchList branches={branches} onBranchSelect={onBranchSelect} />
        </>
      )}
    </div>
  );
};

export default Branches;
