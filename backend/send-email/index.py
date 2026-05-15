import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправка заявки с сайта на почту avg-consult@mail.ru"""
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': ''
        }

    body = json.loads(event.get('body') or '{}')
    name = body.get('name', '')
    phone = body.get('phone', '')
    email = body.get('email', '')
    area = body.get('area', '')
    message = body.get('message', '')

    smtp_user = 'avg-consult@mail.ru'
    smtp_password = os.environ['SMTP_PASSWORD']

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Новая заявка с сайта: {name}'
    msg['From'] = smtp_user
    msg['To'] = smtp_user

    html = f"""
    <html><body style="font-family: Arial, sans-serif; color: #222; max-width: 600px;">
      <h2 style="color: #1a3560;">Новая заявка с сайта AVG-Consult</h2>
      <table style="width:100%; border-collapse:collapse;">
        <tr><td style="padding:8px; background:#f4f6fb; font-weight:bold; width:35%;">Имя</td><td style="padding:8px;">{name}</td></tr>
        <tr><td style="padding:8px; background:#f4f6fb; font-weight:bold;">Телефон</td><td style="padding:8px;">{phone}</td></tr>
        <tr><td style="padding:8px; background:#f4f6fb; font-weight:bold;">Email</td><td style="padding:8px;">{email or '—'}</td></tr>
        <tr><td style="padding:8px; background:#f4f6fb; font-weight:bold;">Область права</td><td style="padding:8px;">{area or '—'}</td></tr>
        <tr><td style="padding:8px; background:#f4f6fb; font-weight:bold;">Сообщение</td><td style="padding:8px;">{message or '—'}</td></tr>
      </table>
    </body></html>
    """

    msg.attach(MIMEText(html, 'html', 'utf-8'))

    with smtplib.SMTP_SSL('smtp.mail.ru', 465) as server:
        server.login(smtp_user, smtp_password)
        server.sendmail(smtp_user, smtp_user, msg.as_string())

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': True})
    }
