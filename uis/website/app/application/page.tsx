import type { Metadata } from "next";
import Link from "next/link";
import ApplicationForm from "./ApplicationForm";

export const metadata: Metadata = {
  title: "Aplicación",
  description:
    "Formulario de aplicación de Masa & Fuego para conocer tu perfil y recomendarte el programa de cocina ideal.",
};

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Masa & Fuego",
  url: "https://masayfuego.com",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "admissions",
    email: "hola@masayfuego.com",
    telephone: "+34-600-000-000",
  },
};

export default function ApplicationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />

      <header
        className="border-b border-slate-200 bg-white/80 backdrop-blur"
        aria-label="Cabecera del formulario"
      >
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-black tracking-tight text-amber-700">
            Masa &amp; Fuego
          </Link>
          <nav aria-label="Navegación" className="flex items-center gap-4 text-sm font-semibold">
            <Link href="/" className="text-slate-600 transition hover:text-amber-700">
              Landing
            </Link>
            <span aria-current="page" className="text-slate-900">
              Aplicación
            </span>
          </nav>
        </div>
      </header>

      <main
        className="mx-auto w-full max-w-5xl flex-1 px-6 py-10"
        aria-label="Formulario de aplicación"
      >
        <section className="mb-8">
          <h1 className="text-3xl font-black sm:text-4xl">Formulario de aplicación</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Cuéntanos sobre ti para evaluar tu perfil y ayudarte a entrar al
            programa que mejor se adapte a tus objetivos.
          </p>
        </section>

        <ApplicationForm />
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 px-6 py-6 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Masa &amp; Fuego</p>
          <Link href="/" className="font-semibold text-amber-700 hover:text-amber-800">
            Volver a la landing
          </Link>
        </div>
      </footer>
    </>
  );
}