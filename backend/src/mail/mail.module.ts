import path from 'path';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule as Mailer } from '@nestjs-modules/mailer';

import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    Mailer.forRoot({
      transport: {
        service: 'gmail',
      },
      template: {
        dir: './src/mail/templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
