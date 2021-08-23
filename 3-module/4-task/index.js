function showSalary(users, age) {
  let arrUsers = [];

    for(let i = 0; i < users.length; i++) {
        let userAge = users[i]['age'];

        if(userAge <= age) {
            let userName= users[i]['name'];
            let userBalance= users[i]['balance'];

            arrUsers.push(`${userName}, ${userBalance}`);
        }
    }
    
  return arrUsers.join('\n');
}
