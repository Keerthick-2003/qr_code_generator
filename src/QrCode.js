import React from 'react'
import { useState } from 'react'

const QrCode = () => {

    const [img, setImg]=useState("")
    const [isLoading, setIsLoading]=useState(false)
    const [qrData, setQrData]=useState("keerthick")
    const [qrSize, setQrSize]=useState("150")

    async function QRGenerator() {
        setIsLoading(true);
        try{
            const url=`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrData)}&amp;size=${qrSize}x${qrSize}`;
            setImg(url)
        } catch(err){
            console.error(`Error generating QR Code ${err}`)
        } finally{
            setIsLoading(false)
        }
    }

function downloadQR(){
    fetch(img)
    .then((Response)=>Response.blob())
    .then((blob)=>{
        const link=document.createElement("a");
        link.href=URL.createObjectURL(blob);
        link.download="qrcode.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link)
    }).catch((err)=>{
        console.error(`Error downloading QR Code ${err}`)
    })
}

  return (
    <div className='app-container'>
        <h1>QR CODE GENERATOR</h1>
        {isLoading && <p>Please wait...</p>}
        {img && <img src={img} alt='qrcode' className='qr-code-image'></img>}
      <div>
        <label htmlFor='dataInput' className='input-label'>Enter The Data</label>
        <input type='text' id='dataInput' placeholder='Enter the link' value={qrData} onChange={(e)=>setQrData(e.target.value)}/>

        <label htmlFor='sizeInput' className='input-label'>Image Size (e.g., 150)</label>
        <input type='text' placeholder='Enter image size' value={qrSize} onChange={(e)=>setQrSize(e.target.value)}/>

        <button className='generate-btn' onClick={QRGenerator} disabled={isLoading}>Generate QR Code</button>
        <button className='download-btn' onClick={downloadQR}>Download QR Code</button>
      </div>
    </div>
  )
}

export default QrCode
