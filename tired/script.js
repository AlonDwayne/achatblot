let state = 0; // 0: Thola Igama, 1: Khetha Ikhasi, 2: Khetha Imodyuli, 3: Khetha Okuqukethwe, 4: Izinketho Zokukhuluma
let name = '';
let selectedCourse = '';

const courses = {
    1: ['Uphenyo lwezokusebenza', 'I-Discrete ePhakeme', 'I-Linear Algebra', 'I-Calculus ePhakeme'],
    2: ['Izakhiwo Zedatha', 'Algotimi', 'Inhlangano YeComputer', 'Izinhlelo Zedatha']
};

const modulesContent = {
    'Uphenyo lwezokusebenza': ['Isikhathi semodyuli', 'Uhlaka lwemodyuli', 'Ulwazi lwezifundo'],
    'I-Discrete ePhakeme': ['Isikhathi semodyuli', 'Uhlaka lwemodyuli', 'Ulwazi lwezifundo'],
    'I-Linear Algebra': ['Isikhathi semodyuli', 'Uhlaka lwemodyuli', 'Ulwazi lwezifundo'],
    'I-Calculus ePhakeme': ['Isikhathi semodyuli', 'Uhlaka lwemodyuli', 'Ulwazi lwezifundo'],
    'Izakhiwo Zedatha': ['Isikhathi semodyuli', 'Uhlaka lwemodyuli', 'Ulwazi lwezifundo'],
    'Algotimi': ['Isikhathi semodyuli', 'Uhlaka lwemodyuli', 'Ulwazi lwezifundo'],
    'Inhlangano YeComputer': ['Isikhathi semodyuli', 'Uhlaka lwemodyuli', 'Ulwazi lwezifundo'],
    'Izinhlelo Zedatha': ['Isikhathi semodyuli', 'Uhlaka lwemodyuli', 'Ulwazi lwezifundo']
};

function sendMessage() {
    const input = document.getElementById('input').value.trim();
    const botResponse = document.getElementById('bot-response');
    const messageSection = document.getElementById('message-section');

    let response = '';

    if (state === 0) {
        // Thola igama lomsebenzisi
        name = input;
        response = `Sawubona, ${name}! Sicela ukhethe ikhasi:\n1. Ikhasi lezibalo\n2. Ikhasi leComputer Science`;
        state = 1;
    } else if (state === 1) {
        // Ukukhetha ikhasi
        const courseNumber = parseInt(input);
        if (courseNumber === 1 || courseNumber === 2) {
            selectedCourse = courseNumber === 1 ? 'Izibalo' : 'Computer Science';
            response = `Ukhethiwe ${selectedCourse}. Sicela ukhethe imodyuli:\n${courses[courseNumber].map((mod, i) => `${i + 1}. ${mod}`).join('\n')}`;
            state = 2;
        } else {
            response = 'Ukukhetha okungafanele. Sicela ufake 1 noma 2.';
        }
    } else if (state === 2) {
        // Ukukhetha imodyuli
        const moduleNumber = parseInt(input);
        const module = courses[state === 2 && selectedCourse === 'Izibalo' ? 1 : 2][moduleNumber - 1];
        if (module) {
            response = `Ukhethiwe ${module}. Sicela ukhethe okuqukethwe:\n1. Isikhathi semodyuli\n2. Uhlaka lwemodyuli\n3. Ulwazi lwezifundo`;
            state = 3;
        } else {
            response = 'Ukukhetha okungafanele. Sicela ufake inombolo yemodyuli efanele.';
        }
    } else if (state === 3) {
        // Ukukhetha okuqukethwe
        const contentNumber = parseInt(input);
        const module = courses[selectedCourse === 'Izibalo' ? 1 : 2][parseInt(input) - 1];
        const content = modulesContent[module] && modulesContent[module][contentNumber - 1];
        if (content) {
            const links = {
                'Isikhathi semodyuli': 'http://mycelcat.unizulu.ac.za/finder2.html#',
                'Uhlaka lwemodyuli': 'https://example.com/outline',
                'Ulwazi lwezifundo': 'https://example.com/lecture-info'
            };
            response = `Nansi izixhumanisi ze ${content}:\n${links[content]}`;
            response += `\n\n1. Vala ingxoxo\n2. Qhubeka nengxoxo`;
            state = 4;
        } else {
            response = 'Ukukhetha okungafanele. Sicela ufake 1, 2, noma 3.';
        }
    } else if (state === 4) {
        // Izinketho zokukhuluma ngemuva kokuhlinzeka
        const optionNumber = parseInt(input);
        if (optionNumber === 1) {
            // Vala ingxoxo
            response = `Sawubona!, igama lami ngu IZA-BOT. Yini igama lakho?`;
            state = 0;
        } else if (optionNumber === 2) {
            // Qhubeka nengxoxo
            response = `Sicela ukhethe ikhasi:\n1. Ikhasi lezibalo\n2. Ikhasi leComputer Science`;
            state = 1;
        } else {
            response = 'Ukukhetha okungafanele. Sicela ufake 1 noma 2.';
        }
    }

    // Khombisa umyalezo womsebenzisi
    const userMessage = document.createElement('div');
    userMessage.className = 'message';
    userMessage.id = 'user';
    userMessage.innerHTML = `<span id="user-response">${input}</span>`;
    messageSection.appendChild(userMessage);

    // Khombisa impendulo ye-bot
    botResponse.textContent = response;
    const botMessage = document.createElement('div');
    botMessage.className = 'message';
    botMessage.id = 'bot';
    botMessage.innerHTML = `<span id="bot-response">${response}</span>`;
    messageSection.appendChild(botMessage);

    // Cleara ifomu lokufaka
    document.getElementById('input').value = '';

    // Skrolela phansi
    messageSection.scrollTop = messageSection.scrollHeight;
}
