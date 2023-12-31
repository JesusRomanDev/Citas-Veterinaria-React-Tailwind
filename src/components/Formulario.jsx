import React from 'react'
import { useState, useEffect } from 'react'
import Error from './Error'; //importando el componente para poder usarlo aqui

const Formulario = ({setPacientes, pacientes , paciente, setPaciente}) => {
    //Creando nuestro primer state
    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');

    //Generando un state mas para el error
    const [error, setError] = useState(false);

    //Declarando el useEffect para cuando se da click en editar y cambie el state de paciente
    useEffect(()=>{
        if(Object.keys(paciente).length > 0){ //si la longitud es mayor a 0
            //entonces aqui comienza a darle un nuevo valor a las variables y a ponerlas en ese input, ya que value="" es lo que se muestra en el HTML entonces si setNombre('Nero'), por lo tanto el value es value="Nero", entonces eso se imprime y se pone en el HTML en ese campo
            //Nota: aqui setNombre y los demas states no se declaran ya estan en este componente de Formulario, por lo tanto no son props, children ni su madre
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setFecha(paciente.fecha)
            setSintomas(paciente.sintomas)
        }
    }, [paciente])

    //Generando un ID para el objetoPaciente y pasarselo a Listado Pacientes en el metodo de MAP como PROP
    const generarId = () =>{
        const random = Math.random().toString(36).substr(2);
        const fecha = Date.now().toString(36);

        return random + fecha;
    }

    const handleSubmit = (e) =>{ //tambien le podemos pasar el evento
        e.preventDefault();
        //Validacion del Formulario
        if([nombre, propietario, email, fecha, sintomas].includes('')){ //generamos un arreglo con todas las variables para despues poder hacer uso de includes que este vacio
            console.log('Hay vacio');
            setError(true); //cambiamos el error a true
            return;
        }
        //Si no hay error, regresamos a false y le asignamos el paciente con el prop setPacientes
        setError(false);

        //Construyendo el Objeto para distintos pacientes
        const  objetoPaciente = {
            nombre,
            propietario,
            email,
            fecha,
            sintomas,
            // id: generarId() este se movio en el else de abajo
        }
        //console.log(objetoPaciente);

        //Si hay un id en paciente, entonces el state de paciente tiene algo y por lo tanto tiene un id
        if(paciente.id){
            //Editando el registro
            objetoPaciente.id = paciente.id; //el id que ya teniamos en el paciente, se lo asignamos a este nuevo objeto, ya que al borrarlo arriba, no tenemos ningun id y eso nos marcaria error
            console.log(paciente); //version anterior (por asi decirlo)
            console.log(objetoPaciente); //el ya editado

            //Creando un nuevo arreglo
            const pacientesActualizados = pacientes.map(pacienteState =>{
                return pacienteState.id === paciente.id ? objetoPaciente : pacienteState
            }) //vamos a iterar por todos los objetos de pacientes, vamos a encontrar que el id sea igual a paciente.id, y a retornar como valor ese nuevo objeto, al estar iterando uno por uno si no es igual PUES SOLO RETORNA EL MISMO OBJETO, NO LE HAGAS NADA

            setPacientes(pacientesActualizados);
            setPaciente({});

        }else{ //De otra manera, es que el state de paciente no tiene nada y es un nuevo registro
            //Nuevo registro
            objetoPaciente.id = generarId();
            setPacientes([...pacientes, objetoPaciente]); //le pasamos el objetoPaciente a setPacientes para que setPacientes modifique pacientes y agregue a su arreglo vacio el objetoPaciente, tomando en cuenta que le pasamos el spread tambien de los objetos ya existentes
        }

        //Reiniciar el formulario
        setNombre('');
        setPropietario('');
        setEmail('');
        setFecha('');
        setSintomas('')
    }

  return (
    <div className='md:w-1/2 lg:w-2/5 mx-5'>
        <h2 className='font-black text-3xl text-center'>
            Seguimiento Pacientes
        </h2>

        <p className='text-lg mt-5 text-center mb-10'>
            Añade Pacientes y {''}
            <span className='text-indigo-600 font-bold text-lg'>Administralos</span>
        </p>

        <form className='bg-white shadow-md rounded-lg py-10 px-5 mb-10' action="" onSubmit={handleSubmit}>

            {error && <Error mensaje={"Todos los campos son obligatorios"}/>} {/* haciendolo mas dinamico el error agregandole un prop con el mensaje de error, recordando pasarle ese prop en el archivo de Error */}
            
            <div className='mb-5'>
                <label className='block text-gray-700 uppercase font-bold' htmlFor="mascota">Nombre Mascota</label>

                <input 
                id='mascota'
                type="text" 
                placeholder='Nombre de la mascota'
                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                value={nombre}
                onChange={(e)=>setNombre(e.target.value)} /* cada que cambie este evento, la funcion setNombre va a editar la variable nombre */
                />
            </div>

            <div className='mb-5'>
                <label className='block text-gray-700 uppercase font-bold' htmlFor="propietario">Nombre Propietario</label>

                <input 
                id='propietario'
                type="text" 
                placeholder='Nombre del propietario'
                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                value={propietario}
                onChange={(e)=>setPropietario(e.target.value)}
                />
            </div>

            <div className='mb-5'>
                <label className='block text-gray-700 uppercase font-bold' htmlFor="email">Email</label>

                <input 
                id='email'
                type="email" 
                placeholder='Email contacto propietario'
                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />
            </div>

            <div className='mb-5'>
                <label className='block text-gray-700 uppercase font-bold' htmlFor="alta">Alta</label>

                <input 
                id='alta'
                type="date" 
                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                value={fecha}
                onChange={(e)=>setFecha(e.target.value)}
                />
            </div>

            <div className='mb-5'>
                <label className='block text-gray-700 uppercase font-bold' htmlFor="sintomas">Sintomas</label>

                <textarea 
                name="" 
                id="sintomas" 
                cols="30" rows="10" 
                placeholder='Describe los sintomas'
                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                value={sintomas}
                onChange={(e)=>setSintomas(e.target.value)}
                >
                </textarea>
            </div>
            <input type="submit" 
            className='bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors'
            value={ paciente.id ? 'Editar Paciente' : 'Agregar Paciente'}
            />
        </form>
    </div>
  )
}

export default Formulario
