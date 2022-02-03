  
export class realTimeModel {
    public "type": string;
    public "id": string;
    public "data": {
      "product": string,
      "side": string,
      "quantity": string | number,
      "type": string,
      "slippage": number,
      "retries": number
    }
}

export class clickedModel {
    public "type": string;
    public "id": string;
    public "data": {
      "product": string,
      "side": string,
      "quantity": string | number,
      "price": string | number,
      "type": string,
      "time_in_force": string,
      "slippage": number,
      "retries": number,
    }
  }

export class responseModel {
    public "type": string;
    public "error": string;
    public "content": {
      "fx_rate": string,
      "status": string,
      "quantity": string | number,
      "side": string,
      "price": string | number,
      "executed_at": string,
      "type": string,
      "product": string,
    };
    public "message": string;
    public "last_update": string;
}