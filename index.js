const dotenv = require('dotenv');
const axios = require('axios');
const cors = require('cors');
const bodyParse = require('body-parser');
const express = require('express');
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
var Tremol = require("./nodejs_tremol_loader").load(["./directapi/fp_core.js", "./fp.js"]);
var fp = new Tremol.FP();

//196.207.19.130 , 196.207.19.131 196.207.27.42



app.get('/', (req,res) => {    
 
        while (true) {
  fp.ServerSetSettings("http://localhost:4444/");
  fp.ServerSetDeviceTcpSettings("196.207.19.130", 8000, "Password");
  var device = fp.ServerFindDevice(); 
    if(device) {
        fp.ServerSetDeviceSerialSettings(device.serialPort, device.baudRate, false); //If FD is connected on serial port or USB
        fp.PrintDiagnostics(); 
    }
    else {
        console.log("Device not found");
    }
    try{
var status = fp.ReadStatus()
    console.log(status)
      if(status){
        res.send("Ok")
        break;
      }      
       
    if(!status){
       console.log('error');
       res.send('Check Log and Code')
    }
    
    res.send("Done")
    }catch(e){
      console.log(e)
    }
    
  }


})

app.post('/createReceipt', (req,res) => {
  payload = req.body  
    items = payload.items_list
  while(true){       
  fp.ServerSetSettings(req.headers.original);
  fp.ServerSetDeviceTcpSettings(req.headers.hostname, req.headers.port, req.headers.password);
  var device = fp.ServerFindDevice(); 
    if(device) {
        fp.ServerSetDeviceSerialSettings(device.serialPort, device.baudRate, false); //If FD is connected on serial port or USB
        fp.PrintDiagnostics(); 
    }
    else {
        console.log("Device not found");
    }
    try{
    const status = fp.ReadStatus()   
      if(status){       
        fp.OpenReceipt(1,"0000",Tremol.Enums.OptionFiscalReceiptPrintType); 
        for(const val of items) {
          let hscode = val.hscode ? val.hscode : " "  
        
        fp.SellPLUfromExtDB(val.stockitemname, Tremol.Enums.OptionVATClass.VAT_Class_A , val.rate,  " ",hscode," ",16, val.qty,0);
        console.log(val.stockitemname, Tremol.Enums.OptionVATClass.VAT_Class_A , val.rate,  " ",hscode," ",16, val.qty,0);        
    }  const close = fp.CloseReceipt()
      const dateTime = fp.ReadDateTime()
      console.log(close, dateTime) 
      var response = {close,dateTime}
      res.json(response) 
      break;      
      } 
} catch (error) {
  console.log(error);
   
} 
}
})


app.post('/createInvoice', (req,res) => {
  payload = req.body  
    items = payload.items_list
    while (true) {      
  fp.ServerSetSettings(req.headers.original);
  fp.ServerSetDeviceTcpSettings(req.headers.hostname, req.headers.port, req.headers.password);
  var device = fp.ServerFindDevice(); 
    if(device) {
        fp.ServerSetDeviceSerialSettings(device.serialPort, device.baudRate, false); //If FD is connected on serial port or USB
        fp.PrintDiagnostics(); 
    }
    else {
        console.log("Device not found");
    } 
    try{
      const status = fp.ReadStatus()
      if(status){               
        fp.OpenInvoiceWithFreeCustomerData("", payload.customer_pin,"","","","","","")
        for(const val of items) {
          let hscode = val.hscode ? val.hscode : " "  
        
        fp.SellPLUfromExtDB(val.stockitemname, Tremol.Enums.OptionVATClass.VAT_Class_A , val.rate,  " ",hscode," ",16, val.qty,0);
        console.log(val.stockitemname, Tremol.Enums.OptionVATClass.VAT_Class_A , val.rate,  " ",hscode," ",16, val.qty,0);        
    }      
      const close = fp.CloseReceipt()
      const dateTime = fp.ReadDateTime()
      console.log(close, dateTime) 
      var response = {close,dateTime}
      res.json(response)
        break;
      }      
    }  
    catch (error) {
  console.log(error);
   
} 
}})

app.post('/createCreditNote', (req,res) => {
  payload = req.body  
    items = payload.items_list
    while (true) {      
  fp.ServerSetSettings(req.headers.original);
  fp.ServerSetDeviceTcpSettings(req.headers.hostname, req.headers.port, req.headers.password);
  var device = fp.ServerFindDevice(); 
    if(device) {
        fp.ServerSetDeviceSerialSettings(device.serialPort, device.baudRate, false); //If FD is connected on serial port or USB
        fp.PrintDiagnostics(); 
    }
    else {
        console.log("Device not found");
    }
    try{
    const status = fp.ReadStatus()    
      if(status){               
        fp.OpenCreditNoteWithFreeCustomerData("", payload.customer_pin,"","","","",payload.rel_doc_number,"")
        for(const val of items) {
          let hscode = val.hscode ? val.hscode : " "         
        fp.SellPLUfromExtDB(val.stockitemname, Tremol.Enums.OptionVATClass.VAT_Class_A , val.rate,  " ",hscode," ",16, val.qty,0);
        console.log(val.stockitemname, Tremol.Enums.OptionVATClass.VAT_Class_A , val.rate,  " ",hscode," ",16, val.qty,0);
        const close = fp.CloseReceipt()
       const dateTime = fp.ReadDateTime()
      console.log(close, dateTime) 
      var response = {close,dateTime}
      res.json(response)
        break;        
    }        
   }} catch (error) {
        console.log(error)
            
      }
    }
})


app.post('/createDebitNote', (req,res) => {
  payload = req.body  
    items = payload.items_list
    while(true){
      
  fp.ServerSetSettings(req.headers.original);
  fp.ServerSetDeviceTcpSettings(req.headers.hostname, req.headers.port, req.headers.password);
  var device = fp.ServerFindDevice(); 
    if(device) {
        fp.ServerSetDeviceSerialSettings(device.serialPort, device.baudRate, false); //If FD is connected on serial port or USB
        fp.PrintDiagnostics(); 
    }
    else {
        console.log("Device not found");
    }
    try{
    const status = fp.ReadStatus()    
      if(status){
               
        fp.OpenDebitNoteWithFreeCustomerData("", payload.customer_pin,"","","","",payload.rel_doc_number,"")
        for(const val of items) {
          let hscode = val.hscode ? val.hscode : " "  
        
        fp.SellPLUfromExtDB(val.stockitemname, Tremol.Enums.OptionVATClass.VAT_Class_A , val.rate,  " ",hscode," ",16, val.qty,0);
        console.log(val.stockitemname, Tremol.Enums.OptionVATClass.VAT_Class_A , val.rate,  " ",hscode," ",16, val.qty,0);
        }
         const close = fp.CloseReceipt()
      const dateTime = fp.ReadDateTime()
      console.log(close, dateTime) 
      var response = {close,dateTime}
      res.json(response)        
        break;       
       }} catch (error) {
        console.log(error)             
      }
     
      }
})


app.listen(5000, () => {
  console.log('listen on port 3001')
})
