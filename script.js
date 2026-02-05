
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

const cantParticipantes = document.getElementById('cantParticipantes'); //Cantidad de participantes general

formRepartir.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const filasParticipantes = document.getElementById('bodyRepartidora');

    filasParticipantes.innerHTML = "";

    //Genero una fila de acuerdo a la cantidad de participantes
    for(let i=1; i <= cantParticipantes.value; i++){

        const fila = `<tr>
            <td><input type="text" placeholder="Participante ${i}"></input></td>
        </tr>`    
    
        filasParticipantes.innerHTML += fila;
        }

    const encabezadoConItems = document.getElementById('encabezadoDeItems')

    //Genero un columna de acuerdo a la cantidad de items comprados    
    for(let i=0; i < todosLosItemes.length; i++){
        const columna = `
        <th>Nombre</th>
        <th>${todosLosItemes[i].nombreItem}</th>` 

        encabezadoConItems.innerHTML = "";

        encabezadoConItems.innerHTML += columna; 

        //columna.innerHTML += columnaCheckbox;

      }  
})

   
    
    


console.log(todosLosItemes)



