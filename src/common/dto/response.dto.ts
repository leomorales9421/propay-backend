export class ResponseDto<T> {
    success: boolean;
    data: T | null;  // Permite que 'data' sea de tipo 'T' o 'null'
    message: string;
    statusCode: number; // Nuevo atributo para el código de estado
  
    constructor(success: boolean, data: T | null, message: string, statusCode: number) {
      this.success = success;
      this.data = data;
      this.message = message;
      this.statusCode = statusCode;
    }
  
    static success<T>(data: T | null = null, message: string = '', statusCode: number = 200): ResponseDto<T> {
      return new ResponseDto<T>(true, data, message, statusCode);
    }
  
    static error<T>(message: string = 'Hubo un error', data: T | null = null, statusCode: number = 500): ResponseDto<T> {
      return new ResponseDto<T>(false, data, message, statusCode);
    }
  }
