
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
})

//Determinar cantidad de participantes y en que gasto participo
const formRepartir = document.getElementById('form-repartir');

const tablaRepartidora = document.getElementById('tablaRepartidora')

const cantParticipantes = document.getElementById('cantParticipantes'); //Cantidad de participantes general

formRepartir.addEventListener("submit", (e) => {
    e.preventDefault();

    crearTabla(todosLosItemes, cantParticipantes.value);

})

//IDEA: AGREGAR ELEMENTOS COMPRADOS POR LA MISMA PERSONA QUE HAYAN CONSUMIDO TODOS Y SE MARQUEN TRUE AUTOMATICAMENTE

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

    for (let i = 1; i <= totalFilas; i++) {
        let tr = document.createElement('tr'); //Creo fila de talba repartidora de acuerdo a la cantidad de participantes ingresada en el input


        let thParticipantes = document.createElement('th');
        thParticipantes.id = `id="participante${i}"`; //Le agrego un id por participante

        let thInput = document.createElement('input')
        thInput.type = "text";                              //TENGO QUE AVERIGUAR COMO ASIGNARLE NOMBRE UNA VEZ RELLENADO EL INPUT.
        thInput.id = `participante-${i}`
        thInput.placeholder = `Participante ${i}`;
        thInput.className = "cada-participante"
        //thParticipantes.innerHTML = `<input type="text" placeholder="Participante${i}/>"`;


        tr.appendChild(thParticipantes);
        thParticipantes.appendChild(thInput)


        for (let j = 0; j < listaEncabezados.length; j++) {
            let td = document.createElement('td');

            //Se crean los inputs en cada celda
            let checkbox = document.createElement('input');
            checkbox.className = `p-${i} i-${j}`
            checkbox.type = 'checkbox';
            checkbox.name = `${listaEncabezados[j].nombreItem}` //ACA TENGO EL PROBLEMA
            //Tengo que ver el tema del id que me conviene

            //POR ACA VOY A TENER QUE MANEJAR SU ESTADO
            td.appendChild(checkbox);

            let tdTotal = document.createElement("totalIndividual");
            tdTotal.innerHTML
            tr.appendChild(td);


        }

        tablaRepartidora.appendChild(tr);

        let mostrarTotalIndividual = document.createElement('th');
        mostrarTotalIndividual.id = `total-${i}`;

        tr.appendChild(mostrarTotalIndividual)

    }


}

//function para hacer array Con CADA PARTICIPANTE y dentro CADA ITEM
function itemsPorParticipante() {

    const totalDeInputs = document.querySelectorAll('.cada-participante')

    let listaPorParticipante = [];


    for (let i = 1; i <= totalDeInputs.length; i++) {
        let participantesInput = document.getElementById(`participante-${i}`);//Traigo del dom todos los inputs para recorrer sus valores si los tienen

        if (participantesInput.value === '') {
            listaPorParticipante.push({
                Nombre: `Participante ${i}`
            })
        } else {
            listaPorParticipante.push({
                Nombre: participantesInput.value
            })
        }
        //bucle para tener en cuenta tantos la cantidad de participantes como de items
        for (let j = 0; j < todosLosItemes.length; j++) {
            let cadaCheckbox = document.querySelector(`.p-${i}.i-${j}`)
            console.log(cadaCheckbox)

        }
    }
    console.log(listaPorParticipante);


}

tablaRepartidora.addEventListener("change", () => {
    itemsPorParticipante();
})

/* participantesInput.forEach(input => {
    listaPorParticipante.push({
        Nombre: input.value
    });

    console.log
})  
} */




//Creo que para resolver el total de cada participante deberia crear constantes dirigidas a: 
//la clase o id del input donde aclara su indice, y los checkbox que corresponden al mismo
// indice. Luego hacer un if donde me fijo entre cuantos participantes dividir cada value -> item.
//Para mostrar el total individual debo agregar una celda th debajo de total o en el ultimo lugar
//de la fila e insertarle la suma de dividir cada item en el que participo entre la cantidad de
//participantes.  





console.log(todosLosItemes);



