let data = JSON.parse(sessionStorage.getItem("usuario"));
console.log(data);

let tituloActual;
let certificadoActual;
let historiaActual;

let vacanteSeleccionadaId;

function actualizarDatos(done){
    const result = fetch('http://localhost:9998/api/' + data.id_desempleado).then(response => response.json())
    .then(data =>{
        console.log(data);
    });
}

actualizarDatos(dato =>{
    data = dato;
})



function getPostulaciones(done){
    const result = fetch('http://localhost:9998/api/vacante/postulaciones', {
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

function executeGetPostulaciones(){
    getPostulaciones(data =>{
        console.log(data);
        data.forEach(vacante => {
            let tablaVacantes = document.getElementById("Postulaciones");
            console.log(tablaVacantes);
            tablaVacantes.innerHTML += `
                <tr data-bs-toggle="modal" data-bs-target="#postModal" onclick="verVacanteV(event.target)" title="${vacante.id_vacante}">
                    <th scope="row">${vacante.disponibles}</th>
                    <td>${vacante.titulo}</td>
                    <td>${vacante.lugar}</td>
                    <td>${vacante.empresa.nombre_empresa}</td>
                    <td>${vacante.salario}</td>
                </tr>
            `;
        });
    });
}

executeGetPostulaciones();

function getContratos(done){
    const result = fetch('http://localhost:9998/api/vacante/contrataciones', {
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

function executeGetContratos(){
    getContratos(data =>{
        data.forEach(vacante => {
            let tablaVacantes = document.getElementById("Contratos");
            tablaVacantes.innerHTML += `
                <tr data-bs-toggle="modal" data-bs-target="#postModal" onclick="verVacanteV(event.target)" title="${vacante.id_vacante}">
                    <th scope="row">${vacante.disponibles}</th>
                    <td>${vacante.titulo}</td>
                    <td>${vacante.lugar}</td>
                    <td>${vacante.empresa.nombre_empresa}</td>
                    <td>${vacante.salario}</td>
                </tr>
            `;
        });
    });
}

executeGetContratos();

function getVacantes(done) {
    const result = fetch('http://localhost:9998/api/vacante').then(response => response.json())
    .then(data => {
        done(data)
    });
}

getVacantes(data => {
    data.forEach(vacante => {
        let tablaVacantes = document.getElementById("Vacantes");
        tablaVacantes.innerHTML += `
            <tr data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="verVacante(event.target)" title="${vacante.id_vacante}">
                <th scope="row">${vacante.disponibles}</th>
                <td>${vacante.titulo}</td>
                <td>${vacante.lugar}</td>
                <td>${vacante.empresa.nombre_empresa}</td>
                <td>${vacante.salario}</td>
            </tr>
        `;
    });
});

function getVacante(done, obj){
    vacanteSeleccionadaId = obj.parentElement.title;
    const result = fetch('http://localhost:9998/api/vacante'+"/"+ obj.parentElement.title).then(response => response.json())
    .then(data => {
        done(data)
    });
}

function verVacante(obj){
    getVacante(data =>{
        let titulo = document.getElementById("Titulo");
        titulo.textContent = data.titulo;

        let desc = document.getElementById("Descripcion");
        desc.textContent = '';
        desc.innerHTML = `<p>${data.descripcion}</p>`;

        let info = document.getElementById("Info");
        info.textContent = '';
        info.innerHTML = `<p>salario: ${data.salario}</p>
        <p>jornada: ${data.jornada}</p>
        <p>tiempo: ${data.tiempo}</p>
        <p>lugar: ${data.lugar}</p>
        <p>experiencia requerida en meses: ${data.experiencia}</p>
        <p>vacantes disponibles: ${data.disponibles}</p>`;

        let empresa = document.getElementById("Empresa");
        empresa.textContent = 'Empresa: '+ data.empresa.nombre_empresa;

        let infoE = document.getElementById("InfoE");
        infoE.textContent = '';
        infoE.innerHTML = `<p>${data.empresa.descripcion_empresa}</p>
        <p>porcentaje_contratacion: ${data.empresa.porcentaje_contratacion}</p>
        <p>calificacion: ${data.empresa.calificacion}</p>
        <p>lugar: ${data.empresa.lugar}</p>
        <p>link: <a href="#">${data.empresa.link}</a></p>`;
    }, obj)
}

function verVacanteV(obj){
    getVacante(data =>{
        let titulo = document.getElementById("TituloV");
        titulo.textContent = data.titulo;

        let desc = document.getElementById("DescripcionV");
        desc.textContent = '';
        desc.innerHTML = `<p>${data.descripcion}</p>`;

        let info = document.getElementById("InfoV");
        info.textContent = '';
        info.innerHTML = `<p>salario: ${data.salario}</p>
        <p>jornada: ${data.jornada}</p>
        <p>tiempo: ${data.tiempo}</p>
        <p>lugar: ${data.lugar}</p>
        <p>experiencia requerida en meses: ${data.experiencia}</p>
        <p>vacantes disponibles: ${data.disponibles}</p>`;

        let empresa = document.getElementById("EmpresaV");
        empresa.textContent = 'Empresa: '+ data.empresa.nombre_empresa;

        let infoE = document.getElementById("InfoEV");
        infoE.textContent = '';
        infoE.innerHTML = `<p>${data.empresa.descripcion_empresa}</p>
        <p>porcentaje_contratacion: ${data.empresa.porcentaje_contratacion}</p>
        <p>calificacion: ${data.empresa.calificacion}</p>
        <p>lugar: ${data.empresa.lugar}</p>
        <p>link: <a href="#">${data.empresa.link}</a></p>`;
    }, obj)
}

function colocarInfo(){
    let correo = document.getElementById("Correo");
    correo.value = data.usuario.correo;
    let nombre = document.getElementById("Nombre");
    let apellido = document.getElementById("Apellido");
    let ciudad = document.getElementById("Ciudad");
    let telefono = document.getElementById("Telefono");
    let genero = document.getElementById("Genero");
    let numero = document.getElementById("Numero");
    if(data.usuario.persona != null){
        nombre.value = data.usuario.persona.nombre_persona;
        apellido.value = data.usuario.persona.apellido_persona;
        ciudad.value = data.usuario.persona.ciudad;
        telefono.value = data.usuario.persona.telefono;
        if(data.usuario.persona.genero){
            genero.value = 1;
        }else{
            genero.value = 2;
        }
        numero.value = data.usuario.persona.numero;
    }

    let titulos = document.getElementById("Titulos");
    let certificados = document.getElementById("Certificados");
    let historias = document.getElementById("Historias");
    if(data.profesional != null){
        data.profesional.titulos.forEach(titulo => {
            titulos.innerHTML = `<button type="button" class="list-group-item list-group-item-action" data-bs-toggle="modal"
            data-bs-target="#infoCModal">${titulo.titulo}</button>`; 
        });
        data.profesional.certificados.forEach(certificado => {
            certificados.innerHTML = `<button type="button" class="list-group-item list-group-item-action" data-bs-toggle="modal"
            data-bs-target="#infoCModal">${certificado.certificado}</button>`; 
        });
        data.profesional.historiasLaborales.forEach(historia => {
            historias.innerHTML = `<tr data-bs-toggle="modal" data-bs-target="#infoHModal">
            <td>${historia.lugar}</td>
            <td>${historia.cargo}</td>
            <td>${historia.año}</td>
            </tr>`; 
        });
    }
    
}
colocarInfo();


function agregarTitulo(){
    let titulos = document.getElementById("Titulos");
    let input = document.getElementById("inputTitulo").value;
    titulos.innerHTML += `<button type="button" class="list-group-item list-group-item-action" data-bs-toggle="modal"
            data-bs-target="#infoTModal" onclick="seleccionarTitulo(event.target)">${input}</button>`; 
    if(data.profesional == null){
        data.profesional = {
            titulos: [{
                titulo: input
            }]
        };
    }else{
        if(data.profesional.titulos == null){
            data.profesional.titulos = [{
                titulo: input
            }]
        }else{
            data.profesional.titulos.push({
                titulo: input
            })
        }
        
    }
}

function agregarCertificado(){
    let certificados = document.getElementById("Certificados");
    let input = document.getElementById("inputCertificado").value;
    certificados.innerHTML += `<button type="button" class="list-group-item list-group-item-action" data-bs-toggle="modal"
            data-bs-target="#infoCModal" onclick="seleccionarCertificado(event.target)">${input}</button>`; 
    if(data.profesional == null){
        data.profesional = {
            certificados: [{
                certificado: input
            }]
        };
    }else{
        if(data.profesional.certificados == null){
            data.profesional.certificados = [{
                certificado: input
            }]
        }else{
            data.profesional.certificados.push({
                certificado: input
            })
        }
        
    }
}

function agregarHistoria(){
    let historias = document.getElementById("Historias");
    let lugar = document.getElementById("inputLugar").value;
    let cargo = document.getElementById("inputCargo").value;
    let año = document.getElementById("inputAño").value;
    historias.innerHTML += `<tr data-bs-toggle="modal" data-bs-target="#infoHModal" onclick="seleccionarHistoria(event.target)">
            <td>${lugar}</td>
            <td>${cargo}</td>
            <td>${año}</td>
        </tr>`; 
    if(data.profesional == null){
        data.profesional = {
            historiasLaborales: [{
                lugar: lugar,
                cargo: cargo,
                año: año
            }]
        };
    }else{
        if(data.profesional.historiasLaborales == null){
            data.profesional.historiasLaborales = [{
                lugar: lugar,
                cargo: cargo,
                año: año
            }]
        }else{
            data.profesional.historiasLaborales.push({
                lugar: lugar,
                cargo: cargo,
                año: año
            })
        }
        
    }
}

function seleccionarCertificado(target){
    certificadoActual = target;
}


function seleccionarTitulo(target){
    tituloActual = target;
    console.log(tituloActual);
    let input = document.getElementById("inputTituloE").value;
    input.value = tituloActual.textContent;
}



function editarTitulo(){
    let input = document.getElementById("inputTituloE").value;
    let objetoEditar = data.profesional.titulos.find(objeto => objeto.titulo === tituloActual.textContent);
    if (objetoEditar) {
        objetoEditar.titulo = input;
        tituloActual.id = input;
        tituloActual.textContent = input;
    }
}

function eliminarTitulo(){
    let indiceEliminar = data.profesional.titulos.find(objeto => objeto.titulo === tituloActual.textContent);
    if (indiceEliminar !== -1) {
        data.profesional.titulos.splice(indiceEliminar, 1);
        tituloActual.remove();
    }
}

function editarCertificado(){
    let input = document.getElementById("inputCertificadoE").value;
    let objetoEditar = data.profesional.certificados.find(objeto => objeto.certificado === certificadoActual.textContent);
    if (objetoEditar) {
        objetoEditar.certificado = input;
        certificadoActual.id = input;
        certificadoActual.textContent = input;
    }
}

function eliminarCertificado(){
    let indiceEliminar = data.profesional.certificados.find(objeto => objeto.certificado === certificadoActual.textContent);
    if (indiceEliminar !== -1) {
        data.profesional.certificados.splice(indiceEliminar, 1);
        certificadoActual.remove();
    }
}

function seleccionarHistoria(target){
    historiaActual = target.parentElement;
}

function editarHistoria(){
    let lugar = document.getElementById("inputLugarE").value;
    let cargo = document.getElementById("inputCargoE").value;
    let año = document.getElementById("inputAñoE").value;
    let objetoEditar = data.profesional.historiasLaborales.find(objeto => objeto.cargo === historiaActual.children[1].textContent);
    if (objetoEditar) {
        console.log(objetoEditar);
        objetoEditar.lugar = lugar;
        objetoEditar.cargo = cargo;
        objetoEditar.año = año;
        historiaActual.children[0].textContent = lugar;
        historiaActual.children[1].textContent = cargo;
        historiaActual.children[2].textContent = año;
    }
}

function eliminarHistoria(){
    let indiceEliminar = data.profesional.historiasLaborales.find(objeto => objeto.cargo === historiaActual.children[1].textContent);
    if (indiceEliminar !== -1) {
        data.profesional.historiasLaborales.splice(indiceEliminar, 1);
        historiaActual.remove();
    }
}

function editarInformacion(){
    let correo = document.getElementById("Correo");
    let nombre = document.getElementById("Nombre");
    let apellido = document.getElementById("Apellido");
    let ciudad = document.getElementById("Ciudad");
    let telefono = document.getElementById("Telefono");
    let genero = document.getElementById("Genero");
    let numero = document.getElementById("Numero");
    if(data.usuario.persona == null){
        data.usuario.persona = {
            
        }
        data.usuario.correo = correo.value;
        data.usuario.persona.nombre_persona = nombre.value;
        data.usuario.persona.apellido_persona = apellido.value;
        data.usuario.persona.ciudad = ciudad.value;
        data.usuario.persona.telefono = telefono.value;
        if(genero.value == 1){
            data.usuario.persona.genero = true;
        }else{
            data.usuario.persona.genero = false;
        }
        data.usuario.persona.numero = numero.value; 
    }else{
        data.usuario.correo = correo.value;
        data.usuario.persona.nombre_persona = nombre.value;
        data.usuario.persona.apellido_persona = apellido.value;
        data.usuario.persona.ciudad = ciudad.value;
        data.usuario.persona.telefono = telefono.value;
        if(genero.value == 1){
            data.usuario.persona.genero = true;
        }else{
            data.usuario.persona.genero = false;
        }
        data.usuario.persona.numero = numero.value; 
    }
    console.log(data);
}

function editarInfoEnBd(done){
    const result = fetch('http://localhost:9998/api', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => response.json())
        .then(data => {
            done(data)
        });
}

function postularse(){
    const result = fetch('http://localhost:9998/api/vacante/postularse/'+data.id_desempleado+'/'+vacanteSeleccionadaId, {
        method: 'POST'
    }).then(response => response.json())
        .then();
}

function ejecutarPostulacion(){
    try {
        if(data.usuario.correo == '' ||
            data.usuario.persona.nombre_persona == null ||
            data.usuario.persona.apellido_persona == '' ||
            data.usuario.persona.ciudad == '' ||
            data.usuario.persona.telefono == null ||
            data.usuario.persona.genero == null ||
            data.usuario.persona.numero == null){
            const aviso = document.createRange().createContextualFragment(/*html*/`
                <label class="fs-5 pt-2 text-center">complete su informacion personal</label>
            `);

            const main = document.getElementById("Mensaje");
            main.append(aviso);
        }else{
            postularse();
            let main = document.getElementById("Mensaje");
            main.innerHTML = `<label class="fs-5 pt-2 text-center">Su postulacion fue exitosa</label>`;
            actualizarDatos(dato =>{
                data = dato;
            })
            executeGetPostulaciones(); 
        }
    } catch (error) {
        const aviso = document.createRange().createContextualFragment(/*html*/`
            <label class="fs-5 pt-2 text-center">complete su informacion personal</label>
        `);

        const main = document.getElementById("Mensaje");
        main.append(aviso);
    }
    
}

function cerrarSesion() {
    sessionStorage.clear();
    window.location.href = "/Login/login.html";
}