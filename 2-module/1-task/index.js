function sumSalary(salaries) {
 let sumSalaries = 0;

  for( let key in salaries) {
      if( typeof salaries[key] == "number" && !isNaN(salaries[key]) && isFinite(salaries[key]) ) {
          sumSalaries  += salaries[key];
      }
  }

  return sumSalaries;
}
