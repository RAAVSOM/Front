function login(done) {
    let correo = document.getElementById('Correo').value;
    let clave = document.getElementById('Clave').value;

    const result = fetch('http://localhost:9998/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            correo: correo,
            clave: clave
        })
    }).then(response => response.json())
        .then(data => {
            console.log(data);
            done(data)
        });
}

function ejecutarLogin() {
    login(data => {
        console.log(data);
        if (data.tipo_usuario != 'Usuario o Contraseña Incorrectas') {
            if (data.tipo_usuario == 'desempleado') {
                loginDesempleado(data =>{
                    console.log(data);
                    sessionStorage.setItem("usuario", JSON.stringify(data));
                }, data)
                window.location.href = "Desempleado/desempleado.html";
            } else {
                loginContratista(data =>{
                    sessionStorage.setItem("usuario", JSON.stringify(data));
                }, data)
                window.location.href = "Contratista/contratista.html";
            }
        } else {
            const aviso = document.createRange().createContextualFragment(/*html*/`
                <label class="fs-5 pt-2 text-center">Usuario o contraseña Incorrectas</label>
            `);

            const main = document.getElementById("Form");
            main.append(aviso);
        }
    });
}

function ejecutarRegister() {
    register(data => {
        window.location.href = "Login/login.html";
    });
}


function register(done) {
    let correo = document.getElementById('Correo').value;
    let clave = document.getElementById('Clave').value;
    let claveConfirm = document.getElementById('Claveconfirm').value;

    if (clave == claveConfirm) {
        const result = fetch('http://localhost:9998/api/registrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                usuario: {
                    correo: correo,
                    clave: clave,
                    tipo_usuario: 'desempleado',
                    persona:{

                    },
                }
            })
        }).then(response => response.json())
            .then(data => {
                done(data)
            });
    } else {
        const aviso = document.createRange().createContextualFragment(/*html*/`
            <label class="fs-5 pt-2 text-center">Las contraseñas deben ser iguales</label>
        `);

        const main = document.getElementById("Form");
        main.append(aviso);
    }
}

function loginDesempleado(done, usuario) {
    const result = fetch('http://localhost:9998/api/desempleadoLog/'+usuario.id_usuario).then(response => response.json())
        .then(data => {
            console.log(data);
            done(data)
        });
}

function loginContratista(done, usuario) {
    const result = fetch('http://localhost:9998/api/contratista', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    }).then(response => response.json())
        .then(data => {
            done(data)
        });
}

