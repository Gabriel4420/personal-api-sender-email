import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';

class SendEmailDto {
  subject: string;
  message: string;
  phone: string;
  name: string;
  email: string;
}

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  async sendEmail(@Body() sendEmailDto: SendEmailDto) {
    return await this.emailService.sendEmail(
      sendEmailDto.subject,
      sendEmailDto.message,
      sendEmailDto.name,
      sendEmailDto.phone,
      sendEmailDto.email,

    );
  }
}