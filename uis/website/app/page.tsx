import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Masa & Fuego | Escuela de Cocina",
  description:
    "Masa & Fuego es una escuela de cocina local que transforma tu pasión por la gastronomía en habilidades reales con clases prácticas y docentes expertos.",
  keywords: [
    "escuela de cocina",
    "clases de cocina",
    "cursos de gastronomía",
    "formación culinaria",
  ],
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Masa & Fuego",
  description:
    "Escuela de cocina local con enfoque práctico para desarrollar habilidades culinarias.",
  url: "https://masayfuego.com",
  telephone: "+34-600-000-000",
  email: "hola@masayfuego.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Calle Sabor 123",
    addressLocality: "Madrid",
    postalCode: "28001",
    addressCountry: "ES",
  },
  sameAs: [
    "https://www.instagram.com/masayfuego",
    "https://www.linkedin.com/company/masayfuego",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <header
        className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur"
        aria-label="Cabecera principal"
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <Link
            href="/"
            className="text-xl font-black tracking-tight text-amber-700"
            aria-label="Ir al inicio de Masa y Fuego"
          >
            Masa &amp; Fuego
          </Link>
          <nav aria-label="Navegación principal" className="hidden gap-8 md:flex">
            <Link
              href="#inicio"
              className="text-sm font-semibold text-slate-700 transition hover:text-amber-700"
            >
              Inicio
            </Link>
            <Link
              href="#beneficios"
              className="text-sm font-semibold text-slate-700 transition hover:text-amber-700"
            >
              Beneficios
            </Link>
            <Link
              href="#contacto"
              className="text-sm font-semibold text-slate-700 transition hover:text-amber-700"
            >
              Contacto
            </Link>
            <Link
              href="/application"
              className="rounded-full bg-amber-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-amber-700"
              aria-label="Abrir formulario de aplicación"
            >
              Aplicar ahora
            </Link>
          </nav>
          <Link
            href="/application"
            className="rounded-full bg-amber-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-amber-700 md:hidden"
            aria-label="Abrir formulario de aplicación"
          >
            Aplicar
          </Link>
        </div>
      </header>

      <main id="inicio" className="flex-1">
        <section className="relative overflow-hidden" aria-label="Sección principal">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-100 via-orange-50 to-rose-100" />
          <div
            className="absolute -left-16 top-20 h-56 w-56 rounded-full bg-amber-300/40 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-rose-300/30 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
            <div>
              <p className="mb-4 inline-flex rounded-full border border-amber-300 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-amber-800">
                Escuela de cocina local
              </p>
              <h1 className="text-4xl font-black leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Convierte tu pasión en técnica con Masa &amp; Fuego
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-700">
                Formamos a personas que quieren cocinar mejor, profesionalizarse o
                emprender en gastronomía. Nuestras clases combinan práctica real,
                acompañamiento experto y una metodología enfocada en resultados.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/application"
                  className="rounded-full bg-slate-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
                >
                  Completar aplicación
                </Link>
                <Link
                  href="#beneficios"
                  className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-700 transition hover:border-slate-400"
                >
                  Conocer beneficios
                </Link>
              </div>
            </div>

            <figure className="overflow-hidden rounded-3xl border border-white/60 bg-white/70 shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80"
                alt="Chef guiando una clase práctica de cocina"
                className="h-full w-full object-cover"
                width={1200}
                height={800}
                loading="lazy"
              />
            </figure>
          </div>
        </section>

        <section
          id="beneficios"
          className="mx-auto max-w-7xl px-6 py-16 lg:px-8"
          aria-label="Beneficios principales"
        >
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-black text-slate-900 sm:text-4xl">
              Por qué elegirnos
            </h2>
            <p className="mt-4 text-slate-600">
              Nuestra experiencia en el sector gastronómico nos permite diseñar un
              proceso de aprendizaje sólido, cercano y aplicable desde el primer
              día.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900">
                Enfoque 100% práctico
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Aprendes haciendo: técnicas, mise en place y ejecución de recetas
                con estándares profesionales.
              </p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900">
                Mentores del sector
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Formadores con trayectoria en cocinas reales que te acompañan con
                feedback personalizado.
              </p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900">
                Programas flexibles
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Opciones entre semana y fines de semana para que avances sin frenar
                tu ritmo de vida.
              </p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900">
                Comunidad y networking
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Conectas con personas apasionadas por la cocina y oportunidades de
                colaboración.
              </p>
            </article>
          </div>
        </section>

        <section
          id="contacto"
          className="border-y border-slate-200 bg-white"
          aria-label="Contacto y llamado a la acción"
        >
          <div className="mx-auto grid max-w-7xl gap-8 px-6 py-14 lg:grid-cols-2 lg:px-8">
            <div>
              <h2 className="text-3xl font-black text-slate-900">
                Da el siguiente paso en tu camino culinario
              </h2>
              <p className="mt-4 text-slate-700">
                Completa tu aplicación y nuestro equipo académico revisará tu
                perfil para orientarte sobre el programa ideal.
              </p>
            </div>
            <div className="flex flex-col justify-center gap-3 text-sm text-slate-700">
              <p>
                <span className="font-bold">Teléfono:</span> +34 600 000 000
              </p>
              <p>
                <span className="font-bold">Email:</span> hola@masayfuego.com
              </p>
              <p>
                <span className="font-bold">Horario:</span> Lunes a Viernes,
                09:00 - 18:00
              </p>
              <Link
                href="/application"
                className="mt-3 inline-flex w-fit rounded-full bg-amber-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-amber-700"
              >
                Ir al formulario
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900" aria-label="Pie de página">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-sm text-slate-300 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>© 2026 Masa &amp; Fuego. Todos los derechos reservados.</p>
          <nav aria-label="Enlaces del pie" className="flex gap-4">
            <Link href="/" className="transition hover:text-white">
              Inicio
            </Link>
            <Link href="/application" className="transition hover:text-white">
              Aplicación
            </Link>
            <a href="mailto:hola@masayfuego.com" className="transition hover:text-white">
              Contacto
            </a>
          </nav>
        </div>
      </footer>
    </>
  );
}
