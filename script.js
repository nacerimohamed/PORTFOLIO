
// ========== LOADING SCREEN ==========
const loader = document.getElementById('loader');
const mainContent = document.getElementById('main-content');

// Simuler un temps de chargement (1.2s)
setTimeout(() => {
    if (loader) loader.classList.add('hidden');
    if (mainContent) mainContent.classList.add('visible');
    displayProjects();
}, 1200);

// ========== PROJECTS DATA ==========
const projects = [
    {
        title: "Rabbit_MQ",
        description: "Système de gestion de cinéma basé sur une architecture microservices avec Docker et RabbitMQ.",
        technologies: ["RabbitMQ", "Docker", "PHP", "JavaScript"],
        icon: "fa-solid fa-film",
        github: "https://github.com/nacerimohamed/Rabbit_MQ",
        live: null
    },
    {
        title: "Gestion des Vols",
        description: "Application web de gestion des vols et des réservations, développée avec React et Redux.",
        technologies: ["React", "Redux", "CSS3"],
        icon: "fa-solid fa-plane",
        github: "https://github.com/nacerimohamed/Gestion-des-Vols",
        live: "https://gestion-des-vols.vercel.app/"
    },
    {
        title: "Sales Data Analysis",
        description: "Interactive dashboard for analyzing Superstore sales, profits, customer behavior, and regional performance using Python and Flask.",
        technologies: [
            "Python",
            "Flask",
            "Pandas",
            "NumPy",
            "JavaScript",
            "Chart.js"
        ],
        icon: "fa-solid fa-chart-line",
        github: "https://github.com/nacerimohamed/Sales-Data-Analysis",
        live: "https://sales-data-analysis-beta.vercel.app/"
    },
    {
        title: "Cooperative Market",
        description: "Application full stack pour la gestion d'une coopérative.",
        technologies: ["Laravel", "React", "Vite", "MySQL"],
        icon: "fa-solid fa-store",
        github: "https://github.com/nacerimohamed/FINAL-PROJET",
        live: null
    }
];

// ========== DISPLAY PROJECTS ==========
function displayProjects() {
    const container = document.getElementById('projects-container');

    if (!container) return;

    container.innerHTML = projects.map(project => {
        const liveLink = project.live
            ? `<a href="${project.live}" class="project-link" target="_blank" rel="noopener noreferrer">
                    <i class="fas fa-external-link-alt"></i> Live
               </a>`
            : '';

        return `
            <div class="project-card">
                <i class="${project.icon}"></i>
                <h3>${project.title}</h3>
                <p>${project.description}</p>

                <div class="project-tech">
                    ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                </div>

                <div class="project-links">
                    <a href="${project.github}" class="project-link" target="_blank" rel="noopener noreferrer">
                        <i class="fab fa-github"></i> Code
                    </a>
                    ${liveLink}
                </div>
            </div>
        `;
    }).join('');
}

// ========== CONTACT FORM (FORMSPREE) ==========
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('button[type="submit"]');

        if (!submitBtn) return;

        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
        submitBtn.disabled = true;

        const formData = new FormData(contactForm);

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                alert('Merci ! Votre message a bien été envoyé. Je vous répondrai bientôt.');
                contactForm.reset();
            } else {
                const data = await response.json();

                if (data.errors) {
                    alert("Erreur: " + data.errors.map(err => err.message).join(", "));
                } else {
                    alert('Oups ! Une erreur est survenue. Vérifiez votre ID Formspree.');
                }
            }
        } catch (error) {
            alert('Erreur de connexion. Vérifiez votre réseau.');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// ========== DOWNLOAD CV AS PDF ==========
function downloadCV() {
    const cvHTML = `
        <div style="padding: 40px; font-family: 'Inter', sans-serif; color: #000; background: #fff; width: 210mm; min-height: 297mm; font-size: 13px; line-height: 1.5; box-sizing: border-box;">

            <div>
                <h2 style="font-size: 1rem; text-transform: uppercase; border-bottom: 1px solid #ccc; padding-bottom: 4px; margin-bottom: 8px; color: #000;">Centres d'intérêt</h2>
                <p style="color: #333;">
                    Développement web et nouvelles technologies • Intelligence artificielle • Open Source et programmation • Veille technologique • Cinéma et séries • Jeux vidéo • Sport
                </p>
            </div>
        </div>
    `;

    const element = document.createElement('div');
    element.innerHTML = cvHTML;

    const opt = {
        margin: 0,
        filename: 'Mohamed_Naceri_CV.pdf',
        image: {
            type: 'jpeg',
            quality: 0.98
        },
        html2canvas: {
            scale: 2,
            useCORS: true
        },
        jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: 'portrait'
        }
    };

    html2pdf().set(opt).from(element).save();
}
