const form = document.getElementById('applicationForm');
const formStatus = document.getElementById('formStatus');

const fields = {
  fullName: {
    input: document.getElementById('fullName'),
    error: document.getElementById('fullNameError'),
    validate: (value) => value.trim().length >= 3,
    message: 'Escribe tu nombre completo (mínimo 3 caracteres).'
  },
  email: {
    input: document.getElementById('email'),
    error: document.getElementById('emailError'),
    validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim()),
    message: 'Introduce un correo electrónico válido.'
  },
  phone: {
    input: document.getElementById('phone'),
    error: document.getElementById('phoneError'),
    validate: (value) => /^\+?[0-9\s()-]{8,20}$/.test(value.trim()),
    message: 'Introduce un teléfono válido (8 a 20 caracteres numéricos).'
  },
  birthDate: {
    input: document.getElementById('birthDate'),
    error: document.getElementById('birthDateError'),
    validate: (value) => {
      if (!value) return false;
      const selectedDate = new Date(value);
      const today = new Date();
      const minAgeDate = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate());
      return selectedDate <= minAgeDate;
    },
    message: 'Debes tener al menos 16 años para aplicar.'
  },
  city: {
    input: document.getElementById('city'),
    error: document.getElementById('cityError'),
    validate: (value) => value.trim().length >= 2,
    message: 'Indica tu ciudad de residencia.'
  },
  experienceLevel: {
    input: document.getElementById('experienceLevel'),
    error: document.getElementById('experienceLevelError'),
    validate: (value) => value.trim() !== '',
    message: 'Selecciona tu nivel de experiencia.'
  },
  interestArea: {
    input: document.getElementById('interestArea'),
    error: document.getElementById('interestAreaError'),
    validate: (value) => value.trim() !== '',
    message: 'Selecciona un área de interés principal.'
  },
  schedule: {
    input: document.getElementById('schedule'),
    error: document.getElementById('scheduleError'),
    validate: (value) => value.trim() !== '',
    message: 'Selecciona tu disponibilidad horaria.'
  },
  motivation: {
    input: document.getElementById('motivation'),
    error: document.getElementById('motivationError'),
    validate: (value) => value.trim().length >= 30,
    message: 'Explica tu motivación con al menos 30 caracteres.'
  },
  goals: {
    input: document.getElementById('goals'),
    error: document.getElementById('goalsError'),
    validate: (value) => value.trim().length >= 20,
    message: 'Describe tu objetivo principal con al menos 20 caracteres.'
  },
  acceptTerms: {
    input: document.getElementById('acceptTerms'),
    error: document.getElementById('acceptTermsError'),
    validate: (_, input) => input.checked,
    message: 'Debes aceptar el uso de datos para continuar.'
  }
};

function showError(fieldName, message) {
  const field = fields[fieldName];
  field.error.textContent = message;
  field.error.classList.remove('hidden');
  field.input.classList.add('border-rose-500', 'focus:border-rose-500', 'focus:ring-rose-200');
  field.input.setAttribute('aria-invalid', 'true');
}

function clearError(fieldName) {
  const field = fields[fieldName];
  field.error.textContent = '';
  field.error.classList.add('hidden');
  field.input.classList.remove('border-rose-500', 'focus:border-rose-500', 'focus:ring-rose-200');
  field.input.removeAttribute('aria-invalid');
}

function validateField(fieldName) {
  const field = fields[fieldName];
  const value = field.input.type === 'checkbox' ? '' : field.input.value;
  const isValid = field.validate(value, field.input);

  if (!isValid) {
    showError(fieldName, field.message);
    return false;
  }

  clearError(fieldName);
  return true;
}

function setStatus(type, message) {
  formStatus.textContent = message;
  formStatus.classList.remove('hidden', 'border-emerald-300', 'bg-emerald-50', 'text-emerald-800', 'border-rose-300', 'bg-rose-50', 'text-rose-800');

  if (type === 'success') {
    formStatus.classList.add('border-emerald-300', 'bg-emerald-50', 'text-emerald-800');
  } else {
    formStatus.classList.add('border-rose-300', 'bg-rose-50', 'text-rose-800');
  }
}

Object.keys(fields).forEach((fieldName) => {
  const field = fields[fieldName];
  const eventName = field.input.type === 'checkbox' || field.input.tagName === 'SELECT' ? 'change' : 'input';

  field.input.addEventListener(eventName, () => {
    validateField(fieldName);
  });
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  let firstInvalidInput = null;
  let isFormValid = true;

  Object.keys(fields).forEach((fieldName) => {
    const valid = validateField(fieldName);
    if (!valid && !firstInvalidInput) {
      firstInvalidInput = fields[fieldName].input;
    }
    if (!valid) {
      isFormValid = false;
    }
  });

  if (!isFormValid) {
    setStatus('error', 'Revisa los campos marcados. Hay información incompleta o inválida.');
    if (firstInvalidInput) {
      firstInvalidInput.focus();
    }
    return;
  }

  setStatus('success', 'Tu aplicación fue validada correctamente. En un entorno real, aquí se enviaría al servidor.');
  form.reset();
});
