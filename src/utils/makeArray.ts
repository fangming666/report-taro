let makeArray = (userPermission: any): any[] => {
  let result: any[] = [];
  if (!userPermission) return result;
  result = Object.keys(userPermission).map(key => userPermission[key]);
  return result;
};
export {makeArray}

