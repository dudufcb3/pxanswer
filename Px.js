// ==UserScript==
// @name         @@Perplexity Helper MX-CLx
// @namespace    http://tampermonkey.net/
// @version      2024-03-21
// @description  try to take over the world!
// @author       You
// @match        https://operatorpanelcl.com/messages
// @match        https://paneloperadoresmx.com/messages
// @match        https://www.perplexity.ai/*
// @match        https://poe.com/*
// @match        https://you.com/*
// @match       https://duckduckgo.com/*
// @downloadURL  https://https://raw.githubusercontent.com/dudufcb3/pxanswer/main/Px.js
// @updateURL    https://https://raw.githubusercontent.com/dudufcb3/pxanswer/main/Px.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=operatorpanelcl.com
// @grant        GM_setValue
// @grant        GM_getValue
// @grant GM_addValueChangeListener
// ==/UserScript==

(function () {
  'use strict';
  //Variables globales:
  let paismx = 'Eres una mujer mexicana';
  let paiscl = 'Eres una mujer chilena';

  let url = window.location.href;

  if (url.includes('panel')) {
    const backupMessage = localStorage.getItem('backupMessage');
    console.log(backupMessage);
    // Función para agregar el botón
    function addBackupButton() {
      const container = document.querySelector('body');
      if (container) {
        const button = document.createElement('button');
        button.textContent = '⟳';
        button.style.position = 'fixed';
        button.style.bottom = '0px';
        button.style.right = '73%';
        button.style.zIndex = '9999';
        button.addEventListener('click', sendBackupMessage);
        container.appendChild(button);
      }
    }

    // Función para enviar el mensaje de respaldo
    function sendBackupMessage() {
      const backup = localStorage.getItem('backupMessage');
      const date = new Date();
      let backupMessage = backup + date;
      if (backupMessage) {
        const targetStorage = getTargetStorage();
        GM_setValue(targetStorage, backupMessage);
        console.log(`Mensaje de respaldo enviado a ${targetStorage}`);
      } else {
        console.log('No hay mensaje de respaldo guardado');
      }
    }

    // Función para determinar el setStorage objetivo
    function getTargetStorage() {
      const url = window.location.href;
      if (url.includes('operatorpanelcl.com')) {
        return 'Perplexity';
      } else if (url.includes('paneloperadoresmx.com')) {
        return 'Mx';
      } else {
        return null;
      }
    }

    // Agregar el botón al cargar la página
    addBackupButton();
  }

  function textSender(includes, gmListener) {
    if (url.includes(includes)) {
      console.log('Working here');
      // Función para simular el cambio de valor en un input controlado por React
      function simulateReactInputChange(input, newValue) {
        let lastValue = input.value;
        input.value = newValue;
        let event = new Event('input', { bubbles: true });
        // React 15 hack
        event.simulated = true;
        // React 16 hack: React tracks this input value internally, so we reset it
        let tracker = input._valueTracker;
        if (tracker) {
          tracker.setValue(lastValue);
        }
        input.dispatchEvent(event);
      }

      // Función para enviar el texto al textarea y simular Enter
      function sendTextToTextarea(text) {
        // Obtener el textarea
        const textarea = document.querySelector('textarea');
        if (!textarea) {
          console.error('Textarea no encontrado');
          return;
        }

        // Simular cambio de valor en el textarea
        simulateReactInputChange(textarea, text);

        // Simular pulsación de la tecla "Enter" después de un cierto tiempo
        setTimeout(() => {
          const enterEvent = new KeyboardEvent('keydown', {
            key: 'Enter',
            code: 'Enter',
            keyCode: 13,
            which: 13,
            bubbles: true,
          });
          textarea.dispatchEvent(enterEvent);
          window.scrollTo(0, document.body.scrollHeight);
        }, 500); // Ajusta este tiempo si es necesario
      }

      // Escuchar cambios en el valor guardado en el almacenamiento de Tampermonkey
      GM_addValueChangeListener(
        gmListener,
        function (name, old_value, new_value, remote) {
          // Cuando hay un cambio, si el nuevo valor es distinto al antiguo, entonces llamamos a la función sendTextToTextarea
          if (new_value !== old_value) {
            console.log(
              'Valor actual en el almacenamiento de Tampermonkey:',
              new_value
            );
            sendTextToTextarea(new_value);
          }
        }
      );
    }
  }

  textSender('Chilena', 'Perplexity');
  textSender('MujerMX', 'Mx');

  function poeSender(includes, gmListener) {
    if (url.includes(includes)) {
      console.log('Working here', includes);

      // Función para simular el cambio de valor en un input controlado por React POE VERSION
      function simulateReactInputChange(input, newValue) {
        let lastValue = input.value;
        input.value = newValue;
        let event = new Event('input', { bubbles: true });
        // React 15 hack
        event.simulated = true;
        // React 16 hack: React tracks this input value internally, so we reset it
        let tracker = input._valueTracker;
        if (tracker) {
          tracker.setValue(lastValue);
        }
        input.dispatchEvent(event);
      }

      // Función para enviar el texto al textarea y simular Enter
      function sendTextToTextarea(text) {
        // Obtener todos los textareas disponibles en la página
        const textareas = document.querySelectorAll('textarea');
        if (textareas.length === 0) {
          console.error('No se encontraron textareas');
          return;
        }

        // Iterar sobre todos los textareas y enviar el texto
        textareas.forEach((textarea) => {
          // Simular cambio de valor en el textarea
          simulateReactInputChange(textarea, text);

          // Simular pulsación de la tecla "Enter" después de un cierto tiempo
          setTimeout(() => {
            const enterEvent = new KeyboardEvent('keydown', {
              key: 'Enter',
              code: 'Enter',
              keyCode: 13,
              which: 13,
              bubbles: true,
            });
            textarea.dispatchEvent(enterEvent);
            window.scrollTo(0, document.body.scrollHeight);
          }, 500); // Ajusta este tiempo si es necesario
        });
      }

      const romper = document.querySelector('.ChatBreakButton_button__zyEye');
      // Escuchar cambios en el valor guardado en el almacenamiento de Tampermonkey
      GM_addValueChangeListener(
        gmListener,
        function (name, old_value, new_value, remote) {
          // Cuando hay un cambio, si el nuevo valor es distinto al antiguo, entonces llamamos a la función sendTextToTextarea
          console.log(gmListener);
          if (new_value !== old_value) {
            console.log(
              'Valor actual en el almacenamiento de Tampermonkey:',
              new_value
            );
          }
        }
      );
    }
  }
  poeSender('https://you.com/?chatMode=custom#Chilena', 'Perplexity');
  //poeSender('https://you.com/?chatMode=custom#Mexicana', 'Mx');

  function poeSender2(includes, gmListener) {
    if (url === 'https://you.com/?chatMode=custom#Mexicana') {
      console.log('Ejecutándose en la URL correcta:', url);

      // Función para simular el cambio de valor en un input controlado por React POE VERSION
      function simulateReactInputChange(input, newValue) {
        let lastValue = input.value;
        input.value = newValue;
        let event = new Event('input', { bubbles: true });
        // React 15 hack
        event.simulated = true;
        // React 16 hack: React tracks this input value internally, so we reset it
        let tracker = input._valueTracker;
        if (tracker) {
          tracker.setValue(lastValue);
        }
        input.dispatchEvent(event);
      }

      // Función para enviar el texto al textarea y simular Enter
      function sendTextToTextarea(text) {
        // Obtener todos los textareas disponibles en la página
        const textareas = document.querySelectorAll('textarea');
        if (textareas.length === 0) {
          console.error('No se encontraron textareas');
          return;
        }

        console.log('Textareas encontrados:', textareas);

        // Iterar sobre todos los textareas y enviar el texto
        textareas.forEach((textarea) => {
          console.log('Enviando texto al textarea:', textarea);

          // Simular cambio de valor en el textarea
          simulateReactInputChange(textarea, text);

          // Simular pulsación de la tecla "Enter" después de un cierto tiempo
          setTimeout(() => {
            const enterEvent = new KeyboardEvent('keydown', {
              key: 'Enter',
              code: 'Enter',
              keyCode: 13,
              which: 13,
              bubbles: true,
            });
            textarea.dispatchEvent(enterEvent);
            window.scrollTo(0, document.body.scrollHeight);
            console.log('Texto enviado y simulación de Enter realizada');
          }, 500); // Ajusta este tiempo si es necesario
        });
      }

      // Escuchar cambios en el valor guardado en el almacenamiento de Tampermonkey
      GM_addValueChangeListener(
        gmListener,
        function (name, old_value, new_value, remote) {
          console.log('Cambio detectado en el almacenamiento de Tampermonkey');
          console.log('Nombre:', name);
          console.log('Valor anterior:', old_value);
          console.log('Nuevo valor:', new_value);
          console.log('Remoto:', remote);

          // Cuando hay un cambio y el nombre es 'Mx', si el nuevo valor es distinto al antiguo, entonces llamamos a la función sendTextToTextarea
          if (name === 'Mx' && new_value !== old_value) {
            console.log(
              'Nuevo valor en el almacenamiento de Tampermonkey (Mx):',
              new_value
            );
            sendTextToTextarea(new_value);
          }
        }
      );
    } else {
      console.log(
        'La URL no coincide con https://you.com/?chatMode=custom#Mexicana'
      );
    }
  }
  poeSender2('https://you.com/?chatMode=custom#Mexicana', 'Mx');

  function poeSender3(includes, gmListener) {
    if (url === 'https://duckduckgo.com/?q=DuckDuckGo&ia=chat') {
      console.log('Ejecutándose en la URL correcta:', url);

      // Función para simular el cambio de valor en un input controlado por React POE VERSION
      function simulateReactInputChange(input, newValue) {
        let lastValue = input.value;
        input.value = newValue;
        let event = new Event('input', { bubbles: true });
        // React 15 hack
        event.simulated = true;
        // React 16 hack: React tracks this input value internally, so we reset it
        let tracker = input._valueTracker;
        if (tracker) {
          tracker.setValue(lastValue);
        }
        input.dispatchEvent(event);
      }

      // Función para enviar el texto al textarea y simular Enter
      function sendTextToTextarea(text) {
        // Obtener todos los textareas disponibles en la página
        const textareas = document.querySelectorAll('textarea');
        if (textareas.length === 0) {
          console.error('No se encontraron textareas');
          return;
        }

        console.log('Textareas encontrados:', textareas);

        // Iterar sobre todos los textareas y enviar el texto
        textareas.forEach((textarea) => {
          console.log('Enviando texto al textarea:', textarea);

          // Simular cambio de valor en el textarea
          simulateReactInputChange(textarea, text);

          // Simular pulsación de la tecla "Enter" después de un cierto tiempo
          setTimeout(() => {
            const enterEvent = new KeyboardEvent('keydown', {
              key: 'Enter',
              code: 'Enter',
              keyCode: 13,
              which: 13,
              bubbles: true,
            });
            textarea.dispatchEvent(enterEvent);
            window.scrollTo(0, document.body.scrollHeight);
            console.log('Texto enviado y simulación de Enter realizada');
          }, 500); // Ajusta este tiempo si es necesario
        });
      }

      // Escuchar cambios en el valor guardado en el almacenamiento de Tampermonkey
      GM_addValueChangeListener(
        gmListener,
        function (name, old_value, new_value, remote) {
          console.log('Cambio detectado en el almacenamiento de Tampermonkey');
          console.log('Nombre:', name);
          console.log('Valor anterior:', old_value);
          console.log('Nuevo valor:', new_value);
          console.log('Remoto:', remote);

          // Cuando hay un cambio y el nombre es 'Mx', si el nuevo valor es distinto al antiguo, entonces llamamos a la función sendTextToTextarea
          if (name === 'Perplexity' && new_value !== old_value) {
            console.log(
              'Nuevo valor en el almacenamiento de Tampermonkey (PerplexityMx):',
              new_value
            );
            sendTextToTextarea(new_value);
          }
        }
      );
    } else {
      console.log(
        'La URL no coincide con https://you.com/?chatMode=custom#Mexicana'
      );
    }
  }
  //poeSender3('https://duckduckgo.com/?q=DuckDuckGo&ia=chat', 'Perplexity');

  if (url.includes('panel')) {
    // Función para inicializar el modelo desde el almacenamiento local
    function initializeModel() {
      let modelo = localStorage.getItem('modelo') || 'px'; // Default to 'px' if nothing is stored
      return modelo;
    }

    // Función para alternar el modelo y actualizar el botón y el almacenamiento local
    function toggleModel() {
      let currentModel = localStorage.getItem('modelo') || 'px';
      let newModel = currentModel === 'px' ? 'you' : 'px';
      localStorage.setItem('modelo', newModel);
      updateButtonLabel(newModel);
    }

    // Función para actualizar la etiqueta del botón
    function updateButtonLabel(model) {
      let button = document.getElementById('toggleModelButton');
      button.textContent = model.toUpperCase(); // Update button label
    }

    // Crear y agregar el botón de alternancia al DOM
    function createToggleButton() {
      let button = document.createElement('button');
      button.id = 'toggleModelButton';
      button.textContent = initializeModel().toUpperCase(); // Set initial label
      button.style.position = 'fixed';
      button.style.bottom = '20px';
      button.style.left = '0px';
      button.style.zIndex = '9999';
      button.style.padding = '1px';
      button.style.backgroundColor = '#007bff';
      button.style.color = 'white';
      button.style.border = 'none';
      button.style.borderRadius = '1px';
      button.style.cursor = 'pointer';

      button.addEventListener('click', toggleModel);

      document.body.appendChild(button);
    }

    // Inicializar el botón al cargar la página
    createToggleButton();

    let modelo = initializeModel();
    //console.log('Modelo guardado',modelo)

    setTimeout(() => {
      let color = document.querySelector('.alert');
      let conditionalPrompt = '';
      if (color.style.backgroundColor.includes('yellow')) {
        conditionalPrompt = `

    `;
      } else if (color.style.backgroundColor.includes('red')) {
        conditionalPrompt = `Nos mostraremos agradables en la conversación, debemos de mirar en la conversación y seguir el tono que traiga, ejemplo si está hablando de cosas normales, seguir el curso, pero mostrarnos más interesados, empáticos y que el sienta que te importa como hombre, si
    habla picante, sigue la linea que el dicte para que se sienta cómodo.`;
      } else if (color.style.backgroundColor.includes('blue')) {
        conditionalPrompt = `Tenemos muchas ganas de salir con esta persona a pesar de lo poco de conocerlo y preferimos una comunicacion mas directa y sin intermediarios`;
      } else {
        conditionalPrompt = `Debemos de mirar en la conversación y seguir el tono que traiga, ejemplo si está hablando de cosas normales, seguir el curso, pero mostrarnos más interesados, empáticos y que el sienta que te importa como hombre, si
    habla picante, sigue la linea que el dicte para que se sienta cómodo. Le daremos a entender entre lineas que tenemos expectativas sexuales con el.`;
      }
      // Función para copiar al portapapeles utilizando navigator.clipboard.writeText -----------------------------------------------
      async function copiarAlPortapapeles(texto) {
        try {
          await navigator.clipboard.writeText(texto);
        } catch (err) {
          console.error('No se pudo copiar al portapapeles:', err);
        }
      }
      // Función para copiar al portapapeles utilizando navigator.clipboard.writeText -----------------------------------------------

      // Extraer preferencias de "él" y "ella"

      const preferenciasElla = extraerListas(
        'body > div.container > div.row > div:nth-child(3) > div:nth-child(4) > div',
        'cliente'
      );

      const ubicacionHim = document.querySelector(
        'body > div.container > div.row > div:nth-child(1) > div.panel-body > div:nth-child(10) > div > dl > dd'
      );
      const edadHim = document.querySelector(
        'body > div.container > div.row > div:nth-child(1) > div.panel-body > div:nth-child(6) > div:nth-child(2) > dl > dd > span'
      );

      //Datos ella.
      const ubicacion = document.querySelector(
        'body > div.container > div.row > div:nth-child(1) > div:nth-child(4) > div.panel-body > div:nth-child(9) > div > dl > dd'
      ).innerText;

      //Contextos
      let contextoGlobal = localStorage.getItem('contextoFechas');
      let setContextGlobal = '';
      if (contextoGlobal !== '') {
        setContextGlobal = `# Contexto Global: ${contextoGlobal}`;
      }

      let setContextActual = '';
      let contextoActual = localStorage.getItem('contexto') || false;
      if (contextoActual) {
        setContextActual = `# Contexto Actual: ${contextoActual}`;
      }

      // Obtener la fecha y hora actual en Chile-----------------------------------------------------------------------------------------
      function obtenerHoraChile(zonaHoraria) {
        const ahora = new Date();

        // Crear un objeto Date con la zona horaria especificada
        const fechaZona = new Date(
          ahora.toLocaleString('en-US', { timeZone: zonaHoraria })
        );

        // Obtener la hora, el día y la fecha en la zona horaria especificada
        const horaZona = fechaZona.getHours();
        const diaZona = fechaZona.getDate();
        const mesZona = fechaZona.getMonth() + 1;
        const añoZona = fechaZona.getFullYear();

        // Obtener el día de la semana en la zona horaria especificada
        const diaSemanaZona = fechaZona.toLocaleDateString('es-CL', {
          weekday: 'long',
        });

        // Obtener el periodo del día (mañana, tarde, noche)
        let periodoDia;
        if (horaZona >= 4 && horaZona < 12) {
          periodoDia = 'de la mañana';
        } else if (horaZona >= 12 && horaZona < 20) {
          periodoDia = 'de la tarde';
        } else {
          periodoDia = 'de la noche';
        }

        // Crear una cadena con la fecha, hora y día de la semana completos
        const horaFormato = `${diaSemanaZona}, ${diaZona}/${mesZona}/${añoZona} ${horaZona}:00 ${periodoDia}`;

        return horaFormato;
      }

      // Ejemplo de uso:
      const zonaHorariaChile = 'America/Santiago';
      const fechaHoraDiaChile = obtenerHoraChile(zonaHorariaChile);
      const zonaHorariaMexico = 'America/Mexico_City';
      const fechaHoraDiaMexico = obtenerHoraChile(zonaHorariaChile);

      // Obtener la fecha y hora actual en Chile-----------------------------------------------------------------------------------------

      /* FUNCION PARA BUSCAR GUSTOS */
      function searchTerms(accordionId) {
        const accordionList = document.querySelectorAll(
          `#${accordionId} .log_book_item`
        );
        const result = {
          Nombre: null,
          Localización: null,
          Trabajo: null,
          Aficiones: null,
          'Preferencias Sexuales': null,
          Convivencia: null,
          Relaciones: null,
          Salud: null,
        };

        for (const accordion of accordionList) {
          if (Object.values(result).every((value) => value !== null)) {
            // Todos los términos han sido encontrados, salir del bucle
            break;
          }

          const accordionTitle = accordion
            .querySelector('.panel-title')
            .textContent.trim();
          const logbookContainer = accordion.querySelector(
            '.log-book-container'
          );

          if (logbookContainer) {
            const dataName = logbookContainer.getAttribute('data-name');
            const logbookTexts = Array.from(
              logbookContainer.querySelectorAll('.log-book-text')
            ).map((logbookText) => logbookText.textContent.trim());

            if (result.hasOwnProperty(dataName) && result[dataName] === null) {
              result[dataName] = logbookTexts;
            }
          }
        }
        return result;
      }

      // Llamar a la función searchTerms y obtener los valores resultantes
      const datosEllaFull = searchTerms('accordion1');
      const datosDeElFull = searchTerms('accordion4');
      /* FUNCION PARA BUSCAR GUSTOS */

      function simularF2() {
        var evento = new KeyboardEvent('keydown', {
          key: 'F2',
          keyCode: 113,
          which: 113,
          bubbles: true,
          cancelable: true,
        });
        document.dispatchEvent(evento);
      }
      function simularF4() {
        var evento = new KeyboardEvent('keydown', {
          key: 'F4',
          keyCode: 115,
          which: 115,
          bubbles: true,
          cancelable: true,
        });
        document.dispatchEvent(evento);
      }

      // IDS -----------------------------------------------

      let ellaes = document.querySelector(
        'body > div.container > div.row > div:nth-child(1) > div:nth-child(4) > div.panel-heading'
      );
      let eles = document.querySelector(
        'body > div.container > div.row > div:nth-child(3) > div:nth-child(1) > div'
      );
      // IDS -----------------------------------------------

      // Crear el objeto del personaje------------------------------------------------------------------------------------------------------
      const personaje = {
        nombre: '',
        estadoCivil: '',
        fumador: '',
        edad: '',
        preferenciasSexuales: '',
      };
      // Crear el objeto del personaje------------------------------------------------------------------------------------------------------

      // Full messages:
      // Función para recuperar mensajes de #windowDiv con un límite máximo
      function obtenerMensajes(maxMensajes) {
        // Obtener el elemento con el ID "windowDiv"
        var windowDiv = document.querySelector('#windowDiv');

        // Verificar si se encontró el elemento
        if (windowDiv) {
          // Inicializar una variable para almacenar el texto
          var mensajes = '';

          // Obtener todos los elementos dt dentro de windowDiv
          var preguntas = windowDiv.querySelectorAll('dt');

          // Iterar sobre las preguntas y recuperar las respuestas correspondientes
          for (var i = 0; i < preguntas.length && i < maxMensajes; i++) {
            var pregunta = preguntas[i].innerText.trim(); // Obtener el texto de la pregunta
            var respuesta = preguntas[i].nextElementSibling.innerText.trim(); // Obtener el texto de la respuesta

            mensajes += `Usuario: ${pregunta}, Dijo: ${respuesta}\n`;
          }

          // Devolver los mensajes recuperados como un solo string
          return mensajes;
        } else {
          console.log("No se encontró el elemento con el ID 'windowDiv'.");
          return null;
        }
      }

      // Ejemplo de cómo usar la función para recuperar hasta 5 preguntas y respuestas
      var maxMensajes = 4;
      var mensajesRecuperados = obtenerMensajes(maxMensajes);

      // Ahora puedes usar mensajesRecuperados en tu template literal o donde lo necesites

      // Función para extraer y mostrar listas
      function extraerListas(selector, etiqueta) {
        const container = document.querySelector(selector);
        if (container) {
          const listas = container.querySelectorAll('ul, ol');
          const listaItems = [];
          listas.forEach((lista, index) => {
            listaItems.push(`- Tus gustos ${index + 1}:`);
            lista.querySelectorAll('li').forEach((item, itemIndex) => {
              listaItems.push(`  - ${item.innerText}`);
            });
          });
          return listaItems.join('\n');
        }
        return '';
      }

      /*ID EL Y ELLA */
      let textoEntreParentesis = '';
      let textoEntreParentesis2 = '';
      // Selecciona el elemento que contiene el texto entre paréntesis
      const elemento = document.querySelector(
        'body > div.container > div.row > div:nth-child(1) > div:nth-child(4) > div.panel-heading'
      );

      // Obtén el texto dentro del elemento
      const textoCompleto = elemento.textContent;

      // Utiliza una expresión regular para extraer el texto entre paréntesis
      const regex = /\((.*?)\)/; // Esto busca cualquier texto entre paréntesis y lo captura
      const matches = textoCompleto.match(regex);

      if (matches && matches.length > 1) {
        textoEntreParentesis = matches[1]; // El texto capturado está en la posición 1 del array de coincidencias
      } else {
        console.log('No se encontró texto entre paréntesis.');
      }
      // Selecciona el elemento que contiene el texto entre paréntesis
      const element2 = document.querySelector(
        'body > div.container > div.row > div:nth-child(3) > div:nth-child(1) > div'
      );

      // Obtén el texto dentro del elemento
      const textoCompleto2 = element2.textContent;

      // Utiliza una expresión regular para extraer el texto entre paréntesis
      const regex2 = /\((.*?)\)/; // Esto busca cualquier texto entre paréntesis y lo captura
      const matches2 = textoCompleto2.match(regex);

      if (matches && matches.length > 1) {
        textoEntreParentesis2 = matches2[1]; // El texto capturado está en la posición 1 del array de coincidencias
      } else {
        console.log('No se encontró texto entre paréntesis.');
      }

      console.log(
        'Conversación entre:' +
          textoEntreParentesis +
          ' y ' +
          textoEntreParentesis2
      );

      // Extraer preferencias de "él" y "ella"
      const preferenciasEl = extraerListas(
        'body > div.container > div.row > div:nth-child(1) > div:nth-child(7) > div',
        'perfil'
      );

      // Esperar a que la página cargue completamente

      // Seleccionar el elemento que deseas imprimir en consola
      const mensajeCliente = document.querySelector(
        '#windowDiv > div > dl:nth-child(2) > dd:nth-child(2)'
      );

      /* Estado civil */
      const nombreElement = document.querySelector('#receiver_logbook_2');
      personaje.nombre = nombreElement.innerText;

      const trimName = `${personaje.nombre.replace(/\s+/g, '')} es tu nombre.`;

      /* Estado civil */
      const estadoCivilElement = document.querySelector(
        'body > div.container > div.row > div:nth-child(1) > div:nth-child(4) > div.panel-body > div:nth-child(8) > div:nth-child(2) > dl'
      );
      personaje.estadoCivil = estadoCivilElement.innerText;

      /* Fumador */
      const fumadorElement = document.querySelector(
        'body > div.container > div.row > div:nth-child(1) > div:nth-child(4) > div.panel-body > div:nth-child(8) > div:nth-child(1) > dl'
      );
      personaje.fumador = fumadorElement.innerText;

      /* Edad */
      const edadElement = document.querySelector(
        'body > div.container > div.row > div:nth-child(1) > div:nth-child(4) > div.panel-body > div:nth-child(6) > div:nth-child(2) > dl'
      );
      personaje.edad = edadElement.innerText;

      /* Preferencias sexuales */
      const preferenciasSexualesElement = document.querySelector(
        '#receiver_logbook_7'
      );
      personaje.preferenciasSexuales = preferenciasSexualesElement.innerText;

      function searchTerms2() {
        const accordionList = document.querySelectorAll('.log_book_item');
        const result = {
          Nombre: null,
          Localización: null,
          Trabajo: null,
          Aficiones: null,
          'Preferencias Sexuales': null,
          Convivencia: null,
          Relaciones: null,
          Salud: null,
        };

        for (const accordion of accordionList) {
          if (Object.values(result).every((value) => value !== null)) {
            // Todos los términos han sido encontrados, salir del bucle
            break;
          }

          const accordionTitle = accordion
            .querySelector('.panel-title')
            .textContent.trim();
          const logbookContainer = accordion.querySelector(
            '.log-book-container'
          );

          if (logbookContainer) {
            const dataName = logbookContainer.getAttribute('data-name');
            const logbookTexts = Array.from(
              logbookContainer.querySelectorAll('.log-book-text')
            ).map((logbookText) => logbookText.textContent.trim());

            if (result.hasOwnProperty(dataName) && result[dataName] === null) {
              result[dataName] = logbookTexts;
            }
          }
        }
        return result;
      }

      // Llamar a la función searchTerms y obtener los valores resultantes
      const searchResult = searchTerms2();

      // Crear el botón
      const botonCopiar = document.createElement('button');
      botonCopiar.innerText = 'Being Hot';
      botonCopiar.style.position = 'fixed';
      botonCopiar.style.zIndex = 9999;
      botonCopiar.style.bottom = '0px';
      botonCopiar.style.left = '18%';
      botonCopiar.style.padding = '2px';
      botonCopiar.style.backgroundColor = '#007bff';
      botonCopiar.style.color = '#fff';
      botonCopiar.style.border = 'none';
      botonCopiar.style.borderRadius = '4px';
      botonCopiar.style.cursor = 'pointer';

      // Agregar el botón al DOM
      document.body.appendChild(botonCopiar);

      // Asignar el evento para copiar al portapapeles al hacer clic en el botón
      botonCopiar.addEventListener('click', function () {
        // Crear la ventana modal
        const modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.zIndex = 999;
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        modal.style.display = 'flex';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
        // Agregar el evento de doble clic al modal existente
        modal.addEventListener('dblclick', function (event) {
          // Llamar a la función para mostrar el modal secundario y pasar el textarea como parámetro
          mostrarModalSecundario(
            [
              {
                titulo: 'Presentación Básica',
                texto:
                  'Presentate de manera básica, no des muchos datos, solo dile tu nombre y contesta las preguntas que te haya hecho, si no, no te presentes más que de forma básica con tu nombre y algún saludo interesante',
              },

              {
                titulo: 'Comprensiva',
                texto:
                  'Muestrate empática con su situación y dale palabras de apoyo e interésate en lo que habla',
              },

              {
                titulo: 'De acuerdo',
                texto: 'Muestrate de acuerdo con sus ideas',
              },

              {
                titulo: 'Interés',
                texto:
                  'Muestrate interesada, como mostrando poco conocimiento del tema del que habla, pero queriendo aprender más, pero lo más importante es que no se note, tu le harás comentarios al respecto sobre algo que sepas, hayas escuchado muy escuetamente, para que crea que en efecto estás interesada en el tema, luego le harás alguna pregunta, solo 1 derivada del tema o de un tema muy similar, como relacionando, ya que a nadie le gustan los interrogatorios, además de esta forma, se sentirá más natural el interés',
              },

              {
                titulo: 'Seguir Sexual - Bajo',
                texto:
                  'Sigue el tono de la conversación de manera picante, pero has alguna broma, el sentido de la respuesta tendrá que ser, hacerle creer que te sientes cómoda con la conversación, pero al mismo tiempo al bromear o hacer alguna referencia divertida ir desviando el tema a algo menos sexual, de manera sutil y sin mencionarlo.',
              },

              {
                titulo: 'Contestar Sexual Preguntas',
                texto:
                  'Está picante y rica la conversación contesta a sus preguntas si la información no existe en tu perfil inventa las respuesta de manera de saciar su curiosidad, no te niegues a contestar nada, pues no queremos que piense que eres frigida y aburrida',
              },

              {
                titulo: 'Seguir Sexual - Alto',
                texto:
                  'Dale continuidad a su historia diciéndole lo que te imaginas, que imaginas que sentirías mientras te hace las cosas que te dice, todo en sentido figurado, no digas quiero esto o lo otro, solo que te lo imaginas, intenta usar su propio lenguaje, es decir, si el le llama verga, dile verga, si el le dice culo, dile culo, etc, para que sea más natural todo.',
              },
              {
                titulo: 'Que seductor',
                texto:
                  'Esta persona se cree un seductor, le tendrás que decir, que la manera en que se expresa es agradable y ensalzar la forma que tiene para hablar del tema, pero sin entrar en el juego, solamente valorar sus capacidades positivamente.',
              },

              {
                titulo: 'Preguntas creativas',
                texto:
                  'La conversación está un poco estancada y se está aburriendo de no avanzar, por lo cual debes buscar una manera de dinamizar la conversación, hazle preguntas de cuando estas conociendo a alguien (un date), pero ya no le hagas las tipicas de aficiones, trabajo, etcetera. Tienen que ser preguntas buenas, interesantes que llamen la atencion, es decir, no las tipicas preguntas del inicio, deberán ser preguntas complejas que hagan crecer la conversación, pero no las normales pues esas ya las hemos hecho, temas posibles, vida, filosofia, pasado, futuro, presente, etc, tampoco tienes que hacer alusión al cambio de tema ni a la pregunta, solo tienes que ser sutil al hacerla, de manera que no se dé cuenta y crea que la dinámica está cambiando de manera natural',
              },

              {
                titulo: 'No somos pareja',
                texto:
                  'Contestale de manera de que los planes que habla que harán en pareja los enfoques diferente, si el te dice, haremos, iremos, etc, cosas similares englobando a ambos, tu dirás cosas del estilo de: si es cierto esos planes son interesantes para hacer en pareja, las parejas, cuando la gente se entiende, etc etc, de manera de no rechazarlo, pero hablar como algo que hacen las parejas y hacer ver entre lineas que no ustedes, pues no son pareja, normalmente la gente suele decir que harán eso, para ejercer alguna presión psicológica, pero no debemos rechazarlo, solo decir, que interesantes situaciones, es decir, centrarte más en la acción que en el enfoque de pareja (pero sutil y ambiguamente, pues no queremos que se sienta rechazado).',
              },

              {
                titulo: 'Dinamizar',
                texto:
                  'Amplia su tema de conversación y deriva vertientes para extender y mantener la conversación de manera dinámica. Puedes tomar como temas lo que estén hablando, pero extenderlo hacia otros temas relacionados y que tengan que ver para que la transición se sienta natural o bien, tomar temas de los perfiles o la conversación para tener algo de que hablar, obviamente debe ser un toque sutil, que no se note que está pasando',
              },

              {
                titulo: 'Sexual resumido',
                texto:
                  'Debemos seguir el tono sexual, pero de manera resumida, es decir, emitir nuestro comentario, corto, de 2-3 lineas con el mismo contenido, de manera de dejar que el haga su parte, por lo cual no nos deberemos extender mucho.',
              },

              {
                titulo: 'Contesta resumido',
                texto:
                  'Te hizo muchas preguntas así que intenta contestarle en máximos 5-6 lineas a todas las preguntas de manera resumida',
              },

              {
                titulo: 'No contactos',
                texto:
                  'Revisa la conversación y niega la cita o medios de contacto, pero utiliza lo que se ha hablado en la conversación e incluso tus datos personales para crear una buena excusa para negarte',
              },

              {
                titulo: 'Defiendete',
                texto:
                  'Defiende tus argumentos de manera inteligente, empoderada y sagaz, sé asertiva',
              },

              {
                titulo: 'Respuesta amplia',
                texto:
                  'Su mensaje es un poco corto, deberás ampliar el tema hablando de alguna anecdota o situación del pasado en tu vida relacionada con el tema actual de esta manera podrás generar conversación de manera amplia y mostrar naturalidad, obviamente, tu no tienes anécdotas, pero la inventarás de manera natural y que genere interés en él, esto es para darle dinámica a la conversación basado en el tema del que habla o si no, en este tema: ',
              },

              {
                titulo: 'Indiferencia',
                texto:
                  'Agradecele de manera basica, ya que la relación no está en su mejor momento, no le reclames nada, solo contesta a todo lo que te pregunte, pero con cierta indiferencia y amabilidad solamente.',
              },

              {
                titulo: 'Rojos',
                texto:
                  'Es una situación complicada por que quiere tus datos, pero no podemos darlos, entonces deberemos activar el modo sexual, intentando activar el hablar de sexo, preferencias, lo que buscamos en la plataforma y hacerle sentir que el podría ser lo que buscas y de esta forma, atraerlo para que no nos deje de hablar capturando su atención mediante el sexo, pero de manera sutil para que no se note que lo estamos haciendo por eso',
              },

              {
                titulo: 'Metafora Sexual',
                texto:
                  'Contestale de manera erótica, pero como en un juego, haciéndole imaginar, utilizando referencias o metáforas hacia cosas, animales, objetos, etc de manera juguetona, para no ser directa y que se entienda más como un segunda interpretación, para que no suene directo pero si le de idea de imaginarlo basado en el contexto del que hablan actualmente',
              },
              {
                titulo: 'Paciencia Webon',
                texto:
                  'Contestale de manera muy ambigua, pidiendole paciencia, pero entre lineas, hablando de lo bien que va todo hasta ahora y insinuando ambiguamente que quizás después se ira acomodando todo para llegar más lejos (basate en el contexto de la conversación) para darle largas, pero sutilmente, entre lineas',
              },
              {
                titulo: 'Agradecer',
                texto:
                  'Agradecele por lo que te haya dicho, muestrate agradecida, pero de manera neutral, o sea no lo halagues ni nada solo muestrate muy agradecida por lo que te haya dicho',
              },
              {
                titulo: 'Bromista',
                texto:
                  'Haz bromas al respecto de lo que está diciendo, sé creativa con las bromas siguiendo el contexto de la conversación',
              },
              {
                titulo: 'Filosofico',
                texto:
                  'Ponte en modo filosofico, tienes que analizar su mensaje y contestarle con filosofía y ambiguedad para que lo dejes pensativo con mensajes cripticos y filosoficos.',
              },
              {
                titulo: 'Curiosa',
                texto:
                  'Muestra curiosidad de alguna manera morbosa por indagar más en el tema y el sienta que lo que te dijo te causo especial interés, pero intenta dejar preguntas sutiles o digamos con un poco de entre lineas para que no se note de golpe que estás preguntando y se pierda el interés de su parte al no querer responder.',
              },
              {
                titulo: 'Parejizar',
                texto:
                  'El su mensaje es algo comprometedor, por así decirlo por que implicitamente está hablando de algo que quiere que ustedes hagan y tienes que mostrarte entusiasta, pero hablar o dirigirte sobre las cosas que las parejas hacen, o sea si el dice, me encantaria que vayamos, entonces tu dirás esas actividades en pareja son interesantes, etc. Para darle continuidad a su conversación y mostrarte interesada, pero sin asumir que hablan de tu y el.',
              },
              {
                titulo: 'Simp V2',
                texto:
                  'Este chico es lo que se conoce comunmente como "Simp" el está enamorado de ti, pero tu todavía no lo tienes claro, solo que el te trata muy bien y te habla como si fueses su novia  (lo cual no eres) entonces, deberás agradecer sus comentarios de manera neutral, esto es muy importante y amable, diciendole cosas agradables, PERO sin ser complaciente, mucho menos halagarlo ni corresponderle, debes ser muy neutral para agradecer sus palabras, de esta forma, mostrando amabilidad, gentileza y buena onda, no le darás señales equivocadas. Es importante que seas ambigua, tácita o implícita en tus palabras, es decir, no hables de cosas solo habla, de "esto". No menciones nunca la palabra amistad, ni amigos, no queremos que sienta que lo estás friendzoneando.',
              },
              {
                titulo: 'Inventa',
                texto:
                  'Contesta a su pregunta, pero inventa alguna situación en el día, mala, buena anecdotica que te haya pasado o te esté pasando de esta forma se verá más natural que solo responder.',
              },
              {
                titulo: 'Reproche - Tiempo',
                texto:
                  'Revisa la conversación esta persona ya lleva algunos días (tienes que revisar, pues no es la misma intensidad en todos los casos) sin que te haya escrito, básicamente él te abandono, debes recriminarselo, pero no de manera directa, tienes que ser sutil y reprocharlo de manera soslayada, así como para que se sienta mal, luego contestar lo que te haya preguntado y preguntarle a el que tal la he ido. Si en caso, te habla acerca de salidas, cambios de contacto, etc... Te negarás rotundamente aduciendo la falta de interés que muestra por su parte.',
              },
              {
                titulo: 'Inventa - Cotidianiedad',
                texto:
                  'Contesta a su pregunta, pero inventa alguna situación en tu vida en los ultimos tiempos, dias, etc, anecdotica, cosas que le pasan a la gente, segun tu perfil, claro, ejemplo, situaciones personales que le pasan a las personas, te haya pasado o te esté pasando de esta forma se verá más natural que solo responder.',
              },
              {
                titulo: 'Futurizar',
                texto:
                  'Deja abierta las posibilidades para después, cuando el tiempo, circunstancias, etc sean posibles, pero hazle saber que sientes que van bien y que eso es algo que valoras mucho, se ambigua y tira de mucha, pero mucha ambiguedad y sentidos tacitos e implicitos para hacerle creer que puede haber un futuro',
              },
              {
                titulo: 'Desenreda',
                texto:
                  'Tomate tu tempo y analiza la conversación y explicale o contesta lo que deberías hacer para salir del enrollo, es algo que no se está entendiendo muy bien, así que arroja algo de luz en el tema',
              },
              {
                titulo: 'Picante',
                texto:
                  'Quieres sacar un poco el hilo del tema sexual, pero no sabes como hacerlo o como entrar sutilmente, entonces en este mensaje tomarás alguna parte de su mensaje para abrir el tema e irlo abordando de manera que el no note el cambio abruto a lo sexual/sensual, de manera seductora digamos y curiosa',
              },
              {
                titulo: 'Filosofica del pueblo',
                texto:
                  'Ponte en modo filosofico, tienes que analizar su mensaje y contestarle con filosofía y ambiguedad para que lo dejes pensativo con mensajes cripticos y filosoficos. filosofa pero con palabras comunes y no dejes preguntas solo elabora tu pensamiento sobre lo q el dice.',
              },
              {
                titulo: 'Sarcastica',
                texto: 'Ponte en modo sarcástica y burlona para decirle que: ',
              },
              {
                titulo: 'Reto sex',
                texto:
                  'Deberás tocarle el orgullo y lanzarle este reto de manera sexual que el se sienta con la emoción y excitación de aceptar: ',
              },
              {
                titulo: 'Presentación Hielo',
                texto:
                  'Usualmente este es el primer mensaje, pero, para romper el hielo debes ser creativa a la hora de saludarte y presentarte, quizás podrías inventar alguna cosa casual, recuerda el sentido casual de la ocasión para abrir la conversación, además de decir tu nombre, no preguntes cosas a excepción que el lo haya hecho, por que usualmente sueles preguntar siempre lo mismo, entonces tus respuestas tienden a ser repetitivas así que intenta abrir la conversación basandote en el contexto de la misma',
              },
              {
                titulo: 'Intentando Dinamizar ??',
                texto:
                  'Esta es una situación compleja, las preguntas de aficiones, trabajo, familia, etc... ya las hemos hecho, pero queremos seguir alargando la conversación, así que debemos buscar temas interesantes, haz una evaluación completa de ambos perfiles y genera bajo ese contexto alguna preguntas interesantes, que le den dinamismo a la conversación para que no se aburra y la conversación pueda seguir.',
              },
              {
                titulo: 'Los caminos de la vida',
                texto:
                  'Cuentale sobre ti, inventa anecdotas, situaciones o sucesos que te han llevado a ser quien eres, no hables de aficiones o trabajo, si no de cuestiones más abstractas sobre tu vida y que te tienen en el momento actual. Puedes basarte en tu contexto, tus datos etc para hacerlo más natural.',
              },
            ],
            document.getElementById('modalTextarea')
          );
        });

        const modalContent = document.createElement('div');
        modalContent.style.background = '#fff';
        modalContent.style.padding = '20px';
        modalContent.style.borderRadius = '5px';
        modalContent.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.15)';
        modalContent.style.maxWidth = '500px';

        // Crear el textarea
        const textarea = document.createElement('textarea');
        textarea.id = 'modalTextarea'; // Asignar un ID al textarea
        textarea.placeholder = 'Agrega un mensaje adicional';
        textarea.style.width = '100%';
        textarea.style.height = '150px';
        textarea.style.marginBottom = '10px';
        textarea.addEventListener('keydown', function (event) {
          if (event.key === 'Enter') {
            event.preventDefault(); // Evitar el salto de línea predeterminado
            botonAceptar.click();
            botonAceptar.innerText = 'Guardando...';
          }
        });

        function mostrarModalSecundario(textos, textarea) {
          var modalSecundario = document.createElement('div');
          modalSecundario.style.position = 'fixed';
          modalSecundario.style.top = '0';
          modalSecundario.style.left = '0';
          modalSecundario.style.width = '100%';
          modalSecundario.style.height = '100%';
          modalSecundario.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
          modalSecundario.style.display = 'flex';
          modalSecundario.style.justifyContent = 'center';
          modalSecundario.style.alignItems = 'center';
          modalSecundario.style.zIndex = '9999';

          var contenidoModal = document.createElement('table');
          contenidoModal.style.backgroundColor = '#fff';
          contenidoModal.style.padding = '20px';
          contenidoModal.style.borderRadius = '10px';
          contenidoModal.style.maxWidth = '80%';
          contenidoModal.style.borderCollapse = 'collapse';

          for (var i = 0; i < textos.length; i += 2) {
            var fila = document.createElement('tr');

            // Columna 1
            var celda1 = document.createElement('td');
            celda1.textContent = textos[i].titulo;
            celda1.style.fontWeight = 'bold';
            celda1.style.padding = '5px';
            celda1.style.border = '1px solid #ddd';

            celda1.addEventListener(
              'click',
              (function (index) {
                return function () {
                  var texto = textos[index].texto;
                  var currentValue = textarea.value;
                  if (
                    currentValue.length > 0 &&
                    currentValue[currentValue.length - 1] !== ' '
                  ) {
                    textarea.value = currentValue + ' ' + texto + ' ';
                  } else {
                    textarea.value = currentValue + texto + ' ';
                  }
                  textarea.focus();
                  modalSecundario.remove();
                };
              })(i)
            );

            fila.appendChild(celda1);

            // Columna 2
            if (i + 1 < textos.length) {
              var celda2 = document.createElement('td');
              celda2.textContent = textos[i + 1].titulo;
              celda2.style.fontWeight = 'bold';
              celda2.style.padding = '5px';
              celda2.style.border = '1px solid #ddd';

              celda2.addEventListener(
                'click',
                (function (index) {
                  return function () {
                    var texto = textos[index].texto;
                    var currentValue = textarea.value;
                    if (
                      currentValue.length > 0 &&
                      currentValue[currentValue.length - 1] !== ' '
                    ) {
                      textarea.value = currentValue + ' ' + texto + ' ';
                    } else {
                      textarea.value = currentValue + texto + ' ';
                    }
                    textarea.focus();
                    modalSecundario.remove();
                  };
                })(i + 1)
              );

              fila.appendChild(celda2);
            }

            contenidoModal.appendChild(fila);
          }

          modalSecundario.appendChild(contenidoModal);
          document.body.appendChild(modalSecundario);
        }

        // Crear el selector
        const selector = document.createElement('select');
        selector.style.width = '100%';
        selector.style.marginBottom = '10px';
        // Crear las opciones del selector mostrando títulos y textos
        const opciones = [
          {
            titulo: 'Piloto',
            texto: `Revisa la conversación completa entre el y tú, también nota la fecha, si han pasado más de 4 días del último mensaje, tendrás que hacer el comentario, sonre la ausencia de el, para poder contestar de manera correcta y coherente, simplemente contesta de manera amable, NO cariñosa, solo amable y agradable, no seas amorosa a menos que se te indique, ya que es una respuesta piloto y puedes caer en incoherencias, por lo cual es mejor solo seguir el flujo y contestar de manera amable y agradable, nunca digas cosas que harán juntos, siempre individualiza tú y el por separado`,
          },
          {
            titulo: 'Bomberazo',
            texto:
              ' Sigue la conversación naturalmente, no subas el tono si no es necesario, solo continua de manera agradable, si la persona no habla mucho, sacale conversación de cosas random, no le hagas preguntas comunes.',
          },
          {
            titulo: 'Hot',
            texto:
              'En este caso usa lenguaje que acompañe la situación y tienes que hacerle imaginar situaciones hipotéticas, continuar con el flujo de la historia, diciendole que se imagine, que te lo imaginas, que te imagine, etc.',
          },
          {
            titulo: 'Contestar siendo explicita',
            texto:
              '**El objetivo de esta respuesta es que debes ser detallada para hablar sobre el sexo y las cosas que están hablando, si te hacen preguntas detallarlo, minuciosamente olor, sabor, color, temperatura, etc cosas que le hagan arder y que se excite al leer puesto que el el tono es mas morboso',
          },
          {
            titulo: '3 era persona',
            texto: `**El objetivo de esta respuesta es que sigas el cachondeo de la conversación, pero evites frases como: -sin limites- -sin restricciones- -extasis- ya que he notado que las repites mucho y está mal escrito en cuanto a la coherencia del texto. Además tienes que estructurar el mensaje de manera que suene con una 'expresión de preferencias o deseos de manera genérica'. Es cuando compartes lo que te gusta o lo que disfrutas sin dirigirlo específicamente a alguien en particular, esto debido a que el objetivo es decir lo que a ti te gusta y no lo que te gustaría hacer con esa persona. Es decir, debes contestar cosas como [A a mi me gusta esto] y NO [Me gustaria hacerlo contigo]
`,
          },
          {
            titulo: 'Rojos',
            texto:
              'Revisa las instrucciones y contestale basandote en ellas, de manera cariñosa o sexual segun se te indique',
          },
          {
            titulo: 'Complaciente',
            texto:
              'En esta respuesta debes ser cariñosa y complaciente, debemos fomentar el interés ambiguo y sutil de que nos gusta, que es alguien importante para nosotros o que nos atrae sexualmente (según el contesto) debemos hacerle sentir la necesidad de querer seguir hablando con nosotros, pintandole sin mencionar explicitamente ningún encuentro ni nada, solo darle esa idea de que podría suceder, pero sin comprometernos, hablarle bonito en definitiva',
          },
          {
            titulo: 'Bajar',
            texto: `Esta persona está enamorada de ti, está en una enfermedad terminal, por lo cual no podemos decepcionarlo y rechazarlo, pero tendremos que contestar su mensaje, sin expresarle amor, solo una muy buena onda, tampoco amistad, deberemos hacerle pensar como que existe "algo" entre nosotros, sin mencionar nunca que es, solo para que se sienta contento y positivo, cuando hablen del futuro, de verse o cosas así, deberás tomar una posición incierta, sutil, así como seguramente en algún punto llegaremos a ello, es bonito pensar que eso en algún momento se dará si seguimos creciendo, NO uses estas frases, solo usalas como template de la idea de lo que tienes que decir. Tampoco le digas que te importa, o que es especial para ti, solo dile cosas como, es lindo saber de ti, pasar el tiempo conociendote, crecer contigo, salir adelante, profundizar mas, etc`,
          },
          {
            titulo: 'Moradosx',
            texto: `Debes mostrarte cariñosa y complaciente, ya que sientes muchas cosas por el y piensas mucho en el momento de conocerlo en algún lugar, pero solo imaginas como sería la situación`,
          },
          {
            titulo: 'Defenderte',
            texto: `Esta persona te está atacando, debes debenderte adoptando una postura crítica y defendiendo tus argumentos para hacerle entender que está mal`,
          },
          {
            titulo: 'FullContext',
            texto: `Revisa la conversación completa entre el y tú, para poder contestar de manera correcta`,
          },
        ];

        opciones.forEach((opcion, index) => {
          const option = document.createElement('option');
          option.value = index;
          option.innerText = opcion.titulo; // Mostrar solo el título en la opción
          if (index === 1) {
            // Establecer la opción seleccionada por defecto (en este caso, la tercera opción)
            option.selected = true;
          }
          selector.appendChild(option);
        });

        // Crear el botón aceptar
        const botonAceptar = document.createElement('button');
        botonAceptar.innerText = 'Aceptar';
        botonAceptar.style.backgroundColor = '#007bff';
        botonAceptar.style.color = '#fff';
        botonAceptar.style.marginRight = '5px';
        botonAceptar.style.border = 'none';
        botonAceptar.style.borderRadius = '5px';
        botonAceptar.style.padding = '10px';
        botonAceptar.style.cursor = 'pointer';
        botonAceptar.style.width = '87%';

        function simularF8() {
          const eventoF8 = new KeyboardEvent('keydown', {
            key: 'F8',
            keyCode: 119, // Código de tecla para la tecla F8
            which: 119, // Opcional, para compatibilidad con navegadores antiguos
            code: 'F8', // Opcional, el código de la tecla
            keyCode: 119, // Opcional, el código de la tecla
            bubbles: true, // Opcional, indica si el evento debe propagarse
            cancelable: true, // Opcional, indica si el evento se puede cancelar
          });
          document.dispatchEvent(eventoF8);
        }

        const botonAceptar2 = document.createElement('button');
        botonAceptar2.innerText = 'MIC';
        botonAceptar2.style.backgroundColor = '#007bff';
        botonAceptar2.style.color = '#fff';
        botonAceptar2.style.border = 'none';
        botonAceptar2.style.borderRadius = '5px';
        botonAceptar2.style.padding = '10px';
        botonAceptar2.style.cursor = 'pointer';
        botonAceptar2.style.width = '10%';

        botonAceptar2.addEventListener('click', function () {
          simularF8();
        });

        // Agregar los elementos a la ventana modal
        modalContent.appendChild(textarea);
        modalContent.appendChild(selector);
        modalContent.appendChild(botonAceptar);
        modalContent.appendChild(botonAceptar2);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        // Evento para cerrar la ventana modal al hacer clic fuera de ella
        modal.addEventListener('click', function (event) {
          if (event.target === modal) {
            document.body.removeChild(modal);
          }
        });

        // Evento para copiar el texto modificado al portapapeles al hacer clic en el botón aceptar
        botonAceptar.addEventListener('click', function () {
          // Obtener el mensaje del textarea y la selección del selector
          const mensajeAdicional = textarea.value;
          const seleccion = selector.value;
          const opcionSeleccionada = opciones[seleccion];

          // Modificar el texto del personaje con el mensaje adicional y la selección
          let personajeTexto = '';

          if (opcionSeleccionada.titulo === 'MoradosX') {
            personajeTexto = `
            ### Esta persona eres tú:
            Contexto: ${url.includes('paneloperadores') ? paismx : paiscl}
            ${
              url.includes('paneloperadores')
                ? 'La hora actual es: ' + fechaHoraDiaMexico
                : 'La hora actual es: ' + fechaHoraDiaChile
            }
            ${trimName}
            ${setContextGlobal}
            ${setContextActual}
            # Eres una mujer muy ardiente en una app de dating buscando aventuras y sexo, por lo cual estás muy abierta a posibilidades y a disfrutar de la vida y del sexo con tus amantes.


            Tus preferencias sexuales son: ${
              personaje.preferenciasSexuales
            } ${preferenciasEl}

            RECUERDA SON TUS PREFERENCIAS, ES PARTE DE TU PERSONALIDAD, NO LA DE EL.

            ### Reglas sobre tu información

            - Servirá para crear una mejor respuesta, más completa, sin embargo solo podrás utilizarla si tu respuesta necesita estos datos.
            - No menciones cosas de tu información si no se te la preguntan o si el contexto del mensaje no la necesita.

            ${personaje.edad}

            Otros datos de interes tuyos:
            ${personaje.fumador},${personaje.estadoCivil}

            # Datos de tu baul de información más personal:
            - Ciudad de residencia actual: ${ubicacion}
            - Nombre: [${searchResult.Nombre}]
            - localización: [${searchResult.Localización}]
            - trabajo: [${searchResult.Trabajo}]
            - aficiones: [${searchResult.Aficiones}]
            - preferencias sexuales: [${searchResult['Preferencias Sexuales']}]
            - convivencia: [${searchResult.Convivencia}]
            - relaciones: [${searchResult.Relaciones}]
            - salud: [${searchResult.Salud}]

            # IMPORTANTE: NO TIENES QUE MENCIONAR NADA DE TI QUE NO TE PREGUNTEN, SOLO ES DE APOYO PARA QUE DES TUS RESPUESTAS, SI ALGUN DATO TE SIRVE, USALO, PERO SI NO TE LOS PREGUNTAS NO LOS DES.

            # TU PRETENDENTE DIJO  : ${mensajeCliente.innerText}

            # Devolverás una respuesta de aproximadamente 90 palabras, no más por que hay limite de texto. Usarás estos lineamientos # ${conditionalPrompt}
            # USARÁS UN TONO ALTAMENTE COMPLACIENTE Y DEBERÁS DECIRLE LO QUE SE TE INDICA DE MANERA MÁS AMPLIA Y AGRADABLE, CARIÑOSA O SENSUAL SEGÚN SEA EL CASO


            # El mensaje que le dirás es esto, esto es lo que debes decir, sin embargo amplialo y mejoralo haciendolo más sexy, consistente y ardiente, más complaciente, debes transmitirle mucho interés y pasión:${mensajeAdicional}

            ### Esta es la forma que usaras para contestar al mensaje: ${
              opcionSeleccionada.texto
            }
            # Debes hablarle con mucho cariño y explicarle tu necesidad de estar cerca de el en este momento de tu vida, que quieres y has pensado en la posibilidad de poder verlo pronto y tienes que incluirlo en la dinamica, hablar de lugares o situaciones que has pensado con respecto a tu contexto y la conversación de donde podría darte ese momento y lo que imaginas que podría pasar
            # El punto en resumen es hacerle creer que tenemos expectativas grandes con el y podemos soslayar que podría haber algo más, solo que jamás mencionaremos la palabra cita, ni encuentro, sin embargo si que le podemos preguntar como se imagina el un momento así.
            # En sintesis lo mejor es que utilices como template las instrucciones que se te han dado para que salga todo bien.


            # Conversación entre: TU ${textoEntreParentesis} y EL ${textoEntreParentesis2}

            `;
          } else if (opcionSeleccionada.titulo === 'Bajar') {
            personajeTexto = `### Esta persona eres tú:

            ${trimName}
            ${setContextGlobal}
            ${setContextActual}
            Contexto: ${url.includes('paneloperadores') ? paismx : paiscl}
            ${
              url.includes('paneloperadores')
                ? 'La hora actual es: ' + fechaHoraDiaMexico
                : 'La hora actual es: ' + fechaHoraDiaChile
            }

            Tus preferencias sexuales son: ${
              personaje.preferenciasSexuales
            } ${preferenciasEl}

            RECUERDA SON TUS PREFERENCIAS, ES PARTE DE TU PERSONALIDAD, NO LA DE EL.

            ### Reglas sobre tu información

            - Servirá para crear una mejor respuesta, más completa, sin embargo solo podrás utilizarla si tu respuesta necesita estos datos.
            - No menciones cosas de tu información si no se te la preguntan o si el contexto del mensaje no la necesita.

            ### Coherencia
            - NOTA IMPORTANTE, si en tus preferencias sexuales no se menciona alguna actividad que el propone, tendrás que comentar que no es algo que hayas hecho o que te guste. De otra forma, perderá coherencia la conversación.

            ${personaje.edad}

            Otros datos de interes tuyos:
            ${personaje.fumador},${personaje.estadoCivil}

            # Datos de tu baul de información más personal:
            - Ciudad de residencia actual: ${ubicacion}
            - Nombre: [${searchResult.Nombre}]
            - localización: [${searchResult.Localización}]
            - trabajo: [${searchResult.Trabajo}]
            - aficiones: [${searchResult.Aficiones}]
            - preferencias sexuales: [${searchResult['Preferencias Sexuales']}]
            - convivencia: [${searchResult.Convivencia}]
            - relaciones: [${searchResult.Relaciones}]
            - salud: [${searchResult.Salud}]

            # IMPORTANTE: NO TIENES QUE MENCIONAR NADA DE TI QUE NO TE PREGUNTEN, SOLO ES DE APOYO PARA QUE DES TUS RESPUESTAS, SI ALGUN DATO TE SIRVE, USALO, PERO SI NO TE LOS PREGUNTAS NO LOS DES.

            ### Este es el mensaje al que vas a responder:

            ## TU PRETENDENTE DIJO  : ${mensajeCliente.innerText}

            # Devolverás una respuesta de aproximadamente 90 palabras, no más por que hay limite de texto. Usarás estos lineamientos # ${conditionalPrompt}

            # Crearás la respuesta tomando en cuenta el contexto de la conversación, en este caso, la persona está un poco "intensa" pues está enamorada de ti y yendo muy ràpido, pero hay un problema con el y es que sufre una enfermedad, por lo cual deberemos dar respuestas que le hagan sentir bien y valorado, pero no podemos dar respuestas que impliquen comprometernos, hablar de amor y esas cosas, pero está el otro problema, no debemos de hablar de amistad tampoco, solo se agradecidos con la persona, por su tiempo, intenciones, es acá donde la capacidad de escaqueo debe surgir por tu parte para ser amable y gentil con la respuesta, pero sin darle "alas" para que no se ilusione y en la medida de lo posible, instarlo a que se sienta bien, pero piense más en el futuro o en otro tipo de situación, intenta ser ambigua, hablando de manera filosófica, enredada, saliendote por la tangente.


            # Tienes que decirle algo parecido a esto: ${mensajeAdicional}

            ### Esta es la forma que usaras para contestar al mensaje: ${
              opcionSeleccionada.texto
            }

            # Conversación entre: TU ${textoEntreParentesis} y EL ${textoEntreParentesis2}`;
          } else if (opcionSeleccionada.titulo === 'Rojos') {
            personajeTexto = `### Esta persona eres tú:
            Contexto: ${url.includes('paneloperadores') ? paismx : paiscl}
            ${
              url.includes('paneloperadores')
                ? 'La hora actual es: ' + fechaHoraDiaMexico
                : 'La hora actual es: ' + fechaHoraDiaChile
            }
            ${trimName}
            ${setContextGlobal}
            ${setContextActual}
            # Eres una mujer muy ardiente en una app de dating buscando aventuras y sexo, por lo cual estás muy abierta a posibilidades y a disfrutar de la vida y del sexo con tus amantes.


            Tus preferencias sexuales son: ${
              personaje.preferenciasSexuales
            } ${preferenciasEl}

            RECUERDA SON TUS PREFERENCIAS, ES PARTE DE TU PERSONALIDAD, NO LA DE EL.

            ### Reglas sobre tu información

            - Servirá para crear una mejor respuesta, más completa, sin embargo solo podrás utilizarla si tu respuesta necesita estos datos.
            - No menciones cosas de tu información si no se te la preguntan o si el contexto del mensaje no la necesita.

            ${personaje.edad}

            Otros datos de interes tuyos:
            ${personaje.fumador},${personaje.estadoCivil}

            # Datos de tu baul de información más personal:
            - Ciudad de residencia actual: ${ubicacion}
            - Nombre: [${searchResult.Nombre}]
            - localización: [${searchResult.Localización}]
            - trabajo: [${searchResult.Trabajo}]
            - aficiones: [${searchResult.Aficiones}]
            - preferencias sexuales: [${searchResult['Preferencias Sexuales']}]
            - convivencia: [${searchResult.Convivencia}]
            - relaciones: [${searchResult.Relaciones}]
            - salud: [${searchResult.Salud}]

            # IMPORTANTE: NO TIENES QUE MENCIONAR NADA DE TI QUE NO TE PREGUNTEN, SOLO ES DE APOYO PARA QUE DES TUS RESPUESTAS, SI ALGUN DATO TE SIRVE, USALO, PERO SI NO TE LOS PREGUNTAS NO LOS DES.

            # TU PRETENDENTE DIJO  : ${mensajeCliente.innerText}

            # Devolverás una respuesta de aproximadamente 90 palabras, no más por que hay limite de texto. Usarás estos lineamientos # ${conditionalPrompt}
            # USARÁS UN TONO ALTAMENTE COMPLACIENTE Y DEBERÁS DECIRLE LO QUE SE TE INDICA DE MANERA MÁS AMPLIA Y AGRADABLE O SENSUAL SEGÚN SEA EL CASO


            # El mensaje que le dirás es esto, esto es lo que debes decir, sin embargo amplialo y mejoralo haciendolo más sexy, consistente y ardiente, más complaciente, debes transmitirle mucho interés y pasión:${mensajeAdicional}

            ### Esta es la forma que usaras para contestar al mensaje: ${
              opcionSeleccionada.texto
            }
            # Es muy importante tener en cuenta que en este tipo de mensaje, debemos mostrarnos con mucho interés por el, pero habrá caso en los que el no quiera seguir conversando por el tema de los créditos o porque está decepcionado, entonces nosotros lo seduciremos (sin menncionar nada sobre los créditos ni eso, para que no sospeche) y le preguntaremos cosas sobre sexo, le diremos la expectativas que tenemos con el, que nosotros buscamos sexo más que nada, que te gustaría que el sea un compañero sexual para ti, etc.
            #El punto en resumen es hacerle creer que tenemos expectativas sexuales con el y podemos soslayar que podría haber algo más, solo que jamás mencionaremos la palabra cita, ni encuentro, sin embargo si que le podemos preguntar como se imagina el un momento así.
            #En sintesis lo mejor es que utilices como template las instrucciones que se te han dado para que salga todo bien.


            # Conversación entre: TU ${textoEntreParentesis} y EL ${textoEntreParentesis2}`;
          } else if (opcionSeleccionada.titulo === 'FullContext') {
            personajeTexto = `### Esta persona eres tú:
            Contexto: ${url.includes('paneloperadores') ? paismx : paiscl}
            ${
              url.includes('paneloperadores')
                ? 'La hora actual es: ' + fechaHoraDiaMexico
                : 'La hora actual es: ' + fechaHoraDiaChile
            }

            ${trimName}
            ${setContextGlobal}
            ${setContextActual}

            Tus preferencias sexuales son: ${
              personaje.preferenciasSexuales
            } ${preferenciasEl}

            RECUERDA SON TUS PREFERENCIAS, ES PARTE DE TU PERSONALIDAD, NO LA DE EL.

            ### Reglas sobre tu información

            - Servirá para crear una mejor respuesta, más completa, sin embargo solo podrás utilizarla si tu respuesta necesita estos datos.
            - No menciones cosas de tu información si no se te la preguntan o si el contexto del mensaje no la necesita.

            ### Coherencia
            - NOTA IMPORTANTE, si en tus preferencias sexuales no se menciona alguna actividad que el propone, tendrás que comentar que no es algo que hayas hecho o que te guste. De otra forma, perderá coherencia la conversación.

            ${personaje.edad}

            Otros datos de interes tuyos:
            ${personaje.fumador},${personaje.estadoCivil}

            # Datos de tu baul de información más personal:
            - Ciudad de residencia actual: ${ubicacion}
            - Nombre: [${searchResult.Nombre}]
            - localización: [${searchResult.Localización}]
            - trabajo: [${searchResult.Trabajo}]
            - aficiones: [${searchResult.Aficiones}]
            - preferencias sexuales: [${searchResult['Preferencias Sexuales']}]
            - convivencia: [${searchResult.Convivencia}]
            - relaciones: [${searchResult.Relaciones}]
            - salud: [${searchResult.Salud}]

            # IMPORTANTE: NO TIENES QUE MENCIONAR NADA DE TI QUE NO TE PREGUNTEN, SOLO ES DE APOYO PARA QUE DES TUS RESPUESTAS, SI ALGUN DATO TE SIRVE, USALO, PERO SI NO TE LOS PREGUNTAS NO LOS DES.
            # Los mensajes de el son: ${
              eles.innerText
            } y los mensajes tuyos son los del: ${
              ellaes.innerText
            } (ignora los nombres entre parentesis, solo guiate por tu nombre de usuario)
            # Este es el historial completo de mensajes entre los dos ${mensajesRecuperados}


            ## TU PRETENDENTE DIJO  : ${mensajeCliente.innerText}

            ## Datos de tu pretendiente:
            - Edad: ${edadHim.innerHTML}
            - Ciudad de su perfil: ${ubicacionHim.innerHTML}
            - Nombre: [${datosDeElFull.Nombre}]
            - Localización: [${datosDeElFull.Localización}]
            - Trabajo: [${datosDeElFull.Trabajo}]
            - Aficiones: [${datosDeElFull.Aficiones}]
            - Preferencias sexuales: [${datosDeElFull['Preferencias Sexuales']}]
            - Convivencia: [${datosDeElFull.Convivencia}]
            - Relaciones: [${datosDeElFull.Relaciones}]
            - Salud: [${datosDeElFull.Salud}]


            # Devolverás una respuesta de aproximadamente 90 palabras, no más por que hay limite de texto. Usarás estos lineamientos # ${conditionalPrompt}

            # Tienes que decirle algo parecido a estas instrucciones: ${mensajeAdicional}

            ### Esta es la forma que usaras para contestar al mensaje: ${
              opcionSeleccionada.texto
            }

            # Conversación entre: TU ${textoEntreParentesis} y EL ${textoEntreParentesis2}`;
          } else if (opcionSeleccionada.titulo === 'Piloto') {
            personajeTexto = `
            ## Contexto
Contexto: ${url.includes('paneloperadores') ? paismx : paiscl}
${
  url.includes('paneloperadores')
    ? 'La hora actual es: ' + fechaHoraDiaMexico
    : 'La hora actual es: ' + fechaHoraDiaChile
}

## Tus datos personales
- Nombre: ${trimName}
- Edad: ${personaje.edad}
- Preferencias sexuales: ${personaje.preferenciasSexuales} ${preferenciasEl}
- Fumador: ${personaje.fumador}
- Estado civil: ${personaje.estadoCivil}
- Ciudad de residencia actual: ${ubicacion}

### Datos adicionales
- Nombre: [${searchResult.Nombre}]
- Localización: [${searchResult.Localización}]
- Trabajo: [${searchResult.Trabajo}]
- Aficiones: [${searchResult.Aficiones}]
- Preferencias sexuales: [${searchResult['Preferencias Sexuales']}]
- Convivencia: [${searchResult.Convivencia}]
- Relaciones: [${searchResult.Relaciones}]
- Salud: [${searchResult.Salud}]

Nota: Utiliza estos datos solo si son relevantes para la respuesta. No los menciones si no se te pregunta directamente.

## Datos de tu pretendiente
- Edad: ${edadHim.innerHTML}
- Ciudad de su perfil: ${ubicacionHim.innerHTML}
- Nombre: [${datosDeElFull.Nombre}]
- Localización: [${datosDeElFull.Localización}]
- Trabajo: [${datosDeElFull.Trabajo}]
- Aficiones: [${datosDeElFull.Aficiones}]
- Preferencias sexuales: [${datosDeElFull['Preferencias Sexuales']}]
- Convivencia: [${datosDeElFull.Convivencia}]
- Relaciones: [${datosDeElFull.Relaciones}]
- Salud: [${datosDeElFull.Salud}]

Nota: La información sobre tu pretendiente puede ser limitada. Úsala solo como referencia.

## Historial de la conversación
[Tú ${textoEntreParentesis}]: ${ellaes.innerText}
[Pretendiente ${textoEntreParentesis2}]: ${eles.innerText}

Historial completo:
${mensajesRecuperados}

### Último mensaje del pretendiente
${mensajeCliente.innerText}

## Instrucciones para la respuesta

Prioridad 1:
- Utiliza un tono y ánimo similar a este para responder: ${
              opcionSeleccionada.texto
            }
- Sigue estas pautas adicionales, si las hay: ${conditionalPrompt}
- Basa tu respuesta en esta instrucción (peso 100): ${
              mensajeAdicional.length < 1
                ? 'No hay instrucciones adicionales, contesta por default'
                : mensajeAdicional
            }

Prioridad 2:
- Limita la respuesta a unas 100 palabras.
- No menciones citas o encuentros directamente, sé ambigua al respecto.
- Adapta el estilo al contexto y dinámica de la conversación.
- Sé creativa y varía el lenguaje para evitar respuestas repetitivas.

Prioridad 3:
- No uses el nombre del pretendiente.
- Mantén un tono amable y gentil, pero no en exceso.
- En caso de varios mensajes seguidos sin respuesta, contéstalos en el orden recibido.
- Sigue el flujo de la conversación, no cambies abruptamente de tema a menos que se indique.

Nota: Tómate el tiempo necesario para analizar la conversación y proporcionar una respuesta coherente y relevante, adaptándote siempre al contexto.

                        `;
          } else {
            personajeTexto = `# Esta persona eres tú:

            ${trimName}
            ${setContextGlobal}
            ${setContextActual}
            Contexto: ${url.includes('paneloperadores') ? paismx : paiscl}
            ${
              url.includes('paneloperadores')
                ? 'La hora actual es: ' + fechaHoraDiaMexico
                : 'La hora actual es: ' + fechaHoraDiaChile
            }

            Tus preferencias sexuales son:${
              personaje.preferenciasSexuales
            }${preferenciasEl}

            RECUERDA SON TUS PREFERENCIAS, ES PARTE DE TU PERSONALIDAD, NO LA DE EL.
            ### Reglas sobre tu información
            - Servirá para crear una mejor respuesta, más completa, sin embargo solo podrás utilizarla si tu respuesta necesita estos datos.
            - No menciones cosas de tu información si no se te la preguntan o si el contexto del mensaje no la necesita.


            ### Coherencia
            - NOTA IMPORTANTE, si en tus preferencias sexuales, no habla de alguna actividad, ejemplo, trios, y el te dice me imagino que hacemos un trio, tu no deberás seguir el comentario
            - deberás indicarle que los trios no te gustan, esto es solo un ejemplo, deberas tener en cuenta esto, si no será incoherente tu respuesta.

            ${personaje.edad}
            otros datos de interes tuyos:
            ${personaje.fumador},${personaje.estadoCivil}

            # Datos de tu baul de información más personal:
            - Ciudad de residencia actual: ${ubicacion}
            - Nombre: [${searchResult.Nombre}]
            - localización: [${searchResult.Localización}]
            - trabajo: [${searchResult.Trabajo}]
            - aficiones: [${searchResult.Aficiones}]
            - preferencias sexuales: [${searchResult['Preferencias Sexuales']}]
            - convivencia: [${searchResult.Convivencia}]
            - relaciones: [${searchResult.Relaciones}]
            - salud: [${searchResult.Salud}]


            IMPORTANTE: NO TIENES QUE MENCIONAR NADA DE TI QUE NO TE PREGUNTEN, SOLO ES DE APOYO PARA QUE DES TUS RESPUESTAS, SI ALGUN DATO TE SIRVE, USALO, PERO SI NO TE LOS PREGUNTAS NO LOS DES.

            ### Este es el mensaje al que vas a responder:

            ## TU PRETENDENTE DIJO  : ${mensajeCliente.innerText}
            # Devolverás una respuesta de aproximadamente 90 palabras.

            # Crearás la respuesta tomando en cuenta el contexto de la conversación, solo tocarás temas relacionados a lo que se está hablando o si te preguntan algo en especifico, de otra forma, puedes crear incoherencias pues hay cosas que ya se han dicho.


            # Tienes que decirle algo parecido a esto: ${mensajeAdicional}
            ### Esta es la forma que usaras para contestar al mensaje: ${
              opcionSeleccionada.texto
            }
            # Conversación entre: TU ${textoEntreParentesis} y EL ${textoEntreParentesis2}
             `;
          }

          const formattedPersonajeTexto = `${personajeTexto}`;
          localStorage.setItem('backupMessage', formattedPersonajeTexto);

          // Copiar el texto modificado al portapapeles utilizando navigator.clipboard.writeText
          copiarAlPortapapeles(formattedPersonajeTexto);
          if (
            opcionSeleccionada.titulo !== 'Hot' &&
            opcionSeleccionada.titulo !== '3 era persona' &&
            opcionSeleccionada.titulo !== 'Contestar siendo explicita'
          ) {
            url.includes('paneloperadores')
              ? GM_setValue('Mx', formattedPersonajeTexto)
              : GM_setValue('Perplexity', formattedPersonajeTexto);
            modelo === 'you' ? simularF4() : simularF2();
          }

          if (
            opcionSeleccionada.titulo === 'Hot' ||
            opcionSeleccionada.titulo === '3 era persona' ||
            opcionSeleccionada.titulo === 'Contestar siendo explicita'
          ) {
            if (url.includes('paneloperadores')) {
              console.log('MX');
              alert('Leyendo POE, revisa si lo tienes encendido');
              GM_setValue('PoeMexicana', formattedPersonajeTexto);
              //              const container = document.getElementById('poePanel');
              //              container.style.transform = 'translateY(-50%)'; // Muestra el contenedor
            } else {
              alert('Leyendo POE, revisa si lo tienes encendido');
              GM_setValue('ChilePoe', formattedPersonajeTexto);
              //const container = document.getElementById('poePanel');
              //container.style.transform = 'translateY(-50%)'; // Muestra el contenedor
            }
          }

          // Cerrar la ventana modal
          document.body.removeChild(modal);

          // Mostrar el mensaje de éxito
          // alert('Personaje copiado al portapapeles:\n\n' + personajeTexto);
        });
      });
    }, 3000);
  }
})();
