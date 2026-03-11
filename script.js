
//Registro de cada compra y su gasto.
const formGastos = document.getElementById('form-gastos'); //form para ingresar gastos  
const cuerpoTabla = document.getElementById('cuerpoTabla'); //Tabla que muestra los datos ingresados en el form
const totalMostrado = document.getElementById('totalMostrado'); //Celda de la tabla que muestra la suma de los gastos
const seccionReparticion = document.getElementById('reparticion');

let todosLosItemes = []; //Lista de items

//Evento para enviar los datos del form a la tabla
formGastos.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombrePersona = document.getElementById('input-persona').value; //Persona que compro  
    const item = document.getElementById('item').value; //Que item compro
    const gasto = document.getElementById('gasto').value; //Cuanto pago por los items


    //Agrego cada item a un objeto
    const cadaItem = {
        comprador: nombrePersona,
        nombreItem: item,
        precio: gasto
    }

    //Se los paso a un array
    todosLosItemes.push(cadaItem);
    //Limpio el form
    formGastos.reset();

    //Renderizo tabla
    tablaDetalles(todosLosItemes);

})

//FUNCION PARA CALCULAR EL TOTAL
function calcularTotal(arr) {
    return arr.reduce((acc, item) => acc + Number(item.precio), 0)
}

//FUNCION PARA RENDERIZAR TABLA DE DETALLES
function tablaDetalles(arr) {

    //Limpio la tabla
    cuerpoTabla.innerHTML = "";

    //Creo tabla de detalle de gastos
    for (let i = 0; i < arr.length; i++) {

        //Crear fila
        let tr = document.createElement('tr');

        //Encabezado de cada fila con el nombre del comprador
        let th = document.createElement('th');
        th.textContent = arr[i].comprador;
        tr.appendChild(th);

        //Nombre del item comprado
        let td = document.createElement('td');
        td.textContent = arr[i].nombreItem;
        tr.appendChild(td);

        //Precio del item comprado
        let tdPrecio = document.createElement('td');
        tdPrecio.textContent = arr[i].precio;
        tr.appendChild(tdPrecio);

        //Boton para luego eliminar
        let botonElminar = document.createElement('button')
        botonElminar.type = "button";
        botonElminar.classList.add("btn-eliminar");
        botonElminar.innerHTML = `<i class="fa-regular fa-trash-can"></i>`;
        botonElminar.dataset.index = i;

        tr.appendChild(botonElminar);

        cuerpoTabla.appendChild(tr);

    }

    //Calculo el total
    let total = calcularTotal(arr);
    totalMostrado.textContent = total.toFixed(1);

}

cuerpoTabla.addEventListener("click", (e) => {
    const boton = e.target.closest(".btn-eliminar");
    if (!boton) return;

    const index = Number(boton.dataset.index);

    todosLosItemes.splice(index, 1);
    tablaDetalles(todosLosItemes);
})


//Determinar cantidad de participantes y en que gasto participo
const formRepartir = document.getElementById('form-repartir');

const tablaRepartidora = document.getElementById('tablaRepartidora')

const cantParticipantes = document.getElementById('cantParticipantes'); //Cantidad de participantes general

formRepartir.addEventListener("submit", (e) => {
    e.preventDefault();

    crearTabla(todosLosItemes, cantParticipantes.value);

})


//FUNCION PARA LLAMAR A LA TABLA REPARTIDORA
function crearTabla(listaEncabezados, totalFilas) {

    console.log(listaEncabezados[0].nombreItem);

    const compradores = obtenerCompradoresUnicos();

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
        thParticipantes.id = `participante${i}`; //Le agrego un id por participante

        let thInput = document.createElement('input')
        thInput.type = "text";
        thInput.id = `participante-${i}`;
        
        if (compradores[i]) {
            thInput.value = compradores[i]; // NUEVO: prellenar con compradores
        } else {
            thInput.placeholder = `Participante ${i}`;
        }

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

            tr.appendChild(td);

        }

        tablaRepartidora.appendChild(tr);

        let mostrarTotalIndividual = document.createElement('th');
        mostrarTotalIndividual.id = `total-${i}`;
        mostrarTotalIndividual.className = "totales";

        tr.appendChild(mostrarTotalIndividual)

    }

    participacion = crearMatriz();
}

function obtenerCompradoresUnicos() {

    const compradores = todosLosItemes.map(i => i.comprador.trim());

    return [...new Set(compradores)];

}


let participantes = [];//Array para la matriz
let participacion = [];

tablaRepartidora.addEventListener('change', (e) => {

    actualizarMatriz(e);

})

//FUNCION PARA CREAR LA MATRIZ
function crearMatriz() {

    participantes = [];

    const numeroParticipantes = Number(document.getElementById('cantParticipantes').value);

    for (let i = 0; i < numeroParticipantes; i++) {

        const arr = new Array(todosLosItemes.length).fill(false);
        participantes.push(arr);

    }
    return participantes;

}
console.log(participantes)//BORRAR

//FUNCION PARA ACTUALIZAR LA MATRIZ DENTRO DEL EVENTO CHANGE
function actualizarMatriz(e) {

    if (e.target.type !== "checkbox") return; //Retorno si el cambio no se hizo en un checkbox


    const fila = Number(e.target.dataset.fila); //Busco el data set fila del checkbox que se cambio
    const columna = Number(e.target.dataset.columna); //Busco el data set columna del checkbox que se cambio
    const estado = e.target.checked; //Busco el estado del checkbox que se cambio (true o false)

    participacion[fila][columna] = estado; //Actualizo la matriz con el estado del checkbox que se cambio

    const totales = calcularTotalIndividual();//Calculo el total individual de cada participante y lo guardo en un array

    renderTotales(totales);

}

function calcularTotalIndividual() {
    let totales = new Array(participantes.length).fill(0); //Creo un array con la cantidad de 0 como de participantes determianda por el input

    for (let j = 0; j < todosLosItemes.length; j++) {
        let precio = Number(todosLosItemes[j].precio);//Recorro todos los itemes para sacar el precio de cada uno
        let participantesPorItem = 0;//Seteo un contador de participantes por item en 0

        for (let i = 0; i < participacion.length; i++) {

            //Agrego un participante al contador por cada participante que haya marcado el checkbox del item que estoy recorriendo
            if (participacion[i][j]) {
                participantesPorItem++;
            }
        }

        if (participantesPorItem === 0) continue; //Si no hay participantes por item, paso al siguiente item para evitar una division por 0
        let parte = precio / participantesPorItem;//Calculo la parte que le corresponde a cada participante por el item que estoy recorriendo



        for (let i = 0; i < participacion.length; i++) {

            //Agrego la suma que debe pagar cada participante por cada item a su total individual
            if (participacion[i][j]) {

                totales[i] += parte
            }

        }

    }
    console.log(totales)
    return totales;
}

function renderTotales(totales) {
    for (let i = 0; i < totales.length; i++) {
        let cadaTotal = document.getElementById(`total-${i}`);

        cadaTotal.textContent = Number(totales[i]).toFixed(1);
    }



    const balances = calcularBalances(totales);
    const pagos = simplificarDeudas(balances);

    mostrarDeudas(pagos);

    console.log("BALANCES:", balances);
    console.log("PAGOS:", pagos);
}


let nombresParticipantes = [];

function obtenerNombresParticipantes() {
    const inputs = document.querySelectorAll(".cada-participante");

    nombresParticipantes = [];

    inputs.forEach((input, i) => {
        let nombre = input.value.trim();
        if (nombre === "") nombre = `Participante ${i + 1}`;
        nombresParticipantes.push(nombre);
    });
}


function calcularBalances(totales) {

    obtenerNombresParticipantes();

    let balances = [];

    for (let i = 0; i < totales.length; i++) {

        let nombre = nombresParticipantes[i]; // CAMBIO: ahora usamos el array de nombres
        let pagoReal = 0;

        // CAMBIO: este for ahora está correctamente dentro de la lógica
        for (let j = 0; j < todosLosItemes.length; j++) {

            if (
                todosLosItemes[j].comprador.trim().toLowerCase() ===
                nombre.trim().toLowerCase()
            ) {
                pagoReal += Number(todosLosItemes[j].precio);
            }

        }

        let balance = pagoReal - totales[i];

        balances.push({
            nombre: nombre, // CAMBIO: ahora el nombre está definido
            balance: balance
        });

    }

    return balances;
}

function simplificarDeudas(balances) {
    let deudores = [];
    let acreedores = [];

    balances.forEach(p => {
        if (p.balance < 0) {
            deudores.push({ ...p });
        }

        if (p.balance > 0) {
            acreedores.push({ ...p })
        }
    });
    let pagos = [];

    while (deudores.length && acreedores.length) {

        let deudor = deudores[0];
        let acreedor = acreedores[0];

        let monto = Math.min(
            Math.abs(deudor.balance),
            acreedor.balance
        );

        pagos.push({
            deudor: deudor.nombre,
            acreedor: acreedor.nombre,
            monto: monto
        })

        deudor.balance = Number((deudor.balance + monto).toFixed(2));
        acreedor.balance = Number((acreedor.balance - monto).toFixed(2));

        if (Math.abs(deudor.balance) < 0.01) {
            deudores.shift();
        }

        if (Math.abs(acreedor.balance) < 0.01) {
            acreedores.shift()
        }
    }
    console.log("DEUDORES:", deudores);
    console.log("ACREEDORES:", acreedores);
    return pagos;
}


function mostrarDeudas(pagos) {

    if (pagos.length === 0) {
        seccionReparticion.innerHTML = "<h3>Cada uno debe aportar:</h3>";
        return;
    }

    let html = '<h3>Pagos:</h3><ul>'

    pagos.forEach(p => {
        html += `<li>${p.deudor} debe pagar $${p.monto.toFixed(1)} a ${p.acreedor}</li>`
    });
    html += '</ul>';

    seccionReparticion.innerHTML = html;
}

