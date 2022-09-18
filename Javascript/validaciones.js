export function valida(input) {
    const tipoDeInput = input.dataset.tipo;


    //Aca dice que si el objeto Validadores, tiene el tipo de input enviado, que validadores le envie al, TIPO DE INPUT, el input en cuestion.    
    if(validadadores[tipoDeInput]){

        validadadores[tipoDeInput](input)

    }

    // if(input.validity.valueMissing) {
    //     console.log('El input no puede estar vacio.')
    // }


    //De esta manera decimos que si el validador del input es true, o false, quite o agregue la clase container invalid, que colocara el borde del input en color rojo
    if(input.validity.valid) {

        input.parentElement.classList.remove('input-container--invalid')
        //Aca seleccionamos el mensaje span, el del mensaje del Error.
        input.parentElement.querySelector('.input-message-error').innerHTML = ""


    }else {

        input.parentElement.classList.add('input-container--invalid')
        //En caso de que exista un error de validacion, vamos a llamar a una funcion para mostrar un mensaje de error a traves del SPAN.
        input.parentElement.querySelector('.input-message-error').innerHTML = mostrarMensajeError(tipoDeInput,input)
    }

    
}

const tipoDeErrores = [

    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError',

]




//Aca creamos mensajes custom para distintos tipos de errores

const mensajesDeError = {

    nombre : { 
        valueMissing : 'El campo Nombre no puede estar vacio'


    },

    email : {

        valueMissing : 'El campo Email no puede estar vacio',

        typeMismatch : 'El correo no es valido'
    },

    password : {
        valueMissing : 'El campo Password no puede estar vacio',

        patternMismatch : "La contrasenha debe tener al menos 6 caracteres y solo se admiten letras y numeros"


    },

    nacimiento : {

        valueMissing : 'El campo Fecha de nacimiento no puede estar vacio',
        customError : 'Debe ser mayor de edad para poder registarse'
    },

    numero : {
        
        valueMissing : 'El campo numero telefonico no puede estar vacio',

        patternMismatch : "El formato requerido es (XXXXX) - (XXXXX)"
    },

    direccion : {

        valueMissing : 'El campo Direccion no puede estar vacio',

        patternMismatch : "El minimo de caracteres es de 5 y el maximo de caracteres para direccion son 40"

    },

    ciudad : {

        valueMissing : 'El campo Ciudad no puede estar vacio',

        patternMismatch : "El minimo de caracteres es de 5 y el maximo de caracteres para ciudad son 15"

    },

    estado : {

        valueMissing : 'El campo Estado no puede estar vacio',

        patternMismatch : "El minimo de caracteres es de 5 y el maximo de caracteres para estado son 15"

    }



}




const validadadores = {

    nacimiento : input => validarNacimiento(input)
}


function mostrarMensajeError(tipodeinput, input) {
    let mensaje = ''
    //Con este forEach, recorremos el arrays de tipoDeErrores creado
    tipoDeErrores.forEach ( error =>{

        if(input.validity[error]){

            mensaje = mensajesDeError[tipodeinput][error]


        }
    })


    return mensaje

}



// const date = document.querySelector('#birth');


// date.addEventListener('blur',(evento)=>{

//     validarNacimiento(evento.target)

// })


function validarNacimiento (input) {

    const fechaCliente = new Date (input.value);
    const validacion = mayorDeEdad(fechaCliente)

    let mensaje = ''

    if(validacion) {

        mensaje = ('Debe ser mayor de edad para poder registarse')
    }

    input.setCustomValidity(mensaje)
}

function mayorDeEdad(fecha) {

    const fechaActual = new Date()
    const diferenciaFechas = new Date(fecha.getUTCFullYear()+ 18, fecha.getUTCMonth(), fecha.getUTCDate())

    
    return diferenciaFechas > fechaActual;

}




