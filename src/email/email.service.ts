import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('SMTP_HOST'),
      port: this.configService.get('SMTP_PORT'),
      secure: false,
      auth: {
        user: this.configService.get('SMTP_USER'),
        pass: this.configService.get('SMTP_PASS'),
      },
      tls: {
        rejectUnauthorized: false, // This will help with SSL issues
      },
    });
  }

  async sendEmail( subject: string, message: string, name:string, phone:string, email:string) {
    try {
     const result = await this.transporter.sendMail({
        from: '"Portfolio Contact" <gabriel_rodrigues_perez@hotmail.com>',
        to: 'gabriel_rodrigues_perez@hotmail.com',
        subject: subject,
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h3 style="color: #3ddb80; border-bottom: 2px solid #3ddb80; padding-bottom: 10px;">Novo Contato Do Site</h3>
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; border-left: 4px solid #3ddb80;">
            <p style="margin: 10px 0;"><strong style="color: #3ddb80;">Nome:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong style="color: #3ddb80;">Telefone:</strong> ${phone}</p>
            <p style="margin: 10px 0;"><strong style="color: #3ddb80;">Email:</strong> ${email}</p>
            <p style="margin: 10px 0;"><strong style="color: #3ddb80;">Assunto:</strong> ${subject}</p>
            <p style="margin: 10px 0;"><strong style="color: #3ddb80;">Mensagem:</strong></p>
            <div style="background-color: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
              ${message}
            </div>
          </div>
        </div>
      `,
      });
      return result;
    } catch (error) {
      throw new Error(`Failed to send email: ${error.message}`);
    }
  }
}