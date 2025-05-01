from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import httpx
import os
from datetime import datetime
import json

router = APIRouter()

class OrderRequest(BaseModel):
    product_id: str
    amount: float
    customer_email: str

class PaymentResponse(BaseModel):
    order_id: str
    pix_qrcode: str
    pix_code: str
    expires_at: datetime

@router.post("/create-payment", response_model=PaymentResponse)
async def create_payment(order: OrderRequest):
    try:
        # Verificar se a chave API está configurada
        api_key = os.getenv('CHARGE_API_KEY')
        if not api_key:
            raise HTTPException(status_code=500, detail="API key não configurada")

        # Preparar payload
        payload = {
            "amount": order.amount,
            "payment_method": "pix",
            "customer": {
                "email": order.customer_email
            },
            "expires_in": 3600  # 1 hora para pagar
        }

        print(f"Enviando requisição para API com payload: {json.dumps(payload)}")

        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://api.charge.com.br/transactions",
                json=payload,
                headers={
                    "Authorization": f"Bearer {api_key}",
                    "Content-Type": "application/json"
                }
            )
            
            print(f"Status da resposta: {response.status_code}")
            print(f"Headers da resposta: {dict(response.headers)}")
            
            if not response.is_success:
                error_detail = f"Erro na API de pagamento: {response.status_code}"
                try:
                    error_data = response.json()
                    error_detail += f" - {json.dumps(error_data)}"
                except:
                    error_detail += f" - {response.text}"
                raise HTTPException(status_code=response.status_code, detail=error_detail)
            
            try:
                data = response.json()
                print(f"Resposta da API: {json.dumps(data)}")
                
                return {
                    "order_id": data["id"],
                    "pix_qrcode": data["pix"]["qrcode"],
                    "pix_code": data["pix"]["code"],
                    "expires_at": datetime.fromisoformat(data["expires_at"])
                }
            except json.JSONDecodeError as e:
                print(f"Erro ao decodificar JSON: {str(e)}")
                print(f"Conteúdo da resposta: {response.text}")
                raise HTTPException(status_code=500, detail="Erro ao processar resposta da API")
            except KeyError as e:
                print(f"Campo não encontrado na resposta: {str(e)}")
                raise HTTPException(status_code=500, detail=f"Campo obrigatório não encontrado na resposta: {str(e)}")
    except httpx.RequestError as e:
        print(f"Erro na requisição HTTP: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Erro ao conectar com a API: {str(e)}")
    except Exception as e:
        print(f"Erro inesperado: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Erro interno: {str(e)}")

@router.post("/webhook")
async def payment_webhook(data: dict):
    print(f"Webhook recebido: {json.dumps(data)}")
    return {"status": "ok"} 