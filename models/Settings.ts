import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISettings extends Document {
  key: string;
  activeFestival: 'none' | 'diwali' | 'holi' | 'christmas' | 'new-year';
  announcementText: string;
  updatedAt: Date;
}

const SettingsSchema: Schema = new Schema({
  key: { type: String, required: true, unique: true, default: 'global' },
  activeFestival: { 
    type: String, 
    enum: ['none', 'diwali', 'holi', 'christmas', 'new-year'],
    default: 'none' 
  },
  announcementText: { type: String, default: "CELEBRATE FESTIVALS WITH SAPI'S PREMIUM COLLECTION - UP TO 25% OFF" },
}, { timestamps: true });

const Settings: Model<ISettings> = mongoose.models.Settings || mongoose.model<ISettings>('Settings', SettingsSchema);

export default Settings;
