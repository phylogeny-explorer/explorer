/*!
 * Phylogeny Explorer
 *
 * @summary
 * @author John Ropas
 * @since 06/10/2016
 *
 * Copyright(c) 2016 Phylogeny Explorer
 */

import Modules from '../modules';
import Setting from 'common/databases/admin/models/setting';
import AccessControl from '../middleware/AccessControl';

class SettingController extends Modules.Controller {
  constructor() {
    super(AccessControl);
  }

  saveSettings(req, res, next) {
    Setting.find({}, (err, settings) => {
      if (err) {
        next(err);
      }

      let setting = {};

      if (settings.length > 0) {
        setting = settings[0];
      } else {
        setting = new Setting();
      }

      setting.allowUserRegistration = req.body.allowUserRegistration;
      setting.allowUserConfirmation = req.body.allowUserConfirmation;
      setting.allowUserInvitation = req.body.allowUserInvitation;
      setting.logoutUserAfterMinutesOfInactivity = req.body.logoutUserAfterMinutesOfInactivity;
      setting.deactivateUserAfterDaysOfInactivity = req.body.deactivateUserAfterDaysOfInactivity;
      setting.save(err2 => this.handleResponse(res, next, err2, setting));
    });
  }

  getSettings(req, res, next) {
    Setting.find({}, (err, settings) => {
      if (err) {
        next(err);
      }

      let setting = {};

      if (settings.length > 0) {
        setting = settings[0];
      } else {
        setting = new Setting();
        setting.save();
      }
      this.handleResponse(res, next, err, setting);
    });
  }
}

export default SettingController;
