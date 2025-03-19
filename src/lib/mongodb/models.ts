import mongoose, { Schema } from 'mongoose';

// Définition du schéma pour les demandes de contact
const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Le nom est requis'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'L\'email est requis'],
      trim: true,
      lowercase: true,
    },
    model: {
      type: String,
      required: [true, 'Le modèle est requis'],
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'Le message est requis'],
      trim: true,
    },
    customization: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['new', 'in-progress', 'completed'],
      default: 'new',
    },
  },
  {
    timestamps: true,
  }
);

// Vérifier si le modèle existe déjà pour éviter les erreurs en développement
export const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema); 