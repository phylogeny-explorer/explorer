import mongoose from 'mongoose';

export default function(connection) {
  const SettingSchema = new mongoose.Schema({
    allowUserRegistration: {type: Boolean, default: false},
    allowUserConfirmation: {type: Boolean, default: false},
    allowUserInvitation: {type: Boolean, default: false},
    logoutUserAfterMinutesOfInactivity: {type: Number, default: 600},
    deactivateUserAfterDaysOfInactivity: {type: Number, default: 30},
  });

  return connection.model('Setting', SettingSchema);
}