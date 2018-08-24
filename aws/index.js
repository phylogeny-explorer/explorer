import FileManager from './s3/FileManager';
import EmailManager from './ses/EmailManager';

export const S3 = new FileManager();
export const SES = new EmailManager();