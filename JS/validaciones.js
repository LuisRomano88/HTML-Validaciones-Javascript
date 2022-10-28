export function valida(input){
    const tipoDeInput = input.dataset.tipo;
    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input)
    }

    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    }else{
            input.parentElement.classList.add("input-container--invalid");
            input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);
    }
}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
];

const mensajesDeError = {
    nombre: {
        valueMissing: "Esta campo Nombre no puede estar vacio"
    },
    email: {
        valueMissing: "Esta campo Email no puede estar vacio",
        typeMismatch: "El Correo no es valido"
    },
    password: {
        valueMissing: "Esta campo Contraseña no puede estar vacio",
        patternMismatch: "Al menos 6 caracteres, maximo 12, debe contener una minuscula, una letra mayuscula, un numero y no puede contener caracteres especiales"
    },
    nacimiento: {
        valueMissing: "Esta campo no puede estar vacio ",
        CustomError: "Debe tener al menos 18 años de edad",
    },
    numero: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "El formato requerido es XXXXXXXXXX 10 numeros"
    },
    direccion: {
        valueMissing: "Este campo Direccion no puede estar vacio",
        patternMismatch: "la direccion debe contener entre 10 a 40 caracteres"
    },
    ciudad: {
        valueMissing: "Este campo Ciudad no puede estar vacio",
        patternMismatch: "La ciudad debe contener entre 10 a 40 caracteres"
    },
    estado: {
        valueMissing: "Este campo Estado no puede estar vacio",
        patternMismatch: "El estado debe contener entre 10 a 40 caracteres"
    }

};

const validadores = {
    nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput, input){
    let mensaje = " ";
    tipoDeErrores.forEach((error) => {
        if(input.validity[error]){
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    })
    return mensaje;
};

function validarNacimiento(input){
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if(!mayorEdad(fechaCliente)){
        mensaje = "Debes tener al menos 18 años";
    }
    input.setCustomValidity(mensaje);
};

function mayorEdad(fecha){
    const fechaActual = new Date();
    const diferenciasFechas = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
        );
    return diferenciasFechas <= fechaActual;
};