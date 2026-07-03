import { useState } from 'react'
import { z } from 'zod'
import { PageHero } from '@/components/site/PageHero'
import { toast } from 'sonner'
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react'

const schema = z.object({
  name: z.string().trim().min(2, 'Please share your name').max(100),
  email: z.string().trim().email('A valid email helps us reply').max(255),
  company: z.string().trim().max(120).optional().or(z.literal('')),
  interest: z.string().min(1, 'Pick one so we can route your note'),
  quantity: z.string().trim().max(120).optional().or(z.literal('')),
  message: z.string().trim().min(10, 'Tell us a little more').max(1000),
})

const interests = ['Paddy / Rice', 'Coconut', 'Areca Nut', 'Mango / Jackfruit', 'Fish / Prawn', 'Timber', 'Farm visit', 'Other']

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', company: '', interest: '', quantity: '', message: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)

  const update = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }))

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = schema.safeParse(form)
    if (!result.success) {
      const fe: Record<string, string> = {}
      result.error.issues.forEach((i) => { fe[i.path[0] as string] = i.message })
      setErrors(fe)
      return
    }
    setErrors({})
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 700))
    setSubmitting(false)
    toast.success('Thanks — we\'ll be in touch within a day.')
    setForm({ name: '', email: '', company: '', interest: '', quantity: '', message: '' })
  }

  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title="Come visit. Or send a note."
        subtitle="Bulk buyers, restaurants, co-ops and curious neighbours — we'd love to hear from you."
        image="https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1600&q=80"
        height="h-[50vh] min-h-[360px]"
      />

      <section className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-5 gap-10">
        {/* Contact info + map */}
        <aside className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-border p-6 bg-farm-cream/40">
            <h2 className="font-bagel text-2xl mb-5">Farm details</h2>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="w-4 h-4 mt-1 text-farm-leaf-dark shrink-0" />
                <div>
                  <div className="font-semibold">Semmaram Farm</div>
                  <div className="text-muted-foreground">Kavery Valley, near Erode, Tamil Nadu 638001, India</div>
                </div>
              </li>
              <li className="flex gap-3">
                <Phone className="w-4 h-4 mt-1 text-farm-leaf-dark shrink-0" />
                <a href="tel:+919876543210" className="hover:text-farm-leaf-dark gentle-animation">+91 98765 43210</a>
              </li>
              <li className="flex gap-3">
                <Mail className="w-4 h-4 mt-1 text-farm-leaf-dark shrink-0" />
                <a href="mailto:hello@semmaram.farm" className="hover:text-farm-leaf-dark gentle-animation">hello@semmaram.farm</a>
              </li>
              <li className="flex gap-3">
                <Clock className="w-4 h-4 mt-1 text-farm-leaf-dark shrink-0" />
                <div className="text-muted-foreground">Mon – Sat · 7am – 6pm</div>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl overflow-hidden border border-border aspect-[4/3]">
            <iframe
              title="Farm location"
              src="https://www.openstreetmap.org/export/embed.html?bbox=77.65%2C11.30%2C77.80%2C11.40&layer=mapnik&marker=11.35%2C77.72"
              className="w-full h-full"
              loading="lazy"
            />
          </div>
        </aside>

        {/* Form */}
        <form onSubmit={onSubmit} className="lg:col-span-3 rounded-2xl border border-border p-6 sm:p-8 bg-background space-y-5">
          <div>
            <h2 className="font-bagel text-3xl">Bulk & wholesale enquiry</h2>
            <p className="text-muted-foreground mt-2 text-sm">Share a little about what you're after and we'll respond within a day.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Your name" error={errors.name}>
              <input value={form.name} onChange={(e) => update('name', e.target.value)} className="input" placeholder="Full name" maxLength={100} />
            </Field>
            <Field label="Email" error={errors.email}>
              <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} className="input" placeholder="you@company.com" maxLength={255} />
            </Field>
          </div>

          <Field label="Company / Organisation" error={errors.company}>
            <input value={form.company} onChange={(e) => update('company', e.target.value)} className="input" placeholder="Optional" maxLength={120} />
          </Field>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="I'm interested in" error={errors.interest}>
              <select value={form.interest} onChange={(e) => update('interest', e.target.value)} className="input">
                <option value="">Select a category</option>
                {interests.map((i) => <option key={i} value={i}>{i}</option>)}
              </select>
            </Field>
            <Field label="Approx. quantity" error={errors.quantity}>
              <input value={form.quantity} onChange={(e) => update('quantity', e.target.value)} className="input" placeholder="e.g. 500 kg / month" maxLength={120} />
            </Field>
          </div>

          <Field label="Your message" error={errors.message}>
            <textarea value={form.message} onChange={(e) => update('message', e.target.value)} rows={5} className="input resize-none" placeholder="Tell us what you're looking for, delivery timelines, etc." maxLength={1000} />
          </Field>

          <button
            type="submit"
            disabled={submitting}
            className="w-full sm:w-auto inline-flex items-center gap-2 bg-farm-leaf hover:bg-farm-leaf-dark disabled:opacity-60 text-white font-semibold px-7 py-3.5 rounded-full gentle-animation hover:scale-[1.02]"
          >
            {submitting ? 'Sending…' : (<>Send enquiry <Send className="w-4 h-4" /></>)}
          </button>
        </form>
      </section>
    </>
  )
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-foreground/80">{label}</span>
      <div className="mt-1.5">{children}</div>
      {error && <span className="text-xs text-destructive mt-1 block">{error}</span>}
    </label>
  )
}
