class ApiError extends Error {
  statusCode: number;
  errors: any[];
 

  constructor(
    statusCode: number,
    message: string = "something went wrong",
    errors: any[] = [],

  ) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
   

    
  }
}

export default ApiError;
