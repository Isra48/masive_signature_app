import React, { useState } from 'react';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';

const FirmaCorreo = () => {
  console.log('ya_funcionan_los_acentos')
  const [csvData, setCsvData] = useState([]);
  const [signatures, setSignatures] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        setCsvData(results.data);
      },
    });
  };

  const generateSignatures = () => {
    const generatedSignatures = csvData.map((row) => {
        const { Nombre, Apellido_Paterno, Apellido_Materno, Puesto, Estado, Pais, Telefono_Fijo, Ext, ClaveCel, Celular, Correo, Skype } = row;
         //Logica formato Telefono://
  function separarPorLaMitad(str) {
    let mitad = Math.floor(str.length / 2);
    let primeraMitad = str.slice(0, mitad);
    let segundaMitad = str.slice(mitad);
  
    return primeraMitad + " " + segundaMitad;
  }
  
         const signatureHTML = `
         <!DOCTYPE html>  <head>
         <meta charset="UTF-8">
       </head><html lang="en"><BODY style="font-size: 10pt; font-family: Tahoma, sans-serif"><table style="width: 430px; font-size: 10pt; font-family: Arial, sans-serif;" cellpadding="0" cellspacing="0"><tbody><tr></tr><tr><td style="margin-bottom: 10px;"><a href="http://www.seacargo.com/" target="_blank" rel="noopener"><img border="0" alt="línea" width="430" style="width:430px; height:2px; border:0; margin-bottom:5px; padding-top: 10px;" src="http://www.seacargo.com/LineaAzul.png"></a> </td></tr><tr><td style="font-size: 14pt; font-family: Tahoma; width: 511px; padding-bottom: 10px; vertical-align:top;margin-bottom: 10px; font-weight: 400;" valign="top"><span style="font-family: Helvetica; font-size: 9pt; color:#878787; font-weight: 500;"><span style="font-weight: 600; color:#0043F6;"> ${Nombre} ${Apellido_Paterno.toUpperCase()}</span> | <span style="color:red;"><strong>${Puesto}</strong></span> | ${Estado}, ${Pais} |<br>Phone: +(${ClaveCel}) ${separarPorLaMitad(Telefono_Fijo)} ext: ${Ext} | Mobile: +(${ClaveCel}) ${separarPorLaMitad(Celular)}   | <a   href="https://wa.me/${ClaveCel}${Celular}" target="_blank">WhatsApp</a> <br>Skype: ${Skype} | E-mail: <a href="mailto:${Correo}">${Correo}</span></td></tr><tr style="margin-bottom: 10px;"> <td style="margin-bottom: 10px;"><a href="http://www.seacargo.com/" target="_blank" rel="noopener"><img border="0" alt="logo" width="130" style="width:130px; height:71px; border:0; margin-bottom:5px; padding-top: 10px;" src="https://seacargo.com/wp-content/uploads/2023/05/Logo_firmas.png"></a></td></tr></tbody> </table></BODY></html>




      `;
      return { name: Nombre, apellidos: Apellido_Paterno, html: signatureHTML };
    });
    setSignatures(generatedSignatures);
  };

  const downloadAllSignatures = () => {
    const zip = new JSZip();
    signatures.forEach((signature) => {
      const { name, apellidos, html } = signature;
      zip.file(`${name}_${apellidos}_firma.html`, html);
    });
    zip.generateAsync({ type: 'blob', streamFiles: true })
      .then((content) => {
        saveAs(content, 'firmas.zip');
      });
     
  };

  return (
    <div className='contenedor_principal'>
     <div className='contenedor_file'>
     <input type="file" accept=".csv" onChange={handleFileUpload} />


     </div>
        <div className='contenedor_btns'>
        <button className='button-19' onClick={generateSignatures}>Generar Firmas</button>
      <button className='button-19' onClick={downloadAllSignatures}>Descargar Todas las Firmas</button>
      <a  className='button-19' href="https://drive.google.com/drive/folders/1nRTzxtH80r22iVCk9X_x0Ci3JkQvFim6?usp=sharing" Target="_blank">Template Excel</a>
      
        </div>
      <div className='contenedor_firma'>
        {signatures.map((signature, index) => (
          <div className='shadow' key={index} dangerouslySetInnerHTML={{ __html: signature.html }} />
        ))}
      </div>
    </div>
  );
};

export default FirmaCorreo;
