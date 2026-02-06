
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
    <td>${nombrePersona}</td><td> ${item} </td><td> ${gasto}</td></p>
    </tr>
    `

    //Muestro el total con todas la compras    
    totalMostrado.innerHTML = totalGeneral.toFixed(1);

    formGastos.reset()
})

console.log(todosLosItemes)

//Determinar cantidad de participantes y en que gasto participo
const formRepartir = document.getElementById('form-repartir');

const tablaRepartidora = document.getElementById('tablaRepartidora')

const cantParticipantes = document.getElementById('cantParticipantes'); //Cantidad de participantes general

formRepartir.addEventListener("submit", (e) => {
    e.preventDefault();
    
    crearTabla(todosLosItemes, cantParticipantes.value);
      
})

//IDEA: AGREGAR ELEMENTOS COMPRADOS POR LA MISMA PERSONA QUE HAYAN CONSUMIDO TODOS Y SE MARQUEN TRUE AUTOMATICAMENTE

function crearTabla(listaEncabezados, totalFilas){

    tablaRepartidora.innerHTML = "";    
        
        let encabezado = document.createElement('tr');
        let primerCelda = document.createElement('th')
        primerCelda.textContent = "Nombre";

        encabezado.appendChild(primerCelda);//Primera celda del encabezados (participantes)


        listaEncabezados.forEach(element => {
            let th = document.createElement('th');
            th.textContent = element.nombreItem;
            encabezado.appendChild(th);
        });

        let encabezadoTotal = document.createElement('th');
        encabezadoTotal.textContent = "Total";

        encabezado.appendChild(encabezadoTotal);
        
    tablaRepartidora.appendChild(encabezado);

    for(let i = 1; i <= totalFilas; i++){
        let tr = document.createElement('tr');

        let thParticipantes = document.createElement('th');
        thParticipantes.innerHTML = `<input type="text" placeholder="Participante ${i}"/>`;
        tr.appendChild(thParticipantes);

        for(let j = 0; j < listaEncabezados.length; j++){
            let td = document.createElement('td');
            td.innerHTML= `<input type="checkbox"/>`

            tr.appendChild(td);
        }

        tablaRepartidora.appendChild(tr);
    }

}
   
    
    


console.log(todosLosItemes)



