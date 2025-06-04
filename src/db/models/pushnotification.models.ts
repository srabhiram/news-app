import mongoose, { Schema } from 'mongoose';

const PushSubscriptionSchema = new Schema({
  endpoint: { type: String, required: true },
  keys: {
    p256dh: { type: String, required: true },
    auth: { type: String, required: true },
  },
  deviceId: { type: String, required: true }, // Optional: to identify devices
});

export const PushSubscription = mongoose.models.PushSubscription || mongoose.model('PushSubscription', PushSubscriptionSchema);