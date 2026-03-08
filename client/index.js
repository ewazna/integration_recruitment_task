const CSV_URL = '/candidates';
const CSV_FILE_NAME = 'candidates.csv';

const downloadBtn = document.querySelector('#download-btn');
const cardBody = document.querySelector('#card-body');

downloadBtn.addEventListener('click', async () => {
  try {
    hideErrorMessage();
    setButtonLoadingState();
    await downloadCandidatesCSV();
  } catch (e) {
    console.error(e);
    showErrorMessage();
  } finally {
    clearButtonLoadingState();
  }
});

async function downloadCandidatesCSV() {
  const response = await fetch(CSV_URL);
  const blob = await response.blob();

  const url = URL.createObjectURL(blob);

  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = CSV_FILE_NAME;
  document.body.appendChild(anchor);
  anchor.click();

  anchor.remove();
  URL.revokeObjectURL(url);
}

function setButtonLoadingState() {
  downloadBtn.setAttribute('disabled', 'disabled');
  downloadBtn.innerText = 'Loading...';

  const spinner = document.createElement('span');
  spinner.classList.add('spinner-border', 'spinner-border-sm', 'me-1');
  spinner.setAttribute('aria-hidden', true);
  downloadBtn.prepend(spinner);
}

function clearButtonLoadingState() {
  downloadBtn.innerText = 'Download CSV';
  downloadBtn.removeAttribute('disabled');
}

function showErrorMessage() {
  const errorMessage = document.createElement('p');
  errorMessage.innerText = 'Error during data fetching. Please try again.';
  errorMessage.classList.add('text-danger', 'mt-2', 'mb-2');
  errorMessage.setAttribute('id', 'error-message');
  cardBody.appendChild(errorMessage);
}

function hideErrorMessage() {
  const errorMessage = document.querySelector('#error-message');
  if (errorMessage) errorMessage.remove();
}
