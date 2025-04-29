from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import httpx
import os
from datetime import datetime

router = APIRouter()

class OrderRequest(BaseModel):
    product_id: str
    amount: float
    customer_email: str
    customer_name: str

class PaymentResponse(BaseModel):
    order_id: str
    pix_qrcode: str
    pix_code: str
    expires_at: datetime

@router.post("/create-payment", response_model=PaymentResponse)
async def create_payment(order: OrderRequest):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://api.charge.com.br/transactions",
                json={
                    "amount": order.amount,
                    "payment_method": "pix",
                    "customer": {
                        "email": order.customer_email,
                        "name": order.customer_name
                    },
                    "expires_in": 3600  # 1 hora para pagar
                },
                headers={
                    "Authorization": f"Bearer {os.getenv('CHARGE_API_KEY')}"
                }
            )
            
            data = response.json()
            return {
                "order_id": data["id"],
                "pix_qrcode": data["pix"]["qrcode"],
                "pix_code": data["pix"]["code"],
                "expires_at": datetime.fromisoformat(data["expires_at"])
            }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/webhook")
async def payment_webhook(data: dict):
    # Lógica simples para processar o retorno do pagamento
    return {"status": "ok"} 