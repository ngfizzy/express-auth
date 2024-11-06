import { environment } from 'config';
import twilio from 'twilio';
import { tSender, tSrvs } from 'types';
import { srvcs } from 'utils';
import logger from 'utils/logger';

export class SMSService {
  private sender: tSender.Sender;
  constructor(sender: tSender.Sender) {
    this.sender = sender;
  }

  send(message: string, to: string) {
    return this.sender.send(message, to);
  }
}

export class DevSmsService implements tSender.Sender {
  async send(
    message: string,
    to: string,
    from = environment.twilio.phoneNumber,
  ): Promise<tSrvs.Result> {
    const smsMsg = `
==============================
    VERIFICATION MESSAGE
==============================
${message}
------------------------------
FROM: ${from}
TO: ${to}
SENT ON: ${new Date().toLocaleDateString()}`;

    logger.info(smsMsg);
    return srvcs.results.createOkResult('message sent successfully');
  }
}

export class TwilioSender implements tSender.Sender {
  private twilioClient = twilio(environment.twilio.accountSid, environment.twilio.authToken);

  async send(
    message: string,
    to: string,
    from = environment.twilio.phoneNumber,
  ): Promise<tSrvs.Result> {
    try {
      await this.twilioClient.messages.create({
        body: message,
        from,
        to,
      });

      return srvcs.results.createOkResult('message sent successfully');
    } catch (error) {
      return srvcs.results.createUnexpectedErrorResult('failed to send sms ', error);
    }
  }
}
