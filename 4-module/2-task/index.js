function makeDiagonalRed(table) {
   let tr = table.rows;
	
   for(let i = 0; i < tr.length; i++) {
	   tr[i].cells[i].style['background-color'] = 'red';
    }
	
}
