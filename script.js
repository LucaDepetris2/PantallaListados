// script.js - Lógica básica de interacción para la maqueta mejorada

document.addEventListener('DOMContentLoaded', () => {
  /*
   * Definición de datos para cada filtro selectivo.  Cada elemento tiene
   * una descripción y un código para identificarlo.  Los datos están
   * hardcodeados para fines de demostración.
   */
  const filterData = {
    zonas: [
      { descripcion: 'Norte', codigo: 'NO' },
      { descripcion: 'Sur', codigo: 'SU' },
      { descripcion: 'Este', codigo: 'ES' },
      { descripcion: 'Oeste', codigo: 'OE' },
    ],
    comprobantes: [
      { descripcion: 'Ajuste Debe', codigo: 'AJD' },
      { descripcion: 'Ajuste Haber', codigo: 'AJH' },
      { descripcion: 'Nota de Pedido', codigo: 'NPX' },
      { descripcion: 'Recibo', codigo: 'REX' },
      { descripcion: 'Remito', codigo: 'RMX' },
      { descripcion: 'Z-Ajuste Debe', codigo: 'ZAD' },
      { descripcion: 'Z-Factura', codigo: 'ZFA' },
      { descripcion: 'Z-Nota de crédito', codigo: 'ZCA' },
      { descripcion: 'Z-Nota de débito', codigo: 'ZDA' },
      { descripcion: 'Z-Recibo', codigo: 'RE1' },
      { descripcion: 'Factura A', codigo: 'FAC' },
      { descripcion: 'Factura B', codigo: 'FBC' },
      { descripcion: 'Nota de Crédito', codigo: 'CNC' },
      { descripcion: 'Nota de Débito', codigo: 'CND' },
    ],
    vendedores: [
      { descripcion: 'Juan Pérez', codigo: 'JP' },
      { descripcion: 'María García', codigo: 'MG' },
      { descripcion: 'Pedro López', codigo: 'PL' },
      { descripcion: 'Luisa Sánchez', codigo: 'LS' },
    ],
    clientes: [
      { descripcion: 'Cliente A', codigo: 'CA' },
      { descripcion: 'Cliente B', codigo: 'CB' },
      { descripcion: 'Cliente C', codigo: 'CC' },
      { descripcion: 'Cliente D', codigo: 'CD' },
    ],
    sucursales: [
      { descripcion: 'Sucursal 1', codigo: 'S1' },
      { descripcion: 'Sucursal 2', codigo: 'S2' },
      { descripcion: 'Sucursal 3', codigo: 'S3' },
    ],
    condiciones: [
      { descripcion: 'Contado', codigo: 'CO' },
      { descripcion: '30 días', codigo: '30' },
      { descripcion: '60 días', codigo: '60' },
      { descripcion: '90 días', codigo: '90' },
    ],
    categorias: [
      { descripcion: 'Minorista', codigo: 'MI' },
      { descripcion: 'Mayorista', codigo: 'MA' },
      { descripcion: 'Empresa', codigo: 'EM' },
      { descripcion: 'Gobierno', codigo: 'GO' },
    ],
  };

  // Objeto para almacenar los códigos seleccionados de cada filtro
  const selectedFilters = {};

  // Inicializamos con todos los valores seleccionados por defecto
  Object.keys(filterData).forEach((key) => {
    selectedFilters[key] = filterData[key].map((item) => item.codigo);
  });

  // Función para actualizar el resumen mostrado en la pantalla principal
  function updateSummary(filter) {
    const summaryElem = document.getElementById(`${filter}-summary`);
    const total = filterData[filter].length;
    const selectedCount = selectedFilters[filter].length;
    summaryElem.textContent = selectedCount === total ? 'Todos' : `${selectedCount} seleccionado(s)`;
  }

  // Inicializar los resúmenes al cargar la página
  Object.keys(filterData).forEach((filter) => updateSummary(filter));

  /*
   * Modal de selección múltiple
   */
  const modalOverlay = document.getElementById('modal-overlay');
  const modalTitle = document.getElementById('modal-title');
  const availableList = document.getElementById('available-list');
  const selectedListElem = document.getElementById('selected-list');
  let currentFilter = null;

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function openModal(filter) {
    currentFilter = filter;
    modalTitle.textContent = `Seleccionar ${capitalize(filter)}`;
    // Limpiamos listas
    availableList.innerHTML = '';
    selectedListElem.innerHTML = '';
    // Llenamos listas con datos disponibles y seleccionados
    filterData[filter].forEach((item) => {
      const optionText = `${item.descripcion} - ${item.codigo}`;
      if (selectedFilters[filter].includes(item.codigo)) {
        selectedListElem.add(new Option(optionText, item.codigo));
      } else {
        availableList.add(new Option(optionText, item.codigo));
      }
    });
    modalOverlay.style.display = 'flex';
  }

  // Funciones para mover opciones entre listas
  function moveSelected(source, target) {
    const selectedOptions = Array.from(source.selectedOptions);
    selectedOptions.forEach((opt) => {
      target.add(new Option(opt.text, opt.value));
      source.remove(opt.index);
    });
  }

  function moveAll(source, target) {
    const options = Array.from(source.options);
    options.forEach((opt) => {
      target.add(new Option(opt.text, opt.value));
    });
    source.innerHTML = '';
  }

  // Botones del modal
  document.getElementById('add-selected').addEventListener('click', () => moveSelected(availableList, selectedListElem));
  document.getElementById('remove-selected').addEventListener('click', () => moveSelected(selectedListElem, availableList));
  document.getElementById('add-all').addEventListener('click', () => moveAll(availableList, selectedListElem));
  document.getElementById('remove-all').addEventListener('click', () => moveAll(selectedListElem, availableList));

  // Botones Aceptar y Cancelar del modal
  document.getElementById('modal-aceptar').addEventListener('click', () => {
    // Actualizamos el listado seleccionado para el filtro actual
    selectedFilters[currentFilter] = Array.from(selectedListElem.options).map((opt) => opt.value);
    updateSummary(currentFilter);
    modalOverlay.style.display = 'none';
  });

  document.getElementById('modal-cancelar').addEventListener('click', () => {
    modalOverlay.style.display = 'none';
  });

  // Asociamos el click a los botones que abren el modal
  document.querySelectorAll('.mini-button[data-filter]').forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter');
      openModal(filter);
    });
  });

  /*
   * Lógica de envío por email y botones de acciones
   */
  const sendEmailCheckbox = document.getElementById('send-email');
  const emailContainer = document.getElementById('email-container');

  if (sendEmailCheckbox && emailContainer) {
    sendEmailCheckbox.addEventListener('change', () => {
      if (sendEmailCheckbox.checked) {
        emailContainer.classList.remove('hidden');
      } else {
        emailContainer.classList.add('hidden');
      }
    });
  }

  // Eventos para botones de salida (demostrativos)
  const previewButton = document.getElementById('preview-button');
  const pdfButton = document.getElementById('pdf-button');
  const installButton = document.getElementById('install-button');
  const printButton = document.getElementById('print-button');

  if (previewButton) {
    previewButton.addEventListener('click', () => {
      alert('Mostrando vista previa del listado con los parámetros seleccionados.');
    });
  }

  if (pdfButton) {
    pdfButton.addEventListener('click', () => {
      alert('Se generaría un archivo PDF con los datos configurados.');
    });
  }

  if (installButton) {
    installButton.addEventListener('click', () => {
      alert('Simulando instalación de reportes adicionales.');
    });
  }

  if (printButton) {
    printButton.addEventListener('click', () => {
      const printer = document.getElementById('printer').value;
      const copies = document.getElementById('copies').value;
      alert(`Imprimiendo ${copies} copia(s) en ${printer}.`);
    });
  }
});
