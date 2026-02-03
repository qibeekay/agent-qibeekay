import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Send,
  Shield,
  AlertTriangle,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  Clock,
  Lock,
  ExternalLink,
} from "lucide-react";

// Define types for form data and API response
interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface EmailResponse {
  success: boolean;
  message?: string;
  error?: string;
}

const ContactSection = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [status, setStatus] = useState("idle");

  // Reni Mail API endpoint and configuration
  const RENI_MAIL_API_URL = import.meta.env.VITE_RENI_API_URL;
  const KEY = import.meta.env.VITE_BEARER_TOKEN;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("encrypting");
    setSubmitMessage("");

    try {
      // Prepare email content
      const emailBody = `
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #0f0f0f; padding: 20px; border-radius: 5px; color: white; }
              .field { margin-bottom: 15px; }
              .label { font-weight: bold; color: #dc2626; }
              .message { white-space: pre-wrap; background: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #dc2626; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2 style="color: #dc2626; margin-top: 0; font-family: monospace;">NEW INCOMING TRANSMISSION</h2>
                <p style="color: #ccc;">Encrypted transmission received from secure channel.</p>
              </div>
              
              <div class="field">
                <span class="label">AGENT ID:</span><br />
                ${formData.name}
              </div>
              
              <div class="field">
                <span class="label">SECURE LINE:</span><br />
                <a href="mailto:${formData.email}" style="color: #dc2626;">${formData.email}</a>
              </div>
              
              ${
                formData.phone
                  ? `
              <div class="field">
                <span class="label">CODEC:</span><br />
                ${formData.phone}
              </div>
              `
                  : ""
              }
              
              <div class="field">
                <span class="label">PRIORITY LEVEL:</span><br />
                ${formData.subject || "CLASSIFIED"}
              </div>
              
              <div class="field">
                <span class="label">INTEL CONTENT:</span>
                <div class="message">
                  ${formData.message.replace(/\n/g, "<br>")}
                </div>
              </div>
              
              <hr style="margin: 30px 0; border: none; border-top: 1px solid #333;" />
              <p style="color: #666; font-size: 12px; font-family: monospace;">
                TRANSMISSION TIME: ${new Date().toLocaleString()} UTC
              </p>
            </div>
          </body>
        </html>
      `;

      // Prepare the API request payload
      const payload = {
        email: "mokwechibuike7@gmail.com", // Your email to receive messages
        subject: `SECURE TRANSMISSION: ${formData.subject || "CLASSIFIED"} - ${formData.name}`,
        sender_name: `${formData.name} (via Secure Channel)`,
        reply_to: formData.email,
        reply_name: formData.name,
        body: emailBody,
        html: "true",
      };

      // Send email using Reni Mail API
      const response = await fetch(`${RENI_MAIL_API_URL}/sendSingleMail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${KEY}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Success - also send confirmation email to user
        await sendConfirmationEmail(formData.email, formData.name);

        setStatus("transmitted");
        setSubmitMessage(
          "TRANSMISSION SUCCESSFUL: Intel received and encrypted. Response in 24-48 hours.",
        );

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        throw new Error(result.error || "Transmission failed");
      }
    } catch (error) {
      console.error("Transmission error:", error);
      setStatus("error");
      setSubmitMessage(
        "TRANSMISSION FAILED: Secure channel compromised. Fallback to mokwechibuike7@gmail.com",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Send confirmation email to the user
  const sendConfirmationEmail = async (userEmail: string, userName: string) => {
    try {
      const confirmationPayload = {
        email: userEmail,
        subject: "TRANSMISSION CONFIRMED // INTELLIGENCE RECEIVED",
        sender_name: "Anugo Chibuike Mokwe",
        reply_to: "mokwechibuike7@gmail.com",
        reply_name: "Anugo Chibuike Mokwe",
        body: `
          <html>
            <head>
              <style>
                body { font-family: 'Courier New', monospace; line-height: 1.6; color: #ccc; background: #0f0f0f; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #1a1a1a; padding: 30px; text-align: center; border-left: 4px solid #dc2626; }
                .content { padding: 20px; }
                .highlight { color: #dc2626; font-weight: bold; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1 style="color: #dc2626; margin: 0; font-family: monospace;">// TRANSMISSION CONFIRMED //</h1>
                  <p style="color: #666; margin-top: 10px; font-size: 12px;">ENCRYPTION: 256-BIT AES</p>
                </div>
                
                <div class="content">
                  <p>AGENT ${userName},</p>
                  
                  <p>Your transmission has been <span class="highlight">successfully encrypted</span> and received at secure terminal. Response expected within <span class="highlight">24-48 hours</span>.</p>
                  
                  <p>Current status:</p>
                  <ul style="list-style: none; padding-left: 0;">
                    <li>✓ ENCRYPTION: ACTIVE</li>
                    <li>✓ AUTHENTICATION: VERIFIED</li>
                    <li>✓ TRANSMISSION: QUEUED</li>
                  </ul>
                  
                  <p><strong>SECURITY NOTICE:</strong> All communications are end-to-end encrypted. No data retention beyond mission parameters.</p>
                  
                  <p>Standing by,<br />
                  <strong>Secure Terminal // Chibuike</strong></p>
                  
                  <hr style="margin: 30px 0; border: none; border-top: 1px solid #333;" />
                  
                  <p style="color: #666; font-size: 10px; font-family: monospace;">
                    [SECURE TERMINAL DATA]<br />
                    EMAIL: mokwechibuike7@gmail.com<br />
                    STATUS: ACTIVE<br />
                    RESPONSE_WINDOW: 24-48H<br />
                    ENCRYPTION_PROTOCOL: AES-256-GCM
                  </p>
                </div>
              </div>
            </body>
          </html>
        `,
        html: "true",
      };

      await fetch(`${RENI_MAIL_API_URL}/sendSingleMail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${KEY}`,
        },
        body: JSON.stringify(confirmationPayload),
      });
    } catch (error) {
      console.error("Confirmation transmission failed:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="py-24 relative overflow-hidden border-t border-white/10">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-red-900/5 via-transparent to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Intel */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-neutral-900/50 border border-white/10 p-6">
              <div className="flex items-center gap-2 mb-6">
                <Lock className="w-4 h-4 text-red-500" />
                <h3 className="text-xs font-mono text-red-500 tracking-widest">
                  SECURE CHANNELS
                </h3>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-neutral-900 border border-white/10 p-3">
                    <Mail className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-neutral-500 mb-1">
                      PRIMARY_EMAIL
                    </p>
                    <a
                      href="mailto:mokwechibuike7@gmail.com"
                      className="text-sm text-white hover:text-red-500 transition-colors font-mono"
                    >
                      mokwechibuike7@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-neutral-900 border border-white/10 p-3">
                    <Phone className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-neutral-500 mb-1">
                      CODEC_PROTOCOL
                    </p>
                    <p className="text-sm text-neutral-400 font-mono">
                      [ENCRYPTED VOICE AVAILABLE]
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-neutral-900 border border-white/10 p-3">
                    <MapPin className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-neutral-500 mb-1">
                      TERMINAL_LOCATION
                    </p>
                    <p className="text-sm text-neutral-400">
                      Global Operations
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-neutral-900 border border-white/10 p-3">
                    <Clock className="w-5 h-5 text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-neutral-500 mb-1">
                      RESPONSE_WINDOW
                    </p>
                    <p className="text-sm text-white">24-48 HOURS</p>
                    <p className="text-xs text-neutral-600 mt-1 font-mono">
                      UTC +1 // ACTIVE HOURS
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-red-950/20 border border-red-500/20 p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-red-500 mb-2 font-mono">
                    SECURITY PROTOCOL
                  </h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    All transmissions are 256-bit encrypted. For priority
                    clearance, use subject code "OMEGA". Unauthorized access
                    triggers immediate security protocols.
                  </p>
                </div>
              </div>
            </div>

            {/* Response Time Display */}
            <div className="bg-neutral-900/30 border border-white/5 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-neutral-500">
                  CURRENT_STATUS
                </span>
                <span className="text-xs font-mono text-green-500 bg-green-500/10 px-2 py-1">
                  TRANSMISSION_READY
                </span>
              </div>
              <div className="mt-2 h-1 bg-neutral-800">
                <div className="h-full w-full bg-linear-to-r from-red-600 to-red-400 animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Transmission Form */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="bg-neutral-900/30 border border-white/10 relative overflow-hidden"
            >
              {/* Top border effect */}
              <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-red-600 via-red-500 to-transparent" />

              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-red-500"></div>
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-red-500"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-red-500"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-red-500"></div>

              <div className="p-8">
                {status === "transmitted" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center"
                  >
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2 font-mono">
                      TRANSMISSION COMPLETE
                    </h3>
                    <p className="text-neutral-400 text-sm mb-6">
                      Your intel has been encrypted and queued for review.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setStatus("idle");
                        setSubmitMessage("");
                      }}
                      className="text-xs font-mono text-red-500 hover:text-red-400 bg-neutral-900/50 px-4 py-2 border border-white/10 hover:border-red-500/50 transition-colors"
                    >
                      [ INITIATE_NEW_TRANSMISSION ]
                    </button>
                  </motion.div>
                ) : (
                  <div className="space-y-6">
                    {/* Form Header */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="w-4 h-4 text-red-500" />
                        <span className="text-xs font-mono text-red-500 tracking-widest">
                          SECURE TRANSMISSION FORM
                        </span>
                      </div>
                      <h2 className="text-2xl font-bold text-white mb-2">
                        INITIATE CONTACT PROTOCOL
                      </h2>
                      <p className="text-neutral-400 text-sm">
                        All fields require encryption clearance. Transmission
                        logs are automatically purged.
                      </p>
                    </div>

                    {/* Name and Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-mono text-neutral-500 mb-2 tracking-wider">
                          AGENT_ID [NAME] *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full bg-neutral-950 border border-white/10 rounded-none px-4 py-3 text-white font-mono text-sm focus:border-red-500 focus:outline-none transition-colors"
                          placeholder="Enter identifier..."
                          disabled={isSubmitting}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-neutral-500 mb-2 tracking-wider">
                          SECURE_LINE [EMAIL] *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full bg-neutral-950 border border-white/10 rounded-none px-4 py-3 text-white font-mono text-sm focus:border-red-500 focus:outline-none transition-colors"
                          placeholder="user@domain.com"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-mono text-neutral-500 mb-2 tracking-wider">
                        CODEC [PHONE] (OPTIONAL)
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-neutral-950 border border-white/10 rounded-none px-4 py-3 text-white font-mono text-sm focus:border-red-500 focus:outline-none transition-colors"
                        placeholder="+[COUNTRY_CODE] [NUMBER]"
                        disabled={isSubmitting}
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="block text-xs font-mono text-neutral-500 mb-2 tracking-wider">
                        PRIORITY_LEVEL [SUBJECT] *
                      </label>
                      <select
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full bg-neutral-950 border border-white/10 rounded-none px-4 py-3 text-white font-mono text-sm focus:border-red-500 focus:outline-none transition-colors appearance-none cursor-pointer"
                        disabled={isSubmitting}
                      >
                        <option value="">Select clearance level...</option>
                        <option value="OMEGA">OMEGA - Critical Mission</option>
                        <option value="ALPHA">ALPHA - Project Inquiry</option>
                        <option value="BETA">BETA - Collaboration</option>
                        <option value="GAMMA">GAMMA - General Intel</option>
                        <option value="CLASSIFIED">CLASSIFIED - Secure</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-mono text-neutral-500 mb-2 tracking-wider">
                        INTEL_CONTENT [MESSAGE] *
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full bg-neutral-950 border border-white/10 rounded-none px-4 py-3 text-white font-mono text-sm focus:border-red-500 focus:outline-none transition-colors resize-none"
                        placeholder="Enter classified details..."
                        disabled={isSubmitting}
                      />
                    </div>

                    {/* Security Notice */}
                    <div className="bg-red-950/20 border border-red-500/20 p-4">
                      <p className="text-xs text-neutral-400 leading-relaxed">
                        <span className="text-red-500 font-bold">
                          SECURITY NOTICE:
                        </span>{" "}
                        All transmissions are end-to-end encrypted. No data is
                        stored or shared with third parties. Response guaranteed
                        within 24-48 hours.
                      </p>
                    </div>

                    {/* Status Message */}
                    {submitMessage && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-4 border ${
                          status === "transmitted"
                            ? "bg-green-500/10 border-green-500/30 text-green-400"
                            : status === "error"
                              ? "bg-red-500/10 border-red-500/30 text-red-400"
                              : "bg-blue-500/10 border-blue-500/30 text-blue-400"
                        }`}
                      >
                        <p className="text-sm font-mono">{submitMessage}</p>
                      </motion.div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting || status === "encrypting"}
                      className="w-full group relative overflow-hidden bg-red-600 hover:bg-red-700 text-white py-4 font-bold tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-size-[250%_250%] animate-shimmer" />
                      <span className="relative flex items-center justify-center gap-2 font-mono">
                        {isSubmitting ? (
                          <>
                            <Shield className="w-4 h-4 animate-pulse" />
                            ENCRYPTING TRANSMISSION...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            INITIATE TRANSMISSION
                          </>
                        )}
                      </span>
                    </button>

                    {/* Transmission Footer */}
                    <div className="pt-4 border-t border-white/10">
                      <p className="text-xs text-center text-neutral-500 font-mono">
                        TRANSMISSION_PROTOCOL: AES-256-GCM // RESPONSE_WINDOW:
                        24-48H
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
