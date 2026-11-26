"use client"

import { useState, type FormEvent } from "react"
import emailjs from "@emailjs/browser"
import { Send } from "lucide-react"

export default function Contact() {
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
    <div className="form-pair"><label>Nama<input name="name" autoComplete="name" required/></label><label>Email<input type="email" name="email" autoComplete="email" required/></label></div>
    <label>Nama proyek atau topik<input name="subject" required/></label><label>Ceritakan idemu<textarea name="message" placeholder="Apa yang ingin kamu buat?" rows={3} required/></label>
    <button className="primary-action" disabled={status === "sending"}><Send size={15}/>{status === "sending" ? "Mengirim…" : "Kirim pesan"}</button>
    <p role="status">{status === "sent" ? "Pesanmu sudah terkirim. Terima kasih!" : status === "error" ? "Pesan belum terkirim. Coba lagi atau hubungi saya lewat email." : ""}</p>
  </form>
}
