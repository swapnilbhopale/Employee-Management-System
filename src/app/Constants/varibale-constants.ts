export const CREATE_EMP = 'CreateEmployee';
export const GET_DEPTS = 'GetDepartments';
export const GET_DESIGANTION_BY_ID = 'GetDesignationsByDeptId';
export const DEPT_ID = 'deptId';
export const GET_EPMS = 'GetEmployees';
export const DELETE_EMP = 'DeleteEmployee';
export const UPDATE_EMP = 'UpdateEmployee';
export function foramteDateToYMD(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
}
