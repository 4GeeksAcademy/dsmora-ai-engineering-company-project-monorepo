"use client";

import { FormEvent, useMemo, useRef, useState } from "react";

type FormValues = {
  fullName: string;
  email: string;
  phone: string;
  birthDate: string;
  city: string;
  experienceLevel: string;
  interestArea: string;
  schedule: string;
  motivation: string;
  goals: string;
  allergies: string;
  acceptTerms: boolean;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;
type StatusType = "success" | "error";

const initialValues: FormValues = {
  fullName: "",
  email: "",
  phone: "",
  birthDate: "",
  city: "",
  experienceLevel: "",
  interestArea: "",
  schedule: "",
  motivation: "",
  goals: "",
  allergies: "",
  acceptTerms: false,
};

const fieldOrder: Array<keyof FormValues> = [
  "fullName",
  "email",
  "phone",
  "birthDate",
  "city",
  "experienceLevel",
  "interestArea",
  "schedule",
  "motivation",
  "goals",
  "acceptTerms",
];

export default function ApplicationForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<{ type: StatusType; message: string } | null>(
    null,
  );
  const fieldRefs = useRef<
    Partial<
      Record<
        keyof FormValues,
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    >
  >({});

  const statusClasses = useMemo(() => {
    if (!status) {
      return "hidden";
    }

    if (status.type === "success") {
      return "mb-6 rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm text-emerald-800";
    }

    return "mb-6 rounded-xl border border-rose-300 bg-rose-50 px-4 py-3 text-sm text-rose-800";
  }, [status]);

  function validateField(name: keyof FormValues, formValues: FormValues): string {
    const value = formValues[name];
    const textValue = typeof value === "string" ? value : "";

    switch (name) {
      case "fullName":
        return textValue.trim().length >= 3
          ? ""
          : "Escribe tu nombre completo (mínimo 3 caracteres).";
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(textValue.trim())
          ? ""
          : "Introduce un correo electrónico válido.";
      case "phone":
        return /^\+?[0-9\s()-]{8,20}$/.test(textValue.trim())
          ? ""
          : "Introduce un teléfono válido (8 a 20 caracteres numéricos).";
      case "birthDate": {
        if (!textValue) {
          return "Debes tener al menos 16 años para aplicar.";
        }

        const selectedDate = new Date(textValue);
        if (Number.isNaN(selectedDate.getTime())) {
          return "Debes tener al menos 16 años para aplicar.";
        }

        const today = new Date();
        const minAgeDate = new Date(
          today.getFullYear() - 16,
          today.getMonth(),
          today.getDate(),
        );

        return selectedDate <= minAgeDate
          ? ""
          : "Debes tener al menos 16 años para aplicar.";
      }
      case "city":
        return textValue.trim().length >= 2
          ? ""
          : "Indica tu ciudad de residencia.";
      case "experienceLevel":
        return textValue.trim() !== ""
          ? ""
          : "Selecciona tu nivel de experiencia.";
      case "interestArea":
        return textValue.trim() !== ""
          ? ""
          : "Selecciona un área de interés principal.";
      case "schedule":
        return textValue.trim() !== ""
          ? ""
          : "Selecciona tu disponibilidad horaria.";
      case "motivation":
        return textValue.trim().length >= 30
          ? ""
          : "Explica tu motivación con al menos 30 caracteres.";
      case "goals":
        return textValue.trim().length >= 20
          ? ""
          : "Describe tu objetivo principal con al menos 20 caracteres.";
      case "acceptTerms":
        return formValues.acceptTerms
          ? ""
          : "Debes aceptar el uso de datos para continuar.";
      default:
        return "";
    }
  }

  function validateAll(formValues: FormValues): FormErrors {
    const nextErrors: FormErrors = {};

    for (const field of fieldOrder) {
      const fieldError = validateField(field, formValues);
      if (fieldError) {
        nextErrors[field] = fieldError;
      }
    }

    return nextErrors;
  }

  function updateValue<K extends keyof FormValues>(name: K, value: FormValues[K]) {
    setValues((current) => {
      const nextValues = { ...current, [name]: value };

      setErrors((currentErrors) => {
        const fieldError = validateField(name, nextValues);
        if (!fieldError) {
          if (!currentErrors[name]) {
            return currentErrors;
          }
          const nextErrors = { ...currentErrors };
          delete nextErrors[name];
          return nextErrors;
        }
        return { ...currentErrors, [name]: fieldError };
      });

      return nextValues;
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateAll(values);
    setErrors(nextErrors);

    const firstInvalidField = fieldOrder.find((field) => Boolean(nextErrors[field]));

    if (firstInvalidField) {
      setStatus({
        type: "error",
        message:
          "Revisa los campos marcados. Hay información incompleta o inválida.",
      });
      fieldRefs.current[firstInvalidField]?.focus();
      return;
    }

    setStatus({
      type: "success",
      message:
        "Tu aplicación fue validada correctamente. En un entorno real, aquí se enviaría al servidor.",
    });
    setValues(initialValues);
    setErrors({});
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div id="formStatus" className={statusClasses} role="status" aria-live="polite">
        {status?.message ?? ""}
      </div>

      <form id="applicationForm" noValidate className="grid gap-6" onSubmit={handleSubmit}>
        <fieldset className="grid gap-4">
          <legend className="mb-2 text-lg font-bold text-slate-900">Datos personales</legend>

          <div>
            <label htmlFor="fullName" className="mb-1 block text-sm font-semibold">
              Nombre completo *
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              className={`w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 ${
                errors.fullName
                  ? "border-rose-500 focus:border-rose-500 focus:ring-rose-200"
                  : "border-slate-300 focus:border-amber-500 focus:ring-amber-200"
              }`}
              aria-describedby="fullNameError"
              aria-invalid={errors.fullName ? "true" : "false"}
              value={values.fullName}
              onInput={(event) => updateValue("fullName", event.currentTarget.value)}
              ref={(element) => {
                if (element) {
                  fieldRefs.current.fullName = element;
                }
              }}
            />
            <p id="fullNameError" className="mt-1 text-sm text-rose-600">
              {errors.fullName ?? ""}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-semibold">
                Correo electrónico *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className={`w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "border-rose-500 focus:border-rose-500 focus:ring-rose-200"
                    : "border-slate-300 focus:border-amber-500 focus:ring-amber-200"
                }`}
                aria-describedby="emailError"
                aria-invalid={errors.email ? "true" : "false"}
                value={values.email}
                onInput={(event) => updateValue("email", event.currentTarget.value)}
                ref={(element) => {
                  if (element) {
                    fieldRefs.current.email = element;
                  }
                }}
              />
              <p id="emailError" className="mt-1 text-sm text-rose-600">
                {errors.email ?? ""}
              </p>
            </div>

            <div>
              <label htmlFor="phone" className="mb-1 block text-sm font-semibold">
                Teléfono *
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                className={`w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 ${
                  errors.phone
                    ? "border-rose-500 focus:border-rose-500 focus:ring-rose-200"
                    : "border-slate-300 focus:border-amber-500 focus:ring-amber-200"
                }`}
                aria-describedby="phoneError"
                aria-invalid={errors.phone ? "true" : "false"}
                value={values.phone}
                onInput={(event) => updateValue("phone", event.currentTarget.value)}
                ref={(element) => {
                  if (element) {
                    fieldRefs.current.phone = element;
                  }
                }}
              />
              <p id="phoneError" className="mt-1 text-sm text-rose-600">
                {errors.phone ?? ""}
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="birthDate" className="mb-1 block text-sm font-semibold">
                Fecha de nacimiento *
              </label>
              <input
                id="birthDate"
                name="birthDate"
                type="date"
                className={`w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 ${
                  errors.birthDate
                    ? "border-rose-500 focus:border-rose-500 focus:ring-rose-200"
                    : "border-slate-300 focus:border-amber-500 focus:ring-amber-200"
                }`}
                aria-describedby="birthDateError"
                aria-invalid={errors.birthDate ? "true" : "false"}
                value={values.birthDate}
                onInput={(event) => updateValue("birthDate", event.currentTarget.value)}
                ref={(element) => {
                  if (element) {
                    fieldRefs.current.birthDate = element;
                  }
                }}
              />
              <p id="birthDateError" className="mt-1 text-sm text-rose-600">
                {errors.birthDate ?? ""}
              </p>
            </div>

            <div>
              <label htmlFor="city" className="mb-1 block text-sm font-semibold">
                Ciudad de residencia *
              </label>
              <input
                id="city"
                name="city"
                type="text"
                autoComplete="address-level2"
                className={`w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 ${
                  errors.city
                    ? "border-rose-500 focus:border-rose-500 focus:ring-rose-200"
                    : "border-slate-300 focus:border-amber-500 focus:ring-amber-200"
                }`}
                aria-describedby="cityError"
                aria-invalid={errors.city ? "true" : "false"}
                value={values.city}
                onInput={(event) => updateValue("city", event.currentTarget.value)}
                ref={(element) => {
                  if (element) {
                    fieldRefs.current.city = element;
                  }
                }}
              />
              <p id="cityError" className="mt-1 text-sm text-rose-600">
                {errors.city ?? ""}
              </p>
            </div>
          </div>
        </fieldset>

        <fieldset className="grid gap-4 border-t border-slate-200 pt-6">
          <legend className="mb-2 text-lg font-bold text-slate-900">
            Perfil culinario y aplicación
          </legend>

          <div>
            <label
              htmlFor="experienceLevel"
              className="mb-1 block text-sm font-semibold"
            >
              Nivel de experiencia en cocina *
            </label>
            <select
              id="experienceLevel"
              name="experienceLevel"
              className={`w-full rounded-xl border bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 ${
                errors.experienceLevel
                  ? "border-rose-500 focus:border-rose-500 focus:ring-rose-200"
                  : "border-slate-300 focus:border-amber-500 focus:ring-amber-200"
              }`}
              aria-describedby="experienceLevelError"
              aria-invalid={errors.experienceLevel ? "true" : "false"}
              value={values.experienceLevel}
              onChange={(event) =>
                updateValue("experienceLevel", event.currentTarget.value)
              }
              ref={(element) => {
                if (element) {
                  fieldRefs.current.experienceLevel = element;
                }
              }}
            >
              <option value="">Selecciona una opción</option>
              <option value="beginner">Principiante</option>
              <option value="intermediate">Intermedio</option>
              <option value="advanced">Avanzado</option>
              <option value="professional">Profesional en activo</option>
            </select>
            <p id="experienceLevelError" className="mt-1 text-sm text-rose-600">
              {errors.experienceLevel ?? ""}
            </p>
          </div>

          <div>
            <label htmlFor="interestArea" className="mb-1 block text-sm font-semibold">
              Área de interés principal *
            </label>
            <select
              id="interestArea"
              name="interestArea"
              className={`w-full rounded-xl border bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 ${
                errors.interestArea
                  ? "border-rose-500 focus:border-rose-500 focus:ring-rose-200"
                  : "border-slate-300 focus:border-amber-500 focus:ring-amber-200"
              }`}
              aria-describedby="interestAreaError"
              aria-invalid={errors.interestArea ? "true" : "false"}
              value={values.interestArea}
              onChange={(event) => updateValue("interestArea", event.currentTarget.value)}
              ref={(element) => {
                if (element) {
                  fieldRefs.current.interestArea = element;
                }
              }}
            >
              <option value="">Selecciona una opción</option>
              <option value="bakery">Panadería y masas</option>
              <option value="pastry">Pastelería</option>
              <option value="hot-kitchen">Cocina caliente</option>
              <option value="healthy">Cocina saludable</option>
              <option value="entrepreneurship">Emprendimiento gastronómico</option>
            </select>
            <p id="interestAreaError" className="mt-1 text-sm text-rose-600">
              {errors.interestArea ?? ""}
            </p>
          </div>

          <div>
            <label htmlFor="schedule" className="mb-1 block text-sm font-semibold">
              Disponibilidad horaria *
            </label>
            <select
              id="schedule"
              name="schedule"
              className={`w-full rounded-xl border bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 ${
                errors.schedule
                  ? "border-rose-500 focus:border-rose-500 focus:ring-rose-200"
                  : "border-slate-300 focus:border-amber-500 focus:ring-amber-200"
              }`}
              aria-describedby="scheduleError"
              aria-invalid={errors.schedule ? "true" : "false"}
              value={values.schedule}
              onChange={(event) => updateValue("schedule", event.currentTarget.value)}
              ref={(element) => {
                if (element) {
                  fieldRefs.current.schedule = element;
                }
              }}
            >
              <option value="">Selecciona una opción</option>
              <option value="weekdays-morning">Lunes a viernes - Mañana</option>
              <option value="weekdays-evening">Lunes a viernes - Tarde/Noche</option>
              <option value="weekend">Fines de semana</option>
              <option value="flexible">Flexible</option>
            </select>
            <p id="scheduleError" className="mt-1 text-sm text-rose-600">
              {errors.schedule ?? ""}
            </p>
          </div>

          <div>
            <label htmlFor="motivation" className="mb-1 block text-sm font-semibold">
              ¿Por qué quieres formarte con nosotros? *
            </label>
            <textarea
              id="motivation"
              name="motivation"
              rows={4}
              className={`w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 ${
                errors.motivation
                  ? "border-rose-500 focus:border-rose-500 focus:ring-rose-200"
                  : "border-slate-300 focus:border-amber-500 focus:ring-amber-200"
              }`}
              aria-describedby="motivationError"
              aria-invalid={errors.motivation ? "true" : "false"}
              value={values.motivation}
              onInput={(event) => updateValue("motivation", event.currentTarget.value)}
              ref={(element) => {
                if (element) {
                  fieldRefs.current.motivation = element;
                }
              }}
            />
            <p id="motivationError" className="mt-1 text-sm text-rose-600">
              {errors.motivation ?? ""}
            </p>
          </div>

          <div>
            <label htmlFor="goals" className="mb-1 block text-sm font-semibold">
              Objetivo principal (académico/profesional) *
            </label>
            <textarea
              id="goals"
              name="goals"
              rows={3}
              className={`w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 ${
                errors.goals
                  ? "border-rose-500 focus:border-rose-500 focus:ring-rose-200"
                  : "border-slate-300 focus:border-amber-500 focus:ring-amber-200"
              }`}
              aria-describedby="goalsError"
              aria-invalid={errors.goals ? "true" : "false"}
              value={values.goals}
              onInput={(event) => updateValue("goals", event.currentTarget.value)}
              ref={(element) => {
                if (element) {
                  fieldRefs.current.goals = element;
                }
              }}
            />
            <p id="goalsError" className="mt-1 text-sm text-rose-600">
              {errors.goals ?? ""}
            </p>
          </div>

          <div>
            <label htmlFor="allergies" className="mb-1 block text-sm font-semibold">
              Alergias o restricciones alimentarias (opcional)
            </label>
            <textarea
              id="allergies"
              name="allergies"
              rows={2}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200"
              value={values.allergies}
              onInput={(event) => updateValue("allergies", event.currentTarget.value)}
            />
          </div>
        </fieldset>

        <fieldset className="grid gap-4 border-t border-slate-200 pt-6">
          <legend className="mb-2 text-lg font-bold text-slate-900">Consentimiento</legend>
          <div>
            <label
              className="inline-flex items-start gap-3 text-sm text-slate-700"
              htmlFor="acceptTerms"
            >
              <input
                id="acceptTerms"
                name="acceptTerms"
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                aria-describedby="acceptTermsError"
                aria-invalid={errors.acceptTerms ? "true" : "false"}
                checked={values.acceptTerms}
                onChange={(event) =>
                  updateValue("acceptTerms", event.currentTarget.checked)
                }
                ref={(element) => {
                  if (element) {
                    fieldRefs.current.acceptTerms = element;
                  }
                }}
              />
              <span>
                Acepto que mis datos sean usados para gestionar mi aplicación y
                recibir información de programas. *
              </span>
            </label>
            <p id="acceptTermsError" className="mt-1 text-sm text-rose-600">
              {errors.acceptTerms ?? ""}
            </p>
          </div>
        </fieldset>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">* Campos obligatorios</p>
          <button
            type="submit"
            className="rounded-full bg-slate-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
          >
            Enviar aplicación
          </button>
        </div>
      </form>
    </section>
  );
}