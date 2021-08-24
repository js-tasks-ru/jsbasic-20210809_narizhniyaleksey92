function highlight(table) {
    let rows = table.tBodies[0].rows;
    
    for(let i = 0; i < rows.length; i++) {
        let row = rows[i];
        
        if(row.cells[1].textContent < 18) {
            row.style['text-decoration'] = 'line-through';}

        row.classList.add( row.cells[2].textContent === 'm' ? 'male' : 'female');

        if(row.cells[3].hasAttribute('data-available')){
            row.classList
               .add( row.cells[3].getAttribute('data-available') === 'true' ? 'available' : 'unavailable');
        }else{
            row.hidden = true;
        }

    }
	
}
