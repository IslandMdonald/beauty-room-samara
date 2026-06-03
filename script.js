
// Beauty Room 2.3: надежная проверка прошедшей даты + плашка
const dateInput = document.querySelector('input[type="date"][name="date"]');

function getTodayISO() {
  const today = new Date();
  const timezoneOffset = today.getTimezoneOffset() * 60000;
  return new Date(today.getTime() - timezoneOffset).toISOString().split('T')[0];
}

function showToast(message, type = 'error') {
  let toast = document.querySelector('.toast-message');

  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-message';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.className = `toast-message ${type} show`;

  window.clearTimeout(window.__beautyRoomToastTimer);
  window.__beautyRoomToastTimer = window.setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

function validateDateNotPast() {
  if (!dateInput || !dateInput.value) return true;

  const todayISO = getTodayISO();

  if (dateInput.value < todayISO) {
    showToast('Невозможно выбрать прошедшую дату');
    dateInput.value = '';
    dateInput.focus();
    return false;
  }

  return true;
}

if (dateInput) {
  dateInput.min = getTodayISO();

  dateInput.addEventListener('change', validateDateNotPast);
  dateInput.addEventListener('blur', validateDateNotPast);
  dateInput.addEventListener('input', validateDateNotPast);
}


const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('#siteNav');

if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

const form = document.querySelector('#bookingForm');

if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (typeof validateDateNotPast === 'function' && !validateDateNotPast()) return;

    const data = Object.fromEntries(new FormData(form).entries());

    // Для :
    // 1. Создайте Custom Webhook в .
    // 2. Вставьте ссылку вместо YOUR__WEBHOOK_URL.
    // 3. Раскомментируйте блок ниже.
    //
    // await fetch('YOUR__WEBHOOK_URL', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data)
    // });

    alert('Заявка подготовлена. После подключения  она будет уходить администратору автоматически.');
    form.reset();
  });
}