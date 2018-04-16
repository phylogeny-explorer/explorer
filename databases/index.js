import adminDb from './admin';
import publicDb from './public';

export default {
  Admin: adminDb,
  Public: publicDb,
  Models: {
    ...adminDb.Models,
    ...publicDb.Models
  }
};