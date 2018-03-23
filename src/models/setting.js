/*!
 * Phylogeny Explorer
 *
 * @summary Setting schema definition
 * @author John Ropas
 * @since 05/10/2016
 *
 * Copyright(c) 2016 Phylogeny Explorer
 */

import mongoose from 'mongoose';

/**
 * Setting schema definition
 */
const SettingSchema = new mongoose.Schema({
  allowUserRegistration: { type: Boolean, default: false },
  allowUserConfirmation: { type: Boolean, default: false },
  allowUserInvitation: { type: Boolean, default: false },
  logoutUserAfterMinutesOfInactivity: { type: Number, default: 600 },
  deactivateUserAfterDaysOfInactivity: { type: Number, default: 30 },
});

export default mongoose.model('Setting', SettingSchema);
