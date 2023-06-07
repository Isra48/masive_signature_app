import { useState } from 'react'

import FirmaCorreo from './firma_correo'
import './App.css'

function App() {


  return (
    <>
    <div>
      <h1>Generador de Firmas masivo</h1>
      <p>(El archivo se teiene que subir en formato .csv)</p>
      <div className='contenedor_archivo'>
      
      
      </div>
      <FirmaCorreo />

    </div>

    </>
  )
}

export default App
