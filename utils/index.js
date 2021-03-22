/**
 * @param {Event} event
 * @returns {Promise<any>}
 */
export function submitForm(event) {
  event.preventDefault();

  /** @type {HTMLFormElement} */
  const form = event.target;
  const data = new FormData(form);

  return fetch(form.action, {
    method: form.method,
    body: new URLSearchParams(data),
  });
}
