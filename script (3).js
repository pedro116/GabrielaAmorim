  var WA_NUMBER = "5511972859187";

  document.getElementById('wa-simple').href = "https://wa.me/" + WA_NUMBER;

  var contactForm = document.getElementById('contact-form');

  var whatsInput = document.getElementById('whats');
  var whatsFull = document.getElementById('whats-full');

  function maskLocalPhone(raw) {
    var digits = raw.replace(/\D/g, '').slice(0, 11);
    var ddd = digits.slice(0, 2);
    var rest = digits.slice(2);
    var out = ddd;
    if (rest.length > 4) {
      out += (ddd ? ' ' : '') + rest.slice(0, rest.length - 4) + '-' + rest.slice(-4);
    } else if (rest.length > 0) {
      out += (ddd ? ' ' : '') + rest;
    }
    return out;
  }

  whatsInput.addEventListener('input', function() {
    whatsInput.value = maskLocalPhone(whatsInput.value);
  });

  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    var nome = document.getElementById('nome').value.trim();
    var whats = "+55 " + whatsInput.value.trim();
    whatsFull.value = whats;
    var bairro = document.getElementById('bairro').value.trim();
    var especie = document.getElementById('especie').value;
    var idade = document.getElementById('idade').value.trim();
    var mudou = document.getElementById('mudou').value.trim();

    var lines = ["Olá, Gabi! Meu nome é " + nome + "."];
    lines.push("Meu WhatsApp: " + whats);
    lines.push("Bairro e cidade: " + bairro);
    lines.push("Pet: " + especie);
    lines.push("Idade: " + idade);
    lines.push("O que mudou: " + mudou);
    var waText = encodeURIComponent(lines.join("\n"));
    var waUrl = "https://wa.me/" + WA_NUMBER + "?text=" + waText;

    var submitBtn = contactForm.querySelector('.submit-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';

    var formData = new FormData(contactForm);
    formData.append('_subject', 'Novo contato pelo site — Gabriela Amorim');

    // Dispara o e-mail em segundo plano (keepalive garante que continua mesmo
    // se a página for trocada pelo redirecionamento ao WhatsApp logo em seguida)
    fetch(contactForm.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' },
      keepalive: true
    }).catch(function() {
      // mesmo se o e-mail falhar, seguimos para o WhatsApp
    });

    // Navegação direta (sem window.open) funciona de forma confiável em
    // celulares, abrindo o próprio app do WhatsApp quando instalado
    window.location.href = waUrl;
  });
