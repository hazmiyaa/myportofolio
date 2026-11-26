"use client"

import { useLanguage } from "./language"

import { useState, type FormEvent } from "react"
import emailjs from "@emailjs/browser"
import { Send } from "lucide-react"

export default function Contact() {
  const { t } = useLanguage()
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === "sending") return
    const form = event.currentTarget
    const data = new FormData(form)
    setStatus("sending")
    try {
      await emailjs.send("service_5k3w5sh", "template_sofk02g", {
        name: data.get("name"), email: data.get("email"), title: data.get("subject"),
        message: data.get("message"), time: new Date().toLocaleString("id-ID"),
      }, "pKxm77G7tIpQD3beH")
      form.reset()
      setStatus("sent")
    } catch { setStatus("error") }
  }
  return <form className="contact-form" onSubmit={submit}>
    <div className="form-pair"><label>{t("Nama", "Name")}<input name="name" autoComplete="name" required/></label><label>Email<input type="email" name="email" autoComplete="email" required/></label></div>
    <label>{t("Nama proyek atau topik", "Project or subject")}<input name="subject" required/></label><label>{t("Ceritakan idemu", "Tell me about your idea")}<textarea name="message" placeholder={t("Apa yang ingin kamu buat?", "What would you like to make?")} rows={3} required/></label>
    <button className="primary-action" disabled={status === "sending"}><Send size={15}/>{status === "sending" ? t("Mengirim…", "Sending…") : t("Kirim pesan", "Send message")}</button>
    <p role="status">{status === "sent" ? t("Pesanmu sudah terkirim. Terima kasih!", "Got your message. Thanks!") : status === "error" ? t("Pesan belum terkirim. Coba lagi atau hubungi saya lewat email.", "Your message didn’t go through. Try again or email me.") : ""}</p>
  </form>
}
