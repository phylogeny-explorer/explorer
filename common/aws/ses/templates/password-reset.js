import fs from 'fs';

export default {
  "Template": {
    "TemplateName": "PasswordResetCode",
    "SubjectPart": "Password Reset -- Phylogeny Explorer",
    "HtmlPart": fs.readFileSync(__dirname+'/html/password-reset.html', {encoding: 'utf8'}),
    "TextPart": fs.readFileSync(__dirname+'/text/password-reset.txt', {encoding: 'utf8'})
  }
}