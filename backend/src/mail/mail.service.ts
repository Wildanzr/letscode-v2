import { loggerInfo } from '@/utils/common.util';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { Options } from 'nodemailer/lib/smtp-transport';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  private async setTransport(): Promise<void> {
    const OAuth2 = google.auth.OAuth2;
    const oauthClient = new OAuth2(
      process.env.GOOGLE_CLIENT_ID as string,
      process.env.GOOGLE_CLIENT_SECRET as string,
      'https://developers.google.com/oauthplayground',
    );

    oauthClient.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN as string,
    });

    const accessToken: string = await new Promise((resolve, reject) => {
      oauthClient.getAccessToken((err, token) => {
        if (err) {
          reject('Failed to create access token :(');
        }
        resolve(token);
      });
    });

    const config: Options = {
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.GOOGLE_EMAIL as string,
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        accessToken,
      },
    };

    this.mailerService.addTransporter('gmail', config);
  }

  public async sendActivationAccount(email: string): Promise<void> {
    try {
      await this.setTransport();
      await this.mailerService.sendMail({
        transporterName: 'gmail',
        to: email,
        from: process.env.GOOGLE_EMAIL as string,
        subject: 'Activation Account',
        template: 'activation',
        context: {
          link: 'http://localhost:3000/activate/1234567890',
          name: 'John Doe',
        },
      });

      loggerInfo(`Activation email sent to ${email}`);
    } catch (error) {
      // console.error(error);
      throw error;
    }
  }
}
