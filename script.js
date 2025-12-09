// script.js - Modernized Interaction Logic

document.addEventListener('DOMContentLoaded', () => {
  // --- Data Definitions ---
  const filterData = {
    zonas: [
      { descripcion: 'Norte', codigo: 'NO' },
      { descripcion: 'Sur', codigo: 'SU' },
      { descripcion: 'Este', codigo: 'ES' },
      { descripcion: 'Oeste', codigo: 'OE' },
      { descripcion: 'Capital', codigo: 'CA' },
    ],
    comprobantes: [
      { descripcion: 'Factura A', codigo: 'FAC' },
      { descripcion: 'Factura B', codigo: 'FBC' },
      { descripcion: 'Nota de Crédito A', codigo: 'NCA' },
      { descripcion: 'Nota de Crédito B', codigo: 'NCB' },
      { descripcion: 'Nota de Débito A', codigo: 'NDA' },
      { descripcion: 'Nota de Débito B', codigo: 'NDB' },
      { descripcion: 'Recibo X', codigo: 'REX' },
      { descripcion: 'Remito R', codigo: 'REM' },
    ],
    vendedores: [
      { descripcion: 'Juan Pérez', codigo: 'JP' },
      { descripcion: 'María García', codigo: 'MG' },
      { descripcion: 'Pedro López', codigo: 'PL' },
      { descripcion: 'Luisa Sánchez', codigo: 'LS' },
      { descripcion: 'Ana Torres', codigo: 'AT' },
    ],
    clientes: [
      { descripcion: 'Tech Solutions SA', codigo: '001' },
      { descripcion: 'Global Services Inc', codigo: '002' },
      { descripcion: 'Local Market', codigo: '003' },
      { descripcion: 'Consumidor Final', codigo: '000' },
    ],
    sucursales: [
      { descripcion: 'Casa Central', codigo: '01' },
      { descripcion: 'Sucursal Norte', codigo: '02' },
      { descripcion: 'Sucursal Sur', codigo: '03' },
    ],
    condiciones: [
      { descripcion: 'Contado', codigo: 'CO' },
      { descripcion: 'Cta. Cte. 30 días', codigo: '30' },
      { descripcion: 'Cta. Cte. 60 días', codigo: '60' },
      { descripcion: 'Cheque', codigo: 'CH' },
    ],
    categorias: [
      { descripcion: 'Minorista', codigo: 'MI' },
      { descripcion: 'Mayorista', codigo: 'MA' },
      { descripcion: 'Distribuidor', codigo: 'DI' },
      { descripcion: 'Gobierno', codigo: 'GO' },
    ],
  };

  // State
  const selectedFilters = {};

  // Initialize all selected by default
  Object.keys(filterData).forEach((key) => {
    selectedFilters[key] = filterData[key].map((item) => item.codigo);
  });

  // --- UI Update Functions ---

  function updateSummary(filter) {
    const summaryElem = document.getElementById(`${filter}-summary`);
    if (!summaryElem) return;

    const total = filterData[filter].length;
    const selectedCount = selectedFilters[filter].length;

    if (selectedCount === total) {
      summaryElem.textContent = 'Todas';
      summaryElem.classList.remove('active');
    } else if (selectedCount === 0) {
      summaryElem.textContent = 'Ninguna';
      summaryElem.classList.add('active');
    } else {
      summaryElem.textContent = `${selectedCount} seleccionadas`;
      summaryElem.classList.add('active');
    }
  }

  // Initialize summaries
  Object.keys(filterData).forEach((filter) => updateSummary(filter));

  // --- Modal Logic ---
  const modalOverlay = document.getElementById('modal-overlay');
  const modalTitle = document.getElementById('modal-title');
  const availableList = document.getElementById('available-list');
  const selectedListElem = document.getElementById('selected-list');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  let currentFilter = null;

  function openModal(filter) {
    currentFilter = filter;
    modalTitle.textContent = `Seleccionar ${capitalize(filter)}`;

    // Clear lists
    availableList.innerHTML = '';
    selectedListElem.innerHTML = '';

    // Populate lists
    filterData[filter].forEach((item) => {
      const option = document.createElement('option');
      option.value = item.codigo;
      option.text = `${item.descripcion} (${item.codigo})`;

      if (selectedFilters[filter].includes(item.codigo)) {
        selectedListElem.add(option);
      } else {
        availableList.add(option);
      }
    });

    modalOverlay.style.display = 'flex';
    // Small delay for animation
    setTimeout(() => {
      modalOverlay.classList.add('active');
    }, 10);
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    setTimeout(() => {
      modalOverlay.style.display = 'none';
    }, 300);
  }

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // List Movement Logic
  function moveSelected(source, target) {
    const selectedOptions = Array.from(source.selectedOptions);
    selectedOptions.forEach((opt) => {
      target.add(opt); // Moving the element directly removes it from source
      opt.selected = false; // Unselect after move
    });
  }

  function moveAll(source, target) {
    const options = Array.from(source.options);
    options.forEach((opt) => {
      target.add(opt);
    });
  }

  // Modal Event Listeners
  document.getElementById('add-selected').addEventListener('click', () => moveSelected(availableList, selectedListElem));
  document.getElementById('remove-selected').addEventListener('click', () => moveSelected(selectedListElem, availableList));
  document.getElementById('add-all').addEventListener('click', () => moveAll(availableList, selectedListElem));
  document.getElementById('remove-all').addEventListener('click', () => moveAll(selectedListElem, availableList));

  document.getElementById('modal-aceptar').addEventListener('click', () => {
    if (currentFilter) {
      selectedFilters[currentFilter] = Array.from(selectedListElem.options).map((opt) => opt.value);
      updateSummary(currentFilter);
    }
    closeModal();
  });

  document.getElementById('modal-cancelar').addEventListener('click', closeModal);
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);

  // Close on click outside
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  // --- Event Delegation for Filter Chips ---
  document.querySelectorAll('.filter-item').forEach((chip) => {
    chip.addEventListener('click', () => {
      const filter = chip.getAttribute('data-filter');
      openModal(filter);
    });
  });

  // --- General Actions ---
  const printButton = document.getElementById('print-button');
  const previewButton = document.getElementById('preview-button');
  const installButton = document.getElementById('install-button');

  if (printButton) {
    printButton.addEventListener('click', () => {
      const printer = document.getElementById('printer').value;
      const copies = document.getElementById('copies').value;
      // Simple toast or alert
      alert(`🖨 Iniciando impresión...\nDispositivo: ${printer}\nCopias: ${copies}`);
    });
  }

  if (previewButton) {
    previewButton.addEventListener('click', () => {
      alert('🖥 Generando vista previa del reporte...');
    });
  }

  if (installButton) {
    installButton.addEventListener('click', () => {
      alert('📦 Buscando complementos disponibles...');
    });
  }
});
