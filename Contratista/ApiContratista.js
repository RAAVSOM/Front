let data = JSON.parse(sessionStorage.getItem("usuario"));
console.log(data);

let vacanteSeleccionadaId;
let postuladoSeleccionadoId;

function getVacantesPostulaciones(done){
    const result = fetch('http://localhost:9998/api/vacante/byempresaP', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => response.json())
        .then(data => {
            done(data)
        });
} 

getVacantesPostulaciones(data =>{
    console.log(data);
    data.forEach(vacante => {
        let tablaVacantes = document.getElementById("Postulaciones");
        console.log(tablaVacantes);
        tablaVacantes.innerHTML += `
            <tr data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="verVacante(event.target)" title="${vacante.id_vacante}">
                <th scope="row">${vacante.disponibles}</th>
                <td>${vacante.titulo}</td>
                <td>${vacante.lugar}</td>
                <td>${vacante.salario}</td>
            </tr>
        `;
    });
});

function getVacante(done, obj){
    vacanteSeleccionadaId = obj.parentElement.title;
    const result = fetch('http://localhost:9998/api/vacante/' + vacanteSeleccionadaId).then(response => response.json())
        .then(data => {
            done(data)
        });
}

function verVacante(obj){
    getVacante(data =>{
        console.log(data);
        data.forEach(postulado => {
            let tablaVacantes = document.getElementById("Postulados");
            console.log(tablaVacantes);
            tablaVacantes.innerHTML += `
                <tr data-bs-toggle="modal" data-bs-target="#infoPModal" onclick="verPostulado(event.target)" title="${postulado.id_desempleado}">
                    <td>${postulado.usuario.persona.nombre_persona}</td>
                    <td>${postulado.usuario.correo}</td>
                    <td>${postulado.usuario.persona.cedula}</td>
                    <td>${postulado.usuario.persona.telefono}</td>
                </tr>
            `;
        });
    }, obj);
}

function getPostulado(done, obj){
    postuladoSeleccionadoId = obj.parentElement.title;
    const result = fetch('http://localhost:9998/api/vacante/' + postuladoSeleccionadoId).then(response => response.json())
        .then(data => {
            done(data)
        });
}

function verPostulado(obj){
    getPostulado(data =>{
        console.log(data);
        let titulo = document.getElementById("Titulo");
        titulo.textContent = data.titulo;
        let info = document.getElementById("Info");
        info.textContent = '';
        info.innerHTML = `<p>salario: ${data.salario}</p>
        <p>jornada: ${data.jornada}</p>
        <p>tiempo: ${data.tiempo}</p>
        <p>lugar: ${data.lugar}</p>
        <p>experiencia requerida en meses: ${data.experiencia}</p>
        <p>vacantes disponibles: ${data.disponibles}</p>`;
    }, obj);
}


function getVacantesContrataciones(done){
    const result = fetch('http://localhost:9998/api/vacante/byempresaC', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => response.json())
        .then(data => {
            done(data)
        });
} 

getVacantesContrataciones(data =>{
    console.log(data);
    data.forEach(vacante => {
        let tablaVacantes = document.getElementById("Contrataciones");
        console.log(tablaVacantes);
        tablaVacantes.innerHTML += `
            <tr data-bs-toggle="modal" data-bs-target="#contModal" onclick="verVacanteC(event.target)" title="${vacante.id_vacante}">
                <th scope="row">${vacante.disponibles}</th>
                <td>${vacante.titulo}</td>
                <td>${vacante.lugar}</td>
                <td>${vacante.salario}</td>
            </tr>
        `;
    });
});

function verVacanteC(obj){
    getVacante(data =>{
        console.log(data);
        data.forEach(postulado => {
            let tablaVacantes = document.getElementById("Contratados");
            console.log(tablaVacantes);
            tablaVacantes.innerHTML += `
                <tr data-bs-toggle="modal" data-bs-target="#infoCModal" onclick="verContratado(event.target)" title="${postulado.id_desempleado}">
                    <td>${postulado.usuario.persona.nombre_persona}</td>
                    <td>${postulado.usuario.correo}</td>
                    <td>${postulado.usuario.persona.cedula}</td>
                    <td>${postulado.usuario.persona.telefono}</td>
                </tr>
            `;
        });
    }, obj);
}

function getContratado(done, obj){
    let contratadoSeleccionadoId = obj.parentElement.title;
    const result = fetch('http://localhost:9998/api/vacante/' + contratadoSeleccionadoId).then(response => response.json())
        .then(data => {
            done(data)
        });
}

function verContratado(obj){
    getContratado(data =>{
        console.log(data);
        let titulo = document.getElementById("TituloC");
        titulo.textContent = data.titulo;
        let info = document.getElementById("InfoC");
        info.textContent = '';
        info.innerHTML = `<p>salario: ${data.salario}</p>
        <p>jornada: ${data.jornada}</p>
        <p>tiempo: ${data.tiempo}</p>
        <p>lugar: ${data.lugar}</p>
        <p>experiencia requerida en meses: ${data.experiencia}</p>
        <p>vacantes disponibles: ${data.disponibles}</p>`;
    }, obj);
}

function contratarPostulado(done){
    const result = fetch('http://localhost:9998/api/vacante/contratar/'+postuladoSeleccionadoId+'/'+vacanteSeleccionadaId, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => response.json())
        .then(data => {
            done(data)
        });
}

function contratar(){
    contratarPostulado(data =>{
        console.log(data);
    })
}

function crearVacante(){
    
}

function cerrarSesion() {
    window.location.href = "Login/login.html";
}