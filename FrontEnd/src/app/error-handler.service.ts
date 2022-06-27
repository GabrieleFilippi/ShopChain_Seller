import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  public static errorMessage: string;
  constructor() { }
  ShowError(error: number){
    if(error === 4001){
      ErrorHandlerService.errorMessage = "User rejected the request."
    }
    if( error === 4100){
      ErrorHandlerService.errorMessage = "The requested account and/or method has not been authorized by the user."
    }
    if(error === 4200){
      ErrorHandlerService.errorMessage = "The requested method is not supported by this Ethereum provider."
    }
    if(error === 4900){
      ErrorHandlerService.errorMessage = "The provider is disconnected from all chains."
    }
    if(error === 4901){
      ErrorHandlerService.errorMessage = "The provider is disconnected from the specified chain."
    }
    if(error === 32700){
      ErrorHandlerService.errorMessage = "Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text."
    }
    if(error === 32600){
      ErrorHandlerService.errorMessage = "The JSON sent is not a valid Request object."
    }
    if(error === 32601){
      ErrorHandlerService.errorMessage = "The method does not exist / is not available."
    }
    if(error === 32602){
      ErrorHandlerService.errorMessage = "Invalid method parameter(s)."
    }
    if(error === 32603){
      ErrorHandlerService.errorMessage = "Internal JSON-RPC error."
    }
    if(error === 32000){
      ErrorHandlerService.errorMessage = "Invalid input."
    }
    if(error === 32001){
      ErrorHandlerService.errorMessage = "Resource not found."
    }
    if(error === 32003){
      ErrorHandlerService.errorMessage = "Internal JSON-RPC error."
    }
    if(error === 32004){
      ErrorHandlerService.errorMessage = "Method not supported."
    }
    if(error === 32005){
      ErrorHandlerService.errorMessage = "Request limit exceeded."
    }
    else ErrorHandlerService.errorMessage = "Metamask Connection Error";
  }
}
