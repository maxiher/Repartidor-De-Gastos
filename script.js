
//Registro de cada compra y su gasto.
const formGastos = document.getElementById('form-gastos'); //form para ingresar gastos  
const cuerpoTabla = document.getElementById('cuerpoTabla'); //Tabla que muestra los datos ingresados en el form
const totalMostrado = document.getElementById('totalMostrado'); //Celda de la tabla que muestra la suma de los gastos

//Total de todas las compras
let totalGeneral = 0;
let todosLosItemes = []; //Lista de items



//Evento para enviar los datos del form a la tabla
formGastos.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombrePersona = document.getElementById('input-persona').value; //Persona que compro  
    const item = document.getElementById('item').value; //Que item compro
    const gasto = document.getElementById('gasto').value; //Cuanto pago por los items

    //Sumo cada gasto ingresado al total
    totalGeneral += Number(gasto);

    //Agrego cada item a un objeto
    const cadaItem = {
        comprador: nombrePersona,
        nombreItem: item,
        precio: gasto
    }

    //Se los paso a un array
    todosLosItemes.push(cadaItem);


    //Inserto una fila con los datos de cada compra
    cuerpoTabla.innerHTML += `
    <tr>
    <th>${nombrePersona}</th><td> ${item} </td><td> ${gasto}</td>
    </tr>
    `

    //Muestro el total con todas la compras    
    totalMostrado.innerHTML = totalGeneral.toFixed(1);

    formGastos.reset()
    if(tablaRepartidora){
        crearTabla(todosLosItemes, cantParticipantes.value);
    } 
})

//Determinar cantidad de participantes y en que gasto participo
const formRepartir = document.getElementById('form-repartir');

const tablaRepartidora = document.getElementById('tablaRepartidora')

const cantParticipantes = document.getElementById('cantParticipantes'); //Cantidad de participantes general

formRepartir.addEventListener("submit", (e) => {
    e.preventDefault();

    crearTabla(todosLosItemes, cantParticipantes.value);

})


function crearTabla(listaEncabezados, totalFilas) {

    console.log(listaEncabezados[0].nombreItem);
    

    tablaRepartidora.innerHTML = "";

    //Esquina superior derecha de la tabla
    let encabezado = document.createElement('tr');
    let primerCelda = document.createElement('th')
    primerCelda.textContent = "Nombre";

    encabezado.appendChild(primerCelda); //Primera celda del encabezados (participantes)

    //Agrego encabezados de columna con nombre de cada item
    listaEncabezados.forEach(element => {
        let th = document.createElement('th');
        th.className = element.nombreItem;
        th.textContent = element.nombreItem;
        encabezado.appendChild(th);
    });

    //Celda que muestra el total de la compra
    let encabezadoTotal = document.createElement('th');
    encabezadoTotal.textContent = "Total"; //TENGO QUE PONERLO A FUCIONAR!!

    encabezado.appendChild(encabezadoTotal);

    tablaRepartidora.appendChild(encabezado);

    for (let i = 0; i < totalFilas; i++) {
        let tr = document.createElement('tr'); //Creo fila de tabla repartidora de acuerdo a la cantidad de participantes ingresada en el input


        let thParticipantes = document.createElement('th');
        thParticipantes.id = `"participante${i}"`; //Le agrego un id por participante

        let thInput = document.createElement('input')
        thInput.type = "text";                              
        thInput.id = `participante-${i}`;
        thInput.placeholder = `Participante ${i}`;
        thInput.className = "cada-participante";
        thInput.dataset.index = i;


        tr.appendChild(thParticipantes);
        thParticipantes.appendChild(thInput)


        for (let j = 0; j < listaEncabezados.length; j++) {
            let td = document.createElement('td');

            //Se crean los inputs en cada celda
            let checkbox = document.createElement('input');
            checkbox.className = `check`;
            checkbox.type = 'checkbox';
            checkbox.name = `${listaEncabezados[j].nombreItem}`;
            checkbox.dataset.fila = `${i}`;
            checkbox.dataset.columna = `${j}`;
            
            td.appendChild(checkbox);

            let tdTotal = document.createElement("totalIndividual");
            tdTotal.innerHTML
            tr.appendChild(td);


        }

        tablaRepartidora.appendChild(tr);

        let mostrarTotalIndividual = document.createElement('th');
        mostrarTotalIndividual.id = `total-${i}`;
        mostrarTotalIndividual.className = "totales";

        tr.appendChild(mostrarTotalIndividual)

    }


}


function calcularTotalesIndividuales(){
    
    let subtotales = new Array(Number(cantParticipantes.value)).fill(0);//Creo array con tantos 0 como paticipantes 
    let participantesPorItem = new Array(todosLosItemes.length).fill(0);//Creo attay tantos 0 como items

    console.log(subtotales)
    console.log(participantesPorItem)

    const todosCheckbox = document.querySelectorAll('.check:checked');
    
    todosCheckbox.forEach((element) => {
        
        participantesPorItem[Number(element.dataset.columna)]++
    })
    

    todosCheckbox.forEach((element) => {
        
        let numeroFila = Number(element.dataset.fila);//indice participante 
        let numeroColumna = Number(element.dataset.columna);//indice item

        let precio = todosLosItemes[numeroColumna].precio;
        let divisor = participantesPorItem[numeroColumna];

        let cadaSubtotal = precio / divisor;
        subtotales[numeroFila] += cadaSubtotal;
        }  
    )

    for(let i=0; i < subtotales.length; i++){
        let indiceSubtotal = document.getElementById(`total-${i}`)
        indiceSubtotal.textContent = subtotales[i].toFixed(1)
    }
    console.log(participantesPorItem)
    }


tablaRepartidora.addEventListener('change', (e) => {

    calcularTotalesIndividuales()
    
})




